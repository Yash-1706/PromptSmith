import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:scale-105 active:scale-95",
        destructive:
          "bg-destructive text-destructive-foreground shadow-lg hover:shadow-xl hover:shadow-destructive/25 hover:scale-105 active:scale-95",
        outline:
          "border-2 border-border bg-background/50 backdrop-blur-sm shadow-sm hover:bg-accent/20 hover:border-accent hover:shadow-lg hover:scale-105 active:scale-95",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground shadow-lg hover:shadow-xl hover:shadow-secondary/25 hover:scale-105 active:scale-95",
        ghost:
          "hover:bg-accent/20 hover:scale-105 active:scale-95 backdrop-blur-sm",
        link: "text-primary underline-offset-4 hover:underline hover:scale-105",
        glass:
          "bg-card/60 backdrop-blur-xl border border-border/50 text-card-foreground shadow-lg hover:bg-card/80 hover:shadow-xl hover:scale-105 active:scale-95",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
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
