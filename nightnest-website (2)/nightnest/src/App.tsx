import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { FaqPage } from './pages/FaqPage'
import { GuidePage } from './pages/GuidePage'
import { GuidesPage } from './pages/GuidesPage'
import { HomePage } from './pages/HomePage'
import { InsightsPage } from './pages/InsightsPage'
import { KitPage } from './pages/KitPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PlannerPage } from './pages/PlannerPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { RegisterInterestPage } from './pages/RegisterInterestPage'
import { RoutineSheetPage } from './pages/RoutineSheetPage'
import { StudentDiscountPage } from './pages/StudentDiscountPage'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/kit', element: <KitPage /> },
      { path: '/planner', element: <PlannerPage /> },
      { path: '/routine-sheet', element: <RoutineSheetPage /> },
      { path: '/student-discount', element: <StudentDiscountPage /> },
      { path: '/register-interest', element: <RegisterInterestPage /> },
      { path: '/guides', element: <GuidesPage /> },
      { path: '/guides/:slug', element: <GuidePage /> },
      { path: '/faq', element: <FaqPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/privacy', element: <PrivacyPage /> },
      { path: '/insights', element: <InsightsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
