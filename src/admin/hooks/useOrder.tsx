import type { OrderResponse } from '@/customer/interfaces/order.response'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { cancelOrderAction } from '../actions/cancel-order.action'
import { getOrdersAction } from '../actions/get-orders.action'
import { payOrderAction } from '../actions/pay-order.action'

export const useOrder = () => {
	const queryClient = useQueryClient()
	const query = useQuery<OrderResponse[]>({
		queryKey: ['orders'],
		queryFn: () => getOrdersAction()
	})

	const [selectedOrder, setSelectedOrder] = useState<OrderResponse | null>(null)

	const cancelMutation = useMutation({
		mutationFn: cancelOrderAction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] })
			toast.success('Orden cancelada exitosamente')
		},
		onError: () => {
			toast.error('Error al cancelar la orden')
		}
	})

	const payMutation = useMutation({
		mutationFn: payOrderAction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] })
			toast.success('Orden pagada exitosamente')
		},
		onError: () => {
			toast.error('Error al pagar la orden')
		}
	})

	return {
		...query,
		selectedOrder,
		setSelectedOrder,
		cancelMutation,
		payMutation
	}
}
