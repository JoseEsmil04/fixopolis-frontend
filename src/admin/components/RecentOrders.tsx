import { Package, Clock } from 'lucide-react'

interface RecentOrder {
	id: string
	customer: string
	amount: string
	status: 'completed' | 'processing' | 'pending'
	date: string
	icon: React.ReactNode
}

const recentOrders: RecentOrder[] = [
	{
		id: '#ORD-001',
		customer: 'Juan Pérez',
		amount: '$150',
		status: 'completed',
		date: 'Hace 2 horas',
		icon: <Package className="h-4 w-4 text-green-600" />
	},
	{
		id: '#ORD-002',
		customer: 'María García',
		amount: '$80',
		status: 'processing',
		date: 'Hace 4 horas',
		icon: <Clock className="h-4 w-4 text-blue-600" />
	},
	{
		id: '#ORD-003',
		customer: 'Carlos López',
		amount: '$200',
		status: 'pending',
		date: 'Hace 6 horas',
		icon: <Package className="h-4 w-4 text-amber-600" />
	},
	{
		id: '#ORD-004',
		customer: 'Ana Martínez',
		amount: '$120',
		status: 'completed',
		date: 'Hace 8 horas',
		icon: <Package className="h-4 w-4 text-green-600" />
	},
	{
		id: '#ORD-005',
		customer: 'Roberto Sánchez',
		amount: '$95',
		status: 'processing',
		date: 'Hace 12 horas',
		icon: <Clock className="h-4 w-4 text-blue-600" />
	},
	{
		id: '#ORD-005',
		customer: 'Roberto Sánchez',
		amount: '$95',
		status: 'processing',
		date: 'Hace 12 horas',
		icon: <Clock className="h-4 w-4 text-blue-600" />
	},
	{
		id: '#ORD-005',
		customer: 'Roberto Sánchez',
		amount: '$95',
		status: 'processing',
		date: 'Hace 12 horas',
		icon: <Clock className="h-4 w-4 text-blue-600" />
	}
]

export const RecentOrders = () => {
	return (
		<div className="rounded-lg border bg-card p-4 h-full flex flex-col">
			<div className="flex items-center justify-between mb-4 ">
				<h3 className="text-lg font-semibold">Órdenes Recientes</h3>
				<Package className="h-5 w-5 text-muted-foreground" />
			</div>
			<div className="flex-1 overflow-hidden">
				<div className="h-full space-y-3">
					{recentOrders.map((order) => (
						<div
							key={order.id}
							className="flex items-center justify-between p-3 rounded-lg border border-border/50 transition-colors hover:bg-muted/50"
						>
							<div className="flex items-center space-x-3">
								{order.icon}
								<div className="min-w-0">
									<p className="font-medium text-sm truncate">{order.id}</p>
									<p className="text-xs text-muted-foreground truncate">
										{order.customer}
									</p>
								</div>
							</div>
							<div className="text-right">
								<p className="font-medium text-sm">{order.amount}</p>
								<p className="text-xs text-muted-foreground">{order.date}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
