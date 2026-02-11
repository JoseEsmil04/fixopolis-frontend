import { Navigate, useParams } from 'react-router'
import { AdminPageWrapper } from '@/admin/components/AdminPageWrapper'
import { CustomLoading } from '@/components/custom/CustomLoading'
import { useProduct } from '@/shop/hooks/useProduct'
import { ProductForm } from '../components/ProductForm'

export const AdminProductPage = () => {
	const { id } = useParams()
	const { data: product, isLoading, isError } = useProduct(id || '')

	// const handleRemoveImage = () => {
	// 	setImageFile(null)
	// 	setImagePreview(null)
	// 	setFormData((prev) => ({ ...prev, imageUrl: '' }))
	// 	if (fileInputRef.current) {
	// 		fileInputRef.current.value = ''
	// 	}
	// }

	if (isError) return <Navigate to="/admin/products" />
	if (isLoading) return <CustomLoading item="Producto" />

	return (
		<AdminPageWrapper>
			<div className="p-6 h-full flex flex-col overflow-hidden">
				{/* Header */}

				<ProductForm product={product!} />
			</div>
		</AdminPageWrapper>
	)
}
