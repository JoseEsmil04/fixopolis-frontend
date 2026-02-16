import { fixopolisApi } from '@/api/fixopolis.api'
import type { Product } from '@/shop/interfaces/product.interface'

export const createUpdateProductAction = async (
	productLike: Partial<Product> & { image?: File | File[] }
): Promise<Product> => {
	const { id, ...rest } = productLike
	const isCreating = id === 'new'

	const formData = new FormData()

	// Normaliza números (FormData guarda strings, pero ok)
	const price = Number(rest.price ?? 0)
	const stock = Number(rest.stock ?? 0)

	// Agrega campos (solo si existen)
	if (rest.name != null) formData.append('name', String(rest.name))
	if (rest.name != null) formData.append('code', String(rest.code))
	if (rest.description != null)
		formData.append('description', String(rest.description))
	if (rest.categoryId != null)
		formData.append('categoryId', String(rest.categoryId))
	formData.append('price', String(price))
	formData.append('stock', String(stock))
	if (rest.isAvailable != null)
		formData.append('isAvailable', String(rest.isAvailable))

	// Imagen (1 o varias)

	if (rest.imageUrl !== null) formData.append('imageUrl', String(rest.imageUrl))

	//TODO: IMAGE FILE

	const { data } = await fixopolisApi<Product>({
		url: isCreating ? '/products' : `/products/${id}`,
		method: isCreating ? 'POST' : 'PUT',
		data: formData,
		// Si tu fixopolisApi usa axios, esto es opcional:
		headers: { 'Content-Type': 'multipart/form-data' }
	})

	return data
}
