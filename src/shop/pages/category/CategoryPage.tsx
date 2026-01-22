import { CustomJumbotron } from '@/shop/components/CustomJumbotron'
import { ProductsGrid } from '@/shop/components/ProductsGrid'
import { useParams } from 'react-router'

export const CategoryPage = () => {
	const { categorySlug } = useParams()
	return (
		<>
			<CustomJumbotron title={`Productos de ${categorySlug}`} />
			<ProductsGrid />
		</>
	)
}
