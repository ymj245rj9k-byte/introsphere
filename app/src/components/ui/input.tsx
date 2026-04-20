import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-lg border bg-transparent px-4 py-3 text-base transition-all duration-200 ease-out file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-atm-muted focus:outline-none focus:ring-2 focus:ring-atm-accent focus:ring-offset-2 focus:ring-offset-atm-bg disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-atm-border bg-atm focus:bg-atm-bg-secondary",
        ghost: "border-none shadow-none focus:ring-0",
      },
      size: {
        default: "h-auto px-4 py-3",
        sm: "h-9 px-3 text-sm",
        lg: "h-12 px-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  containerClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, size, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("relative", containerClassName)}>
        <input
          type={type}
          className={cn(inputVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
