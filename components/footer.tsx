"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { Instagram, Facebook } from "lucide-react"

export function Footer() {
  const { locale, setLocale, t } = useLanguage()

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Slogan */}
          <div className="space-y-4">
            <div className="font-display font-bold text-2xl text-primary">Sabor Latino</div>
            <p className="text-background/80 leading-relaxed">
              {locale === "es"
                ? "Sabores auténticos que te hacen sentir en casa"
                : "Authentic flavors that make you feel at home"}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">
              {locale === "es" ? "Enlaces Rápidos" : "Quick Links"}
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/menu" className="text-background/80 hover:text-primary transition-colors">
                {t.nav.menu}
              </Link>
              <Link href="/reservations" className="text-background/80 hover:text-primary transition-colors">
                {t.nav.reservations}
              </Link>
              <Link href="/pickup" className="text-background/80 hover:text-primary transition-colors">
                {t.nav.orders}
              </Link>
              <Link href="/contact" className="text-background/80 hover:text-primary transition-colors">
                {t.nav.contact}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">{t.contact.title}</h4>
            <div className="space-y-2 text-background/80">
              <p>123 Main Street</p>
              <p>Pittsburg, CA 94565</p>
              <p>(510) 555-1234</p>
            </div>
          </div>

          {/* Social & Language */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">{locale === "es" ? "Síguenos" : "Follow Us"}</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background/10 hover:bg-primary p-3 rounded-lg transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background/10 hover:bg-primary p-3 rounded-lg transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>

            {/* Language Selector */}
            <div className="pt-4">
              <p className="text-sm text-background/60 mb-2">{locale === "es" ? "Idioma" : "Language"}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setLocale("es")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    locale === "es"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/10 text-background/80 hover:bg-background/20"
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => setLocale("en")}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    locale === "en"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/10 text-background/80 hover:bg-background/20"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/20 text-center text-sm text-background/60">
          <p>
            © {new Date().getFullYear()} Sabor Latino. {t.footer.rights}.
          </p>
        </div>
      </div>
    </footer>
  )
}
