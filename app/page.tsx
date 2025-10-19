"use client"

import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturedMenu } from "@/components/featured-menu"
import { Testimonials } from "@/components/testimonials"
import { Location } from "@/components/location"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { LanguageProvider } from "@/contexts/language-context"
import { CartProvider } from "@/contexts/cart-context"

export default function HomePage() {
  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            <Hero />
            <FeaturedMenu />
            <Testimonials />
            <Location />
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </CartProvider>
    </LanguageProvider>
  )
}
