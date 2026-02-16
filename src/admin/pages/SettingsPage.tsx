import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdminPageWrapper } from '@/admin/components/AdminPageWrapper'

export const SettingsPage = () => {
	return (
		<AdminPageWrapper>
			<div className="h-full flex flex-col overflow-hidden">
				<div className="mb-4 lg:mb-6">
					<h2 className="text-xl lg:text-2xl font-bold text-foreground">Configuración</h2>
					<p className="text-sm text-muted-foreground">
						Configura tu tienda y preferencias
					</p>
				</div>

				<div className="flex-1 overflow-y-auto">
					<div className="grid gap-4 lg:gap-6">
						<Card>
							<CardHeader>
								<CardTitle className="text-base lg:text-lg">Información de la Tienda</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">Configuración general de la tienda</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base lg:text-lg">Métodos de Pago</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">Configura los métodos de pago aceptados</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle className="text-base lg:text-lg">Notificaciones</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-sm text-muted-foreground">Preferencias de notificación</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</AdminPageWrapper>
	)
}
