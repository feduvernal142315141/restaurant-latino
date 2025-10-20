import type React from "react"
import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from "@/components/providers"
import { FlyingItemContainer } from "@/components/flying-item"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Sabor Latino - Auténtica Comida Latina en Pittsburg, California",
  description:
    "Restaurante latino en Pittsburg, California. Disfruta de sabores auténticos: empanadas, bandeja paisa, tacos al pastor, ceviche y más. Ingredientes frescos preparados con amor.",
  keywords:
    "restaurante latino Pittsburg, comida latina California, empanadas, bandeja paisa, tacos al pastor, ceviche, comida colombiana, comida mexicana",
  authors: [{ name: "Sabor Latino" }],
  creator: "Sabor Latino",
  publisher: "Sabor Latino",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://saborlatino.com"),
  alternates: {
    canonical: "/",
    languages: {
      "es-US": "/es",
      "en-US": "/en",
    },
  },
  openGraph: {
    title: "Sabor Latino - Auténtica Comida Latina en Pittsburg",
    description: "Restaurante latino con sabores auténticos en Pittsburg, California",
    url: "https://saborlatino.com",
    siteName: "Sabor Latino",
    locale: "es_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sabor Latino Restaurant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabor Latino - Auténtica Comida Latina",
    description: "Restaurante latino en Pittsburg, California",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Sabor Latino",
              image: "https://saborlatino.com/og-image.jpg",
              "@id": "https://saborlatino.com",
              url: "https://saborlatino.com",
              telephone: "+1-510-555-1234",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "123 Main Street",
                addressLocality: "Pittsburg",
                addressRegion: "CA",
                postalCode: "94565",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 38.028,
                longitude: -121.8847,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "11:00",
                  closes: "21:00",
                },
              ],
              servesCuisine: ["Latin American", "Colombian", "Mexican"],
              acceptsReservations: "True",
              menu: "https://saborlatino.com/menu",
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <FlyingItemContainer />
        <Analytics />
      </body>
    </html>
  )
}
