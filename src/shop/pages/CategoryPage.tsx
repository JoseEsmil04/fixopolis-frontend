import { CustomJumbotron } from '@/shop/components/CustomJumbotron'
import { ProductsGrid } from '@/shop/components/ProductsGrid'
import { CustomLoading } from '@/components/custom/CustomLoading'
import { useProducts } from '@/shop/hooks/useProducts'
import { useParams } from 'react-router'

export const CategoryPage = () => {
	const { categorySlug } = useParams()
	const { data, isLoading } = useProducts()

	if (isLoading || !data) return <CustomLoading item="productos" />
	return (
		<>
			<CustomJumbotron title={`Productos de ${categorySlug}`} />
			<ProductsGrid products={data.data || []} />
		</>
	)
}
