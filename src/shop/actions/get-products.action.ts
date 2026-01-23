import { fixopolisApi } from '@/api/fixopolis.api'
import type { ProductsResponse } from '../interfaces/get-products.response'

interface Options {
	limit?: number | string
	offset?: number | string
	query?: string
	categories?: string
}

export const getProductsAction = async (
	options: Options
): Promise<ProductsResponse> => {
	const { limit, offset, query, categories } = options

	const { data } = await fixopolisApi.get<ProductsResponse>('/products', {
		params: {
			limit,
			offset,
			query,
			categories
		}
	})

	return data
}
