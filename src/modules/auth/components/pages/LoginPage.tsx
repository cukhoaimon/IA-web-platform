import { useLogin } from "@/modules/auth/hooks/useLogin.ts"
import { useNavigate } from "react-router-dom"
import { AppPath } from "@/shared/const"
import LoginRegisterTemplate, {
  LoginFormInputs
} from "@/modules/auth/components/templates/LoginRegisterTemplate.tsx"
import { tokenManager } from "@/shared/hooks/tokenManager.ts"
import { toast } from "@/hooks/use-toast.ts"

function LoginPage() {
  const navigate = useNavigate()
  const { mutate: login, isPending } = useLogin()

  const onSubmit = (formValues: LoginFormInputs) => {
    login(formValues, {
      onSuccess: (response) => {
        tokenManager.setNewToken(response.data.accessToken, response.data.refreshToken)
        navigate(AppPath.Home)
        toast({
          title: "Login success, 🚀 going to home page"
        })
      },
      onError: (error) => {
        toast({
          title: error.name,
          description: error.message,
          variant: "destructive"
        })
      }
    })
  }

  return <LoginRegisterTemplate layout="login" onSubmit={onSubmit} isPending={isPending} />
}

export default LoginPage
