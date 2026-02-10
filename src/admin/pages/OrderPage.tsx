import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import {
	Eye,
	MoreHorizontal,
	Package,
	Clock,
	CheckCircle,
	XCircle,
	X
} from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Suspense } from 'react'
import { AdminPageWrapper } from '@/admin/components/AdminPageWrapper'
import { useQuery } from '@tanstack/react-query'
import { getOrdersAction } from '../actions/get-orders.action'
import { CustomLoading } from '@/components/custom/CustomLoading'
import { useState } from 'react'
import type { GetOrdersResponse } from '../interfaces/get-orders.response'
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog'

const getStatusConfig = (status: string) => {
	switch (status) {
		case 'Completed':
			return {
				icon: CheckCircle,
				className: 'bg-secondary/15 text-secondary'
			}
		case 'In Progress':
			return {
				icon: Clock,
				className: 'bg-primary/15 text-primary'
			}
		case 'Pending':
			return {
				icon: Package,
				className: 'bg-amber-500/15 text-amber-600'
			}
		case 'Cancelled':
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
	const { data, isLoading } = useQuery<GetOrdersResponse[]>({
		queryKey: ['orders'],
		queryFn: () => getOrdersAction()
	})

	const [selectedOrder, setSelectedOrder] = useState<GetOrdersResponse | null>(
		null
	)

	if (isLoading) return <CustomLoading item="Ordenes" />

	const orders = data || []

	return (
		<>
			<AdminPageWrapper>
				<div className="p-6 h-full flex flex-col overflow-hidden">
					<div className="shrink-0 mb-6 flex items-center justify-between">
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
					<div className="shrink-0 mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						<Card>
							<CardContent className="p-4">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-muted-foreground">
											Total Órdenes
										</p>
										<p className="text-2xl font-bold text-foreground">
											{orders.length}
										</p>
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
										<p className="text-2xl font-bold text-foreground">
											{orders.filter((o) => o.status === 'In Progress').length}
										</p>
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
										<p className="text-2xl font-bold text-foreground">
											{orders.filter((o) => o.status === 'Completed').length}
										</p>
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
											$
											{orders
												.reduce((sum, o) => sum + o.total, 0)
												.toLocaleString('en-US')}
										</p>
									</div>
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
										<span className="text-lg font-bold text-secondary">$</span>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="flex-1 overflow-hidden">
						<Card className="h-full flex flex-col">
							<CardHeader className="pb-4 shrink-0">
								<div className="flex items-center justify-between">
									<CardTitle className="text-lg font-semibold">
										Órdenes
									</CardTitle>
									<div className="flex gap-2"></div>
								</div>
							</CardHeader>
							<CardContent className="flex-1 overflow-hidden">
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
											{orders.map((order) => (
												<TableRow
													key={order.id}
													className="border-border hover:bg-muted/50"
												>
													<TableCell className="font-medium text-primary">
														{order.id.slice(-8)}
													</TableCell>
													<TableCell className="text-foreground">
														{order.userId.slice(-8)}
													</TableCell>
													<TableCell className="font-medium text-foreground">
														${order.total.toLocaleString('en-US')}
													</TableCell>
													<TableCell>
														<span
															className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusConfig(order.status).className}`}
														>
															{(() => {
																const StatusIcon = getStatusConfig(
																	order.status
																).icon
																return <StatusIcon className="h-3.5 w-3.5" />
															})()}
															{order.status}
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
																<DropdownMenuItem
																	onClick={() => setSelectedOrder(order)}
																>
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
											))}
										</TableBody>
									</Table>
								</Suspense>
							</CardContent>
						</Card>
					</div>
				</div>
			</AdminPageWrapper>

			{/* Order Details Dialog */}
			<AlertDialog
				open={!!selectedOrder}
				onOpenChange={() => setSelectedOrder(null)}
			>
				<AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
					<AlertDialogHeader className="flex flex-row items-center justify-between">
						<AlertDialogTitle>Detalles de la Orden</AlertDialogTitle>
						<button
							onClick={() => setSelectedOrder(null)}
							className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
						>
							<X className="h-4 w-4" />
							<span className="sr-only">Close</span>
						</button>
					</AlertDialogHeader>
					{selectedOrder && (
						<AlertDialogDescription asChild>
							<div className="space-y-6">
								{/* Order Info */}
								<div className="grid grid-cols-2 gap-4">
									<div>
										<p className="text-sm font-medium text-muted-foreground">
											ID de Orden
										</p>
										<p className="font-mono text-sm">{selectedOrder.id}</p>
									</div>
									<div>
										<p className="text-sm font-medium text-muted-foreground">
											ID de Usuario
										</p>
										<p className="font-mono text-sm">{selectedOrder.userId}</p>
									</div>
									<div>
										<p className="text-sm font-medium text-muted-foreground">
											Fecha
										</p>
										<p className="text-sm">
											{new Date(selectedOrder.createdAt).toLocaleString()}
										</p>
									</div>
									<div>
										<p className="text-sm font-medium text-muted-foreground">
											Estado
										</p>
										<span
											className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusConfig(selectedOrder.status).className}`}
										>
											{(() => {
												const StatusIcon = getStatusConfig(
													selectedOrder.status
												).icon
												return <StatusIcon className="h-3.5 w-3.5" />
											})()}
											{selectedOrder.status}
										</span>
									</div>
								</div>

								{/* Items Table */}
								<div>
									<h4 className="font-medium mb-3">Productos</h4>
									<div className="border rounded-lg overflow-hidden">
										<table className="w-full">
											<thead className="bg-muted/50">
												<tr>
													<th className="text-left p-3 text-sm font-medium">
														Código
													</th>
													<th className="text-left p-3 text-sm font-medium">
														Producto
													</th>
													<th className="text-center p-3 text-sm font-medium">
														Cantidad
													</th>
													<th className="text-right p-3 text-sm font-medium">
														Precio Unit.
													</th>
													<th className="text-right p-3 text-sm font-medium">
														Subtotal
													</th>
												</tr>
											</thead>
											<tbody>
												{selectedOrder.items.map((item) => (
													<tr key={item.productId} className="border-t">
														<td className="p-3 text-sm">{item.productCode}</td>
														<td className="p-3 text-sm">{item.productName}</td>
														<td className="p-3 text-sm text-center">
															{item.quantity}
														</td>
														<td className="p-3 text-sm text-right">
															${item.unitPrice.toLocaleString('en-US')}
														</td>
														<td className="p-3 text-sm text-right font-medium">
															$
															{(item.unitPrice * item.quantity).toLocaleString(
																'en-US'
															)}
														</td>
													</tr>
												))}
											</tbody>
											<tfoot>
												<tr className="bg-muted/30">
													<td colSpan={4} className="p-3 text-sm font-medium">
														Total
													</td>
													<td className="p-3 text-sm font-bold text-right">
														${selectedOrder.total.toLocaleString('en-US')}
													</td>
												</tr>
											</tfoot>
										</table>
									</div>
								</div>
							</div>
						</AlertDialogDescription>
					)}
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
