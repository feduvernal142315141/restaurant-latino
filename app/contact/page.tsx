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
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"
import { Mail, Phone, MapPin, Instagram, Facebook, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const { locale, t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="font-display font-bold text-5xl md:text-6xl text-foreground">{t.contact.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {locale === "es"
                ? "Estamos aquí para ayudarte. Contáctanos de la manera que prefieras."
                : "We're here to help. Contact us however you prefer."}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8 border-border">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="font-display font-semibold text-2xl text-foreground mb-6">
                    {locale === "es" ? "Envíanos un Mensaje" : "Send Us a Message"}
                  </h2>

                  <div className="space-y-2">
                    <Label htmlFor="name">{locale === "es" ? "Nombre" : "Name"}</Label>
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
                    <Label htmlFor="email">{locale === "es" ? "Correo Electrónico" : "Email"}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{locale === "es" ? "Mensaje" : "Message"}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 font-semibold">
                    {locale === "es" ? "Enviar Mensaje" : "Send Message"}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-500">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20">
                    <CheckCircle2 className="h-10 w-10 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-foreground">
                    {locale === "es" ? "¡Mensaje Enviado!" : "Message Sent!"}
                  </h3>
                  <p className="text-muted-foreground">
                    {locale === "es" ? "Gracias, te responderemos pronto." : "Thank you, we'll respond soon."}
                  </p>
                </div>
              )}
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="font-display font-semibold text-2xl text-foreground">
                {locale === "es" ? "Información de Contacto" : "Contact Information"}
              </h2>

              {/* Address */}
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
                  </div>
                </div>
              </Card>

              {/* Phone */}
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

              {/* Email */}
              <Card className="p-6 border-border hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h4 className="font-display font-semibold text-lg text-foreground">
                      {locale === "es" ? "Correo Electrónico" : "Email"}
                    </h4>
                    <p className="text-muted-foreground">info@saborlatino.com</p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-primary font-semibold"
                      onClick={() => (window.location.href = "mailto:info@saborlatino.com")}
                    >
                      {locale === "es" ? "Enviar correo" : "Send email"}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <Card className="p-6 border-border">
                <h4 className="font-display font-semibold text-lg text-foreground mb-4">
                  {locale === "es" ? "Síguenos en Redes Sociales" : "Follow Us on Social Media"}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {locale === "es"
                    ? "Síguenos para ver el menú del día y promociones especiales"
                    : "Follow us to see daily menu and special promotions"}
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary px-4 py-2 rounded-lg transition-colors font-semibold"
                  >
                    <Instagram className="h-5 w-5" />
                    Instagram
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary px-4 py-2 rounded-lg transition-colors font-semibold"
                  >
                    <Facebook className="h-5 w-5" />
                    Facebook
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
