import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle
} from '@/components/ui/sheet'
import { ShoppingCart, Menu } from 'lucide-react'
import { CustomLogo } from '@/components/custom/CustomLogo'
import { Link, useParams } from 'react-router'

export const CustomHeader = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { categorySlug: category } = useParams()

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

					{/* Actions */}
					<div className="flex items-center gap-2">
						<Link to="auth/login">
							<Button
								variant="ghost"
								className="hidden sm:flex text-white/70 hover:text-white hover:bg-white/10 rounded-full"
							>
								Iniciar sesión
							</Button>
						</Link>
						<Link to="admin">
							<Button className="hidden sm:flex bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-full">
								Panel Admin
							</Button>
						</Link>
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

						{/* Mobile menu */}
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
								className="w-75 bg-[#1E293B] border-white/10"
							>
								<SheetTitle className="font-serif text-white">Menú</SheetTitle>
								<div className="mt-6 flex flex-col gap-4">
									<nav className="flex flex-col gap-1">
										<Link
											to="/"
											className={`rounded-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
												category === undefined
													? 'bg-white/15 text-white'
													: 'text-white/70 hover:text-white hover:bg-white/5'
											}`}
										>
											Todos
										</Link>
										<Link
											to="category/soluciones-ambientales"
											className={`rounded-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
												category === 'soluciones-ambientales'
													? 'bg-[#0D9668]/25 text-white'
													: 'text-white/70 hover:text-white hover:bg-white/5'
											}`}
										>
											Soluciones Ambientales
										</Link>
									</nav>

									<div className="border-t border-white/10 pt-4 flex flex-col gap-2">
										<Link
											to="/auth"
											className="justify-start text-white/80 hover:text-white hover:bg-white/10 rounded-full"
										>
											Iniciar sesión
										</Link>

										<Button className="justify-start bg-[#6D28D9] hover:bg-[#5B21B6] text-white rounded-full">
											<Link to="/admin">Panel Admin</Link>
										</Button>
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</div>
		</header>
	)
}
