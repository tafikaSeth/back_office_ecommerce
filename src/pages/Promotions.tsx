import type React from "react"
import { PromotionsTable } from "../components/promotions-table"

const Promotions: React.FC = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Promotion Management</h1>
        <p className="text-muted-foreground">
          Create and manage promotional campaigns, discount codes, and marketing banners.
        </p>
      </div>
      <PromotionsTable />
    </>
  )
}

export default Promotions
