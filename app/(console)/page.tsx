import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up" as const,
    description: "from last month",
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+180.1%",
    trend: "up" as const,
    description: "from last month",
    icon: Users,
  },
  {
    title: "New Orders",
    value: "12,234",
    change: "+19%",
    trend: "up" as const,
    description: "from last month",
    icon: ShoppingCart,
  },
  {
    title: "Pending Tickets",
    value: "573",
    change: "-3.2%",
    trend: "down" as const,
    description: "since last hour",
    icon: Package,
  },
]

const recentActivity = [
  {
    id: "TXN-001",
    user: "Alice Johnson",
    action: "New order placed",
    amount: "$250.00",
    status: "pending",
    time: "2m ago",
  },
  {
    id: "TXN-002",
    user: "Bob Smith",
    action: "Payment received",
    amount: "$1,200.00",
    status: "completed",
    time: "15m ago",
  },
  {
    id: "TXN-003",
    user: "Carol White",
    action: "Refund requested",
    amount: "$89.00",
    status: "processing",
    time: "1h ago",
  },
  {
    id: "TXN-004",
    user: "David Lee",
    action: "Account upgraded",
    amount: "$499.00",
    status: "completed",
    time: "2h ago",
  },
  {
    id: "TXN-005",
    user: "Emma Davis",
    action: "Support ticket opened",
    amount: "—",
    status: "open",
    time: "3h ago",
  },
]

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  pending: "secondary",
  completed: "default",
  processing: "outline",
  open: "destructive",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back — here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="size-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="size-3 text-destructive" />
                )}
                <span className={stat.trend === "up" ? "text-emerald-500" : "text-destructive"}>
                  {stat.change}
                </span>
                <span className="text-muted-foreground">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest transactions and events across the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex items-center gap-4 px-6 py-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{item.id}</span>
                    <Badge variant={statusVariant[item.status]} className="text-[10px]">
                      {item.status}
                    </Badge>
                  </div>
                  <p className="truncate text-sm font-medium">{item.user}</p>
                  <p className="text-xs text-muted-foreground">{item.action}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-mono text-sm font-medium">{item.amount}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
