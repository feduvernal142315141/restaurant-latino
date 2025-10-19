"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { MapPin, Clock, Phone, Navigation } from "lucide-react"

export function Location() {
  const { locale, t } = useLanguage()

  const hours = [
    { day: locale === "es" ? "Lunes - Jueves" : "Mon - Thu", time: "11:00 AM - 9:00 PM" },
    { day: locale === "es" ? "Viernes - Sábado" : "Fri - Sat", time: "11:00 AM - 10:00 PM" },
    { day: locale === "es" ? "Domingo" : "Sunday", time: "12:00 PM - 8:00 PM" },
  ]

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map */}
          <div className="space-y-6">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground">
              {locale === "es" ? "Encuéntranos" : "Find Us"}
            </h2>
            <Card className="overflow-hidden border-border h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3149.123456789!2d-121.88!3d38.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDAxJzEyLjAiTiAxMjHCsDUyJzQ4LjAiVw!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Restaurant location"
              />
            </Card>
            <p className="text-sm text-muted-foreground">
              {locale === "es"
                ? "Estacionamiento disponible detrás del local"
                : "Parking available behind the restaurant"}
            </p>
          </div>

          {/* Info Cards */}
          <div className="space-y-6">
            <h3 className="font-display font-bold text-3xl text-foreground">
              {locale === "es" ? "Información" : "Information"}
            </h3>

            {/* Address Card */}
            <Card className="p-6 border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="font-display font-semibold text-lg text-foreground">{t.contact.address}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    123 Main Street
                    <br />
                    Pittsburg, CA 94565
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary font-semibold"
                    onClick={() =>
                      window.open("https://www.google.com/maps/search/?api=1&query=Pittsburg+CA", "_blank")
                    }
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    {t.contact.getDirections}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Hours Card */}
            <Card className="p-6 border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1 space-y-3">
                  <h4 className="font-display font-semibold text-lg text-foreground">{t.contact.hours}</h4>
                  <div className="space-y-2">
                    {hours.map((schedule, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{schedule.day}</span>
                        <span className="font-medium text-foreground">{schedule.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Phone Card */}
            <Card className="p-6 border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="font-display font-semibold text-lg text-foreground">{t.contact.phone}</h4>
                  <p className="text-muted-foreground">(510) 555-1234</p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary font-semibold"
                    onClick={() => (window.location.href = "tel:+15105551234")}
                  >
                    {t.contact.call}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
