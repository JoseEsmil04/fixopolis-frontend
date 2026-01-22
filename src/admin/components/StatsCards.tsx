import { Users, Package, DollarSign, Clock } from 'lucide-react'
import { StatCard } from './StatCard'
import type { Stats } from '../interfaces/stats.interface'

export const StatsCards = () => {
	const stats: Stats[] = [
		{
			title: 'Usuarios Activos',
			value: '2,847',
			change: '+12.5%',
			trend: 'up',
			icon: <Users className="h-5 w-5" />
		},
		{
			title: 'Órdenes Completadas',
			value: '1,234',
			change: '+8.2%',
			trend: 'up',
			icon: <Package className="h-5 w-5" />
		},
		{
			title: 'Ingresos',
			value: '$45,678',
			change: '+23.1%',
			trend: 'up',
			icon: <DollarSign className="h-5 w-5" />
		},
		{
			title: 'Tiempo Promedio',
			value: '2.4h',
			change: '-5.3%',
			trend: 'down',
			icon: <Clock className="h-5 w-5" />
		}
	]

	return (
		<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
			{stats.map((stat) => (
				<StatCard key={stat.title} {...stat} />
			))}
		</div>
	)
}
