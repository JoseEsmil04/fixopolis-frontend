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
import { Link, useLocation } from 'react-router'
import { useAuthStore } from '@/auth/store/auth.store'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'

const navItems = [
	{ icon: LayoutDashboard, label: 'Dashboard', to: '/admin' },
	{ icon: Users, label: 'Clientes', to: '/admin/customers' },
	{ icon: ShoppingCart, label: 'Órdenes', to: '/admin/orders' },
	{ icon: Package, label: 'Productos', to: '/admin/products' },
	{ icon: Settings, label: 'Configuración', to: '/admin/settings' }
]

interface Props {
	isCollapsed: boolean
	onToggle: () => void
	isMobile?: boolean
}

export function AdminSidebar({ isCollapsed, onToggle }: Props) {
	const { pathname } = useLocation()

	const { user, logout } = useAuthStore()

	return (
		<aside
			data-collapsed={isCollapsed}
			className={cn(
				'fixed left-0 top-0 z-40 h-screen border-r border-border bg-sidebar transition-all duration-300',
				isCollapsed ? 'w-20' : 'w-64'
			)}
		>
			<div className="flex h-full flex-col">
				{/* Logo */}
				<div className="flex h-16 items-center justify-between border-b border-border px-2">
					<Link to="/" className="flex-1 flex justify-center">
						{isCollapsed ? (
							<span className="text-2xl font-bold text-primary hover:text-[#0D9668] hover:opacity-80">
								F
							</span>
						) : (
							<span className="text-2xl font-bold text-primary hover:text-[#0D9668] hover:opacity-80">
								Fixopolis
							</span>
						)}
					</Link>
					<button
						type="button"
						onClick={() => onToggle()}
						className="rounded-md p-1 cursor-pointer text-muted-foreground transition-colors font-bold hover:text-secondary hidden lg:block"
					>
						<ChevronLeft
							className={cn(
								'h-5 w-5 transition-transform',
								isCollapsed && 'rotate-180'
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
								{!isCollapsed && <span>{item.label}</span>}
							</Link>
						)
					})}
				</nav>

				{/* User section */}
				<div className="border-t border-border p-3">
					<div
						className={cn(
							'flex items-center gap-3 rounded-lg px-3 py-2.5',
							isCollapsed && 'justify-center px-0'
						)}
					>
						<div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
							<span className="text-sm font-semibold">{user!.name.at(0)}</span>
						</div>
						{!isCollapsed && (
							<div className="flex-1 overflow-hidden">
								<p className="truncate text-sm font-medium text-foreground">
									{user!.name}
								</p>
								<p className="truncate text-xs text-muted-foreground">
									{user!.email}
								</p>
							</div>
						)}
						{!isCollapsed && (
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<button
										type="button"
										className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
									>
										<LogOut className="h-4 w-4" />
									</button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Confirmar cierre de sesión
										</AlertDialogTitle>

										<AlertDialogDescription>
											Estás a punto de cerrar tu sesión actual. Deberás iniciar
											sesión nuevamente para acceder a tu cuenta.
										</AlertDialogDescription>
									</AlertDialogHeader>

									<AlertDialogFooter>
										<AlertDialogCancel variant="outline">
											Permanecer en la sesión
										</AlertDialogCancel>

										<AlertDialogAction
											variant="secondaryColor"
											onClick={() => logout()}
										>
											Cerrar sesión
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}
					</div>
				</div>
			</div>
		</aside>
	)
}
