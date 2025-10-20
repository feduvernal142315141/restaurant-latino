"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag } from "lucide-react"

type FlyingItemProps = {
  startX: number
  startY: number
  endX: number
  endY: number
  onComplete: () => void
}

export function FlyingItem({ startX, startY, endX, endY, onComplete }: FlyingItemProps) {
  useEffect(() => {
    console.log("[v0] Flying item created:", { startX, startY, endX, endY })
    const timer = setTimeout(onComplete, 1000)
    return () => clearTimeout(timer)
  }, [onComplete, startX, startY, endX, endY])

  return (
    <motion.div
      initial={{
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        left: startX,
        top: startY,
      }}
      animate={{
        left: endX,
        top: endY,
        scale: 0.4,
        opacity: 0,
      }}
      transition={{
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="fixed z-[99999] pointer-events-none"
      style={{
        left: startX,
        top: startY,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-2xl border-4 border-white">
        <ShoppingBag className="h-8 w-8 text-primary-foreground" />
      </div>
    </motion.div>
  )
}

export function FlyingItemContainer() {
  const [flyingItems, setFlyingItems] = useState<
    Array<{ id: string; startX: number; startY: number; endX: number; endY: number }>
  >([])

  useEffect(() => {
    const handleFlyToCart = (event: CustomEvent) => {
      console.log("[v0] flyToCart event received:", event.detail)
      const { startX, startY, endX, endY } = event.detail
      const id = Math.random().toString(36).substr(2, 9)
      setFlyingItems((prev) => [...prev, { id, startX, startY, endX, endY }])
    }

    window.addEventListener("flyToCart" as any, handleFlyToCart)
    return () => window.removeEventListener("flyToCart" as any, handleFlyToCart)
  }, [])

  const handleComplete = (id: string) => {
    console.log("[v0] Flying item completed:", id)
    setFlyingItems((prev) => prev.filter((item) => item.id !== id))
  }

  useEffect(() => {
    if (flyingItems.length > 0) {
      console.log("[v0] Active flying items:", flyingItems.length)
    }
  }, [flyingItems])

  return (
    <AnimatePresence>
      {flyingItems.map((item) => (
        <FlyingItem
          key={item.id}
          startX={item.startX}
          startY={item.startY}
          endX={item.endX}
          endY={item.endY}
          onComplete={() => handleComplete(item.id)}
        />
      ))}
    </AnimatePresence>
  )
}
