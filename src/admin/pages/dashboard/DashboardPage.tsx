import { ActivityFeed } from '@/admin/components/ActivityFeed'
import { AdminHeader } from '@/admin/components/AdminHeader'
import { RecentOrders } from '@/admin/components/RecentOrders'
import { ServicesChart } from '@/admin/components/ServicesChart'
import { StatsCards } from '@/admin/components/StatsCards'

export const DashboardPage = () => {
	return (
		<div className="pl-64 transition-all duration-300">
			<AdminHeader />
			<main className="p-6">
				<div className="mb-6">
					<h2 className="text-2xl font-bold text-foreground">
						Bienvenido de vuelta
					</h2>
					<p className="text-muted-foreground">
						Aquí tienes un resumen de la actividad de Fixopolis
					</p>
				</div>

				{/* Stats */}
				<StatsCards />

				{/* Charts and Activity */}
				<div className="mt-6 grid gap-6 lg:grid-cols-5">
					<div className="lg:col-span-3">
						<ServicesChart />
					</div>
					<div className="lg:col-span-2">
						<ActivityFeed />
					</div>
				</div>

				{/* Recent Orders Table */}
				<div className="mt-6">
					<RecentOrders />
				</div>
			</main>
		</div>
	)
}
