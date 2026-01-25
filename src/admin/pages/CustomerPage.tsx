import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Search, Mail, Phone, MoreHorizontal } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Suspense } from 'react'
import { AdminHeader } from '@/admin/components/AdminHeader'

const clientes = [
	{
		id: 1,
		nombre: 'Carlos Mendoza',
		email: 'carlos@email.com',
		telefono: '+52 555 123 4567',
		ordenes: 12,
		totalFacturado: '$4,520.00',
		deudaPendiente: '$450.00',
		estado: 'Activo'
	},
	{
		id: 2,
		nombre: 'María González',
		email: 'maria@email.com',
		telefono: '+52 555 234 5678',
		ordenes: 8,
		totalFacturado: '$2,180.00',
		deudaPendiente: '$0.00',
		estado: 'Activo'
	},
	{
		id: 3,
		nombre: 'Roberto Silva',
		email: 'roberto@email.com',
		telefono: '+52 555 345 6789',
		ordenes: 5,
		totalFacturado: '$1,350.00',
		deudaPendiente: '$180.00',
		estado: 'Inactivo'
	},
	{
		id: 4,
		nombre: 'Ana Torres',
		email: 'ana@email.com',
		telefono: '+52 555 456 7890',
		ordenes: 15,
		totalFacturado: '$6,890.00',
		deudaPendiente: '$1,200.00',
		estado: 'Activo'
	},
	{
		id: 5,
		nombre: 'Luis Ramírez',
		email: 'luis@email.com',
		telefono: '+52 555 567 8901',
		ordenes: 3,
		totalFacturado: '$780.00',
		deudaPendiente: '$0.00',
		estado: 'Activo'
	}
]

export const CustomerPage = () => {
	return (
		<div className="pl-64 transition-all duration-300">
			<AdminHeader />
			<main className="p-6">
				<div className="mb-6 flex items-center justify-between">
					<div>
						<h2 className="text-2xl font-bold text-foreground">Clientes</h2>
						<p className="text-muted-foreground">
							Gestiona la información de tus clientes
						</p>
					</div>
					<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
						Agregar Cliente
					</Button>
				</div>

				<Card>
					<CardHeader className="pb-4">
						<div className="flex items-center justify-between">
							<CardTitle className="text-lg font-semibold">
								Lista de Clientes
							</CardTitle>
							<div className="relative w-72">
								<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<Input
									placeholder="Buscar cliente..."
									className="pl-9 bg-muted border-0"
								/>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<Suspense>
							<Table>
								<TableHeader>
									<TableRow className="border-border hover:bg-transparent">
										<TableHead className="text-muted-foreground">
											Cliente
										</TableHead>
										<TableHead className="text-muted-foreground">
											Contacto
										</TableHead>
										<TableHead className="text-muted-foreground">
											Órdenes
										</TableHead>
										<TableHead className="text-muted-foreground">
											Total Facturado
										</TableHead>
										<TableHead className="text-muted-foreground">
											Deuda Pendiente
										</TableHead>
										<TableHead className="text-muted-foreground">
											Estado
										</TableHead>
										<TableHead className="text-muted-foreground w-12"></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{clientes.map((cliente) => (
										<TableRow
											key={cliente.id}
											className="border-border hover:bg-muted/50"
										>
											<TableCell>
												<div className="flex items-center gap-3">
													<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
														{cliente.nombre
															.split(' ')
															.map((n) => n[0])
															.join('')}
													</div>
													<span className="font-medium text-foreground">
														{cliente.nombre}
													</span>
												</div>
											</TableCell>
											<TableCell>
												<div className="flex flex-col gap-1">
													<div className="flex items-center gap-2 text-sm text-muted-foreground">
														<Mail className="h-3.5 w-3.5" />
														{cliente.email}
													</div>
													<div className="flex items-center gap-2 text-sm text-muted-foreground">
														<Phone className="h-3.5 w-3.5" />
														{cliente.telefono}
													</div>
												</div>
											</TableCell>
											<TableCell className="text-foreground">
												{cliente.ordenes}
											</TableCell>
											<TableCell className="font-medium text-foreground">
												{cliente.totalFacturado}
											</TableCell>
											<TableCell className="font-medium">
												<span
													className={
														cliente.deudaPendiente === '$0.00'
															? 'text-green-600'
															: 'text-red-600'
													}
												>
													{cliente.deudaPendiente}
												</span>
											</TableCell>
											<TableCell>
												<span
													className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
														cliente.estado === 'Activo'
															? 'bg-secondary/20 text-secondary'
															: 'bg-muted text-muted-foreground'
													}`}
												>
													{cliente.estado}
												</span>
											</TableCell>
											<TableCell>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button
															variant="ghost"
															size="icon"
															className="h-8 w-8"
														>
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem>Ver detalles</DropdownMenuItem>
														<DropdownMenuItem>Editar</DropdownMenuItem>
														<DropdownMenuItem className="text-destructive">
															Eliminar
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Suspense>
					</CardContent>
				</Card>
			</main>
		</div>
	)
}
