"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  notes?: string
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">, buttonElement?: HTMLElement) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  cartBump: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [cartBump, setCartBump] = useState(false)

  const addItem = (item: Omit<CartItem, "quantity">, buttonElement?: HTMLElement) => {
    console.log("[v0] Adding item to cart:", item.name)
    console.log("[v0] Button element:", buttonElement)

    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }]
    })

    setCartBump(true)
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(20)
    }

    if (buttonElement && typeof window !== "undefined") {
      const buttonRect = buttonElement.getBoundingClientRect()
      const cartIcon = document.querySelector("[data-cart-icon]")

      console.log("[v0] Button rect:", buttonRect)
      console.log("[v0] Cart icon found:", !!cartIcon)

      if (cartIcon) {
        const cartRect = cartIcon.getBoundingClientRect()
        console.log("[v0] Cart rect:", cartRect)

        const event = new CustomEvent("flyToCart", {
          detail: {
            startX: buttonRect.left + buttonRect.width / 2,
            startY: buttonRect.top + buttonRect.height / 2,
            endX: cartRect.left + cartRect.width / 2,
            endY: cartRect.top + cartRect.height / 2,
          },
        })
        console.log("[v0] Dispatching flyToCart event")
        window.dispatchEvent(event)
      } else {
        console.log("[v0] Cart icon not found!")
      }
    } else {
      console.log("[v0] No button element or window not available")
    }
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }

  const clearCart = () => {
    setItems([])
  }

  const getTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  useEffect(() => {
    if (cartBump) {
      const timer = setTimeout(() => setCartBump(false), 500)
      return () => clearTimeout(timer)
    }
  }, [cartBump])

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, getTotal, cartBump }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
