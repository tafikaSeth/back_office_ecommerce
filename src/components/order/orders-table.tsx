import { useState } from "react"
import { Search, MoreHorizontal, Eye, Package, Truck, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Badge } from "../ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { OrderDetailModal } from "./order-detail-modal"

export type OrderStatus = "en cours" | "expédié" | "livré" | "annulé"

export interface OrderItem {
  id: string
  productName: string
  quantity: number
  price: number
  image: string
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  orderDate: string
  shippedDate?: string
  deliveredDate?: string
}

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Seth Tafika",
    customerEmail: "tafikaseth@gmail.com",
    customerPhone: "+1 (555) 123-4567",
    shippingAddress: "123 Main St, New York, NY 10001",
    items: [
      {
        id: "1",
        productName: "Canapé en tissu",
        quantity: 1,
        price: 799.99,
        image: "/canape-tissu.png",
      },
      {
        id: "2",
        productName: "Lampe de chevet",
        quantity: 2,
        price: 39.99,
        image: "/lampe-chevet.png",
      },
    ],
    totalAmount: 879.97,
    status: "livré",
    orderDate: "2024-03-15",
    shippedDate: "2024-03-16",
    deliveredDate: "2024-03-18",
  },
  {
    id: "ORD-002",
    customerName: "Seth Tafika",
    customerEmail: "tafikaseth@gmail.com",
    customerPhone: "+1 (555) 987-6543",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
    items: [
      {
        id: "3",
        productName: "Table à manger",
        quantity: 1,
        price: 499.99,
        image: "/table-bois.png",
      },
    ],
    totalAmount: 499.99,
    status: "expédié",
    orderDate: "2024-03-20",
    shippedDate: "2024-03-21",
  },
  {
    id: "ORD-003",
    customerName: "Seth Tafika",
    customerEmail: "tafikaseth@gmail.com",
    customerPhone: "+1 (555) 456-7890",
    shippingAddress: "789 Pine St, Chicago, IL 60601",
    items: [
      {
        id: "4",
        productName: "Chaise de salon",
        quantity: 1,
        price: 89.99,
        image: "/chaise-salon.png",
      },
      {
        id: "5",
        productName: "Buffet en chêne",
        quantity: 1,
        price: 649.99,
        image: "/buffet-chene.png",
      },
    ],
    totalAmount: 739.98,
    status: "en cours",
    orderDate: "2024-03-22",
  },
  {
    id: "ORD-004",
    customerName: "Seth Tafika",
    customerEmail: "tafikaseth@gmail.com",
    customerPhone: "+1 (555) 321-0987",
    shippingAddress: "321 Elm St, Miami, FL 33101",
    items: [
      {
        id: "1",
        productName: "Tapis moderne",
        quantity: 2,
        price: 199.99,
        image: "/tapis-moderne.png",
      },
    ],
    totalAmount: 399.98,
    status: "annulé",
    orderDate: "2024-03-18",
  },
];


export function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsDetailModalOpen(true)
  }

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, status: newStatus }

          // Update dates based on status
          if (newStatus === "expédié" && !order.shippedDate) {
            updatedOrder.shippedDate = new Date().toISOString().split("T")[0]
          }
          if (newStatus === "livré" && !order.deliveredDate) {
            updatedOrder.deliveredDate = new Date().toISOString().split("T")[0]
            if (!order.shippedDate) {
              updatedOrder.shippedDate = new Date().toISOString().split("T")[0]
            }
          }

          return updatedOrder
        }
        return order
      }),
    )
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "en cours":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "expédié":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "livré":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "annulé":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "en cours":
        return <Package className="h-3 w-3" />
      case "expédié":
        return <Truck className="h-3 w-3" />
      case "livré":
        return <CheckCircle className="h-3 w-3" />
      case "annulé":
        return <XCircle className="h-3 w-3" />
      default:
        return <Package className="h-3 w-3" />
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Commandes</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Recherche de commande..."
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les status</SelectItem>
                <SelectItem value="en cours">En cours</SelectItem>
                <SelectItem value="expédié">Shipped</SelectItem>
                <SelectItem value="livré">Delivered</SelectItem>
                <SelectItem value="annulé">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date commande</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <p className="font-medium text-foreground">{order.id}</p>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{order.customerName}</p>
                      <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground">
                      {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground">${order.totalAmount.toFixed(2)}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground">{new Date(order.orderDate).toLocaleDateString()}</p>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir détail
                        </DropdownMenuItem>
                        {order.status === "en cours" && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "expédié")}>
                            <Truck className="mr-2 h-4 w-4" />
                            Marquer comme expédié
                          </DropdownMenuItem>
                        )}
                        {order.status === "expédié" && (
                          <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "livré")}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Marquer comme livré
                          </DropdownMenuItem>
                        )}
                        {(order.status === "en cours" || order.status === "expédié") && (
                          <DropdownMenuItem
                            onClick={() => handleUpdateStatus(order.id, "annulé")}
                            className="text-destructive"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Annulé
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <OrderDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedOrder(null)
        }}
        order={selectedOrder}
        onUpdateStatus={handleUpdateStatus}
      />
    </>
  )
}
