import { useState } from "react"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Play, Pause, Percent, Tag, ImageIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { PromotionModal } from "./promotion-modal"

export type PromotionType = "banner" | "discount_code" | "sale"
export type PromotionStatus = "active" | "inactive" | "scheduled" | "expired"

export interface Promotion {
  id: string
  title: string
  description: string
  type: PromotionType
  discountType: "percentage" | "fixed"
  discountValue: number
  code?: string
  startDate: string
  endDate: string
  status: PromotionStatus
  usageCount: number
  usageLimit?: number
  minOrderAmount?: number
  image?: string
  createdDate: string
}

const mockPromotions: Promotion[] = [
  {
    id: "PROMO-001",
    title: "Summer Sale 2024",
    description: "Get 25% off on all electronics during our summer sale",
    type: "banner",
    discountType: "percentage",
    discountValue: 25,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    status: "active",
    usageCount: 156,
    minOrderAmount: 50,
    image: "/summer-sale-banner.png",
    createdDate: "2024-05-15",
  },
  {
    id: "PROMO-002",
    title: "WELCOME10",
    description: "Welcome discount for new customers",
    type: "discount_code",
    discountType: "percentage",
    discountValue: 10,
    code: "WELCOME10",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    usageCount: 89,
    usageLimit: 1000,
    minOrderAmount: 25,
    createdDate: "2024-01-01",
  },
  {
    id: "PROMO-003",
    title: "Flash Sale - Headphones",
    description: "$50 off premium headphones for 24 hours only",
    type: "sale",
    discountType: "fixed",
    discountValue: 50,
    startDate: "2024-03-25",
    endDate: "2024-03-26",
    status: "expired",
    usageCount: 23,
    usageLimit: 100,
    createdDate: "2024-03-24",
  },
  {
    id: "PROMO-004",
    title: "SPRING2024",
    description: "Spring collection discount code",
    type: "discount_code",
    discountType: "percentage",
    discountValue: 15,
    code: "SPRING2024",
    startDate: "2024-04-01",
    endDate: "2024-05-31",
    status: "inactive",
    usageCount: 0,
    usageLimit: 500,
    minOrderAmount: 75,
    createdDate: "2024-03-28",
  },
  {
    id: "PROMO-005",
    title: "Black Friday Mega Sale",
    description: "Biggest sale of the year - up to 60% off everything",
    type: "banner",
    discountType: "percentage",
    discountValue: 60,
    startDate: "2024-11-29",
    endDate: "2024-12-02",
    status: "scheduled",
    usageCount: 0,
    image: "/black-friday-banner.png",
    createdDate: "2024-03-20",
  },
]

export function PromotionsTable() {
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null)

  const filteredPromotions = promotions.filter((promotion) => {
    const matchesSearch =
      promotion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (promotion.code && promotion.code.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = typeFilter === "all" || promotion.type === typeFilter
    const matchesStatus = statusFilter === "all" || promotion.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const handleAddPromotion = () => {
    setEditingPromotion(null)
    setIsModalOpen(true)
  }

  const handleEditPromotion = (promotion: Promotion) => {
    setEditingPromotion(promotion)
    setIsModalOpen(true)
  }

  const handleDeletePromotion = (promotionId: string) => {
    setPromotions(promotions.filter((p) => p.id !== promotionId))
  }

  const handleSavePromotion = (promotion: Promotion) => {
    if (editingPromotion) {
      setPromotions(promotions.map((p) => (p.id === promotion.id ? promotion : p)))
    } else {
      const newPromotion = {
        ...promotion,
        id: `PROMO-${Date.now().toString().slice(-3)}`,
        createdDate: new Date().toISOString().split("T")[0],
        usageCount: 0,
      }
      setPromotions([...promotions, newPromotion])
    }
    setIsModalOpen(false)
    setEditingPromotion(null)
  }

  const handleToggleStatus = (promotionId: string) => {
    setPromotions(
      promotions.map((p) =>
        p.id === promotionId ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p,
      ),
    )
  }

  const getStatusColor = (status: PromotionStatus) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getTypeIcon = (type: PromotionType) => {
    switch (type) {
      case "banner":
        return <ImageIcon className="h-4 w-4" />
      case "discount_code":
        return <Tag className="h-4 w-4" />
      case "sale":
        return <Percent className="h-4 w-4" />
      default:
        return <Tag className="h-4 w-4" />
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Promotions</CardTitle>
            <Button onClick={handleAddPromotion} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Promotion
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search promotions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="banner">Banner</SelectItem>
                <SelectItem value="discount_code">Discount Code</SelectItem>
                <SelectItem value="sale">Sale</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Promotion</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{promotion.title}</p>
                        {promotion.code && (
                          <Badge variant="outline" className="text-xs">
                            {promotion.code}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{promotion.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(promotion.type)}
                      <span className="capitalize">{promotion.type.replace("_", " ")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {promotion.discountType === "percentage"
                          ? `${promotion.discountValue}%`
                          : `$${promotion.discountValue}`}
                      </p>
                      {promotion.minOrderAmount && (
                        <p className="text-xs text-muted-foreground">Min: ${promotion.minOrderAmount}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{new Date(promotion.startDate).toLocaleDateString()}</p>
                      <p className="text-muted-foreground">to {new Date(promotion.endDate).toLocaleDateString()}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{promotion.usageCount}</p>
                      {promotion.usageLimit && <p className="text-muted-foreground">of {promotion.usageLimit}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(promotion.status)}>
                      {promotion.status.charAt(0).toUpperCase() + promotion.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditPromotion(promotion)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(promotion.id)}>
                          {promotion.status === "active" ? (
                            <>
                              <Pause className="mr-2 h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeletePromotion(promotion.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
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

      <PromotionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingPromotion(null)
        }}
        onSave={handleSavePromotion}
        promotion={editingPromotion}
      />
    </>
  )
}
