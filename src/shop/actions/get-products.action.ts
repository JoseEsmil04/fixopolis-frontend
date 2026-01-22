import { fixopolisApi } from '@/api/fixopolis.api'
import type { ProductsResponse } from '../interfaces/get-products.response'

export const getProductsAction = async (): Promise<ProductsResponse> => {
	const { data } = await fixopolisApi.get<ProductsResponse>('/products')

	return data
}
