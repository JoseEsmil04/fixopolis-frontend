import type { Product } from './product.interface'

export interface ProductsResponse {
	data: Product[]
	count: number
	totalPages: number
}
