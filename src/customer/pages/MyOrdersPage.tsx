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
import { Eye, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/auth/store/auth.store'
import { CustomLoading } from '@/components/custom/CustomLoading'
import { getOrdersByUserAction } from '../actions/get-orders-by-user'
import type { OrderResponse } from '../interfaces/order.response'
import { getStatusConfig } from '@/lib/getStatusConfig'

export const MyOrdersPage = () => {
	const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null)
	const { user } = useAuthStore()

	const { data: orders, isLoading } = useQuery({
		queryKey: ['orders', { userId: user!.id }],
		queryFn: () => getOrdersByUserAction(user!.id),
		enabled: !!user?.id
	})

	if (isLoading || !orders) return <CustomLoading item="Ordenes..." />

	if (orders.length === 0) {
		return (
			<div className="container mx-auto px-4 py-12">
				<div className="flex flex-col items-center justify-center gap-4 text-center">
					<div className="rounded-full bg-[#0D9668]/10 p-6">
						<ShoppingBag className="h-12 w-12 text-[#0D9668]" />
					</div>
					<h2 className="text-2xl font-bold text-foreground">
						No tienes órdenes
					</h2>
					<p className="text-muted-foreground">
						Cuando realices tu primera compra, podrás ver tus órdenes aquí
					</p>
				</div>
			</div>
		)
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-[#0D9668]">Mis Órdenes</h1>
				<p className="text-muted-foreground">Historial de tus compras</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-lg font-semibold text-[#6D28D9]">
						Historial de órdenes ({orders.length})
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow className="border-border hover:bg-transparent">
									<TableHead className="text-muted-foreground">Orden</TableHead>
									<TableHead className="text-muted-foreground">Fecha</TableHead>
									<TableHead className="text-muted-foreground">
										Estado
									</TableHead>
									<TableHead className="text-muted-foreground">
										Productos
									</TableHead>
									<TableHead className="text-muted-foreground text-right">
										Total
									</TableHead>
									<TableHead className="text-muted-foreground w-12"></TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{orders.map((order) => {
									const statusConfig = getStatusConfig(order.status)
									const StatusIcon = statusConfig.icon
									return (
										<TableRow
											key={order.id}
											className="border-border hover:bg-muted/50"
										>
											<TableCell className="font-medium text-[#0D9668]">
												#{order.id.slice(-6)}
											</TableCell>
											<TableCell className="text-foreground text-sm">
												{new Date(order.createdAt).toLocaleDateString('es-CO', {
													year: 'numeric',
													month: 'short',
													day: 'numeric'
												})}
											</TableCell>
											<TableCell>
												<span
													className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig.className}`}
												>
													<StatusIcon className="h-3.5 w-3.5" />
													{statusConfig.label}
												</span>
											</TableCell>
											<TableCell className="text-muted-foreground text-sm">
												{order.items.length}{' '}
												{order.items.length === 1 ? 'producto' : 'productos'}
											</TableCell>
											<TableCell className="font-medium text-foreground text-right">
												${order.total.toLocaleString('es-CO')}
											</TableCell>
											<TableCell>
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8"
													onClick={() => setSelectedOrder(order)}
												>
													<Eye className="h-4 w-4" />
												</Button>
											</TableCell>
										</TableRow>
									)
								})}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>

			{selectedOrder && (
				<Card className="mt-6">
					<CardHeader className="flex flex-row items-center justify-between gap-2">
						<CardTitle className="text-lg">
							Detalles de Orden #{selectedOrder.id.slice(-6)}
						</CardTitle>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setSelectedOrder(null)}
						>
							Cerrar
						</Button>
					</CardHeader>
					<CardContent>
						<div className="grid gap-3 grid-cols-2 mb-6">
							<div className="min-w-0">
								<p className="text-xs text-muted-foreground">ID de Orden</p>
								<p className="font-mono text-xs truncate">{selectedOrder.id}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">Fecha</p>
								<p className="text-xs">
									{new Date(selectedOrder.createdAt).toLocaleDateString('es-CO')}
								</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">Estado</p>
								<span
									className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${getStatusConfig(selectedOrder.status).className}`}
								>
									{(() => {
										const StatusIcon = getStatusConfig(
											selectedOrder.status
										).icon
										return <StatusIcon className="h-3 w-3" />
									})()}
									{getStatusConfig(selectedOrder.status).label}
								</span>
							</div>
							<div>
								<p className="text-xs text-muted-foreground">Total</p>
								<p className="text-base font-bold text-[#0D9668]">
									${selectedOrder.total.toLocaleString('es-CO')}
								</p>
							</div>
						</div>

						<div>
							<h4 className="font-medium mb-3 text-sm">Productos</h4>
							<div className="border rounded-lg overflow-x-auto">
								<table className="w-full min-w-[400px]">
									<thead className="bg-muted/50">
										<tr>
											<th className="text-left p-2 text-xs font-medium">
												Cód.
											</th>
											<th className="text-left p-2 text-xs font-medium">
												Producto
											</th>
											<th className="text-center p-2 text-xs font-medium">
												Cant.
											</th>
											<th className="text-right p-2 text-xs font-medium">
												Precio
											</th>
											<th className="text-right p-2 text-xs font-medium">
												Subt.
											</th>
										</tr>
									</thead>
									<tbody>
										{selectedOrder.items.map((item) => (
											<tr key={item.productId} className="border-t">
												<td className="p-2 text-xs text-muted-foreground">
													{item.productCode}
												</td>
												<td className="p-2 text-xs">{item.productName}</td>
												<td className="p-2 text-xs text-center">
													{item.quantity}
												</td>
												<td className="p-2 text-xs text-right">
													${item.unitPrice.toLocaleString('es-CO')}
												</td>
												<td className="p-2 text-xs text-right font-medium">
													$
													{(item.unitPrice * item.quantity).toLocaleString(
														'es-CO'
													)}
												</td>
											</tr>
										))}
									</tbody>
									<tfoot>
										<tr className="bg-muted/30">
											<td
												colSpan={4}
												className="p-2 text-xs font-medium text-right"
											>
												Total
											</td>
											<td className="p-2 text-xs font-bold text-right text-[#0D9668]">
												${selectedOrder.total.toLocaleString('es-CO')}
											</td>
										</tr>
									</tfoot>
								</table>
							</div>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
