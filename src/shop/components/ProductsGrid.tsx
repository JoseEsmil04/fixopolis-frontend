import { useSearchParams } from 'react-router'
import { FilterToolbar } from './FilterToolbar'
import { ProductCard } from './ProductCard'
import type { Product } from '../interfaces/product.interface'

interface Props {
	products: Product[]
}

export const ProductsGrid = ({ products }: Props) => {
	const [searchParams] = useSearchParams()
	const viewMode = (searchParams.get('view') as 'grid' | 'list') || 'grid'

	return (
		<section>
			<FilterToolbar />
			<div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
				{/* Product grid */}
				{products.length > 0 ? (
					<div
						className={
							viewMode === 'grid'
								? 'grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
								: 'flex flex-col gap-3 sm:gap-4'
						}
					>
						{products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								viewMode={viewMode}
							/>
						))}
					</div>
				) : (
					<div className="py-12 sm:py-20 text-center rounded-xl border bg-slate-50 mx-3 sm:mx-0">
						<div className="text-3xl sm:text-4xl mb-3">🔍</div>
						<p className="text-[#1E293B] font-medium text-sm sm:text-base">
							No se encontraron productos
						</p>
						<p className="text-xs sm:text-sm text-muted-foreground mt-1">
							Intenta ajustar los filtros de búsqueda
						</p>
					</div>
				)}
			</div>
		</section>
	)
}
