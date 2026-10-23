// Sends a contact message to the backend.
// Not hooked up yet: the FastAPI POST /messages endpoint will live here later.
// When it does, replace the body with a fetch() call and return the saved
// message. ContactForm already shows a "sent" state when this resolves.
export async function sendMessage({ name, email, message }) {
  void name
  void email
  void message
  throw new Error('Messages are not switched on yet.')
}
