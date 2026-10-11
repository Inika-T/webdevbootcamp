import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout.jsx'
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
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)
