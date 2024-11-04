import { useMutation } from "@tanstack/react-query"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "@/shared/types"
import { postRequest } from "@/shared/utils/axios.utils.ts"
import { ApiPath } from "@/shared/const"
import { LoginFormInputs } from "@/modules/auth/components/templates/LoginRegisterTemplate.tsx"

export const useRegister = () => {
  const { mutate, isPending, error, isError, isSuccess } = useMutation<
    AxiosResponse<LoginFormInputs>,
    AxiosError<ErrorResponse>,
    LoginFormInputs
  >({
    mutationFn: ({ email, password }) =>
      postRequest({
        path: ApiPath.Register,
        data: {
          username: email,
          password: password
        }
      })
  })

  return { isPending, error, isError, isSuccess, mutate }
}
