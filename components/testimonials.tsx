"use client"

import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"

const testimonials = [
  {
    name: "María González",
    rating: 5,
    text: {
      en: "Best Latin food I've had in months. The empanadas are just like my grandmother used to make!",
      es: "La mejor comida latina que he probado en meses. ¡Las empanadas son como las que hacía mi abuela!",
    },
    image: "/happy-woman-customer.png",
  },
  {
    name: "Carlos Rodríguez",
    rating: 5,
    text: {
      en: "Authentic flavors and generous portions. The bandeja paisa is incredible!",
      es: "Sabores auténticos y porciones generosas. ¡La bandeja paisa es increíble!",
    },
    image: "/happy-man-customer.png",
  },
  {
    name: "Ana Martínez",
    rating: 5,
    text: {
      en: "Finally found a place that reminds me of home. The service is excellent too!",
      es: "Por fin encontré un lugar que me recuerda a casa. ¡El servicio también es excelente!",
    },
    image: "/smiling-woman-customer.jpg",
  },
  {
    name: "Roberto Silva",
    rating: 5,
    text: {
      en: "The ceviche is fresh and delicious. I come here every week!",
      es: "El ceviche está fresco y delicioso. ¡Vengo aquí cada semana!",
    },
    image: "/happy-male-customer.jpg",
  },
]

export function Testimonials() {
  const { locale } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 rounded-full px-4 py-2 mb-4">
            <Star className="h-5 w-5 text-secondary fill-secondary" />
            <span className="font-semibold text-foreground">4.8 en Google</span>
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
            {locale === "es" ? "Lo Que Dicen Nuestros Clientes" : "What Our Customers Say"}
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="p-8 md:p-12 bg-card border-border">
                    <div className="flex flex-col items-center text-center space-y-6">
                      {/* Avatar */}
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
                      />

                      {/* Stars */}
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-secondary fill-secondary" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-lg md:text-xl text-foreground leading-relaxed italic max-w-2xl">
                        "{testimonial.text[locale]}"
                      </p>

                      {/* Name */}
                      <p className="font-display font-semibold text-lg text-foreground">{testimonial.name}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-primary" : "w-2 bg-border"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
