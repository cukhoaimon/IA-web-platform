import "./App.css"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom"
import LoginPage from "@/modules/auth/LoginPage.tsx"
import axios from "axios"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<div>Error 404</div>}>
      <Route index path="/" element={<LoginPage />} />
    </Route>
  )
)

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      retry: false,
      staleTime: 1000 * 60 * 2
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  )
}

export default App
