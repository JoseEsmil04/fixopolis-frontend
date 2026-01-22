import { Outlet } from 'react-router'
import { AdminSidebar } from '../components/AdminSideBar'

export const AdminLayout = () => {
	return (
		<div className="min-h-screen bg-background">
			<AdminSidebar />
			<Outlet />
		</div>
	)
}
