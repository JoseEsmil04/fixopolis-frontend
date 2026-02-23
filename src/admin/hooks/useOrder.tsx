import type { OrderResponse } from '@/customer/interfaces/order.response'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { sileo } from 'sileo'
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
			sileo.success({
				title: 'Orden cancelada',
				description: 'La orden ha sido cancelada exitosamente',
				fill: 'black',
				styles: {
					description: 'text-[#0D9668]'
				},
				position: 'bottom-right'
			})
		},
		onError: () => {
			sileo.error({
				title: 'Error al cancelar',
				description: 'No se pudo cancelar la orden',
				fill: 'black',
				styles: {
					description: 'text-red-500/80!'
				},
				position: 'bottom-right'
			})
		}
	})

	const payMutation = useMutation({
		mutationFn: payOrderAction,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] })
			sileo.success({
				title: 'Orden pagada',
				description: 'La orden ha sido pagada exitosamente',
				fill: 'black',
				styles: {
					description: 'text-[#0D9668]'
				},
				position: 'bottom-right'
			})
		},
		onError: () => {
			sileo.error({
				title: 'Error al pagar',
				description: 'No se pudo pagar la orden',
				fill: 'black',
				styles: {
					description: 'text-red-500/80!'
				},
				position: 'bottom-right'
			})
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
