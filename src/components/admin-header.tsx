import type React from "react"

import { Bell, Search, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import type { JSX } from "react/jsx-runtime"
import { useState, useCallback } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

interface AdminHeaderProps {
  readonly className?: string
}

interface UserInfo {
  readonly name: string
  readonly email: string
  readonly avatar?: string
  readonly initials: string
}

interface NotificationCount {
  readonly count: number
  readonly hasUnread: boolean
}

export function AdminHeader({ className }: AdminHeaderProps): JSX.Element {
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState<string>("")

  const userInfo: UserInfo = {
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/admin-avatar.png",
    initials: "AD",
  } as const

  const notifications: NotificationCount = {
    count: 3,
    hasUnread: true,
  } as const

  const toggleTheme = useCallback((): void => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value)
  }, [])

  const handleSearchSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault()
      // Handle search logic here
      console.log("[v0] Search query:", searchQuery)
    },
    [searchQuery],
  )

  return (
    <header
      className={`flex items-center justify-between px-6 py-4 bg-background border-b border-border ${className || ""}`}
    >
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher des produits, des commandes, des utilisateurs..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search"
          />
        </form>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={`Notifications (${notifications.count} unread)`}
        >
          <Bell className="h-4 w-4" />
          {notifications.hasUnread && (
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
              {notifications.count}
            </span>
          )}
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="User menu">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userInfo.avatar || "/placeholder.svg"} alt={userInfo.name} />
                <AvatarFallback>{userInfo.initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userInfo.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{userInfo.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
