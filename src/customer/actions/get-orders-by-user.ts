import { fixopolisApi } from '@/api/fixopolis.api'
import type { OrderResponse } from '../interfaces/order.response'

export const getOrdersByUserAction = async (
	userId: string
): Promise<OrderResponse[]> => {
	const { data } = await fixopolisApi.get(`/orders/user/${userId}`)

	return data
}
