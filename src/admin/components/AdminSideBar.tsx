import { cn } from '@/lib/utils'
import {
	LayoutDashboard,
	Users,
	ShoppingCart,
	Package,
	Settings,
	LogOut,
	ChevronLeft
} from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Bolt } from 'lucide-react'
import { useAuthStore } from '@/auth/store/auth.store'

const navItems = [
	{ icon: LayoutDashboard, label: 'Dashboard', to: '/admin' },
	{ icon: Users, label: 'Clientes', to: '/admin/customers' },
	{ icon: ShoppingCart, label: 'Órdenes', to: '/admin/orders' },
	{ icon: Package, label: 'Productos', to: '/admin/adminProducts' },
	{ icon: Settings, label: 'Configuración', to: '/admin/settings' }
]

export function AdminSidebar() {
	const { pathname } = useLocation()
	const [collapsed, setCollapsed] = useState(false)
	const { user } = useAuthStore()

	return (
		<aside
			className={cn(
				'fixed left-0 top-0 z-40 h-screen border-r border-border bg-sidebar transition-all duration-300',
				collapsed ? 'w-20' : 'w-64'
			)}
		>
			<div className="flex h-full flex-col">
				{/* Logo */}
				<div className="flex h-16 items-center justify-between border-b border-border px-4">
					<Link to="/" className="flex items-center gap-3">
						<div className="flex h-9 w-9 items-center justify-center">
							<Bolt className="h-7 w-7 text-[#6D28D9]" />
						</div>
						{!collapsed && (
							<span className="text-lg font-extrabold font-gantari tracking-tight text-[#6D28D9]">
								Fixopolis
							</span>
						)}
					</Link>
					<button
						type="button"
						onClick={() => setCollapsed(!collapsed)}
						className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
					>
						<ChevronLeft
							className={cn(
								'h-5 w-5 transition-transform',
								collapsed && 'rotate-180'
							)}
						/>
					</button>
				</div>

				{/* Navigation */}
				<nav className="flex-1 space-y-1 p-3">
					{navItems.map((item) => {
						const isActive =
							item.to === '/admin'
								? pathname === '/admin'
								: pathname.startsWith(item.to)
						return (
							<Link
								key={item.to}
								to={item.to}
								className={cn(
									'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
									isActive
										? 'bg-primary text-primary-foreground'
										: 'text-muted-foreground hover:bg-muted hover:text-foreground'
								)}
							>
								<item.icon className="h-5 w-5 shrink-0" />
								{!collapsed && <span>{item.label}</span>}
							</Link>
						)
					})}
				</nav>

				{/* User section */}
				<div className="border-t border-border p-3">
					<div
						className={cn(
							'flex items-center gap-3 rounded-lg px-3 py-2.5',
							collapsed && 'justify-center px-0'
						)}
					>
						<div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
							<span className="text-sm font-semibold">{user!.name.at(0)}</span>
						</div>
						{!collapsed && (
							<div className="flex-1 overflow-hidden">
								<p className="truncate text-sm font-medium text-foreground">
									{user!.name}
								</p>
								<p className="truncate text-xs text-muted-foreground">
									{user!.email}
								</p>
							</div>
						)}
						{!collapsed && (
							<button
								type="button"
								className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
							>
								<LogOut className="h-4 w-4" />
							</button>
						)}
					</div>
				</div>
			</div>
		</aside>
	)
}
