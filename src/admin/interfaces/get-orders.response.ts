export interface GetOrdersResponse {
	id: string
	userId: string
	createdAt: Date
	status: string
	total: number
	items: ProductItem[]
}

export interface ProductItem {
	productId: string
	productName: string
	productCode: string
	unitPrice: number
	quantity: number
}
