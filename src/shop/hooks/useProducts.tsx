import { useQuery } from '@tanstack/react-query'
import { getProductsAction } from '../actions/get-products.action'
import { useParams, useSearchParams } from 'react-router'

export const useProducts = () => {
	const [searchParams] = useSearchParams()
	const { categorySlug } = useParams()

	const limit = searchParams.get('limit') || 6
	const page = searchParams.get('page') || 1
	const offset = (Number(page) - 1) * Number(limit)
	const selectedCategory = searchParams.get('category')
	const query = searchParams.get('query') ?? ''

	const category = selectedCategory || categorySlug

	return useQuery({
		queryKey: ['products', { limit, offset, query, categories: category }],
		queryFn: () =>
			getProductsAction({
				limit: isNaN(+limit) ? 6 : limit,
				offset: isNaN(offset) ? 0 : offset,
				query,
				categories: category
			}),
		staleTime: 1000 * 60 * 5
	})
}
