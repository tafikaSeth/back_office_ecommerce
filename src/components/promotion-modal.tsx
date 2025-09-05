import type React from "react"
import { useState, useEffect } from "react"
import type { Promotion, PromotionType } from "./promotions-table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Switch } from "./ui/switch"

interface PromotionModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (promotion: Promotion) => void
  promotion?: Promotion | null
}

export function PromotionModal({ isOpen, onClose, onSave, promotion }: PromotionModalProps) {
  const [formData, setFormData] = useState<Partial<Promotion>>({
    title: "",
    description: "",
    type: "discount_code",
    discountType: "percentage",
    discountValue: 0,
    code: "",
    startDate: "",
    endDate: "",
    status: "inactive",
    usageLimit: undefined,
    minOrderAmount: undefined,
    image: "",
  })

  useEffect(() => {
    if (promotion) {
      setFormData(promotion)
    } else {
      setFormData({
        title: "",
        description: "",
        type: "discount_code",
        discountType: "percentage",
        discountValue: 0,
        code: "",
        startDate: "",
        endDate: "",
        status: "inactive",
        usageLimit: undefined,
        minOrderAmount: undefined,
        image: "",
      })
    }
  }, [promotion, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.type && formData.discountValue && formData.startDate && formData.endDate) {
      onSave({
        id: promotion?.id || "",
        title: formData.title,
        description: formData.description || "",
        type: formData.type as PromotionType,
        discountType: formData.discountType as "percentage" | "fixed",
        discountValue: Number(formData.discountValue),
        code: formData.type === "discount_code" ? formData.code : undefined,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status as "active" | "inactive" | "scheduled" | "expired",
        usageCount: promotion?.usageCount || 0,
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : undefined,
        minOrderAmount: formData.minOrderAmount ? Number(formData.minOrderAmount) : undefined,
        image:
          formData.type === "banner"
            ? formData.image || `/placeholder.svg?height=200&width=400&query=${encodeURIComponent(formData.title)}`
            : undefined,
        createdDate: promotion?.createdDate || new Date().toISOString().split("T")[0],
      })
    }
  }

  const handleInputChange = (field: keyof Promotion, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{promotion ? "Edit Promotion" : "Add New Promotion"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Promotion Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter promotion title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Promotion Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="banner">Banner</SelectItem>
                  <SelectItem value="discount_code">Discount Code</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter promotion description"
              rows={3}
            />
          </div>

          {formData.type === "discount_code" && (
            <div className="space-y-2">
              <Label htmlFor="code">Discount Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => handleInputChange("code", e.target.value.toUpperCase())}
                placeholder="Enter discount code (e.g., SAVE20)"
              />
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discountType">Discount Type</Label>
              <Select value={formData.discountType} onValueChange={(value) => handleInputChange("discountType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage (%)</SelectItem>
                  <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountValue">
                Discount Value {formData.discountType === "percentage" ? "(%)" : "($)"}
              </Label>
              <Input
                id="discountValue"
                type="number"
                step={formData.discountType === "percentage" ? "1" : "0.01"}
                min="0"
                max={formData.discountType === "percentage" ? "100" : undefined}
                value={formData.discountValue}
                onChange={(e) => handleInputChange("discountValue", Number.parseFloat(e.target.value) || 0)}
                placeholder="0"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minOrderAmount">Min Order Amount ($)</Label>
              <Input
                id="minOrderAmount"
                type="number"
                step="0.01"
                min="0"
                value={formData.minOrderAmount || ""}
                onChange={(e) =>
                  handleInputChange("minOrderAmount", e.target.value ? Number.parseFloat(e.target.value) : "undefined")
                }
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="usageLimit">Usage Limit</Label>
            <Input
              id="usageLimit"
              type="number"
              min="1"
              value={formData.usageLimit || ""}
              onChange={(e) =>
                handleInputChange("usageLimit", e.target.value ? Number.parseInt(e.target.value) : "undefined")
              }
              placeholder="Unlimited (leave empty)"
            />
          </div>

          {formData.type === "banner" && (
            <div className="space-y-2">
              <Label htmlFor="image">Banner Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="Enter banner image URL (optional)"
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.status === "active"}
              onCheckedChange={(checked) => handleInputChange("status", checked ? "active" : "inactive")}
            />
            <Label htmlFor="active">Activate promotion immediately</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{promotion ? "Update Promotion" : "Create Promotion"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
