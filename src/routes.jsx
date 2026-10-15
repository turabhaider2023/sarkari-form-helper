import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import { categories } from './config/categories.js'
import { presets } from './config/presets.js'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      ...categories.map((category) => ({
        path: category.path.replace(/^\//, ''),
        element: <CategoryPage />,
      })),
      ...presets.map((preset) => ({
        path: preset.path.replace(/^\//, ''),
        lazy: () => import('./pages/ToolPage.jsx'),
      })),
    ],
  },
]
