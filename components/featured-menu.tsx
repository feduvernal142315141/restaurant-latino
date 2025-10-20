"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import { Plus, Flame, Leaf, Star, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const featuredItems = [
  {
    id: "1",
    name: { en: "Savory Empanadas", es: "Empanadas Sabrosas" },
    description: {
      en: "Golden pastries filled with seasoned beef and vegetables",
      es: "Empanadas doradas rellenas de carne sazonada y vegetales",
    },
    price: 8.99,
    image: "/golden-empanadas-on-plate.jpg",
    tags: ["recommended"],
  },
  {
    id: "2",
    name: { en: "Bandeja Paisa", es: "Bandeja Paisa" },
    description: {
      en: "Traditional Colombian platter with beans, rice, meat, and plantain",
      es: "Plato tradicional colombiano con frijoles, arroz, carne y plátano",
    },
    price: 16.99,
    image: "/bandeja-paisa-colombian-food.jpg",
    tags: ["spicy", "recommended"],
  },
  {
    id: "3",
    name: { en: "Tres Leches Cake", es: "Pastel Tres Leches" },
    description: {
      en: "Moist sponge cake soaked in three types of milk",
      es: "Bizcocho húmedo empapado en tres tipos de leche",
    },
    price: 6.99,
    image: "/tres-leches-cake-dessert.jpg",
    tags: ["vegetarian"],
  },
  {
    id: "4",
    name: { en: "Ceviche Mixto", es: "Ceviche Mixto" },
    description: {
      en: "Fresh seafood marinated in citrus with onions and cilantro",
      es: "Mariscos frescos marinados en cítricos con cebolla y cilantro",
    },
    price: 14.99,
    image: "/fresh-ceviche-seafood.jpg",
    tags: ["recommended"],
  },
  {
    id: "5",
    name: { en: "Tacos al Pastor", es: "Tacos al Pastor" },
    description: {
      en: "Marinated pork tacos with pineapple and fresh cilantro",
      es: "Tacos de cerdo marinado con piña y cilantro fresco",
    },
    price: 12.99,
    image: "/tacos-al-pastor-mexican.jpg",
    tags: ["spicy"],
  },
  {
    id: "6",
    name: { en: "Arroz con Pollo", es: "Arroz con Pollo" },
    description: {
      en: "Saffron rice with tender chicken and mixed vegetables",
      es: "Arroz con azafrán, pollo tierno y vegetales mixtos",
    },
    price: 13.99,
    image: "/arroz-con-pollo-latin-food.jpg",
    tags: [],
  },
]

export function FeaturedMenu() {
  const { locale, t } = useLanguage()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [addingItem, setAddingItem] = useState<string | null>(null)

  const handleAddToCart = (item: (typeof featuredItems)[0], event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonElement = event.currentTarget

    setAddingItem(item.id)

    addItem(
      {
        id: item.id,
        name: item.name[locale],
        price: item.price,
        image: item.image,
      },
      buttonElement,
    )

    toast({
      title: locale === "es" ? "Añadido al pedido" : "Added to order",
      description: item.name[locale],
      action: (
        <Button variant="outline" size="sm" onClick={() => (window.location.href = "/pickup")}>
          {locale === "es" ? "Ver carrito" : "View cart"}
        </Button>
      ),
    })

    setTimeout(() => setAddingItem(null), 1000)
  }

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
            {locale === "es" ? "Favoritos de la Casa" : "House Favorites"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {locale === "es"
              ? "Descubre los platillos que nuestros clientes aman y regresan a pedir una y otra vez"
              : "Discover the dishes our customers love and come back for again and again"}
          </p>
        </div>

        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <Card
              key={item.id}
              className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name[locale]}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Tags */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {item.tags.includes("spicy") && (
                    <span className="inline-flex items-center gap-1 bg-primary/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      <Flame className="h-3 w-3" />
                      {locale === "es" ? "Picante" : "Spicy"}
                    </span>
                  )}
                  {item.tags.includes("vegetarian") && (
                    <span className="inline-flex items-center gap-1 bg-accent/90 text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      <Leaf className="h-3 w-3" />
                      {locale === "es" ? "Vegetariano" : "Vegetarian"}
                    </span>
                  )}
                  {item.tags.includes("recommended") && (
                    <span className="inline-flex items-center gap-1 bg-secondary/90 text-secondary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                      <Star className="h-3 w-3" />
                      {locale === "es" ? "Recomendado" : "Recommended"}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-xl text-foreground">{item.name[locale]}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {item.description[locale]}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="font-display font-bold text-2xl text-primary">${item.price.toFixed(2)}</span>
                  <Button
                    size="sm"
                    onClick={(e) => handleAddToCart(item, e)}
                    className={cn(
                      "bg-primary hover:bg-primary/90 font-semibold gap-2 transition-all duration-200",
                      addingItem === item.id && "scale-95",
                    )}
                  >
                    {addingItem === item.id ? (
                      <>
                        <Check className="h-4 w-4" />
                        {locale === "es" ? "Agregado" : "Added"}
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        {locale === "es" ? "Agregar" : "Add"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View Full Menu CTA */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            variant="outline"
            className="font-semibold text-lg px-8 bg-transparent"
            onClick={() => (window.location.href = "/menu")}
          >
            {locale === "es" ? "Ver Menú Completo" : "View Full Menu"}
          </Button>
        </div>
      </div>
    </section>
  )
}
