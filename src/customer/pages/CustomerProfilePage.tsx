import { useAuthStore } from '@/auth/store/auth.store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Mail, Phone, MapPin, Calendar, Package, CreditCard } from 'lucide-react'

export const CustomerProfilePage = () => {
	const { user } = useAuthStore()

	const mockUserData = {
		name: user?.name || 'Usuario',
		email: user?.email || 'correo@ejemplo.com',
		phone: '+57 300 123 4567',
		address: 'Carrera 45 #12-34, Bogotá, Colombia',
		documentType: 'Cédula de Ciudadanía',
		documentNumber: '12345678',
		memberSince: 'Enero 2024',
		totalOrders: 12,
		totalSpent: 2450000
	}

	const stats = [
		{ label: 'Órdenes realizadas', value: mockUserData.totalOrders, icon: Package },
		{ label: 'Total gastado', value: `$${(mockUserData.totalSpent).toLocaleString('es-CO')}`, icon: CreditCard }
	]

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-[#0D9668]">Mi Perfil</h1>
				<p className="text-muted-foreground">Bienvenido, {mockUserData.name}</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-4">
				<div className="lg:col-span-1">
					<Card className="border-[#0D9668]/20">
						<CardContent className="pt-6">
							<div className="flex flex-col items-center">
								<div className="mb-4 h-28 w-28 rounded-full bg-[#0D9668]/10 flex items-center justify-center">
									<User className="h-14 w-14 text-[#0D9668]" />
								</div>
								<h2 className="text-xl font-bold text-center">{mockUserData.name}</h2>
								<p className="text-sm text-muted-foreground">{mockUserData.email}</p>
								<div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
									<Calendar className="h-4 w-4" />
									<span>Cliente desde {mockUserData.memberSince}</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="mt-4 border-[#0D9668]/20">
						<CardHeader>
							<CardTitle className="text-base text-[#0D9668]">Mis Estadísticas</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{stats.map((stat, index) => (
								<div key={index} className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0D9668]/10">
											<stat.icon className="h-5 w-5 text-[#0D9668]" />
										</div>
										<span className="text-sm text-muted-foreground">{stat.label}</span>
									</div>
									<span className="font-semibold">{stat.value}</span>
								</div>
							))}
						</CardContent>
					</Card>
				</div>

				<div className="lg:col-span-3 space-y-6">
					<Card className="border-[#0D9668]/20">
						<CardHeader>
							<CardTitle className="text-lg flex items-center gap-2">
								<div className="h-2 w-2 rounded-full bg-[#0D9668]"></div>
								Información Personal
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4 sm:grid-cols-2">
								<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
									<User className="h-5 w-5 text-[#0D9668]" />
									<div>
										<p className="text-sm text-muted-foreground">Nombre completo</p>
										<p className="font-medium">{mockUserData.name}</p>
									</div>
								</div>
								<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
									<CreditCard className="h-5 w-5 text-[#0D9668]" />
									<div>
										<p className="text-sm text-muted-foreground">Tipo de documento</p>
										<p className="font-medium">{mockUserData.documentType}</p>
									</div>
								</div>
								<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
									<CreditCard className="h-5 w-5 text-[#0D9668]" />
									<div>
										<p className="text-sm text-muted-foreground">Número de documento</p>
										<p className="font-medium">{mockUserData.documentNumber}</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="border-[#0D9668]/20">
						<CardHeader>
							<CardTitle className="text-lg flex items-center gap-2">
								<div className="h-2 w-2 rounded-full bg-[#0D9668]"></div>
								Información de Contacto
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-4 sm:grid-cols-2">
								<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
									<Mail className="h-5 w-5 text-[#0D9668]" />
									<div>
										<p className="text-sm text-muted-foreground">Correo electrónico</p>
										<p className="font-medium">{mockUserData.email}</p>
									</div>
								</div>
								<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
									<Phone className="h-5 w-5 text-[#0D9668]" />
									<div>
										<p className="text-sm text-muted-foreground">Teléfono</p>
										<p className="font-medium">{mockUserData.phone}</p>
									</div>
								</div>
								<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 sm:col-span-2">
									<MapPin className="h-5 w-5 text-[#0D9668]" />
									<div>
										<p className="text-sm text-muted-foreground">Dirección</p>
										<p className="font-medium">{mockUserData.address}</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
