import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Bell, Shield, CreditCard, Mail, Smartphone, KeyRound } from 'lucide-react'

export const CustomerSettingsPage = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-[#0D9668]">Configuración</h1>
				<p className="text-muted-foreground">Gestiona tus preferencias y cuenta</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<Card className="border-[#0D9668]/20">
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Bell className="h-5 w-5 text-[#0D9668]" />
							Notificaciones
						</CardTitle>
						<CardDescription>
							Configure cómo recibe actualizaciones sobre sus pedidos
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Mail className="h-4 w-4 text-muted-foreground" />
								<div>
									<p className="font-medium">Notificaciones por correo</p>
									<p className="text-sm text-muted-foreground">
										Reciba actualizaciones por email
									</p>
								</div>
							</div>
							<Switch defaultChecked />
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Smartphone className="h-4 w-4 text-muted-foreground" />
								<div>
									<p className="font-medium">Mensajes de texto</p>
									<p className="text-sm text-muted-foreground">
										Reciba SMS con el estado de su pedido
									</p>
								</div>
							</div>
							<Switch />
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<Bell className="h-4 w-4 text-muted-foreground" />
								<div>
									<p className="font-medium">Promociones y ofertas</p>
									<p className="text-sm text-muted-foreground">
										Reciba noticias sobre promociones
									</p>
								</div>
							</div>
							<Switch defaultChecked />
						</div>
					</CardContent>
				</Card>

				<Card className="border-[#0D9668]/20">
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Shield className="h-5 w-5 text-[#0D9668]" />
							Seguridad
						</CardTitle>
						<CardDescription>
							Administre la seguridad de su cuenta
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
							<div className="flex items-center gap-3">
								<KeyRound className="h-4 w-4 text-[#6D28D9]" />
								<div>
									<p className="font-medium">Cambiar contraseña</p>
									<p className="text-sm text-muted-foreground">
										Actualice su contraseña regularmente
									</p>
								</div>
							</div>
							<Button variant="outline" size="sm">
								Actualizar
							</Button>
						</div>
						<div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
							<div className="flex items-center gap-3">
								<Shield className="h-4 w-4 text-[#6D28D9]" />
								<div>
									<p className="font-medium">Autenticación de dos factores</p>
									<p className="text-sm text-muted-foreground">
										Una capa extra de protección
									</p>
								</div>
							</div>
							<Button variant="outline" size="sm">
								Activar
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className="border-[#0D9668]/20">
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<CreditCard className="h-5 w-5 text-[#0D9668]" />
							Métodos de Pago
						</CardTitle>
						<CardDescription>
							Administre sus métodos de pago guardados
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="p-4 rounded-lg border border-dashed">
							<p className="text-sm text-muted-foreground text-center">
								No hay métodos de pago guardados
							</p>
							<Button variant="outline" className="w-full mt-4">
								Agregar método de pago
							</Button>
						</div>
					</CardContent>
				</Card>

				<Card className="border-[#0D9668]/20">
					<CardHeader>
						<CardTitle className="text-lg flex items-center gap-2">
							<Shield className="h-5 w-5 text-[#0D9668]" />
							Privacidad
						</CardTitle>
						<CardDescription>
							Controle cómo se usa su información
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Perfil público</p>
								<p className="text-sm text-muted-foreground">
									Permitir que otros vean su actividad
								</p>
							</div>
							<Switch />
						</div>
						<Separator />
						<div className="flex items-center justify-between">
							<div>
								<p className="font-medium">Historial de compras</p>
								<p className="text-sm text-muted-foreground">
									Guardar historial para recomendaciones
								</p>
							</div>
							<Switch defaultChecked />
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
