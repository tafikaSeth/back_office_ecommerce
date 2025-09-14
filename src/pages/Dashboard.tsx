import type React from "react"
import { DashboardStats } from "../components/dasboard-stats"
import { SalesChart } from "../components/sales-chart"
import { TopProducts } from "../components/product/top-products"
import { RecentOrders } from "../components/order/recent-orders"

const Dashboard: React.FC = () => {
  return (
    <>
      <header>
        <h1 className="text-3xl font-bold text-foreground mb-2">Aperçu du tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue dans votre tableau de bord d'administration e-commerce. Voici ce qui se passe aujourd'hui dans votre boutique.
        </p>
      </header>

      {/* Stats Cards */}
      <section aria-label="Dashboard statistics">
        <DashboardStats />
      </section>

      {/* Charts and Data */}
      <section aria-label="Charts and analytics" className="grid gap-6 md:grid-cols-2">
        <SalesChart />
        <TopProducts />
      </section>

      {/* Recent Activity */}
      <section aria-label="Recent activity">
        <RecentOrders />
      </section>
    </>
  )
}

export default Dashboard
