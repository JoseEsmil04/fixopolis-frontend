export interface Item {
	productId: string
	productName: string
	productCode: string
	unitPrice: number
	quantity: number
}

export interface OrderResponse {
	id: string
	userId: string
	createdAt: string
	status: string
	total: number
	items: Item[]
}
