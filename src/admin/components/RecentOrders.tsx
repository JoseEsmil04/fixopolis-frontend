import type { OrderResponse } from '@/customer/interfaces/order.response'
import { getStatusConfig } from '@/lib/getStatusConfig'
import { Package } from 'lucide-react'

interface Props {
	orders: OrderResponse[]
}

export const RecentOrders = ({ orders }: Props) => {
	return (
		<div className="rounded-lg border bg-card p-4 h-full flex flex-col">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-lg font-semibold">Órdenes Recientes</h3>
				<Package className="h-5 w-5 text-muted-foreground" />
			</div>
			<div className="flex-1 overflow-hidden">
				<div className="h-full space-y-2">
					{orders.map((order) => {
						const statusConfig = getStatusConfig(order.status)
						const StatusIcon = statusConfig.icon

						return (
							<div
								key={order.id}
								className="flex items-center justify-between p-3 rounded-lg border border-border/50 transition-colors hover:bg-muted/50"
							>
								<div className="flex items-center gap-3 min-w-0">
									<div
										className={`p-2 rounded-full shrink-0 ${statusConfig.className}`}
									>
										<StatusIcon className="h-4 w-4" />
									</div>
									<div className="min-w-0">
										<p className="font-medium text-sm truncate">
											#{order.id.slice(-6)}
										</p>
										<p className="text-xs text-muted-foreground">
											{new Date(order.createdAt).toLocaleDateString('es-CO', {
												month: 'short',
												day: 'numeric',
												hour: '2-digit',
												minute: '2-digit'
											})}
										</p>
									</div>
								</div>
								<div className="text-right shrink-0">
									<p className="font-semibold text-sm text-[#1E293B]">
										${order.total.toLocaleString('es-CO')}
									</p>
									<span
										className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${statusConfig.className}`}
									>
										{statusConfig.label}
									</span>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
