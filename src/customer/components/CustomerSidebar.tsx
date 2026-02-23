import { useAuthStore } from '@/auth/store/auth.store'
import FixopolisLogo from '@/assets/FixopolisLogo.webp'
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
import { cn } from '@/lib/utils'
import {
	User,
	ShoppingCart,
	Settings,
	ChevronLeft,
	LogOut,
	History,
	X
} from 'lucide-react'
import { Link, useLocation } from 'react-router'

const navItems = [
	{ icon: User, label: 'Mi Perfil', to: '/customer/profile' },
	{ icon: ShoppingCart, label: 'Mi Carrito', to: '/customer/cart' },
	{ icon: History, label: 'Mis Órdenes', to: '/customer/my-orders' },
	{ icon: Settings, label: 'Configuración', to: '/customer/settings' }
]

interface Props {
	isCollapsed?: boolean
	onToggle?: () => void
	isMobile?: boolean
}

export function CustomerSidebar({
	isCollapsed = false,
	onToggle,
	isMobile
}: Props) {
	const { pathname } = useLocation()
	const { user, logout } = useAuthStore()

	const handleNavClick = () => {
		if (isMobile && onToggle) {
			onToggle()
		}
	}

	return (
		<aside
			data-collapsed={isCollapsed}
			className={cn(
				'fixed left-0 top-0 z-40 h-screen  border-border bg-[#1E293B] transition-all duration-300',
				isCollapsed ? 'w-20' : 'w-64'
			)}
		>
			<div className="flex h-full flex-col">
				<div className="flex h-16 items-center justify-between border-b border-b-white/10 px-2">
					<Link to="/" className="flex flex-1 items-center justify-center gap-2">
						<img
							src={FixopolisLogo}
							alt="Fixopolis"
							className={cn('h-10 w-10 object-contain', isCollapsed && 'h-10 w-10')}
						/>
						{!isCollapsed && (
							<span className="text-2xl font-bold text-white hover:text-[#0D9668] hover:opacity-80">
								Fixopolis
							</span>
						)}
					</Link>
					{onToggle && isMobile && (
						<button
							type="button"
							onClick={() => onToggle()}
							className="rounded-md p-1 cursor-pointer text-white/70 transition-colors font-bold hover:text-white lg:hidden"
						>
							<X className="h-6 w-6" />
						</button>
					)}
					{onToggle && !isMobile && (
						<button
							type="button"
							onClick={() => onToggle()}
							className="rounded-md p-1 cursor-pointer text-white/70 transition-colors font-bold hover:text-white hidden lg:block"
						>
							<ChevronLeft
								className={cn(
									'h-5 w-5 transition-transform',
									isCollapsed && 'rotate-180'
								)}
							/>
						</button>
					)}
				</div>

				<nav className="flex-1 space-y-1 p-3">
					{navItems.map((item) => {
						const isActive =
							pathname === item.to || pathname.startsWith(item.to + '/')
						return (
							<Link
								key={item.to}
								to={item.to}
								onClick={handleNavClick}
								className={cn(
									'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
									isActive
										? 'bg-[#0D9668]/25 text-white'
										: 'text-white/70 hover:text-white hover:bg-white/5'
								)}
							>
								<item.icon className="h-5 w-5 shrink-0" />
								{!isCollapsed && <span>{item.label}</span>}
							</Link>
						)
					})}
				</nav>

				<div className="border-t border-white/10 p-3">
					<div
						className={cn(
							'flex items-center gap-3 rounded-lg px-3 py-2.5',
							isCollapsed && 'justify-center px-0'
						)}
					>
						<div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6D28D9] text-white">
							<span className="text-sm font-semibold">{user?.name.at(0)}</span>
						</div>
						{!isCollapsed && (
							<div className="flex-1 overflow-hidden">
								<p className="truncate text-sm font-medium text-white">
									{user?.name}
								</p>
								<p className="truncate text-xs text-white/60">{user?.email}</p>
							</div>
						)}
					</div>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<button
								type="button"
								className={cn(
									'mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/5 hover:text-white',
									isCollapsed && 'justify-center px-0'
								)}
							>
								<LogOut className="h-5 w-5 shrink-0" />
								{!isCollapsed && <span>Cerrar sesión</span>}
							</button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Confirmar cierre de sesión</AlertDialogTitle>

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
				</div>
			</div>
		</aside>
	)
}
