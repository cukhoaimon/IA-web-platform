import { z } from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { ButtonLoading } from "@/components/ui/button.tsx"
import { Input, InputPassword } from "@/components/ui/input.tsx"
import { useMutation } from "@tanstack/react-query"
import { axiosClient } from "@/App.tsx"
import { AxiosError, AxiosResponse } from "axios"
import { ErrorResponse } from "@/shared/types"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" })
})

type LoginFormInputs = z.infer<typeof loginSchema>

function LoginPage() {
  const { mutate, isPending, error, isError } = useMutation<
    AxiosResponse<LoginFormInputs>,
    AxiosError<ErrorResponse>,
    LoginFormInputs
  >({
    mutationFn: ({ email, password }) =>
      axiosClient.post(
        "/api/user/register",
        {
          email,
          password
        },
        {
          headers: {
            Accept: "application/json"
          }
        }
      )
  })

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = (formValues: LoginFormInputs) => {
    mutate(formValues)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-4xl uppercase font-semibold">Register new account</div>

      {isError ? <div className="text-red-700">{error?.message}</div> : null}

      <div className="w-[20rem]">
        <FormProvider {...form}>
          <form className="space-y-4 w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl className="hover:shadow-md focus:drop-shadow-lg hover:border focus:border">
                    <Input
                      className="text-base"
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl className="hover:shadow-md focus:drop-shadow-lg hover:border focus:border">
                    <InputPassword
                      autoComplete="current-password"
                      className="text-base"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ButtonLoading isLoading={isPending} className="ml-auto w-full text-base" type="submit">
              Register
            </ButtonLoading>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default LoginPage
