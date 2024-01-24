import { createBrowserRouter } from 'react-router-dom'

import { Campaign } from './pages/app/campaign'
import { Home } from './pages/app/home'
import { NewCampaign } from './pages/app/new-campaign'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { NotFound } from './pages/errors/404'
import { CampaignNotFound } from './pages/errors/campaign-not-found'
import { ErrorPage } from './pages/errors/error'
import { AppLayout } from './pages/layouts/app'
import { AuthLayout } from './pages/layouts/auth'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/new-campaign', element: <NewCampaign /> },
      {
        path: '/campaign/:slug',
        element: <Campaign />,
        errorElement: <CampaignNotFound />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
