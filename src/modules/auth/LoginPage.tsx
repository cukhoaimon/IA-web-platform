import { z } from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Input, InputPassword } from "@/components/ui/input.tsx"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" })
})

type LoginFormInputs = z.infer<typeof loginSchema>

function LoginPage() {
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = (formValues: LoginFormInputs) => {
    console.log("submitted", formValues)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="text-4xl uppercase font-semibold">Register new account</div>

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

            <Button className="ml-auto w-full text-base" type="submit">
              Register
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default LoginPage
