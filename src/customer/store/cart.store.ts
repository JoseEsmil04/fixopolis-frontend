import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
	id: string
	name: string
	price: number
	quantity: number
	imageUrl: string
	categoryName: string
}

interface CartStore {
	items: CartItem[]
	addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
	removeItem: (id: string) => void
	updateQuantity: (id: string, quantity: number) => void
	clearCart: () => void
	getTotalItems: () => number
	getTotalPrice: () => number
}

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			items: [],

			addItem: (item, quantity = 1) => {
				const { items } = get()
				const existingItem = items.find((i) => i.id === item.id)

				if (existingItem) {
					set({
						items: items.map((i) =>
							i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
						)
					})
				} else {
					set({ items: [...items, { ...item, quantity }] })
				}
			},

			removeItem: (id) => {
				set({ items: get().items.filter((i) => i.id !== id) })
			},

			updateQuantity: (id, quantity) => {
				if (quantity <= 0) {
					get().removeItem(id)
					return
				}
				set({
					items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i))
				})
			},

			clearCart: () => {
				set({ items: [] })
			},

			getTotalItems: () => {
				return get().items.reduce((sum, item) => sum + item.quantity, 0)
			},

			getTotalPrice: () => {
				return get().items.reduce(
					(sum, item) => sum + item.price * item.quantity,
					0
				)
			}
		}),
		{
			name: 'fixopolis-cart'
		}
	)
)
