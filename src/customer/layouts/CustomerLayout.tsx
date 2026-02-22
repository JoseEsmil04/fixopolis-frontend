import { useState } from 'react'
import { Outlet } from 'react-router'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { CustomerSidebar } from '../components/CustomerSidebar'
import { CustomLogo } from '@/components/custom/CustomLogo'

export const CustomerLayout = () => {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
	const [mobileOpen, setMobileOpen] = useState(false)

	return (
		<div className="min-h-screen bg-background">
			{/* Mobile Header */}
			<header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-4 lg:hidden">
				<div className="flex items-center gap-2">
					<CustomLogo width="14" height="14" fontSize="3" />
				</div>
				<Button
					variant="ghost"
					size="icon"
					className="rounded-full"
					onClick={() => setMobileOpen(true)}
				>
					<Menu className="h-5 w-5" />
				</Button>
			</header>

			{/* Mobile Sidebar */}
			<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
				<SheetContent
					side="left"
					className="w-64 p-0 border-r border-[#0D9668]/20 bg-[#1E293B] [&>button]:hidden data-[state=closed]:duration-150 data-[state=open]:duration-150"
				>
					<CustomerSidebar
						isCollapsed={false}
						onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
						isMobile
					/>
				</SheetContent>
			</Sheet>

			{/* Desktop Sidebar */}
			<div className="hidden lg:block fixed left-0 top-0 z-40 h-screen">
				<CustomerSidebar
					isCollapsed={sidebarCollapsed}
					onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
				/>
			</div>

			<main
				className={`transition-all duration-300 ${
					sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
				}`}
			>
				<Outlet />
			</main>
		</div>
	)
}
