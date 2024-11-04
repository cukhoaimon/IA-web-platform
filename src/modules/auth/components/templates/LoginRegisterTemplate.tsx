import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { Input, InputPassword } from "@/components/ui/input.tsx"
import { ButtonLoading } from "@/components/ui/button.tsx"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link } from "react-router-dom"
import { AppPath } from "@/shared/const"
import { ReactNode } from "react"

const layoutMapper: Record<Layout, { title: string; text: string; render: ReactNode }> = {
  login: {
    title: "Login",
    text: "Login",
    render: (
      <div>
        Does not have account? <Link to={AppPath.Register}>Register</Link>
      </div>
    )
  },
  register: {
    title: "Register new account",
    text: "Register",
    render: (
      <div>
        Already have an account? <Link to={AppPath.Login}>Login now</Link>
      </div>
    )
  }
}

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" })
})

export type LoginFormInputs = z.infer<typeof loginSchema>

type Layout = "login" | "register"
interface LoginRegisterTemplateProps {
  layout: Layout
  onSubmit: SubmitHandler<LoginFormInputs>
  isPending?: boolean
}

function LoginRegisterTemplate(props: LoginRegisterTemplateProps) {
  const { onSubmit, isPending, layout } = props
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema)
  })
  const currentLayout = layoutMapper[layout]

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-4xl uppercase font-semibold">{currentLayout.title}</div>

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
              {currentLayout.title}
            </ButtonLoading>

            {currentLayout.render}
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default LoginRegisterTemplate
