import type React from "react"
import { OrdersTable } from "../components/order/orders-table"

const Orders: React.FC = () => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Gestion de commande</h1>
        <p className="text-muted-foreground">
          Suivez et gérez les commandes des clients, mettez à jour leur statut et consultez les détails des commandes.
        </p>
      </div>
      <OrdersTable />
    </>
  )
}

export default Orders
