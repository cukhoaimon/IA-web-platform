import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  const [isShowPassword, setIsShowPassword] = React.useState(false)

  const inputType = React.useMemo(() => (isShowPassword ? "text" : "password"), [isShowPassword])

  return (
    <div className="relative">
      <Input ref={ref} type={inputType} {...props} />
      <Button
        className="absolute inset-y-0 right-0 rounded-md border border-input px-2 border-l rounded-l-none"
        tabIndex={-1}
        type="button"
        variant="ghost"
        onClick={() => setIsShowPassword((preState) => !preState)}
      >
        {isShowPassword ? (
          <EyeOff className="text-muted-foreground" size={20} />
        ) : (
          <Eye className="text-muted-foreground" size={20} />
        )}
      </Button>
    </div>
  )
})

Input.displayName = "InputPassword"

export { Input, InputPassword }
