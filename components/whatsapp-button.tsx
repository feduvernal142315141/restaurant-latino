"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function WhatsAppButton() {
  const { locale } = useLanguage()

  const handleClick = () => {
    const message = encodeURIComponent(
      locale === "es"
        ? "Hola! Tengo una pregunta sobre el restaurante."
        : "Hi! I have a question about the restaurant.",
    )
    window.open(`https://wa.me/15105551234?text=${message}`, "_blank")
  }

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 rounded-full h-16 w-16 shadow-2xl bg-accent hover:bg-accent/90 hover:scale-110 transition-all duration-200 animate-in fade-in slide-in-from-bottom-4"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </Button>
  )
}
