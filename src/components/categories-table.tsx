"use client"

import { useState } from "react"
import { Plus, Search, MoreHorizontal, Edit, Trash2, FolderTree } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { CategoryModal } from "./category-modal"

export interface Category {
  id: string
  name: string
  description: string
  productCount: number
  isActive: boolean
  createdAt: string
}

const mockCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Electronic devices and gadgets including phones, laptops, and accessories",
    productCount: 45,
    isActive: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Accessories",
    description: "Various accessories for electronic devices and daily use items",
    productCount: 32,
    isActive: true,
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    name: "Clothing",
    description: "Fashion and apparel for men, women, and children",
    productCount: 28,
    isActive: true,
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    name: "Home & Garden",
    description: "Home improvement, furniture, and gardening supplies",
    productCount: 15,
    isActive: true,
    createdAt: "2024-02-10",
  },
  {
    id: "5",
    name: "Sports & Outdoors",
    description: "Sports equipment, outdoor gear, and fitness accessories",
    productCount: 22,
    isActive: true,
    createdAt: "2024-02-15",
  },
  {
    id: "6",
    name: "Books",
    description: "Physical and digital books across various genres",
    productCount: 8,
    isActive: false,
    createdAt: "2024-03-01",
  },
]

export function CategoriesTable() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddCategory = () => {
    setEditingCategory(null)
    setIsModalOpen(true)
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
    setIsModalOpen(true)
  }

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter((c) => c.id !== categoryId))
  }

  const handleSaveCategory = (category: Category) => {
    if (editingCategory) {
      setCategories(categories.map((c) => (c.id === category.id ? category : c)))
    } else {
      const newCategory = {
        ...category,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
      }
      setCategories([...categories, newCategory])
    }
    setIsModalOpen(false)
    setEditingCategory(null)
  }

  const toggleCategoryStatus = (categoryId: string) => {
    setCategories(categories.map((c) => (c.id === categoryId ? { ...c, isActive: !c.isActive } : c)))
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Catégories</CardTitle>
            <Button onClick={handleAddCategory} className="gap-2">
              <Plus className="h-4 w-4" />
              Nouveau catégorie
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categorie</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Produits</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Créé le</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                        <FolderTree className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{category.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground line-clamp-2 max-w-md">{category.description}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-medium">
                      {category.productCount} products
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleCategoryStatus(category.id)}
                      className="h-auto p-0"
                    >
                      <Badge
                        variant="secondary"
                        className={
                          category.isActive
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                        }
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </Button>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editer
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleCategoryStatus(category.id)}>
                          <FolderTree className="mr-2 h-4 w-4" />
                          {category.isActive ? "Desactivé" : "Activé"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-destructive"
                          disabled={category.productCount > 0}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
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

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingCategory(null)
        }}
        onSave={handleSaveCategory}
        category={editingCategory}
      />
    </>
  )
}
