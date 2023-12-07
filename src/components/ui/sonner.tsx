import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {

  return (
    <Sonner
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group font-psemibold toast group-[.toaster]:bg-background group-[.toaster]:text-foreground  group-[.toaster]:border-2 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground font-pregular",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-pregular",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-pregular",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
