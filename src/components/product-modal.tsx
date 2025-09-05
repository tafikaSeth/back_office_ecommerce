import type React from "react"
import { useState, useEffect } from "react"
import type { Product } from "./products-table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import { Switch } from "./ui/switch"
import { Button } from "./ui/button"

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Product) => void
  product?: Product | null
}

const categories = [
  "Electronics",
  "Accessories",
  "Clothing",
  "Home & Garden",
  "Sports & Outdoors",
  "Books",
  "Toys & Games",
]

export function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    title: "",
    description: "",
    price: 0,
    rating: 0,
    image: "",
    category: "",
    stock: 0,
    isFavorite: false,
  })

  useEffect(() => {
    if (product) {
      setFormData(product)
    } else {
      setFormData({
        title: "",
        description: "",
        price: 0,
        rating: 0,
        image: "",
        category: "",
        stock: 0,
        isFavorite: false,
      })
    }
  }, [product, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.category && formData.price) {
      onSave({
        id: product?.id || "",
        title: formData.title,
        description: formData.description || "",
        price: Number(formData.price),
        rating: Number(formData.rating) || 0,
        image: formData.image || `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(formData.title)}`,
        category: formData.category,
        stock: Number(formData.stock) || 0,
        isFavorite: formData.isFavorite || false,
      })
    }
  }

  const handleInputChange = (field: keyof Product, value: string | number | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Product Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter product title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
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
              placeholder="Enter product description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange("price", Number.parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => handleInputChange("stock", Number.parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => handleInputChange("rating", Number.parseFloat(e.target.value) || 0)}
                placeholder="0.0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              placeholder="Enter image URL (optional)"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="favorite"
              checked={formData.isFavorite}
              onCheckedChange={(checked) => handleInputChange("isFavorite", checked)}
            />
            <Label htmlFor="favorite">Mark as favorite product</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{product ? "Update Product" : "Add Product"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
