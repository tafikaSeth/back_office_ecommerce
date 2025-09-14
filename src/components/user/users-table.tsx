import { useState } from "react"
import { Search, MoreHorizontal, Eye, UserCheck, UserX, ShoppingBag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { UserDetailModal } from "./user-detail-modal"

export type UserStatus = "active" | "bloqué"

export interface UserOrder {
  id: string
  orderDate: string
  totalAmount: number
  status: string
  itemCount: number
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  address: string
  registrationDate: string
  lastLoginDate: string
  status: UserStatus
  totalOrders: number
  totalSpent: number
  orders: UserOrder[]
  avatar?: string
}

const mockUsers: User[] = [
  {
    id: "USR-001",
    name: "Seth",
    email: "tafikaseth@gmail.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    registrationDate: "2024-01-15",
    lastLoginDate: "2024-03-22",
    status: "active",
    totalOrders: 5,
    totalSpent: 1299.95,
    orders: [
      { id: "ORD-001", orderDate: "2024-03-15", totalAmount: 239.97, status: "livré", itemCount: 2 },
      { id: "ORD-015", orderDate: "2024-02-28", totalAmount: 199.99, status: "livré", itemCount: 1 },
      { id: "ORD-025", orderDate: "2024-02-10", totalAmount: 89.99, status: "livré", itemCount: 1 },
    ],
    avatar: "/customer-avatar.png",
  },
  {
    id: "USR-002",
    name: "Cynthia Ceth",
    email: "ceth@gmail.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    registrationDate: "2024-02-01",
    lastLoginDate: "2024-03-21",
    status: "active",
    totalOrders: 3,
    totalSpent: 849.97,
    orders: [
      { id: "ORD-002", orderDate: "2024-03-20", totalAmount: 299.99, status: "expédié", itemCount: 1 },
      { id: "ORD-018", orderDate: "2024-03-05", totalAmount: 149.99, status: "expédié", itemCount: 2 },
    ],
    avatar: "/customer-avatar.png",
  },
  {
    id: "USR-003",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine St, Chicago, IL 60601",
    registrationDate: "2024-02-15",
    lastLoginDate: "2024-03-22",
    status: "active",
    totalOrders: 2,
    totalSpent: 289.95,
    orders: [
      { id: "ORD-003", orderDate: "2024-03-22", totalAmount: 139.96, status: "en cours", itemCount: 4 },
      { id: "ORD-020", orderDate: "2024-03-01", totalAmount: 149.99, status: "livré", itemCount: 1 },
    ],
    avatar: "/customer-avatar.png",
  },
  {
    id: "USR-004",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+1 (555) 321-0987",
    address: "321 Elm St, Miami, FL 33101",
    registrationDate: "2024-01-20",
    lastLoginDate: "2024-03-18",
    status: "bloqué",
    totalOrders: 4,
    totalSpent: 699.96,
    orders: [
      { id: "ORD-004", orderDate: "2024-03-18", totalAmount: 399.98, status: "annulé", itemCount: 2 },
      { id: "ORD-012", orderDate: "2024-02-20", totalAmount: 99.99, status: "livré", itemCount: 1 },
    ],
    avatar: "/customer-avatar.png",
  },
  {
    id: "USR-005",
    name: "Tom Brown",
    email: "tom@example.com",
    phone: "+1 (555) 654-3210",
    address: "654 Maple Dr, Seattle, WA 98101",
    registrationDate: "2024-03-01",
    lastLoginDate: "2024-03-20",
    status: "active",
    totalOrders: 1,
    totalSpent: 49.99,
    orders: [{ id: "ORD-030", orderDate: "2024-03-10", totalAmount: 49.99, status: "livré", itemCount: 1 }],
    avatar: "/customer-avatar.png",
  },
]

export function UsersTable() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setIsDetailModalOpen(true)
  }

  const handleToggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "bloqué" : "active" } : user,
      ),
    )
  }

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "bloqué":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Client</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Recherche client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="bloqué">Bloqué</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Registration</TableHead>
                <TableHead>Commande</TableHead>
                <TableHead>Dépense total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm text-foreground">{user.email}</p>
                      <p className="text-sm text-muted-foreground">{user.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm text-foreground">{new Date(user.registrationDate).toLocaleDateString()}</p>
                      <p className="text-sm text-muted-foreground">
                        Dernière connexion: {new Date(user.lastLoginDate).toLocaleDateString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{user.totalOrders}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground">${user.totalSpent.toFixed(2)}</p>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleUserStatus(user.id)}
                      className="h-auto p-0"
                    >
                      <Badge variant="secondary" className={getStatusColor(user.status)}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewUser(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir détail
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleUserStatus(user.id)}>
                          {user.status === "active" ? (
                            <>
                              <UserX className="mr-2 h-4 w-4" />
                              Bloqué l'utilisateur
                            </>
                          ) : (
                            <>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Débloquer l'utilisateur
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <UserDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
        onToggleStatus={handleToggleUserStatus}
      />
    </>
  )
}
