import { CustomJumbotron } from '@/shop/components/CustomJumbotron'
import { ProductsGrid } from '@/shop/components/ProductsGrid'
import { useProducts } from '@/shop/hooks/useProducts'
import { useParams } from 'react-router'

export const CategoryPage = () => {
	const { categorySlug } = useParams()
	const { data, isLoading } = useProducts()

	if (isLoading || !data)
		return (
			<div>
				<h1>Cargando...</h1>
			</div>
		)
	return (
		<>
			<CustomJumbotron title={`Productos de ${categorySlug}`} />
			<ProductsGrid products={data.data || []} />
		</>
	)
}
