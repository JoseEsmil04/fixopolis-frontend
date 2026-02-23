import { useState } from 'react'
import {
	Minus,
	Plus,
	ShoppingCart,
	Zap,
	ArrowLeft,
	Pencil,
	Package,
	Loader2
} from 'lucide-react'
import { useParams, useNavigate } from 'react-router'
import { useProduct } from '@/admin/hooks/useProduct'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/auth/store/auth.store'
import { useCartStore } from '@/customer/store/cart.store'
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
import { CustomLoading } from '@/components/custom/CustomLoading'

export function ProductPage() {
	const { id = '' } = useParams()
	const navigate = useNavigate()
	const [quantity, setQuantity] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const { userIsAdmin, userIsEmployee, user } = useAuthStore()
	const addItem = useCartStore((state) => state.addItem)
	const isAdminOrEmployee = userIsAdmin() || userIsEmployee()

	const { data: product, isLoading: isProductLoading } = useProduct(id)
	const isOutOfStock =
		!product ||
		!product.isAvailable ||
		product.stock === 0 ||
		product.stock === undefined ||
		product.stock === null

	const handleQuantityChange = (change: number) => {
		setQuantity((prev) => {
			const newQuantity = prev + change
			if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
				return newQuantity
			}
			return prev
		})
	}

	const handleBack = () => {
		navigate(-1)
	}

	const handleAddToCart = () => {
		if (!product) return

		addItem(
			{
				id: product.id,
				name: product.name,
				price: product.price,
				imageUrl: product.imageUrl || '',
				categoryName: product.categoryName
			},
			quantity
		)

		sileo.success({
			title: 'Producto agregado',
			description: `${quantity} ${quantity === 1 ? 'producto' : 'productos'} agregado${quantity > 1 ? 's' : ''} al carrito`,
			fill: 'black',
			styles: {
				description: 'text-[#0D9668]'
			},
			position: 'bottom-right'
		})
	}

	const handleCreateOrderNow = async () => {
		if (!product || !user) return

		setIsLoading(true)
		try {
			await createOrderAction(user.id, [{ productId: product.id, quantity }])
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

	if (isProductLoading) {
		return <CustomLoading item="Producto" />
	}

	if (!product) {
		return (
			<div className="min-h-screen bg-[#1E293B] flex items-center justify-center">
				<div className="text-white text-xl">Producto no encontrado</div>
			</div>
		)
	}

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('es-DO', {
			style: 'currency',
			currency: 'DOP',
			minimumFractionDigits: 0
		}).format(price)
	}

	return (
		<div className="bg-[#1E293B]">
			<div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
				<button
					onClick={handleBack}
					className="flex cursor-pointer items-center gap-1.5 sm:gap-2 text-white/80 hover:text-white mb-4 sm:mb-8 transition-colors"
				>
					<ArrowLeft size={20} />
					<span className="text-md sm:text-base">Volver</span>
				</button>

				<div className="flex flex-col gap-6 sm:gap-8 lg:grid lg:grid-cols-2 lg:gap-12">
					<div className="w-full aspect-square sm:aspect-4/3 lg:aspect-square rounded-xl overflow-hidden bg-white/5">
						<img
							src={product.imageUrl || '/placeholder.svg'}
							alt={product.name}
							className="w-full h-full object-contain p-4 sm:p-6 lg:p-8"
						/>
					</div>

					<div className="flex flex-col justify-center space-y-4">
						<div>
							<Badge
								variant="secondary"
								className="mb-2 bg-[#0D9668]/20 text-[#0D9668] hover:bg-[#0D9668]/20 text-xs"
							>
								{product.categoryName}
							</Badge>
							<h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
								{product.name}
							</h1>
							<p className="text-sm sm:text-base text-white/70 leading-relaxed line-clamp-4">
								{product.description}
							</p>
						</div>

						<div className="flex items-baseline gap-2">
							<span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D9668]">
								{formatPrice(product.price)}
							</span>
						</div>

						<div className="flex items-center gap-2 text-white/60 text-sm">
							<span>Stock:</span>
							<span className="font-semibold text-white">{product.stock}</span>
							{isOutOfStock && (
								<Badge
									variant="secondary"
									className="ml-2 bg-slate-700 text-white"
								>
									No disponible por el momento
								</Badge>
							)}
						</div>

						<div className="space-y-3">
							{isAdminOrEmployee ? (
								<div className="space-y-2">
									<button
										onClick={() => navigate(`/admin/products/${id}`)}
										className="w-full cursor-pointer bg-[#6D28D9] hover:bg-[#6D28D9]/90 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
									>
										<Pencil size={16} />
										Editar Producto
									</button>
									<button
										onClick={() => navigate('/admin/products')}
										className="w-full cursor-pointer bg-[#0D9668] hover:bg-[#0D9668]/90 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all text-sm"
									>
										<Package size={16} />
										Gestionar Inventario
									</button>
								</div>
							) : (
								<>
									<div className="flex items-center justify-between gap-3">
										<span className="text-white/80 text-sm">Cantidad:</span>
										<div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
											<button
												onClick={() => handleQuantityChange(-1)}
												disabled={quantity <= 1 || isOutOfStock}
												className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
											>
												<Minus size={14} />
											</button>
											<span className="text-lg font-semibold text-white w-8 sm:w-10 text-center">
												{quantity}
											</span>
											<button
												onClick={() => handleQuantityChange(1)}
												disabled={quantity >= product.stock || isOutOfStock}
												className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
											>
												<Plus size={14} />
											</button>
										</div>
									</div>

									{isOutOfStock ? (
										<div className="w-full bg-slate-700 text-white/60 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 text-sm">
											No disponible por el momento
										</div>
									) : (
										<div className="space-y-2">
											<button
												onClick={handleAddToCart}
												className="w-full cursor-pointer bg-[#6D28D9] hover:bg-[#6D28D9]/90 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
											>
												<ShoppingCart size={16} />
												Agregar al Carrito
											</button>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<button
														disabled={isLoading}
														className="w-full cursor-pointer bg-[#0D9668] hover:bg-[#0D9668]/90 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
													>
														{isLoading ? (
															<Loader2 className="h-4 w-4 animate-spin" />
														) : (
															<Zap size={16} />
														)}
														{isLoading ? 'Creando...' : 'Crear Orden Ahora'}
													</button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>
															Confirmar compra del producto
														</AlertDialogTitle>

														<AlertDialogDescription>
															Estás a punto de generar una orden con este
															producto y la cantidad seleccionada. Esta acción
															registrará la compra en el sistema.
															<br />
															<br />
															Verifica los detalles antes de continuar.
														</AlertDialogDescription>
													</AlertDialogHeader>

													<AlertDialogFooter>
														<AlertDialogCancel variant="outline">
															Seguir revisando
														</AlertDialogCancel>

														<AlertDialogAction
															variant="secondaryColor"
															onClick={handleCreateOrderNow}
														>
															Confirmar compra
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
