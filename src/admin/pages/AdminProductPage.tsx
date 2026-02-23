import { Navigate, useNavigate, useParams } from 'react-router'
import { AdminPageWrapper } from '@/admin/components/AdminPageWrapper'
import { CustomLoading } from '@/components/custom/CustomLoading'
import { useProduct } from '@/admin/hooks/useProduct'
import { ProductForm } from '../components/ProductForm'
import type { Product } from '@/shop/interfaces/product.interface'
import { sileo } from 'sileo'

export const AdminProductPage = () => {
	const { id } = useParams()
	const isNewProduct = id === 'new'
	const {
		data: product,
		isLoading,
		isError,
		mutation
	} = useProduct(isNewProduct ? '' : id || '')
	const navigate = useNavigate()
	const isPending = mutation.isPending

	const handleSubmit = async (productLike: Partial<Product>) => {
		try {
			const productData = { ...productLike, id }
			await mutation.mutateAsync(productData)
			sileo.success({
				title: `Producto ${isNewProduct ? 'creado' : 'actualizado'}`,
				description: `El producto ha sido ${isNewProduct ? 'creado' : 'actualizado'} correctamente`,
				fill: 'black',
				styles: {
					description: 'text-[#0D9668]'
				},
				position: 'bottom-right'
			})
			navigate(`/admin/products`)
		} catch (error) {
			console.error(error)
			sileo.error({
				title: `Error al ${isNewProduct ? 'crear' : 'actualizar'}`,
				description: `No se pudo ${isNewProduct ? 'crear' : 'actualizar'} el producto`,
				fill: 'black',
				styles: {
					description: 'text-red-500/80!'
				},
				position: 'bottom-right'
			})
		}
	}

	if (!isNewProduct && isError) return <Navigate to="/admin/products" />
	if (!isNewProduct && isLoading) return <CustomLoading item="Producto" />

	const emptyProduct: Product = {
		id: 'new',
		name: '',
		code: '',
		description: '',
		price: 0,
		stock: 0,
		categoryId: '',
		categoryName: '',
		isAvailable: true,
		imageUrl: ''
	}

	return (
		<AdminPageWrapper>
			<div className="h-full flex flex-col overflow-hidden">
				<ProductForm
					product={product || emptyProduct}
					onSubmit={handleSubmit}
					isLoading={isPending}
				/>
			</div>
		</AdminPageWrapper>
	)
}
