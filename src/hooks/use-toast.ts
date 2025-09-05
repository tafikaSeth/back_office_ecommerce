"use client"

import { toast as sonnerToast } from "sonner"

export interface ToastProps {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success" | "warning"
}

export function toast({ title, description, variant = "default" }: ToastProps) {
  switch (variant) {
    case "destructive":
      return sonnerToast.error(title, { description })
    case "success":
      return sonnerToast.success(title, { description })
    case "warning":
      return sonnerToast.warning(title, { description })
    default:
      return sonnerToast(title, { description })
  }
}

export function useToast() {
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  }
}
