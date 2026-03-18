import { cn } from "@/lib/utils"

function TableCard({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card shadow-[var(--shadow-2)] overflow-x-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { TableCard }
