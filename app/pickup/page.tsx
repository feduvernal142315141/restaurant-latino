"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2 } from "lucide-react"

export default function PickupPage() {
  const { locale, t } = useLanguage()
  const { items, updateQuantity, removeItem, clearCart, getTotal } = useCart()
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  })
  const [orderId, setOrderId] = useState("")

  const subtotal = getTotal()
  const tax = subtotal * 0.0925 // 9.25% CA tax
  const total = subtotal + tax

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()
    const id = `ORD${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    setOrderId(id)
    setStep("success")
    clearCart()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="font-display font-bold text-5xl md:text-6xl text-foreground">{t.orders.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {locale === "es"
                ? "Ordena tus platillos favoritos para recoger"
                : "Order your favorite dishes for pickup"}
            </p>
          </div>

          {/* Cart View */}
          {step === "cart" && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="font-display font-semibold text-2xl text-foreground">{t.orders.cart}</h2>

                {items.length === 0 ? (
                  <Card className="p-12 text-center border-border">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground mb-6">
                      {locale === "es" ? "Tu carrito está vacío" : "Your cart is empty"}
                    </p>
                    <Button onClick={() => (window.location.href = "/menu")}>
                      {locale === "es" ? "Ver Menú" : "View Menu"}
                    </Button>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <Card key={item.id} className="p-6 border-border">
                        <div className="flex gap-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1 space-y-2">
                            <h3 className="font-display font-semibold text-lg text-foreground">{item.name}</h3>
                            <p className="font-semibold text-primary">${item.price.toFixed(2)}</p>
                            <div className="flex items-center gap-3">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="font-semibold w-8 text-center">{item.quantity}</span>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => removeItem(item.id)}
                                className="h-8 w-8 ml-auto text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Order Summary */}
              {items.length > 0 && (
                <div className="lg:col-span-1">
                  <Card className="p-6 border-border sticky top-24 space-y-6">
                    <h3 className="font-display font-semibold text-xl text-foreground">
                      {locale === "es" ? "Resumen" : "Summary"}
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between text-muted-foreground">
                        <span>{locale === "es" ? "Subtotal" : "Subtotal"}:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>{locale === "es" ? "Impuestos" : "Tax"}:</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-border pt-3 flex justify-between font-display font-bold text-xl text-foreground">
                        <span>{t.orders.total}:</span>
                        <span className="text-primary">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="bg-secondary/20 border border-secondary/30 rounded-lg p-4">
                      <p className="text-sm text-foreground font-medium">
                        {locale === "es" ? "Tiempo de preparación aprox. 15-20 min" : "Prep time approx. 15-20 min"}
                      </p>
                    </div>

                    <Button
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 font-semibold"
                      onClick={() => setStep("checkout")}
                    >
                      {t.orders.checkout}
                    </Button>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Checkout View */}
          {step === "checkout" && (
            <Card className="max-w-2xl mx-auto p-8 md:p-12 border-border">
              <form onSubmit={handleCheckout} className="space-y-6">
                <h2 className="font-display font-semibold text-2xl text-foreground mb-6">
                  {locale === "es" ? "Información de Contacto" : "Contact Information"}
                </h2>

                <div className="space-y-2">
                  <Label htmlFor="name">{locale === "es" ? "Nombre completo" : "Full name"}</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{locale === "es" ? "Teléfono" : "Phone"}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    {locale === "es" ? "Correo electrónico (opcional)" : "Email (optional)"}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">
                    {locale === "es"
                      ? "Escribe una nota para la cocina (opcional)"
                      : "Add a note for the kitchen (optional)"}
                  </Label>
                  <Input
                    id="notes"
                    type="text"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={locale === "es" ? "Sin cebolla, extra picante..." : "No onions, extra spicy..."}
                    className="h-12"
                  />
                </div>

                <Card className="p-6 bg-muted/50 border-border space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.orders.total}:</span>
                    <span className="font-display font-bold text-xl text-primary">${total.toFixed(2)}</span>
                  </div>
                </Card>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep("cart")} className="flex-1">
                    {locale === "es" ? "Atrás" : "Back"}
                  </Button>
                  <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                    {locale === "es" ? "Confirmar Pedido" : "Confirm Order"}
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Success View */}
          {step === "success" && (
            <Card className="max-w-2xl mx-auto p-12 text-center border-border space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20">
                <CheckCircle2 className="h-12 w-12 text-accent" />
              </div>
              <div className="space-y-2">
                <h2 className="font-display font-bold text-3xl text-foreground">
                  {locale === "es" ? "¡Pedido Confirmado!" : "Order Confirmed!"}
                </h2>
                <p className="text-lg text-muted-foreground">{t.orders.readyIn}</p>
              </div>

              <Card className="p-6 bg-muted/50 border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  {locale === "es" ? "Número de Pedido" : "Order Number"}
                </p>
                <p className="font-display font-bold text-2xl text-primary">{orderId}</p>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button variant="outline" onClick={() => window.open("https://maps.google.com", "_blank")}>
                  {locale === "es" ? "Cómo llegar" : "Get directions"}
                </Button>
                <Button onClick={() => (window.location.href = "/")}>
                  {locale === "es" ? "Volver al inicio" : "Back to home"}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
