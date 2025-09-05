import type React from "react"
import { useState, useEffect } from "react"
import type { Category } from "./categories-table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Switch } from "./ui/switch"
import { Button } from "./ui/button"

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (category: Category) => void
  category?: Category | null
}

export function CategoryModal({ isOpen, onClose, onSave, category }: CategoryModalProps) {
  const [formData, setFormData] = useState<Partial<Category>>({
    name: "",
    description: "",
    isActive: true,
    productCount: 0,
  })

  useEffect(() => {
    if (category) {
      setFormData(category)
    } else {
      setFormData({
        name: "",
        description: "",
        isActive: true,
        productCount: 0,
      })
    }
  }, [category, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.name) {
      onSave({
        id: category?.id || "",
        name: formData.name,
        description: formData.description || "",
        isActive: formData.isActive ?? true,
        productCount: formData.productCount || 0,
        createdAt: category?.createdAt || new Date().toISOString().split("T")[0],
      })
    }
  }

  const handleInputChange = (field: keyof Category, value: string | boolean | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter category name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter category description"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange("isActive", checked)}
            />
            <Label htmlFor="active">Active category</Label>
          </div>

          {category && (
            <div className="space-y-2">
              <Label>Current Products</Label>
              <div className="text-sm text-muted-foreground">
                This category currently has {category.productCount} products assigned to it.
              </div>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{category ? "Update Category" : "Add Category"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
