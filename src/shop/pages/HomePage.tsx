import { CustomPagination } from '@/components/custom/CustomPagination'
import { CustomJumbotron } from '../components/CustomJumbotron'
import { ProductsGrid } from '../components/ProductsGrid'
import { CustomLoading } from '../../components/custom/CustomLoading'
import { useProducts } from '@/shop/hooks/useProducts'

export default function HomePage() {
	const { data, isLoading } = useProducts()

	if (isLoading || !data) return <CustomLoading item="productos" />

	return (
		<main>
			<CustomJumbotron
				title="Ferretería y Asesoría"
				subtitle="Materiales de construcción de primera calidad y asesoría experta para
					llevar tu proyecto al siguiente nivel."
			/>

			<ProductsGrid products={data.data || []} />
			<CustomPagination totalPages={data.totalPages} />
		</main>
	)
}
