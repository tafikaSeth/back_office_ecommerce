import type React from "react"
import { ProductsTable } from "../components/product/products-table"

const Products: React.FC = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Gestion de produit</h1>
        <p className="text-muted-foreground">Gérez les produits, les stocks et les prix de votre boutique.</p>
      </div>
      <ProductsTable />
    </>
  )
}

export default Products
