import { fixopolisApi } from '@/api/fixopolis.api'
import type { GetOrdersResponse } from '../interfaces/get-orders.response'

export const getOrdersAction = async (): Promise<GetOrdersResponse[]> => {
	const { data } = await fixopolisApi.get('/orders')

	return data
}
