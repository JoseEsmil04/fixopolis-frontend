import { CustomPagination } from '@/components/custom/CustomPagination'
import { CustomJumbotron } from '../../components/CustomJumbotron'
import { ProductsGrid } from '../../components/ProductsGrid'
import { useProducts } from '@/shop/hooks/useProducts'

export default function HomePage() {
	const { data, isLoading } = useProducts()

	if (isLoading || !data)
		return (
			<div>
				<h1>Cargando...</h1>
			</div>
		)

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
