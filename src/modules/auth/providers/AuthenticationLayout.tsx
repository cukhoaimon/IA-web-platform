import { Outlet, useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useMount } from "react-use"
import { tokenManager } from "@/shared/hooks/tokenManager.ts"
import { AppPath } from "@/shared/const"

function AuthenticationLayout() {
  const [checkLoggedIn, setCheckLoggedIn] = useState(true)
  const navigate = useNavigate()

  // check if user is logged in, navigate to homepage
  useMount(() => {
    tokenManager
      .checkAuth()
      .then(() => {
        navigate(AppPath.Home, {
          replace: true
        })
      })
      .catch(() => {
        navigate(AppPath.Login, {
          replace: true
        })
      })
      .finally(() => {
        setCheckLoggedIn(false)
      })
  })

  if (checkLoggedIn) return <Loader2 className="animate-spin" />

  return <Outlet />
}

export default AuthenticationLayout
