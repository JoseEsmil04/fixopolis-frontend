import { Navigate, useNavigate, useParams } from 'react-router'
import { AdminPageWrapper } from '@/admin/components/AdminPageWrapper'
import { CustomLoading } from '@/components/custom/CustomLoading'
import { useProduct } from '@/admin/hooks/useProduct'
import { ProductForm } from '../components/ProductForm'
import type { Product } from '@/shop/interfaces/product.interface'
import { toast } from 'sonner'

export const AdminProductPage = () => {
	const { id } = useParams()
	const isNewProduct = id === 'new'
	const { data: product, isLoading, isError, mutation } = useProduct(isNewProduct ? '' : id || '')
	const navigate = useNavigate()
	const isPending = mutation.isPending

	const handleSubmit = async (productLike: Partial<Product>) => {
		try {
			const productData = { ...productLike, id }
			const updatedProduct = await mutation.mutateAsync(productData)
			toast.success(`Producto ${updatedProduct.name} ${isNewProduct ? 'creado' : 'actualizado'} correctamente`, {
				position: 'top-right'
			})
			navigate(`/admin/products`)
		} catch (error) {
			console.error(error)
			toast.error(`Hubo un error al ${isNewProduct ? 'crear' : 'actualizar'} el producto`, {
				position: 'top-right'
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
				<ProductForm product={product || emptyProduct} onSubmit={handleSubmit} isLoading={isPending} />
			</div>
		</AdminPageWrapper>
	)
}
