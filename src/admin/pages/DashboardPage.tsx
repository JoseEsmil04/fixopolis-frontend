import { RecentOrders } from '@/admin/components/RecentOrders'
import { ServicesChart } from '@/admin/components/ServicesChart'
import { StatsCards } from '@/admin/components/StatsCards'
import { AdminPageWrapper } from '@/admin/components/AdminPageWrapper'
import { useAuthStore } from '@/auth/store/auth.store'
import { useNavigate } from 'react-router'

export const DashboardPage = () => {
	const { user, userIsAdmin } = useAuthStore()
	const navigate = useNavigate()

	if (!userIsAdmin()) {
		navigate('/')
		return
	}

	return (
		<AdminPageWrapper>
			<div className="flex flex-col bg-muted/30 overflow-hidden">
				<div className="mb-4">
					<h2 className="text-xl lg:text-2xl font-bold text-foreground">
						Bienvenido de vuelta, {user!.name}
					</h2>
					<p className="text-sm lg:text-base text-muted-foreground">
						Aquí tienes un resumen de la actividad de Fixopolis
					</p>
				</div>
				<div className="mb-4">
					<StatsCards />
				</div>

				<div className="grid gap-4 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<ServicesChart />
					</div>
					<div className="">
						<RecentOrders />
					</div>
				</div>
			</div>
		</AdminPageWrapper>
	)
}
