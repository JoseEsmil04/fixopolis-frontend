import { fixopolisApi } from '@/api/fixopolis.api'

export const deleteProductAction = async (id: string) => {
	const { data } = await fixopolisApi.delete(`/products/${id}`)

	return data
}
