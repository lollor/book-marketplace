import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import React from "react"

const headingVariants = cva(
   "",
   {
      variants: {
         variant: {
            h1: "lg:text-4xl text-3xl font-bold",
            h2: "lg:text-2xl text-2xl font-semibold",
            h3: "lg:text-xl text-xl font-medium",
            h4: "text-xl",
            h5: "text-lg font-medium",
            h6: "text-base",
         },
         align: {
            left: "text-left",
            center: "text-center",
            right: "text-right",
         },
      },
      defaultVariants: {
         variant: "h1",
         align: "center",
      },
   }
)

export interface HeadingProps
   extends React.HTMLAttributes<HTMLHeadingElement>,
   VariantProps<typeof headingVariants> {
      description?: string
   }

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
   ({ className, variant, align, description, ...props }, ref) => {
      const Comp = variant ? variant : "h1"
      return (
         <>
         <Comp
            className={cn(headingVariants({ variant, align, className }))}
            ref={ref}
            {...props}
         />
         {
            description && <p className="text-gray-500 text-sm">{description}</p>
         }
         </>
      )
   }
)

Heading.displayName = "Heading"

export { Heading, headingVariants }