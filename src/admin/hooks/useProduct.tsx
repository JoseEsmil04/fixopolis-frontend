import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProductByIdAction } from '../actions/get-product-by-id.action'
import { createUpdateProductAction } from '../actions/create-update-product.action'
import type { Product } from '@/shop/interfaces/product.interface'

export const useProduct = (id: string) => {
	const queryClient = useQueryClient()
	
	const query = useQuery({
		queryKey: ['product', { id }],
		queryFn: () => getProductByIdAction(id),
		staleTime: 1000 * 60 * 5,
		retry: false,
		enabled: !!id
	})

	const mutation = useMutation({
		mutationFn: createUpdateProductAction,
		onSuccess: (product: Product) => {
			// Actualizar el cache del producto individual
			queryClient.setQueryData(['product', { id: product.id }], product)
			// Invalidar la lista de productos para que se reflejen los cambios
			queryClient.invalidateQueries({ queryKey: ['products'] })
		}
	})

	return { ...query, mutation }
}
