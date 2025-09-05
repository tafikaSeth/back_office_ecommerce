import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface Order {
  readonly id: string
  readonly customer: {
    readonly name: string
    readonly email: string
    readonly avatar?: string
  }
  readonly amount: string
  readonly status: "pending" | "shipped" | "delivered" | "cancelled"
  readonly date: string
}

const recentOrders: readonly Order[] = [
  {
    id: "#12345",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/customer-avatar.png",
    },
    amount: "$299.99",
    status: "delivered",
    date: "2 hours ago",
  },
  {
    id: "#12346",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
    },
    amount: "$149.50",
    status: "shipped",
    date: "4 hours ago",
  },
  {
    id: "#12347",
    customer: {
      name: "Bob Johnson",
      email: "bob@example.com",
    },
    amount: "$89.99",
    status: "pending",
    date: "6 hours ago",
  },
  {
    id: "#12348",
    customer: {
      name: "Alice Brown",
      email: "alice@example.com",
    },
    amount: "$199.99",
    status: "delivered",
    date: "8 hours ago",
  },
  {
    id: "#12349",
    customer: {
      name: "Charlie Wilson",
      email: "charlie@example.com",
    },
    amount: "$79.99",
    status: "cancelled",
    date: "1 day ago",
  },
] as const

function getStatusColor(status: Order["status"]): string {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "shipped":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Commandes récentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order: Order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={order.customer.avatar || "/placeholder.svg"} alt={order.customer.name} />
                  <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{order.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{order.id}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className={getStatusColor(order.status)} variant="secondary">
                  {order.status}
                </Badge>
                <div className="text-right">
                  <p className="font-medium text-foreground">{order.amount}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
