import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trash2, Minus, Plus, ShoppingBag, Loader2 } from 'lucide-react'
import { useCartStore } from '@/customer/store/cart.store'
import { useAuthStore } from '@/auth/store/auth.store'
import { createOrderAction } from '@/customer/actions/create-order.action'
import { sileo } from 'sileo'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'

export const CartPage = () => {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const { items, updateQuantity, removeItem, getTotalPrice, clearCart } =
		useCartStore()
	const { user } = useAuthStore()
	const subtotal = getTotalPrice()
	const iva = Math.round(subtotal * 0.19)
	const total = subtotal + iva

	const handleCreateOrder = async () => {
		if (!user || items.length === 0) return

		setIsLoading(true)
		try {
			const orderItems = items.map((item) => ({
				productId: item.id,
				quantity: item.quantity
			}))

			await createOrderAction(user.id, orderItems)
			clearCart()
			sileo.success({
				title: 'Orden creada',
				description: 'Tu orden ha sido creada exitosamente',
				fill: 'black',
				styles: {
					description: 'text-[#0D9668]'
				},
				position: 'bottom-right'
			})
			navigate('/customer/my-orders')
		} catch (error) {
			sileo.error({
				title: 'Error al crear la orden',
				description: 'No se pudo crear la orden',
				fill: 'black',
				styles: {
					description: 'text-red-500/80!'
				},
				position: 'bottom-right'
			})
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	if (items.length === 0) {
		return (
			<div className="container mx-auto px-4 py-12">
				<div className="flex flex-col items-center justify-center gap-4 text-center">
					<div className="rounded-full bg-[#0D9668]/10 p-6">
						<ShoppingBag className="h-12 w-12 text-[#0D9668]" />
					</div>
					<h2 className="text-2xl font-bold text-foreground">
						Tu carrito está vacío
					</h2>
					<p className="text-muted-foreground">
						Explora nuestros productos y agrega lo que necesites
					</p>
					<Link to="/">
						<Button className="bg-[#0D9668] hover:bg-[#0A7C56]">
							Ver Productos
						</Button>
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-[#0D9668]">Mi Carrito</h1>
				<Badge
					variant="secondary"
					className="mt-2 bg-[#6D28D9]/10 text-[#6D28D9]"
				>
					{items.length} {items.length === 1 ? 'producto' : 'productos'}
				</Badge>
			</div>

			<div className="grid gap-6 md:grid-cols-3">
				<div className="md:col-span-2 space-y-4">
					{items.map((item) => (
						<Card key={item.id} className="overflow-hidden">
							<CardContent className="p-0">
								<div className="flex gap-3 p-3 sm:p-4">
									<div className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
										<img
											src={item.imageUrl || '/placeholder.svg'}
											alt={item.name}
											className="h-full w-full object-contain"
										/>
									</div>
									<div className="flex flex-1 flex-col justify-between min-w-0">
										<div>
											<h3 className="font-semibold text-sm sm:text-base line-clamp-2">
												{item.name}
											</h3>
											<p className="text-xs sm:text-sm text-muted-foreground">
												{item.categoryName}
											</p>
										</div>
										<div className="flex items-center justify-between mt-2">
											<div className="flex items-center gap-1 sm:gap-2">
												<Button
													variant="outline"
													size="icon"
													className="h-7 w-7 sm:h-8 sm:w-8"
													onClick={() =>
														updateQuantity(item.id, item.quantity - 1)
													}
												>
													<Minus className="h-3 w-3 sm:h-4 sm:w-4" />
												</Button>
												<span className="w-8 sm:w-12 text-center text-sm sm:text-base font-medium">
													{item.quantity}
												</span>
												<Button
													variant="outline"
													size="icon"
													className="h-7 w-7 sm:h-8 sm:w-8"
													onClick={() =>
														updateQuantity(item.id, item.quantity + 1)
													}
												>
													<Plus className="h-3 w-3 sm:h-4 sm:w-4" />
												</Button>
											</div>
											<div className="flex items-center gap-2">
												<p className="text-sm sm:text-lg font-bold text-[#0D9668]">
													$
													{(item.price * item.quantity).toLocaleString('es-CO')}
												</p>
												<Button
													variant="ghost"
													size="icon"
													className="h-7 w-7 sm:h-8 sm:w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50"
													onClick={() => removeItem(item.id)}
												>
													<Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
												</Button>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="md:col-span-1">
					<Card className="sticky top-24 mt-4 md:mt-0">
						<CardHeader>
							<CardTitle className="text-lg sm:text-xl">
								Resumen del pedido
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3 sm:space-y-4">
							<div className="flex justify-between text-sm sm:text-base">
								<span className="text-muted-foreground">Subtotal</span>
								<span className="font-medium">
									${subtotal.toLocaleString('es-CO')}
								</span>
							</div>
							<div className="flex justify-between text-sm sm:text-base">
								<span className="text-muted-foreground">IVA (19%)</span>
								<span className="font-medium">
									${iva.toLocaleString('es-CO')}
								</span>
							</div>
							<div className="border-t pt-3 sm:pt-4 flex justify-between">
								<span className="font-semibold">Total</span>
								<span className="text-lg sm:text-xl font-bold text-[#0D9668]">
									${total.toLocaleString('es-CO')}
								</span>
							</div>
						</CardContent>
						<CardFooter className="flex flex-col gap-2 sm:gap-3">
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										className="w-full bg-[#0D9668] hover:bg-[#0A7C56]"
										disabled={isLoading}
									>
										{isLoading ? (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										) : null}
										{isLoading ? 'Creando orden...' : 'Crear Orden'}
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Confirmación de Orden</AlertDialogTitle>
										<AlertDialogDescription>
											Estás a punto de generar una nueva orden con los productos
											actualmente agregados al carrito. Verifica que la
											información sea correcta antes de continuar.
											<br />
											<br />
											Puedes regresar para modificar el carrito o proceder con
											la confirmación.
										</AlertDialogDescription>
									</AlertDialogHeader>

									<AlertDialogFooter>
										<AlertDialogCancel variant="outline">
											Volver al carrito
										</AlertDialogCancel>

										<AlertDialogAction
											variant="secondaryColor"
											onClick={handleCreateOrder}
										>
											Confirmar orden
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
							<Link to="/" className="w-full">
								<Button variant="outline" className="w-full">
									Seguir comprando
								</Button>
							</Link>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	)
}
