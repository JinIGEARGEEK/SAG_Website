import { cn } from "@/lib/utils"

const statusStyles = {
  active: "bg-success text-white",
  inactive: "bg-gray text-white",
  pending: "bg-warning !text-foreground",
  approved: "bg-success text-white",
  rejected: "bg-error text-white",
} as const

type StatusVariant = keyof typeof statusStyles

function StatusBadge({
  status,
  children,
  className,
}: {
  status: StatusVariant
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[27px] px-3.5 py-1 text-xs font-medium",
        statusStyles[status],
        className
      )}
    >
      {children}
    </span>
  )
}

export { StatusBadge, type StatusVariant }
