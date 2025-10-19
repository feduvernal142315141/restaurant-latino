import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MenuSkeleton } from "@/components/menu-skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Header Skeleton */}
          <div className="text-center mb-12 space-y-4 animate-pulse">
            <div className="h-12 bg-muted rounded-lg w-64 mx-auto" />
            <div className="h-6 bg-muted rounded-lg w-96 mx-auto" />
          </div>

          {/* Search Bar Skeleton */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="h-12 bg-muted rounded-lg animate-pulse" />
          </div>

          {/* Category Filters Skeleton */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 w-24 bg-muted rounded-lg animate-pulse" />
            ))}
          </div>

          {/* Menu Grid Skeleton */}
          <MenuSkeleton />
        </div>
      </main>
      <Footer />
    </div>
  )
}
