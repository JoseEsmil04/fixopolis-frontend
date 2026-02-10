import { Outlet } from 'react-router'
import { AdminSidebar } from '../components/AdminSideBar'
import { AdminHeader } from '../components/AdminHeader'
import { useState } from 'react'

export const AdminLayout = () => {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
	return (
		<div className="h-screen bg-background">
			<AdminHeader />
			<AdminSidebar
				isCollapsed={sidebarCollapsed}
				onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
			/>
			<Outlet />
		</div>
	)
}
