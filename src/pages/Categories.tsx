import type React from "react"
import { CategoriesTable } from "../components/categories-table"

const Categories: React.FC = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des catégories</h1>
        <p className="text-muted-foreground">Organisez vos produits en créant et en gérant des catégories.</p>
      </div>
      <CategoriesTable />
    </>
  )
}

export default Categories
