import type React from "react"
import { useState, useCallback } from "react"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ProductModal } from "./product-modal"

export interface Product {
  readonly id: string
  title: string
  description: string
  price: number
  rating: number
  image: string
  category: string
  stock: number
  isFavorite: boolean
}

interface StockStatus {
  readonly label: string
  readonly color: string
}
interface ProductsTableProps {
  readonly initialProducts?: readonly Product[]
  readonly onProductChange?: (products: readonly Product[]) => void
}

const mockProducts: Product[] = [
  {
    id: "1",
    title: "Canapé en tissu",
    description: "Canapé confortable 3 places avec housse lavable",
    price: 799.99,
    rating: 4.5,
    image: "/canape-tissu.png",
    category: "Meubles",
    stock: 12,
    isFavorite: true,
  },
  {
    id: "2",
    title: "Table à manger",
    description: "Table en bois massif pouvant accueillir jusqu’à 6 personnes",
    price: 499.99,
    rating: 4.2,
    image: "/table-bois.png",
    category: "Meubles",
    stock: 8,
    isFavorite: false,
  },
  {
    id: "3",
    title: "Chaise de salon",
    description: "Chaise ergonomique avec coussin rembourré",
    price: 89.99,
    rating: 4.8,
    image: "/chaise-salon.png",
    category: "Meubles",
    stock: 40,
    isFavorite: true,
  },
  {
    id: "4",
    title: "Lampe de chevet",
    description: "Lampe moderne avec variateur de luminosité",
    price: 39.99,
    rating: 4.0,
    image: "/lampe-chevet.png",
    category: "Décoration",
    stock: 60,
    isFavorite: false,
  },
  {
    id: "5",
    title: "Buffet en chêne",
    description: "Buffet spacieux avec 3 tiroirs et 2 portes",
    price: 649.99,
    rating: 4.3,
    image: "/buffet-chene.png",
    category: "Meubles",
    stock: 5,
    isFavorite: false,
  },
];


export function ProductsTable({
  initialProducts = mockProducts,
  onProductChange,
}: ProductsTableProps = {}): React.JSX.Element {
  const [products, setProducts] = useState<readonly Product[]>(initialProducts)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const filteredProducts: readonly Product[] = products.filter(
    (product: Product): boolean =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddProduct = useCallback((): void => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }, [])

  const handleEditProduct = useCallback((product: Product): void => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }, [])

  const handleDeleteProduct = useCallback(
    (productId: string): void => {
      const updatedProducts = products.filter((p: Product): boolean => p.id !== productId)
      setProducts(updatedProducts)
      onProductChange?.(updatedProducts)
    },
    [products, onProductChange],
  )

  const handleSaveProduct = useCallback(
    (product: Product): void => {
      let updatedProducts: readonly Product[]

      if (editingProduct) {
        updatedProducts = products.map((p: Product): Product => (p.id === product.id ? product : p))
      } else {
        const newProduct: Product = { ...product, id: Date.now().toString() }
        updatedProducts = [...products, newProduct]
      }

      setProducts(updatedProducts)
      onProductChange?.(updatedProducts)
      setIsModalOpen(false)
      setEditingProduct(null)
    },
    [editingProduct, products, onProductChange],
  )

  const getStockStatus = useCallback((stock: number): StockStatus => {
    if (stock === 0)
      return {
        label: "En rupture de stock",
        color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      } as const
    if (stock < 10)
      return {
        label: "Stock faible",
        color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      } as const
    return {
      label: "En stock",
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    } as const
  }, [])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value)
  }, [])

  const handleModalClose = useCallback((): void => {
    setIsModalOpen(false)
    setEditingProduct(null)
  }, [])

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Produits</CardTitle>
            <Button onClick={handleAddProduct} className="gap-2" aria-label="Add new product">
              <Plus className="h-4 w-4" aria-hidden="true" />
              Nouveau produit
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"
                aria-hidden="true"
              />
              <Input
                placeholder="Rechercher des produits..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
                aria-label="Search products by name or category"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product: Product) => {
                const stockStatus: StockStatus = getStockStatus(product.stock)
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={product.image || "/placeholder.svg"}
                            alt={`${product.title} product image`}
                          />
                          <AvatarFallback>{product.title.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground">{product.title}</p>
                            {product.isFavorite && (
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-label="Favorite product" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                        <span>{product.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={stockStatus.color}>
                        {stockStatus.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label={`Actions for ${product.title}`}>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Editer
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </>
  )
}
