import { fixopolisApi } from '@/api/fixopolis.api'
import type { CategoriesResponse } from '../interfaces/get-categories.response'

export const getCategoriesNameAction = async (): Promise<string[]> => {
	const { data } = await fixopolisApi.get<CategoriesResponse[]>('/categories')
	const categoriesName = data.map((category) => category.name)
	return categoriesName
}
