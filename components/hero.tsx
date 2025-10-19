"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Clock } from "lucide-react"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/delicious-latin-food-spread-colorful-dishes.jpg" alt="Latin cuisine" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy & CTAs */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="space-y-4">
              <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight text-balance">
                {t.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed text-pretty">{t.hero.subtitle}</p>
            </div>

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-2">
              <Clock className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium text-foreground">
                {t.hero.prepTime || "Tiempo de preparación aprox. 15-20 min"}
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/menu" className="flex-1 sm:flex-initial">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto text-lg font-semibold px-8 py-6 hover:scale-105 transition-transform duration-200"
                >
                  {t.hero.viewMenu}
                </Button>
              </Link>
              <Link href="/pickup" className="flex-1 sm:flex-initial">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg font-semibold px-8 py-6 bg-primary hover:bg-primary/90 hover:scale-105 transition-transform duration-200"
                >
                  {t.hero.orderPickup || t.nav.orderNow}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column - Featured Dish Image (Desktop) */}
          <div className="hidden md:block animate-in fade-in slide-in-from-right duration-700 delay-300">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <img
                src="/signature-latin-dish-plated-beautifully.jpg"
                alt="Featured dish"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}
