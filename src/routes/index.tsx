import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom"
import LoginPage from "@/modules/auth/components/pages/LoginPage.tsx"
import AuthenticationLayout from "@/modules/auth/providers/AuthenticationLayout.tsx"
import { AppPath } from "@/shared/const"
import HomePage from "@/modules/home/components/pages/HomePage.tsx"
import ProfilePage from "@/modules/auth/components/pages/ProfilePage.tsx"
import RegisterPage from "@/modules/auth/components/pages/RegisterPage.tsx"

const protectedRoutes = (
  <Route element={<AuthenticationLayout />}>
    <Route index path={AppPath.Home} element={<HomePage />} />
    <Route index path={AppPath.Profile} element={<ProfilePage />} />
  </Route>
)

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<div>Error 404</div>}>
      <Route index path={AppPath.Login} element={<LoginPage />} />
      <Route path={AppPath.Register} element={<RegisterPage />} />
      {protectedRoutes}
    </Route>
  )
)
