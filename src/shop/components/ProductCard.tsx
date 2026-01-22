import type { Product } from '@/shop/interfaces/product.interface'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'

interface Props {
	product: Product
	viewMode?: 'grid' | 'list'
}

export const ProductCard = ({ product, viewMode = 'grid' }: Props) => {
	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('es-DO', {
			style: 'currency',
			currency: 'DOP',
			minimumFractionDigits: 0
		}).format(price)
	}

	const isLowStock = product.stock > 0 && product.stock <= 5
	const isOutOfStock = product.stock === 0

	if (viewMode === 'list') {
		return (
			<article className="group rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-[#6D28D9]/20">
				<a href="#" className="flex flex-col sm:flex-row">
					{/* Image */}
					<div className="relative w-full sm:w-48 aspect-square sm:aspect-auto sm:h-40 shrink-0 overflow-hidden bg-slate-50">
						<img
							src={product.imageUrl || '/placeholder.svg'}
							alt={product.name}
							className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
						/>
						{isOutOfStock && (
							<Badge
								variant="secondary"
								className="absolute top-2 left-2 bg-slate-800 hover:bg-slate-800 text-white text-xs"
							>
								Agotado
							</Badge>
						)}
					</div>

					{/* Info */}
					<div className="flex-1 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div className="flex-1">
							<Badge
								variant="secondary"
								className="mb-2 bg-[#0D9668]/10 text-[#0D9668] hover:bg-[#0D9668]/10 text-xs font-medium"
							>
								{product.categoryName}
							</Badge>
							<h3 className="font-serif font-semibold text-[#1E293B] group-hover:text-[#6D28D9] transition-colors">
								{product.name}
							</h3>
							<p className="mt-1 font-mono text-xs text-muted-foreground">
								SKU: {product.code}
							</p>
							<p className="mt-1 text-sm text-muted-foreground line-clamp-2">
								{product.description}
							</p>
						</div>

						<div className="flex items-center gap-4 sm:flex-col sm:items-end">
							<p className="font-serif text-xl font-bold text-[#1E293B]">
								{formatPrice(product.price)}
							</p>
							<Button
								className="bg-[#6D28D9] hover:bg-[#5B21B6] gap-2"
								disabled={isOutOfStock}
							>
								<ShoppingCart className="h-4 w-4" />
								<span className="hidden sm:inline">Agregar</span>
							</Button>
						</div>
					</div>
				</a>
			</article>
		)
	}

	// Grid view (default)
	return (
		<article className="group rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg hover:border-[#6D28D9]/20">
			<a href="#" className="block">
				{/* Image */}
				<div className="relative aspect-square overflow-hidden bg-slate-50">
					<img
						src={product.imageUrl || '/placeholder.svg'}
						alt={product.name}
						className="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
					/>
					{/* Badges */}
					<div className="absolute top-3 left-3 flex flex-col gap-1.5">
						{isLowStock && (
							<Badge className="bg-amber-500 hover:bg-amber-500 text-white text-xs">
								¡Últimas unidades!
							</Badge>
						)}
						{isOutOfStock && (
							<Badge
								variant="secondary"
								className="bg-slate-800 hover:bg-slate-800 text-white text-xs"
							>
								Agotado
							</Badge>
						)}
					</div>
				</div>

				{/* Info */}
				<div className="p-4">
					<Badge
						variant="secondary"
						className="mb-2 bg-[#0D9668]/10 text-[#0D9668] hover:bg-[#0D9668]/10 text-xs font-medium"
					>
						{product.categoryName}
					</Badge>
					<h3 className="font-serif font-semibold text-[#1E293B] line-clamp-2 group-hover:text-[#6D28D9] transition-colors leading-tight">
						{product.name}
					</h3>
					<p className="mt-1 font-mono text-xs text-muted-foreground">
						SKU: {product.code}
					</p>
					<div className="mt-3 flex items-center justify-between">
						<p className="font-serif text-xl font-bold text-[#1E293B]">
							{formatPrice(product.price)}
						</p>
						<Button
							size="icon"
							className="h-9 w-9 rounded-full bg-[#6D28D9] hover:bg-[#5B21B6] transition-transform hover:scale-110"
							disabled={isOutOfStock}
						>
							<ShoppingCart className="h-4 w-4" />
							<span className="sr-only">Agregar al carrito</span>
						</Button>
					</div>
				</div>
			</a>
		</article>
	)
}
