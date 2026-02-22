import { fixopolisApi } from '@/api/fixopolis.api'
import type { OrderResponse } from '@/customer/interfaces/order.response'

export const getOrdersAction = async (): Promise<OrderResponse[]> => {
	const { data } = await fixopolisApi.get('/orders')

	return data
}
