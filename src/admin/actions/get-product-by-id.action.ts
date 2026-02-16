import { fixopolisApi } from '@/api/fixopolis.api'
import type { Product } from '@/shop/interfaces/product.interface'

export const getProductByIdAction = async (id: string): Promise<Product> => {
	if (!id) throw new Error('Id is required!')

	if (id === 'new')
		return {
			id: 'new',
			name: '',
			categoryName: '',
			code: '',
			description: '',
			imageUrl: '',
			isAvailable: true,
			price: 0,
			stock: 0
		} as Product

	const { data } = await fixopolisApi.get(`/products/${id}`)

	return data
}
