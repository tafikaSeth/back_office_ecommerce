"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Package, FolderTree, ShoppingCart, Users, Megaphone, Settings, Menu, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"
import { cn } from "../lib/utils"

interface SidebarItem {
  readonly title: string
  readonly href: string
  readonly icon: LucideIcon
}

interface AdminSidebarProps {
  readonly className?: string
}

const sidebarItems: readonly SidebarItem[] = [
  {
    title: "Tableau de bord",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Produits",
    href: "/products",
    icon: Package,
  },
  {
    title: "Catégories",
    href: "/categories",
    icon: FolderTree,
  },
  {
    title: "Commandes",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    title: "Clients",
    href: "/users",
    icon: Users,
  },
  {
    title: "Promotions",
    href: "/promotions",
    icon: Megaphone,
  },
  {
    title: "Paramètres",
    href: "/settings",
    icon: Settings,
  },
] as const

export function AdminSidebar({ className }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const location = useLocation()
  const currentPath: string = location.pathname

  const toggleCollapsed = (): void => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div
      className={cn(
        "relative flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!isCollapsed && <h2 className="text-lg font-semibold text-sidebar-foreground">Administrateur</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapsed}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2" role="navigation" aria-label="Main navigation">
          {sidebarItems.map((item: SidebarItem) => {
            const isActive: boolean = currentPath === item.href
            const IconComponent = item.icon

            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 text-sidebar-foreground",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                    !isActive && "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                    isCollapsed && "px-2",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <IconComponent className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}
