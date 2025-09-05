import { ThemeProvider } from "next-themes"
import type React from "react"
import { Routes, Route } from "react-router-dom"
import { AdminSidebar } from "./components/admin-sidebar"
import { AdminHeader } from "./components/admin-header"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import Categories from "./pages/Categories"
import Orders from "./pages/Orders"
import Users from "./pages/Users"
import Promotions from "./pages/Promotions"

const App: React.FC = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="flex h-screen bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-6" role="main">
            <div className="max-w-7xl mx-auto space-y-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/users" element={<Users />} />
                <Route path="/promotions" element={<Promotions />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
