import { fixopolisApi } from '@/api/fixopolis.api'
import type { OrderResponse } from '../interfaces/order.response'

export interface OrderItem {
	productId: string
	quantity: number
}

export const createOrderAction = async (
	userId: string,
	items: OrderItem[]
): Promise<OrderResponse> => {
	const { data } = await fixopolisApi.post<OrderResponse>('/orders', {
		userId,
		items
	})
	return data
}
