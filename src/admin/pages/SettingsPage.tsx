import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdminHeader } from '@/admin/components/AdminHeader'

export const SettingsPage = () => {
	return (
		<>
			<div className="pl-64 transition-all duration-300">
				<AdminHeader />
				<main className="p-6">
					<div className="mb-6">
						<h2 className="text-2xl font-bold text-foreground">
							Configuración
						</h2>
						<p className="text-muted-foreground">
							Configura tu tienda y preferencias
						</p>
					</div>

					<div className="grid gap-6">
						<Card>
							<CardHeader>
								<CardTitle>Información de la Tienda</CardTitle>
							</CardHeader>
							<CardContent>
								<p>Configuración general de la tienda</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Métodos de Pago</CardTitle>
							</CardHeader>
							<CardContent>
								<p>Configura los métodos de pago aceptados</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Notificaciones</CardTitle>
							</CardHeader>
							<CardContent>
								<p>Preferencias de notificación</p>
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</>
	)
}
