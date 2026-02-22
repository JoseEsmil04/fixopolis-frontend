import type { Product } from '@/shop/interfaces/product.interface'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Eye } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useAuthStore } from '@/auth/store/auth.store'

interface Props {
	product: Product
	viewMode?: 'grid' | 'list'
}

export const ProductCard = ({ product, viewMode = 'grid' }: Props) => {
	const navigate = useNavigate()
	const { userIsAdmin, userIsEmployee } = useAuthStore()
	const isAdminOrEmployee = userIsAdmin() || userIsEmployee()
	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('es-DO', {
			style: 'currency',
			currency: 'DOP',
			minimumFractionDigits: 0
		}).format(price)
	}

	const handleClick = () => {
		navigate(`/products/${product.id}`)
	}
	const isLowStock = product.stock > 0 && product.stock <= 5
	const isOutOfStock = !product.isAvailable || product.stock === 0 || product.stock === undefined || product.stock === null

	if (viewMode === 'list') {
		return (
			<article className="group rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-[#6D28D9]/20">
				{/* Image */}
				<div className="relative w-full sm:w-48 aspect-square sm:aspect-auto sm:h-40 shrink-0 overflow-hidden bg-slate-50">
					<img
						src={product.imageUrl || '/placeholder.svg'}
						alt={product.name}
						className="h-full w-full object-contain p-2 sm:p-4 transition-transform duration-500 group-hover:scale-110"
						onClick={handleClick}
					/>
					{isOutOfStock && (
						<Badge
							variant="secondary"
							className="absolute top-2 left-2 bg-slate-800 hover:bg-slate-800 text-white text-xs"
						>
							No disponible
						</Badge>
					)}
				</div>

				{/* Info */}
				<div className="flex-1 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
					<div className="flex-1 min-w-0">
						<Badge
							variant="secondary"
							className="mb-1.5 sm:mb-2 bg-[#0D9668]/10 text-[#0D9668] hover:bg-[#0D9668]/10 text-xs font-medium"
						>
							{product.categoryName}
						</Badge>
						<h3 className="font-serif font-semibold text-[#1E293B] group-hover:text-[#6D28D9] transition-colors text-sm sm:text-base line-clamp-2">
							{product.name}
						</h3>
						<p className="mt-0.5 sm:mt-1 font-mono text-xs text-muted-foreground">
							SKU: {product.code}
						</p>
						<p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-1 sm:line-clamp-2">
							{product.description}
						</p>
					</div>

					<div className="flex items-center justify-between sm:flex-col sm:items-end sm:gap-2">
						<p className="font-serif text-lg sm:text-xl font-bold text-[#1E293B]">
							{formatPrice(product.price)}
						</p>
						{isAdminOrEmployee ? (
							<Button
								className="bg-[#0D9668] hover:bg-[#0B7A54] gap-1.5 sm:gap-2 h-9 sm:h-10 text-xs sm:text-sm"
								onClick={(e) => {
									e.stopPropagation()
									navigate(`/products/${product.id}`)
								}}
							>
								<Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
								<span className="hidden sm:inline">Detalles</span>
							</Button>
						) : (
							<Button
								className="bg-[#6D28D9] hover:bg-[#5B21B6] gap-1.5 sm:gap-2 h-9 sm:h-10 text-xs sm:text-sm"
								disabled={isOutOfStock}
							>
								<ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
								<span className="hidden sm:inline">Agregar</span>
							</Button>
						)}
					</div>
				</div>
			</article>
		)
	}

	// Grid view (default)
	return (
		<article
			className="group rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-[#6D28D9]/20 cursor-pointer"
			onClick={handleClick}
		>
				{/* Image */}
				<div className="relative aspect-square overflow-hidden bg-slate-50">
					<img
						src={product.imageUrl || '/placeholder.svg'}
						alt={product.name}
						className="h-full w-full object-contain p-4 sm:p-6 lg:p-8 transition-transform duration-500 group-hover:scale-110"
					/>
					{/* Badges */}
					<div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1">
						{isLowStock && (
							<Badge className="bg-amber-500 hover:bg-amber-500 text-white text-[10px] sm:text-xs">
								¡Últimas!
							</Badge>
						)}
						{isOutOfStock && (
							<Badge
								variant="secondary"
								className="bg-slate-800 hover:bg-slate-800 text-white text-[10px] sm:text-xs"
							>
								No disponible
							</Badge>
						)}
					</div>
				</div>

				{/* Info */}
				<div className="p-3 sm:p-4">
					<Badge
						variant="secondary"
						className="mb-1.5 sm:mb-2 bg-[#0D9668]/10 text-[#0D9668] hover:bg-[#0D9668]/10 text-[10px] sm:text-xs font-medium"
					>
						{product.categoryName}
					</Badge>
					<h3 className="font-serif font-semibold text-[#1E293B] line-clamp-2 group-hover:text-[#6D28D9] transition-colors leading-tight text-sm sm:text-base">
						{product.name}
					</h3>
					<p className="mt-0.5 sm:mt-1 font-mono text-[10px] sm:text-xs text-muted-foreground">
						SKU: {product.code}
					</p>
					<div className="mt-2 sm:mt-3 flex items-center justify-between">
						<p className="font-serif text-lg sm:text-xl font-bold text-[#1E293B]">
							{formatPrice(product.price)}
						</p>
						{isAdminOrEmployee ? (
							<Button
								size="icon"
								className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#0D9668] hover:bg-[#0B7A54] transition-transform hover:scale-110"
								onClick={(e) => {
									e.stopPropagation()
									navigate(`/products/${product.id}`)
								}}
							>
								<Eye className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
								<span className="sr-only">Detalles</span>
							</Button>
						) : (
							<Button
								size="icon"
								className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-[#6D28D9] hover:bg-[#5B21B6] transition-transform hover:scale-110"
								disabled={isOutOfStock}
							>
								<ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
								<span className="sr-only">Agregar al carrito</span>
							</Button>
						)}
					</div>
				</div>
			</article>
	)
}
