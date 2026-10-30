import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout.jsx'
import Admin from './pages/Admin.jsx'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'

// basename is "/" locally and "/<repo-name>/" on GitHub Pages.
export const router = createBrowserRouter(
  [
    {
      path: '/',
      Component: Layout,
      children: [
        { index: true, Component: Home },
        { path: 'contact', Component: Contact },
        { path: 'admin', Component: Admin },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)
