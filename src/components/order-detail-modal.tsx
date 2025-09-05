import { Package, Truck, CheckCircle, XCircle, User, MapPin, Phone, Mail } from "lucide-react"
import type { Order, OrderStatus } from "./orders-table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"

interface OrderDetailModalProps {
  isOpen: boolean
  onClose: () => void
  order: Order | null
  onUpdateStatus: (orderId: string, status: OrderStatus) => void
}

export function OrderDetailModal({ isOpen, onClose, order, onUpdateStatus }: OrderDetailModalProps) {
  if (!order) return null

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Package className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "delivered":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order Details - {order.id}</span>
            <Badge variant="secondary" className={`gap-2 ${getStatusColor(order.status)}`}>
              {getStatusIcon(order.status)}
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{order.customerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{order.customerEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{order.customerPhone}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">{order.shippingAddress}</span>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={item.image || "/placeholder.svg"} alt={item.productName} />
                          <AvatarFallback>{item.productName.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.price.toFixed(2)} each</p>
                        <p className="text-sm text-muted-foreground">
                          Total: ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    {index < order.items.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Order Date:</span>
                <span>{new Date(order.orderDate).toLocaleDateString()}</span>
              </div>
              {order.shippedDate && (
                <div className="flex justify-between">
                  <span>Shipped Date:</span>
                  <span>{new Date(order.shippedDate).toLocaleDateString()}</span>
                </div>
              )}
              {order.deliveredDate && (
                <div className="flex justify-between">
                  <span>Delivered Date:</span>
                  <span>{new Date(order.deliveredDate).toLocaleDateString()}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-medium text-lg">
                <span>Total Amount:</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end">
            {order.status === "pending" && (
              <Button onClick={() => onUpdateStatus(order.id, "shipped")} className="gap-2">
                <Truck className="h-4 w-4" />
                Mark as Shipped
              </Button>
            )}
            {order.status === "shipped" && (
              <Button onClick={() => onUpdateStatus(order.id, "delivered")} className="gap-2">
                <CheckCircle className="h-4 w-4" />
                Mark as Delivered
              </Button>
            )}
            {(order.status === "pending" || order.status === "shipped") && (
              <Button variant="destructive" onClick={() => onUpdateStatus(order.id, "cancelled")} className="gap-2">
                <XCircle className="h-4 w-4" />
                Cancel Order
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
