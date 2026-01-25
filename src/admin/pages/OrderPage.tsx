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
import {
	Search,
	Eye,
	MoreHorizontal,
	Package,
	Clock,
	CheckCircle,
	XCircle
} from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Suspense } from 'react'
import { AdminHeader } from '@/admin/components/AdminHeader'

const ordenes = [
	{
		id: 'ORD-001',
		cliente: 'Carlos Mendoza',
		productos: 3,
		total: '$450.00',
		fecha: '21 Ene 2026',
		estado: 'Completada'
	},
	{
		id: 'ORD-002',
		cliente: 'María González',
		productos: 1,
		total: '$180.00',
		fecha: '21 Ene 2026',
		estado: 'En proceso'
	},
	{
		id: 'ORD-003',
		cliente: 'Roberto Silva',
		productos: 5,
		total: '$890.00',
		fecha: '20 Ene 2026',
		estado: 'Pendiente'
	},
	{
		id: 'ORD-004',
		cliente: 'Ana Torres',
		productos: 2,
		total: '$320.00',
		fecha: '20 Ene 2026',
		estado: 'Completada'
	},
	{
		id: 'ORD-005',
		cliente: 'Luis Ramírez',
		productos: 4,
		total: '$560.00',
		fecha: '19 Ene 2026',
		estado: 'Cancelada'
	},
	{
		id: 'ORD-006',
		cliente: 'Carmen López',
		productos: 2,
		total: '$275.00',
		fecha: '19 Ene 2026',
		estado: 'En proceso'
	}
]

const getStatusConfig = (estado: string) => {
	switch (estado) {
		case 'Completada':
			return {
				icon: CheckCircle,
				className: 'bg-secondary/15 text-secondary'
			}
		case 'En proceso':
			return {
				icon: Clock,
				className: 'bg-primary/15 text-primary'
			}
		case 'Pendiente':
			return {
				icon: Package,
				className: 'bg-amber-500/15 text-amber-600'
			}
		case 'Cancelada':
			return {
				icon: XCircle,
				className: 'bg-destructive/15 text-destructive'
			}
		default:
			return {
				icon: Package,
				className: 'bg-muted text-muted-foreground'
			}
	}
}

export const OrderPage = () => {
	return (
		<>
			<div className="pl-64 transition-all duration-300">
				<AdminHeader />
				<main className="p-6">
					<div className="mb-6 flex items-center justify-between">
						<div>
							<h2 className="text-2xl font-bold text-foreground">Órdenes</h2>
							<p className="text-muted-foreground">
								Administra y rastrea todas las órdenes
							</p>
						</div>
						<Button className="bg-primary text-primary-foreground hover:bg-primary/90">
							Nueva Orden
						</Button>
					</div>

					{/* Stats Simplificados */}
					<div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						<Card>
							<CardContent className="p-4">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-muted-foreground">
											Total Órdenes
										</p>
										<p className="text-2xl font-bold text-foreground">156</p>
									</div>
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
										<Package className="h-5 w-5 text-primary" />
									</div>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-4">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-muted-foreground">En Proceso</p>
										<p className="text-2xl font-bold text-foreground">23</p>
									</div>
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
										<Clock className="h-5 w-5 text-primary" />
									</div>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-4">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-muted-foreground">Completadas</p>
										<p className="text-2xl font-bold text-foreground">118</p>
									</div>
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
										<CheckCircle className="h-5 w-5 text-secondary" />
									</div>
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-4">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-muted-foreground">Ingresos</p>
										<p className="text-2xl font-bold text-foreground">
											$24,580
										</p>
									</div>
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
										<span className="text-lg font-bold text-secondary">$</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<Card>
						<CardHeader className="pb-4">
							<div className="flex items-center justify-between">
								<CardTitle className="text-lg font-semibold">Órdenes</CardTitle>
								<div className="flex gap-2">
									<div className="relative w-64">
										<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
										<Input
											placeholder="Buscar orden..."
											className="pl-9 bg-muted border-0"
										/>
									</div>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<Suspense>
								<Table>
									<TableHeader>
										<TableRow className="border-border hover:bg-transparent">
											<TableHead className="text-muted-foreground">
												ID
											</TableHead>
											<TableHead className="text-muted-foreground">
												Cliente
											</TableHead>
											<TableHead className="text-muted-foreground">
												Total
											</TableHead>
											<TableHead className="text-muted-foreground">
												Estado
											</TableHead>
											<TableHead className="text-muted-foreground w-12"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{ordenes.map((orden) => {
											const statusConfig = getStatusConfig(orden.estado)
											const StatusIcon = statusConfig.icon
											return (
												<TableRow
													key={orden.id}
													className="border-border hover:bg-muted/50"
												>
													<TableCell className="font-medium text-primary">
														{orden.id}
													</TableCell>
													<TableCell className="text-foreground">
														{orden.cliente}
													</TableCell>
													<TableCell className="font-medium text-foreground">
														{orden.total}
													</TableCell>
													<TableCell>
														<span
															className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig.className}`}
														>
															<StatusIcon className="h-3.5 w-3.5" />
															{orden.estado}
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
																<DropdownMenuItem>
																	<Eye className="mr-2 h-4 w-4" />
																	Ver detalles
																</DropdownMenuItem>
																<DropdownMenuItem>
																	Editar estado
																</DropdownMenuItem>
																<DropdownMenuItem className="text-destructive">
																	Cancelar orden
																</DropdownMenuItem>
															</DropdownMenuContent>
														</DropdownMenu>
													</TableCell>
												</TableRow>
											)
										})}
									</TableBody>
								</Table>
							</Suspense>
						</CardContent>
					</Card>
				</main>
			</div>
		</>
	)
}
