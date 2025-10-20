"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, Phone, ShoppingCart, Utensils, Calendar, Package, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { locale, setLocale, t } = useLanguage()
  const { items, cartBump } = useCart()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
    } else {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
    }
  }, [isMobileMenuOpen])

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const menuItems = [
    {
      href: "/",
      label: t.nav.home,
      description: locale === "es" ? "Vuelve al sabor de casa." : "Back to the taste of home.",
      icon: Utensils,
    },
    {
      href: "/menu",
      label: t.nav.menu,
      description: locale === "es" ? "Explora nuestros platillos." : "Explore our dishes.",
      icon: Utensils,
    },
    {
      href: "/reservations",
      label: t.nav.reservations,
      description: locale === "es" ? "Tu mesa te espera." : "Your table awaits.",
      icon: Calendar,
    },
    {
      href: "/pickup",
      label: t.nav.orders,
      description: locale === "es" ? "Ordena y pasa a recoger." : "Order and pick up.",
      icon: Package,
    },
    {
      href: "/contact",
      label: t.nav.contact,
      description: locale === "es" ? "Estamos para atenderte." : "We're here to help.",
      icon: Mail,
    },
  ]

  return (
    <>
      {/* Topbar - thin banner with key info */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-4">
            <span className="font-medium">Hoy: 11:00 AM - 9:00 PM</span>
            <span className="text-primary-foreground/80">|</span>
            <a
              href="tel:+15105551234"
              className="flex items-center gap-2 hover:text-primary-foreground/80 transition-colors"
            >
              <Phone className="h-4 w-4" />
              (510) 555-1234
            </a>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span className="font-medium">{t.nav.orderNow}</span>
          </div>
          <Link href="/pickup">
            <Button size="sm" variant="secondary" className="font-semibold">
              {t.nav.orderNow}
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border" : "bg-background",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="font-display font-bold text-2xl text-primary">Sabor Latino</div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-foreground hover:text-primary transition-colors font-medium relative group",
                    pathname === item.href && "text-primary",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                      pathname === item.href ? "w-full" : "w-0 group-hover:w-full",
                    )}
                  />
                </Link>
              ))}
            </div>

            {/* Right side - Language switcher, Cart, CTA */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setLocale("es")}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 min-w-[44px] min-h-[36px] flex items-center justify-center",
                    locale === "es"
                      ? "bg-primary text-primary-foreground scale-105"
                      : "text-muted-foreground hover:text-foreground hover:scale-105",
                  )}
                >
                  ES
                </button>
                <button
                  onClick={() => setLocale("en")}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 min-w-[44px] min-h-[36px] flex items-center justify-center",
                    locale === "en"
                      ? "bg-primary text-primary-foreground scale-105"
                      : "text-muted-foreground hover:text-foreground hover:scale-105",
                  )}
                >
                  EN
                </button>
              </div>

              <Link href="/pickup" className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "relative min-w-[44px] min-h-[44px] hover:bg-primary/10 transition-all duration-200",
                    cartBump && "animate-bounce",
                  )}
                  data-cart-icon
                >
                  <ShoppingCart className="h-6 w-6 md:h-5 md:w-5" />
                  {cartItemCount > 0 && (
                    <span
                      className={cn(
                        "absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center",
                        "animate-in zoom-in duration-200 shadow-lg",
                      )}
                    >
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* CTA Button - Desktop */}
              <Link href="/pickup" className="hidden md:block">
                <Button className="bg-primary hover:bg-primary/90 font-semibold">{t.nav.orderNow}</Button>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "md:hidden relative min-w-[44px] min-h-[44px] flex items-center justify-center",
                  "rounded-lg hover:bg-muted/50 active:scale-95 transition-all duration-200",
                  "bg-muted/30",
                )}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative w-6 h-6 flex flex-col items-center justify-center">
                  {/* Top bar */}
                  <span
                    className={cn(
                      "absolute w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ease-out",
                      isMobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2",
                    )}
                  />
                  {/* Middle bar */}
                  <span
                    className={cn(
                      "absolute w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ease-out",
                      isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100",
                    )}
                  />
                  {/* Bottom bar */}
                  <span
                    className={cn(
                      "absolute w-6 h-0.5 bg-foreground rounded-full transition-all duration-300 ease-out",
                      isMobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2",
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {isMobileMenuOpen && (
          <div
            className={cn(
              "md:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-cream/96 backdrop-blur-xl z-50 shadow-2xl",
              "animate-in slide-in-from-right duration-300",
            )}
          >
            {/* Menu Header - sticky */}
            <div className="sticky top-0 bg-cream/80 backdrop-blur-md border-b border-border/50 px-6 py-4 flex items-center justify-between">
              <div className="font-display font-bold text-xl text-primary">Sabor Latino</div>

              {/* Language Switcher in menu */}
              <div className="flex items-center gap-1 bg-background/50 rounded-lg p-1">
                <button
                  onClick={() => setLocale("es")}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 min-w-[44px] min-h-[36px] flex items-center justify-center",
                    locale === "es"
                      ? "bg-primary text-primary-foreground scale-105"
                      : "text-muted-foreground hover:text-foreground hover:scale-105",
                  )}
                >
                  ES
                </button>
                <button
                  onClick={() => setLocale("en")}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 min-w-[44px] min-h-[36px] flex items-center justify-center",
                    locale === "en"
                      ? "bg-primary text-primary-foreground scale-105"
                      : "text-muted-foreground hover:text-foreground hover:scale-105",
                  )}
                >
                  EN
                </button>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-background/50 rounded-lg transition-colors active:scale-95"
                aria-label="Close menu"
              >
                <X className="h-6 w-6 text-foreground" />
              </button>
            </div>

            <div className="px-6 py-8 flex flex-col gap-3 overflow-y-auto h-[calc(100vh-180px)]">
              {menuItems.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "group relative flex items-start gap-4 p-4 rounded-xl transition-all duration-200",
                      "hover:bg-background/50 active:scale-[0.98] min-h-[60px]",
                      isActive && "bg-primary/10",
                      // Stagger animation delay
                      "animate-in slide-in-from-right fade-in",
                    )}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "backwards",
                    }}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary rounded-r-full animate-in slide-in-from-left duration-300" />
                    )}

                    {/* Icon with animation */}
                    <div
                      className={cn(
                        "flex-shrink-0 p-2.5 rounded-lg transition-all duration-200",
                        isActive ? "bg-primary text-primary-foreground" : "bg-background/50 text-muted-foreground",
                        "group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground",
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                      <div
                        className={cn(
                          "text-xl font-display font-semibold mb-1 transition-colors",
                          isActive ? "text-primary" : "text-foreground group-hover:text-primary",
                        )}
                      >
                        {item.label}
                      </div>
                      <div className="text-sm text-muted-foreground leading-relaxed">{item.description}</div>
                    </div>
                  </Link>
                )
              })}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-cream via-cream to-transparent">
              <Link href="/pickup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  size="lg"
                  className={cn(
                    "w-full bg-primary hover:bg-primary/90 font-semibold text-lg shadow-lg min-h-[56px]",
                    "active:scale-95 transition-transform",
                    "animate-in slide-in-from-bottom fade-in duration-300 delay-500",
                  )}
                >
                  {locale === "es" ? "¡Haz tu pedido en segundos!" : "Order in seconds!"}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
