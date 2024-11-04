import { useNavigate } from "react-router-dom"
import { AppPath } from "@/shared/const"
import LoginRegisterTemplate, {
  LoginFormInputs
} from "@/modules/auth/components/templates/LoginRegisterTemplate.tsx"
import { useRegister } from "@/modules/auth/hooks/useRegister.ts"
import { toast } from "@/hooks/use-toast.ts"

const RegisterPage = () => {
  const navigate = useNavigate()
  const { mutate: register, isPending } = useRegister()

  const onSubmit = (formValues: LoginFormInputs) => {
    register(formValues, {
      onSuccess: () => {
        navigate(AppPath.Login)
        toast({
          title: "Register success, 🚀 going to login now"
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

  return <LoginRegisterTemplate layout="register" onSubmit={onSubmit} isPending={isPending} />
}

export default RegisterPage
