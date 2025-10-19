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
import { Calendar, Users, CheckCircle2, AlertCircle } from "lucide-react"

export default function ReservationsPage() {
  const { locale, t } = useLanguage()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "2",
    name: "",
    phone: "",
    email: "",
    specialRequest: "",
  })
  const [reservationId, setReservationId] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formData.date) {
        newErrors.date = locale === "es" ? "La fecha es requerida" : "Date is required"
      }
      if (!formData.time) {
        newErrors.time = locale === "es" ? "La hora es requerida" : "Time is required"
      }
    }

    if (currentStep === 2) {
      if (!formData.name.trim()) {
        newErrors.name = locale === "es" ? "El nombre es requerido" : "Name is required"
      }
      if (!formData.phone.trim()) {
        newErrors.phone = locale === "es" ? "El teléfono es requerido" : "Phone is required"
      } else if (
        !/^$$\d{3}$$\s\d{3}-\d{4}$/.test(formData.phone) &&
        !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))
      ) {
        newErrors.phone = locale === "es" ? "Formato de teléfono inválido" : "Invalid phone format"
      }
      if (!formData.email.trim()) {
        newErrors.email = locale === "es" ? "El correo es requerido" : "Email is required"
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = locale === "es" ? "Correo electrónico inválido" : "Invalid email address"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(step)) {
      return
    }

    if (step < 3) {
      setStep(step + 1)
    } else {
      const id = `RES${Math.random().toString(36).substr(2, 6).toUpperCase()}`
      setReservationId(id)
      setStep(4)
    }
  }

  const timeSlots = [
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="font-display font-bold text-5xl md:text-6xl text-foreground">{t.reservations.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {locale === "es" ? "Reserva tu mesa en segundos" : "Book your table in seconds"}
            </p>
          </div>

          {/* Progress Steps */}
          {step < 4 && (
            <div className="flex items-center justify-center gap-4 mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && <div className={`w-12 h-1 rounded ${step > s ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>
          )}

          {/* Form */}
          <Card className="p-8 md:p-12 border-border">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Date, Time, Guests */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="h-6 w-6 text-primary" />
                    <h2 className="font-display font-semibold text-2xl text-foreground">{t.reservations.selectDate}</h2>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">{locale === "es" ? "Fecha" : "Date"}</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => {
                        setFormData({ ...formData, date: e.target.value })
                        setErrors({ ...errors, date: "" })
                      }}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="h-12"
                    />
                    {errors.date && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.date}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">{locale === "es" ? "Hora" : "Time"}</Label>
                    <select
                      id="time"
                      value={formData.time}
                      onChange={(e) => {
                        setFormData({ ...formData, time: e.target.value })
                        setErrors({ ...errors, time: "" })
                      }}
                      required
                      className="w-full h-12 px-3 rounded-md border border-input bg-background"
                    >
                      <option value="">{locale === "es" ? "Selecciona una hora" : "Select a time"}</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.time}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests">{t.reservations.guests}</Label>
                    <select
                      id="guests"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      required
                      className="w-full h-12 px-3 rounded-md border border-input bg-background"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {locale === "es" ? "personas" : "guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Info */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="h-6 w-6 text-primary" />
                    <h2 className="font-display font-semibold text-2xl text-foreground">{t.reservations.contact}</h2>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">{locale === "es" ? "Nombre completo" : "Full name"}</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value })
                        setErrors({ ...errors, name: "" })
                      }}
                      required
                      className="h-12"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{locale === "es" ? "Teléfono" : "Phone"}</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value })
                        setErrors({ ...errors, phone: "" })
                      }}
                      required
                      placeholder="(555) 123-4567"
                      className="h-12"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{locale === "es" ? "Correo electrónico" : "Email"}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                        setErrors({ ...errors, email: "" })
                      }}
                      required
                      placeholder="tu@email.com"
                      className="h-12"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequest">
                      {locale === "es" ? "¿Evento especial? (opcional)" : "Special event? (optional)"}
                    </Label>
                    <Input
                      id="specialRequest"
                      type="text"
                      value={formData.specialRequest}
                      onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                      placeholder={locale === "es" ? "Cumpleaños, aniversario..." : "Birthday, anniversary..."}
                      className="h-12"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                    <h2 className="font-display font-semibold text-2xl text-foreground">{t.reservations.confirm}</h2>
                  </div>

                  <Card className="p-6 bg-muted/50 border-border space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{locale === "es" ? "Fecha" : "Date"}:</span>
                      <span className="font-semibold text-foreground">{formData.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{locale === "es" ? "Hora" : "Time"}:</span>
                      <span className="font-semibold text-foreground">{formData.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{locale === "es" ? "Personas" : "Guests"}:</span>
                      <span className="font-semibold text-foreground">{formData.guests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{locale === "es" ? "Nombre" : "Name"}:</span>
                      <span className="font-semibold text-foreground">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{locale === "es" ? "Teléfono" : "Phone"}:</span>
                      <span className="font-semibold text-foreground">{formData.phone}</span>
                    </div>
                  </Card>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {locale === "es"
                      ? "Guardaremos tu mesa por 10 minutos a partir de la hora reservada."
                      : "We'll hold your table for 10 minutes from the reservation time."}
                  </p>
                </div>
              )}

              {/* Step 4: Success */}
              {step === 4 && (
                <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20">
                    <CheckCircle2 className="h-12 w-12 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-display font-bold text-3xl text-foreground">
                      {locale === "es" ? "¡Reservación Confirmada!" : "Reservation Confirmed!"}
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      {locale === "es"
                        ? "Te esperamos en Sabor Latino"
                        : "We look forward to seeing you at Sabor Latino"}
                    </p>
                  </div>

                  <Card className="p-6 bg-muted/50 border-border">
                    <p className="text-sm text-muted-foreground mb-2">
                      {locale === "es" ? "ID de Reservación" : "Reservation ID"}
                    </p>
                    <p className="font-display font-bold text-2xl text-primary">{reservationId}</p>
                  </Card>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button variant="outline" onClick={() => window.open("https://maps.google.com", "_blank")}>
                      {locale === "es" ? "Ver indicaciones" : "Get directions"}
                    </Button>
                    <Button onClick={() => (window.location.href = "/")}>
                      {locale === "es" ? "Volver al inicio" : "Back to home"}
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {step < 4 && (
                <div className="flex gap-4 pt-6">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                      {locale === "es" ? "Atrás" : "Back"}
                    </Button>
                  )}
                  <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                    {step === 3 ? t.reservations.confirm : locale === "es" ? "Continuar" : "Continue"}
                  </Button>
                </div>
              )}
            </form>
          </Card>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
