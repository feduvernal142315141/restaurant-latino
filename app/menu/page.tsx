"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import { Plus, Search, Flame, Leaf, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { EmptyState } from "@/components/empty-state"

const menuItems = [
  {
    id: "1",
    name: { en: "Savory Empanadas", es: "Empanadas Sabrosas" },
    description: {
      en: "Golden pastries filled with seasoned beef and vegetables",
      es: "Empanadas doradas rellenas de carne sazonada y vegetales",
    },
    price: 8.99,
    image: "/golden-empanadas-on-plate.jpg",
    category: "appetizers",
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
    category: "mains",
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
    category: "desserts",
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
    category: "appetizers",
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
    category: "mains",
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
    category: "mains",
    tags: [],
  },
  {
    id: "7",
    name: { en: "Yuca Frita", es: "Yuca Frita" },
    description: {
      en: "Crispy fried cassava with garlic aioli",
      es: "Yuca frita crujiente con alioli de ajo",
    },
    price: 5.99,
    image: "/placeholder.svg?key=yuca1",
    category: "appetizers",
    tags: ["vegetarian"],
  },
  {
    id: "8",
    name: { en: "Horchata", es: "Horchata" },
    description: {
      en: "Traditional rice and cinnamon drink",
      es: "Bebida tradicional de arroz y canela",
    },
    price: 3.99,
    image: "/placeholder.svg?key=horch1",
    category: "drinks",
    tags: ["vegetarian"],
  },
]

export default function MenuPage() {
  const { locale, t } = useLanguage()
  const { addItem } = useCart()
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", label: locale === "es" ? "Todo" : "All" },
    { id: "appetizers", label: t.menu.categories.appetizers },
    { id: "mains", label: t.menu.categories.mains },
    { id: "desserts", label: t.menu.categories.desserts },
    { id: "drinks", label: t.menu.categories.drinks },
  ]

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      item.name[locale].toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description[locale].toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (item: (typeof menuItems)[0]) => {
    addItem({
      id: item.id,
      name: item.name[locale],
      price: item.price,
      image: item.image,
    })
    toast({
      title: locale === "es" ? "Añadido al pedido" : "Added to order",
      description: item.name[locale],
      action: (
        <Button variant="outline" size="sm" onClick={() => (window.location.href = "/pickup")}>
          {locale === "es" ? "Ver carrito" : "View cart"}
        </Button>
      ),
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="font-display font-bold text-5xl md:text-6xl text-foreground">{t.menu.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {locale === "es"
                ? "Explora nuestra selección de platillos auténticos preparados con amor"
                : "Explore our selection of authentic dishes prepared with love"}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={locale === "es" ? "Busca: tacos, ceviche..." : "Search: tacos, ceviche..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="font-semibold"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Menu Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item, index) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Image */}
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
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description[locale]}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="font-display font-bold text-2xl text-primary">${item.price.toFixed(2)}</span>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(item)}
                        className="bg-primary hover:bg-primary/90 font-semibold gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        {locale === "es" ? "Agregar" : "Add"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              type="search"
              title={t.menu.emptySearch}
              description={
                locale === "es"
                  ? "Intenta buscar con otros términos o explora todas las categorías."
                  : "Try searching with different terms or explore all categories."
              }
              actionLabel={locale === "es" ? "Ver Todo" : "View All"}
              actionHref="/menu"
            />
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
