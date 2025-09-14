import type React from "react"
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface StatCardProps {
  readonly title: string
  readonly value: string
  readonly change: string
  readonly changeType: "increase" | "decrease"
  readonly icon: React.ReactNode
}

interface DashboardStatistic {
  readonly title: string
  readonly value: string
  readonly change: string
  readonly changeType: "increase" | "decrease"
  readonly icon: React.ComponentType<{ className?: string }>
}

function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
  const isIncrease = changeType === "increase"
  const TrendIcon = isIncrease ? TrendingUp : TrendingDown
  const trendColor = isIncrease ? "text-green-500" : "text-red-500"

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="text-muted-foreground" aria-hidden="true">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {TrendIcon && <TrendIcon className={`mr-1 h-3 w-3 ${trendColor}`} aria-hidden="true" />}
          <span className={trendColor}>{change}</span>
          <span className="ml-1">depuis le mois dernier</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  const statistics: readonly DashboardStatistic[] = [
    {
      title: "Chiffre d'affaires total",
      value: "$45,231.89",
      change: "+20.1%",
      changeType: "increase",
      icon: DollarSign,
    },
    {
      title: "Commandes",
      value: "2,350",
      change: "+15.3%",
      changeType: "increase",
      icon: ShoppingCart,
    },
    {
      title: "Clients",
      value: "1,234",
      change: "+8.2%",
      changeType: "increase",
      icon: Users,
    },
    {
      title: "Produits",
      value: "567",
      change: "-2.1%",
      changeType: "decrease",
      icon: Package,
    },
  ] as const

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" role="region" aria-label="Dashboard statistics">
      {statistics.map((stat: DashboardStatistic) => {
        const IconComponent = stat.icon
        return (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            changeType={stat.changeType}
            icon={<IconComponent className="h-4 w-4" />}
          />
        )
      })}
    </div>
  )
}
