import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import "../../index.css";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-neverLime text-primary-foreground hover:bg-primary/90 font-sans",
        destructive:
          "border-[3px] border-neverBlack bg-destructive text-destructive-foreground hover:bg-black hover:text-destructive",
        outline:
          "border-[3px] border-neverBlack bg-neverLime hover:bg-black hover:text-neverLime font-sans",
        secondary:
          "bg-neverLime text-secondary-foreground hover:bg-secondary/80 hover:bg-black hover:text-neverLime",
        ghost:
          "bg-primary border border-neverBlack rounded-r-lg rounded-s-lg text-primary-foreground hover:bg-neverSearchHover font-sans hover:text-white",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-3 py-1.5 font-sans",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        super: "h-11 rounded-lg py-8 px-12",
        supernopadding: "h-11 rounded-lg p-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
