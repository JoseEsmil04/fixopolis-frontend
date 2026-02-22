import { CheckCircle, Package, XCircle, Clock } from 'lucide-react'

export const getStatusConfig = (status: string) => {
	switch (status) {
		case 'Paid':
			return {
				icon: CheckCircle,
				label: 'Pagado',
				className: 'bg-green-500/15 text-green-600'
			}
		case 'Pending':
			return {
				icon: Clock,
				label: 'Pendiente',
				className: 'bg-amber-500/15 text-amber-600'
			}
		case 'Cancelled':
			return {
				icon: XCircle,
				label: 'Cancelado',
				className: 'bg-red-500/15 text-red-600'
			}
		default:
			return {
				icon: Package,
				label: status,
				className: 'bg-muted text-muted-foreground'
			}
	}
}
