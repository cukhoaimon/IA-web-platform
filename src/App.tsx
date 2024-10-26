import "./App.css"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import LoginPage from "@/modules/auth/LoginPage.tsx"

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<div>Error 404</div>}>
      <Route index path="/" element={<LoginPage />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={routes} />
}

export default App
