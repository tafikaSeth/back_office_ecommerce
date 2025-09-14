import type React from "react"
import { PromotionsTable } from "../components/promotions-table"

const Promotions: React.FC = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des promotions</h1>
        <p className="text-muted-foreground">
          Créez et gérez des campagnes promotionnelles, des codes de réduction et des bannières marketing.
        </p>
      </div>
      <PromotionsTable />
    </>
  )
}

export default Promotions
