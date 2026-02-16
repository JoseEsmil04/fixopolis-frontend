import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ShoppingCart, Menu } from 'lucide-react'
import { CustomLogo } from '@/components/custom/CustomLogo'
import { Link, useParams } from 'react-router'
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

export const CustomHeader = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { categorySlug: category } = useParams()
	const { authStatus, userIsAdmin, userIsEmployee, userisCustomer, logout } =
		useAuthStore()

	return (
		<header className="sticky top-0 z-50 w-full bg-[#1E293B] shadow-lg">
			<div className="container mx-auto px-4">
				<div className="flex h-16 items-center justify-between gap-4">
					{/* Logo */}
					<CustomLogo />

					{/* Desktop Nav */}
					<nav className="hidden lg:flex items-center gap-1">
						<Link
							to="/"
							className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
								category === undefined
									? 'bg-[#0D9668]/25 text-white'
									: 'text-white/70 hover:text-white hover:bg-white/5'
							}`}
						>
							Todos
						</Link>
						<Link
							to="/category/Soluciones Ambientales"
							className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
								category === 'Soluciones Ambientales'
									? 'bg-[#0D9668]/25 text-white'
									: 'text-white/70 hover:text-white hover:bg-white/5'
							}`}
						>
							Soluciones Ambientales
						</Link>
						<Link
							to="/category/Interiores"
							className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
								category === 'Interiores'
									? 'bg-[#0D9668]/25 text-white'
									: 'text-white/70 hover:text-white hover:bg-white/5'
							}`}
						>
							Interiores
						</Link>
						<Link
							to="/category/Obra Gris"
							className={`px-4 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
								category === 'Obra Gris'
									? 'bg-[#0D9668]/25 text-white'
									: 'text-white/70 hover:text-white hover:bg-white/5'
							}`}
						>
							Obra Gris
						</Link>
					</nav>

					{/* Actions - Solo visibles en desktop (lg+) */}
					<div className="hidden lg:flex items-center gap-2">
						{authStatus === 'not-authenticated' ? (
							<Link to="auth/login">
								<Button
									variant="ghost"
									className="bg-[#1E293B] text-white/90 hover:text-white hover:bg-[#0D9668]/25 rounded-full"
								>
									Iniciar sesión
								</Button>
							</Link>
						) : (
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										variant="default"
										className="bg-[#1E293B] text-white/90 hover:text-white hover:bg-[#0D9668]/25 rounded-full"
									>
										Cerrar sesión
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Estas seguro de que quieres cerrar sesión?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This will permanently delete
											your account from our servers.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel variant="destructive">
											Cancelar
										</AlertDialogCancel>
										<AlertDialogAction
											variant="secondaryColor"
											onClick={() => logout()}
										>
											Si, Cerrar sesión
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						)}

						{(userIsAdmin() || userIsEmployee()) && (
							<Link to="admin">
								<Button className="bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-full">
									Panel Admin
								</Button>
							</Link>
						)}

						{userisCustomer() && (
							<Button
								variant="ghost"
								size="icon"
								className="relative text-white hover:bg-white/10 rounded-full"
							>
								<ShoppingCart className="h-5 w-5" />
								<Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-[#0D9668] p-0 text-xs text-white flex items-center justify-center border-2 border-[#1E293B]">
									3
								</Badge>
								<span className="sr-only">Carrito</span>
							</Button>
						)}
					</div>

					{/* Mobile menu button */}
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="lg:hidden text-white hover:bg-white/10 rounded-full"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">Menú</span>
							</Button>
						</SheetTrigger>
						<SheetContent
							side="right"
							className="w-full sm:w-80 bg-[#1E293B] border-white/10 p-0"
						>
							<div className="flex flex-col h-full">
								<div className="p-4 border-b border-white/10 flex flex-col items-center">
									<CustomLogo width="8" height="8" />
								</div>
								<div className="flex-1 overflow-y-auto py-4">
									<nav className="flex flex-col gap-1 px-4">
										<Link
											to="/"
											onClick={() => setIsOpen(false)}
											className={`rounded-full px-4 py-3 text-center text-sm font-medium transition-colors ${
												category === undefined
													? 'bg-white/15 text-white'
													: 'text-white/70 hover:text-white hover:bg-white/5'
											}`}
										>
											Todos
										</Link>
										<Link
											to="/category/Soluciones%20Ambientales"
											onClick={() => setIsOpen(false)}
											className={`rounded-full px-4 py-3 text-center text-sm font-medium transition-colors ${
												category === 'Soluciones Ambientales'
													? 'bg-[#0D9668]/25 text-white'
													: 'text-white/70 hover:text-white hover:bg-white/5'
											}`}
										>
											Soluciones Ambientales
										</Link>
										<Link
											to="/category/Interiores"
											onClick={() => setIsOpen(false)}
											className={`rounded-full px-4 py-3 text-center text-sm font-medium transition-colors ${
												category === 'Interiores'
													? 'bg-[#0D9668]/25 text-white'
													: 'text-white/70 hover:text-white hover:bg-white/5'
											}`}
										>
											Interiores
										</Link>
										<Link
											to="/category/Obra%20Gris"
											onClick={() => setIsOpen(false)}
											className={`rounded-full px-4 py-3 text-center text-sm font-medium transition-colors ${
												category === 'Obra Gris'
													? 'bg-[#0D9668]/25 text-white'
													: 'text-white/70 hover:text-white hover:bg-white/5'
											}`}
										>
											Obra Gris
										</Link>
									</nav>
								</div>

								<div className="p-4 border-t border-white/10 space-y-3">
									{userisCustomer() && (
										<Link
											to="/cart"
											onClick={() => setIsOpen(false)}
											className="flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium text-white hover:bg-white/5 transition-colors w-full"
										>
											<ShoppingCart className="h-5 w-5" />
											Mi Carrito
											<Badge className="h-5 w-5 rounded-full bg-[#0D9668] p-0 text-xs text-white flex items-center justify-center">
												3
											</Badge>
										</Link>
									)}

									{authStatus === 'not-authenticated' ? (
										<Link
											to="/auth/login"
											onClick={() => setIsOpen(false)}
											className="flex items-center justify-center rounded-full px-4 py-3 text-sm font-medium bg-[#6D28D9] hover:bg-[#5B21B6] text-white transition-colors w-full"
										>
											Iniciar sesión
										</Link>
									) : (
										<button
											onClick={() => {
												logout()
												setIsOpen(false)
											}}
											className="flex items-center justify-center rounded-full px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors w-full"
										>
											Cerrar sesión
										</button>
									)}

									{(userIsAdmin() || userIsEmployee()) && (
										<Link
											to="/admin"
											onClick={() => setIsOpen(false)}
											className="flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-medium bg-[#0D9668] hover:bg-[#0A7C56] text-white transition-colors w-full"
										>
											Panel Admin
										</Link>
									)}
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	)
}
