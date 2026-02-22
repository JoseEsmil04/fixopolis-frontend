import { fixopolisApi } from '@/api/fixopolis.api'
import type { OrderResponse } from '@/customer/interfaces/order.response'

export const payOrderAction = async (
	orderId: string
): Promise<OrderResponse> => {
	const { data } = await fixopolisApi.post<OrderResponse>(
		`/orders/${orderId}/pay`
	)

	return data
}
