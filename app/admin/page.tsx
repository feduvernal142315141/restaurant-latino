"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/language-context"
import {
  ChefHat,
  Calendar,
  ShoppingBag,
  BarChart3,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Download,
  TrendingUp,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

type MenuItem = {
  id: string
  name: { en: string; es: string }
  description: { en: string; es: string }
  price: number
  category: string
  image: string
  available: boolean
}

type Reservation = {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  status: "pending" | "confirmed" | "cancelled"
}

type Order = {
  id: string
  customerName: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  status: "pending" | "preparing" | "ready" | "completed"
  orderTime: string
}

export default function AdminDashboard() {
  const { locale, setLocale, t } = useLanguage()

  // Sample data
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: { en: "Empanadas", es: "Empanadas" },
      description: { en: "Beef empanadas with chimichurri", es: "Empanadas de carne con chimichurri" },
      price: 8.99,
      category: "appetizers",
      image: "/savory-empanadas.png",
      available: true,
    },
    {
      id: "2",
      name: { en: "Bandeja Paisa", es: "Bandeja Paisa" },
      description: { en: "Traditional Colombian platter", es: "Plato tradicional colombiano" },
      price: 18.99,
      category: "mains",
      image: "/bandeja-paisa.jpg",
      available: true,
    },
    {
      id: "3",
      name: { en: "Tres Leches Cake", es: "Pastel de Tres Leches" },
      description: { en: "Classic three milk cake", es: "Clásico pastel de tres leches" },
      price: 6.99,
      category: "desserts",
      image: "/tres-leches.jpg",
      available: true,
    },
  ])

  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: "1",
      name: "María García",
      email: "maria@example.com",
      phone: "(555) 123-4567",
      date: "2025-10-25",
      time: "19:00",
      guests: 4,
      status: "pending",
    },
    {
      id: "2",
      name: "Carlos Rodríguez",
      email: "carlos@example.com",
      phone: "(555) 987-6543",
      date: "2025-10-26",
      time: "20:00",
      guests: 2,
      status: "confirmed",
    },
  ])

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "1",
      customerName: "Ana López",
      items: [
        { name: "Empanadas", quantity: 2, price: 8.99 },
        { name: "Bandeja Paisa", quantity: 1, price: 18.99 },
      ],
      total: 36.97,
      status: "preparing",
      orderTime: "18:30",
    },
    {
      id: "2",
      customerName: "Juan Pérez",
      items: [{ name: "Tres Leches Cake", quantity: 2, price: 6.99 }],
      total: 13.98,
      status: "ready",
      orderTime: "18:45",
    },
  ])

  const [isAddMenuDialogOpen, setIsAddMenuDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  const salesData = [
    { day: locale === "en" ? "Mon" : "Lun", sales: 450, orders: 12 },
    { day: locale === "en" ? "Tue" : "Mar", sales: 680, orders: 18 },
    { day: locale === "en" ? "Wed" : "Mié", sales: 520, orders: 15 },
    { day: locale === "en" ? "Thu" : "Jue", sales: 890, orders: 24 },
    { day: locale === "en" ? "Fri" : "Vie", sales: 1200, orders: 32 },
    { day: locale === "en" ? "Sat" : "Sáb", sales: 1450, orders: 38 },
    { day: locale === "en" ? "Sun" : "Dom", sales: 1100, orders: 29 },
  ]

  const categoryData = [
    { category: locale === "en" ? "Appetizers" : "Entradas", sales: 1200 },
    { category: locale === "en" ? "Mains" : "Principales", sales: 3400 },
    { category: locale === "en" ? "Desserts" : "Postres", sales: 800 },
    { category: locale === "en" ? "Drinks" : "Bebidas", sales: 600 },
  ]

  const updateReservationStatus = (id: string, status: Reservation["status"]) => {
    setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  const toggleMenuItemAvailability = (id: string) => {
    setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))
  }

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id))
  }

  const exportToCSV = () => {
    const csvContent = [
      ["Order ID", "Customer", "Total", "Status", "Time"],
      ...orders.map((o) => [o.id, o.customerName, o.total, o.status, o.orderTime]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `orders-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      confirmed: "default",
      cancelled: "destructive",
      preparing: "secondary",
      ready: "default",
      completed: "outline",
    }
    return <Badge variant={variants[status] || "default"}>{status}</Badge>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                {locale === "en" ? "Admin Dashboard" : "Panel de Administración"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {locale === "en" ? "Sabor Latino Restaurant Management" : "Gestión del Restaurante Sabor Latino"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant={locale === "en" ? "default" : "outline"} size="sm" onClick={() => setLocale("en")}>
                EN
              </Button>
              <Button variant={locale === "es" ? "default" : "outline"} size="sm" onClick={() => setLocale("es")}>
                ES
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {locale === "en" ? "Menu Items" : "Artículos del Menú"}
              </CardTitle>
              <ChefHat className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{menuItems.length}</div>
              <p className="text-xs text-muted-foreground">
                {menuItems.filter((i) => i.available).length} {locale === "en" ? "available" : "disponibles"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {locale === "en" ? "Reservations" : "Reservaciones"}
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reservations.length}</div>
              <p className="text-xs text-muted-foreground">
                {reservations.filter((r) => r.status === "pending").length} {locale === "en" ? "pending" : "pendientes"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {locale === "en" ? "Active Orders" : "Pedidos Activos"}
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.filter((o) => o.status !== "completed").length}</div>
              <p className="text-xs text-muted-foreground">
                {orders.filter((o) => o.status === "ready").length} {locale === "en" ? "ready" : "listos"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {locale === "en" ? "Today's Revenue" : "Ingresos de Hoy"}
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {orders.length} {locale === "en" ? "orders" : "pedidos"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">
              <BarChart3 className="mr-2 h-4 w-4" />
              {locale === "en" ? "Dashboard" : "Panel"}
            </TabsTrigger>
            <TabsTrigger value="menu">
              <ChefHat className="mr-2 h-4 w-4" />
              {locale === "en" ? "Menu" : "Menú"}
            </TabsTrigger>
            <TabsTrigger value="reservations">
              <Calendar className="mr-2 h-4 w-4" />
              {locale === "en" ? "Reservations" : "Reservaciones"}
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              {locale === "en" ? "Orders" : "Pedidos"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Sales Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>{locale === "en" ? "Weekly Sales" : "Ventas Semanales"}</CardTitle>
                  <CardDescription>
                    {locale === "en"
                      ? "Revenue and orders over the past week"
                      : "Ingresos y pedidos de la última semana"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="day" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        name={locale === "en" ? "Sales ($)" : "Ventas ($)"}
                      />
                      <Line
                        type="monotone"
                        dataKey="orders"
                        stroke="hsl(var(--accent))"
                        strokeWidth={2}
                        name={locale === "en" ? "Orders" : "Pedidos"}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Sales Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>{locale === "en" ? "Sales by Category" : "Ventas por Categoría"}</CardTitle>
                  <CardDescription>
                    {locale === "en" ? "Revenue breakdown by menu category" : "Desglose de ingresos por categoría"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="category" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="sales"
                        fill="hsl(var(--secondary))"
                        radius={[8, 8, 0, 0]}
                        name={locale === "en" ? "Sales ($)" : "Ventas ($)"}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{locale === "en" ? "Performance Metrics" : "Métricas de Rendimiento"}</CardTitle>
                    <CardDescription>
                      {locale === "en" ? "Key performance indicators" : "Indicadores clave de rendimiento"}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={exportToCSV}>
                    <Download className="mr-2 h-4 w-4" />
                    {locale === "en" ? "Export CSV" : "Exportar CSV"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {locale === "en" ? "Average Order Value" : "Valor Promedio de Pedido"}
                    </p>
                    <p className="text-2xl font-bold">
                      ${(orders.reduce((sum, o) => sum + o.total, 0) / orders.length).toFixed(2)}
                    </p>
                    <p className="text-xs text-accent flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +12% {locale === "en" ? "vs last week" : "vs semana pasada"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {locale === "en" ? "Total Customers" : "Total de Clientes"}
                    </p>
                    <p className="text-2xl font-bold">{orders.length + reservations.length}</p>
                    <p className="text-xs text-accent flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      +8% {locale === "en" ? "vs last week" : "vs semana pasada"}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {locale === "en" ? "Popular Item" : "Artículo Popular"}
                    </p>
                    <p className="text-2xl font-bold">Bandeja Paisa</p>
                    <p className="text-xs text-muted-foreground">
                      24 {locale === "en" ? "orders this week" : "pedidos esta semana"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menu Management */}
          <TabsContent value="menu" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{locale === "en" ? "Menu Items" : "Artículos del Menú"}</CardTitle>
                    <CardDescription>
                      {locale === "en" ? "Manage your restaurant menu items" : "Gestiona los artículos de tu menú"}
                    </CardDescription>
                  </div>
                  <Dialog open={isAddMenuDialogOpen} onOpenChange={setIsAddMenuDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        {locale === "en" ? "Add Item" : "Agregar Artículo"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{locale === "en" ? "Add Menu Item" : "Agregar Artículo al Menú"}</DialogTitle>
                        <DialogDescription>
                          {locale === "en"
                            ? "Add a new item to your menu. Fill in both English and Spanish."
                            : "Agrega un nuevo artículo a tu menú. Completa en inglés y español."}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name-en">{locale === "en" ? "Name (English)" : "Nombre (Inglés)"}</Label>
                            <Input id="name-en" placeholder="Empanadas" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="name-es">{locale === "en" ? "Name (Spanish)" : "Nombre (Español)"}</Label>
                            <Input id="name-es" placeholder="Empanadas" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="desc-en">
                              {locale === "en" ? "Description (English)" : "Descripción (Inglés)"}
                            </Label>
                            <Textarea id="desc-en" placeholder="Delicious beef empanadas..." />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="desc-es">
                              {locale === "en" ? "Description (Spanish)" : "Descripción (Español)"}
                            </Label>
                            <Textarea id="desc-es" placeholder="Deliciosas empanadas de carne..." />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="price">{locale === "en" ? "Price" : "Precio"}</Label>
                            <Input id="price" type="number" step="0.01" placeholder="8.99" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="category">{locale === "en" ? "Category" : "Categoría"}</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={locale === "en" ? "Select category" : "Selecciona categoría"}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="appetizers">
                                  {locale === "en" ? "Appetizers" : "Entradas"}
                                </SelectItem>
                                <SelectItem value="mains">
                                  {locale === "en" ? "Main Dishes" : "Platos Principales"}
                                </SelectItem>
                                <SelectItem value="desserts">{locale === "en" ? "Desserts" : "Postres"}</SelectItem>
                                <SelectItem value="drinks">{locale === "en" ? "Drinks" : "Bebidas"}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image">{locale === "en" ? "Image URL" : "URL de Imagen"}</Label>
                          <Input id="image" placeholder="/placeholder.svg?height=100&width=100" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddMenuDialogOpen(false)}>
                          {locale === "en" ? "Cancel" : "Cancelar"}
                        </Button>
                        <Button onClick={() => setIsAddMenuDialogOpen(false)}>
                          {locale === "en" ? "Add Item" : "Agregar"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{locale === "en" ? "Item" : "Artículo"}</TableHead>
                      <TableHead>{locale === "en" ? "Category" : "Categoría"}</TableHead>
                      <TableHead>{locale === "en" ? "Price" : "Precio"}</TableHead>
                      <TableHead>{locale === "en" ? "Status" : "Estado"}</TableHead>
                      <TableHead className="text-right">{locale === "en" ? "Actions" : "Acciones"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {menuItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name[locale]}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                            <div>
                              <div className="font-medium">{item.name[locale]}</div>
                              <div className="text-sm text-muted-foreground">{item.description[locale]}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{item.category}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={item.available ? "default" : "secondary"}>
                            {item.available
                              ? locale === "en"
                                ? "Available"
                                : "Disponible"
                              : locale === "en"
                                ? "Unavailable"
                                : "No disponible"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleMenuItemAvailability(item.id)}
                              title={locale === "en" ? "Toggle availability" : "Cambiar disponibilidad"}
                            >
                              {item.available ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingItem(item)}
                              title={locale === "en" ? "Edit" : "Editar"}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteMenuItem(item.id)}
                              title={locale === "en" ? "Delete" : "Eliminar"}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reservations Management */}
          <TabsContent value="reservations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{locale === "en" ? "Reservations" : "Reservaciones"}</CardTitle>
                <CardDescription>
                  {locale === "en" ? "Manage customer reservations" : "Gestiona las reservaciones de clientes"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{locale === "en" ? "Customer" : "Cliente"}</TableHead>
                      <TableHead>{locale === "en" ? "Contact" : "Contacto"}</TableHead>
                      <TableHead>{locale === "en" ? "Date & Time" : "Fecha y Hora"}</TableHead>
                      <TableHead>{locale === "en" ? "Guests" : "Personas"}</TableHead>
                      <TableHead>{locale === "en" ? "Status" : "Estado"}</TableHead>
                      <TableHead className="text-right">{locale === "en" ? "Actions" : "Acciones"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell className="font-medium">{reservation.name}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{reservation.email}</div>
                            <div className="text-muted-foreground">{reservation.phone}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{reservation.date}</div>
                            <div className="text-muted-foreground">{reservation.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>{reservation.guests}</TableCell>
                        <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {reservation.status === "pending" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateReservationStatus(reservation.id, "confirmed")}
                                >
                                  <Check className="mr-1 h-3 w-3" />
                                  {locale === "en" ? "Confirm" : "Confirmar"}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateReservationStatus(reservation.id, "cancelled")}
                                >
                                  <X className="mr-1 h-3 w-3" />
                                  {locale === "en" ? "Cancel" : "Cancelar"}
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Management */}
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {locale === "en" ? "Order" : "Pedido"} #{orders.length}
                    </CardTitle>
                    <CardDescription>
                      {locale === "en" ? "Manage customer pickup orders" : "Gestiona los pedidos de clientes"}
                    </CardDescription>
                  </div>
                  {getStatusBadge("pending")}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {locale === "en" ? "Order" : "Pedido"} #{order.id}
                            </CardTitle>
                            <CardDescription>
                              {order.customerName} • {order.orderTime}
                            </CardDescription>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span>
                                  {item.quantity}x {item.name}
                                </span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                            <div className="flex justify-between border-t pt-2 font-bold">
                              <span>{locale === "en" ? "Total" : "Total"}</span>
                              <span>${order.total.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {order.status === "pending" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, "preparing")}
                              >
                                {locale === "en" ? "Start Preparing" : "Comenzar a Preparar"}
                              </Button>
                            )}
                            {order.status === "preparing" && (
                              <Button variant="outline" size="sm" onClick={() => updateOrderStatus(order.id, "ready")}>
                                {locale === "en" ? "Mark as Ready" : "Marcar como Listo"}
                              </Button>
                            )}
                            {order.status === "ready" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateOrderStatus(order.id, "completed")}
                              >
                                {locale === "en" ? "Complete Order" : "Completar Pedido"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
