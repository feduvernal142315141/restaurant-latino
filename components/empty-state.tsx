import { Button } from "@/components/ui/button"
import { ShoppingBag, Calendar, Search } from "lucide-react"
import Link from "next/link"

type EmptyStateProps = {
  type: "cart" | "reservations" | "search"
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({ type, title, description, actionLabel, actionHref }: EmptyStateProps) {
  const icons = {
    cart: ShoppingBag,
    reservations: Calendar,
    search: Search,
  }

  const Icon = icons[type]

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="rounded-full bg-muted p-6 mb-6">
        <Icon className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="font-display font-semibold text-2xl mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  )
}
