from datetime import datetime, timezone
from typing import Literal

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr, Field

app = FastAPI()


# ---------- Data models ----------

class ProjectIn(BaseModel):
    """The project fields you send when updating a project."""

    type: str = Field(min_length=1, max_length=40)
    title: str = Field(min_length=1, max_length=100)
    description: str = Field(min_length=1, max_length=500)
    tags: list[str] = Field(default=[], max_length=5)
    color: Literal["pink", "cyan", "yellow"]
    href: str | None = None


class Project(ProjectIn):
    """A stored project: the same fields plus an id the server assigns."""

    id: int


class MessageIn(BaseModel):
    """What a visitor sends from the contact form."""

    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(min_length=1, max_length=2000)


class Message(MessageIn):
    """A stored message: the visitor's fields plus an id and the time it arrived."""

    id: int
    created_at: datetime


# ---------- In-memory "database" ----------
# These are plain Python lists. Changes are lost when the server restarts.

projects_db: list[Project] = [
    Project(
        id=1,
        type="DEVELOPMENT",
        title="Playlist Creator",
        description="An app that takes a YouTube playlist link, downloads the music, and builds one consolidated, indexed music video file.",
        tags=["Automation", "YouTube", "2025"],
        color="pink",
        href="https://github.com/Inika-T/PlaylistCreator",
    ),
    Project(
        id=2,
        type="CONTENT",
        title="RogueSkye",
        description="A YouTube channel of curated music video playlists that I ran for nearly five years, reaching 13M+ views and 45,000+ subscribers at its peak.",
        tags=["YouTube", "13M+ views", "2020–25"],
        color="cyan",
        href="https://youtube.com/@rogueskyee",
    ),
    Project(
        id=3,
        type="UI/UX DESIGN",
        title="Development Ethics Toolkit",
        description="A full visual redesign of a free, open-access platform that policymakers and scholars use to design and evaluate social-impact projects ethically.",
        tags=["UI/UX", "FIRE @ UMD", "2025–Now"],
        color="yellow",
        href="https://master.dkib26v6mdyg7.amplifyapp.com/",
    ),
    Project(
        id=4,
        type="HCI RESEARCH",
        title="Brain Health Smartwatch",
        description="A co-design study at the University of Iowa on how midlife adults imagine a smartwatch and companion app for tracking brain health. I analyzed interview transcripts and designed watchface concepts from the findings.",
        tags=["Co-design", "NSF REU", "2026"],
        color="pink",
    ),
]

messages_db: list[Message] = [
    Message(
        id=1,
        name="Sam Rivera",
        email="sam@example.com",
        message="Loved the Playlist Creator! Is it open source?",
        created_at=datetime(2026, 10, 20, 14, 30, tzinfo=timezone.utc),
    ),
    Message(
        id=2,
        name="Jordan Lee",
        email="jordan@example.com",
        message="Hi Inika, are you open to a UI/UX internship next summer?",
        created_at=datetime(2026, 10, 22, 9, 15, tzinfo=timezone.utc),
    ),
]


def find_project(project_id: int) -> Project:
    """Return the project with this id, or stop with a 404 error."""
    for project in projects_db:
        if project.id == project_id:
            return project
    raise HTTPException(status_code=404, detail=f"Project {project_id} not found")


# ---------- Endpoints ----------

@app.get("/")
def main():
    return {"message": "Hello World"}


@app.get("/projects")
def list_projects() -> list[Project]:
    """Return every project."""
    return projects_db


@app.get("/projects/{project_id}")
def get_project(project_id: int) -> Project:
    """Return one project. 404 if no project has that id."""
    return find_project(project_id)


@app.put("/projects/{project_id}")
def update_project(project_id: int, update: ProjectIn) -> Project:
    """Replace a project's details. 404 if it doesn't exist, 422 if the data is invalid."""
    project = find_project(project_id)
    updated = Project(id=project.id, **update.model_dump())
    projects_db[projects_db.index(project)] = updated
    return updated


@app.post("/projects", status_code=201)
def create_project(new_project: ProjectIn) -> Project:
    """Add a new project and return it with its new id. 422 if the data is invalid."""
    next_id = max((p.id for p in projects_db), default=0) + 1
    project = Project(id=next_id, **new_project.model_dump())
    projects_db.append(project)
    return project


@app.delete("/projects/{project_id}")
def delete_project(project_id: int) -> Project:
    """Remove a project and return what was deleted. 404 if it doesn't exist."""
    project = find_project(project_id)
    projects_db.remove(project)
    return project


@app.post("/messages", status_code=201)
def create_message(new_message: MessageIn) -> Message:
    """Save a contact form message and return it with its new id. 422 if invalid."""
    next_id = max((m.id for m in messages_db), default=0) + 1
    message = Message(
        id=next_id,
        created_at=datetime.now(timezone.utc),
        **new_message.model_dump(),
    )
    messages_db.append(message)
    return message


@app.get("/messages")
def list_messages() -> list[Message]:
    """Return every message, newest first."""
    return sorted(messages_db, key=lambda m: m.created_at, reverse=True)
