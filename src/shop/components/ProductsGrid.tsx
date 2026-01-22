import { useSearchParams } from 'react-router'
import { FilterToolbar } from './FilterToolbar'
import { ProductCard } from './ProductCard'
import type { Product } from '../interfaces/product.interface'

interface Props {
	products: Product[]
}

export const ProductsGrid = ({ products }: Props) => {
	console.log(products)
	const [searchParams] = useSearchParams()

	const maxPrice = Math.max(...products.map((p) => p.price))
	const priceMin = Number(searchParams.get('priceMin')) || 0
	const priceMax = Number(searchParams.get('priceMax')) || maxPrice
	const viewMode = (searchParams.get('view') as 'grid' | 'list') || 'grid'
	const searchQuery = searchParams.get('search') || ''
	const selectedCategory = searchParams.get('category') ?? 'todos'

	// Filter products based on URL params
	const filteredProducts = products.filter((product) => {
		const matchesCategory =
			selectedCategory === 'todos' || product.categoryName === selectedCategory
		const matchesPrice = product.price >= priceMin && product.price <= priceMax
		const matchesSearch =
			searchQuery === '' ||
			product.name.toLowerCase().includes(searchQuery.toLowerCase())

		return matchesCategory && matchesPrice && matchesSearch
	})

	return (
		<section>
			<FilterToolbar />
			<div className="container mx-auto px-4 py-8">
				{/* Product grid */}
				{filteredProducts.length > 0 ? (
					<div
						className={
							viewMode === 'grid'
								? 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
								: 'flex flex-col gap-4'
						}
					>
						{filteredProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								viewMode={viewMode}
							/>
						))}
					</div>
				) : (
					<div className="py-20 text-center rounded-xl border bg-slate-50">
						<div className="text-4xl mb-3">🔍</div>
						<p className="text-[#1E293B] font-medium">
							No se encontraron productos
						</p>
						<p className="text-sm text-muted-foreground mt-1">
							Intenta ajustar los filtros de búsqueda
						</p>
					</div>
				)}
			</div>
		</section>
	)
}
