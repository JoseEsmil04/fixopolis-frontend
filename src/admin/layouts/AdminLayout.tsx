import { Outlet } from 'react-router'
import { AdminSidebar } from '../components/AdminSideBar'
import { AdminHeader } from '../components/AdminHeader'
import { useState } from 'react'
import { Sheet, SheetContent } from '@/components/ui/sheet'

export const AdminLayout = () => {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)

	return (
		<div className="min-h-screen bg-background">
			<AdminHeader onMobileMenuToggle={() => setMobileOpen(true)} />
			{/* Mobile Sidebar */}
			<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
				<SheetContent side="left" className="w-64 p-0 border-r">
					<AdminSidebar
						isCollapsed={false}
						onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
					/>
				</SheetContent>
			</Sheet>
			{/* Desktop Sidebar */}
			<div className="hidden lg:block fixed left-0 top-0 z-40 h-screen">
				<AdminSidebar
					isCollapsed={sidebarCollapsed}
					onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
				/>
			</div>
			<main
				className={`admin-main pt-2 transition-all duration-300 ${
					sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
				}`}
			>
				<Outlet />
			</main>
		</div>
	)
}
