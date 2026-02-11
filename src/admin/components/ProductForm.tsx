import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import type { Product } from '@/shop/interfaces/product.interface'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Package, Upload, X } from 'lucide-react'
import {
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem
} from '@/components/ui/select'
import { Select } from '@/components/ui/select'

import { getCategoriesNameAction } from '@/shop/actions/get-categories.action'
import { cn } from '@/lib/utils'
import { useNavigate, useParams } from 'react-router'

interface Props {
	product: Product
}

export const ProductForm = ({ product }: Props) => {
	const navigate = useNavigate()
	const { id } = useParams()
	const title = id === 'new' ? 'Nuevo Producto' : 'Editar Producto'
	const subtitle =
		id === 'new'
			? 'Completa la información para crear un nuevo producto'
			: 'Modifica los datos del producto'

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm({
		defaultValues: product
	})
	const { data: categories } = useQuery({
		queryKey: ['categories'],
		queryFn: () => getCategoriesNameAction(),
		retry: false,
		staleTime: 1000 * 5 * 60
	})

	const onSubmit = (productLike: Product) => {
		console.log('Producto', productLike)
	}
	return (
		<div className=" h-full flex flex-col overflow-hidden">
			<div className="mb-6 flex flex-col">
				<h1 className="text-2xl font-bold text-foreground">{title}</h1>
				<p className="text-muted-foreground">{subtitle}</p>
			</div>
			{/* Form */}
			<div className="flex-1 overflow-hidden">
				<form
					className="flex flex-col gap-6 h-full"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-3 h-full">
						{/* Left column - Main info */}
						<div className="flex flex-col gap-6 lg:col-span-2">
							<Card className="flex-1">
								<CardHeader>
									<CardTitle className="text-lg">Información General</CardTitle>
								</CardHeader>
								<CardContent className="flex flex-col gap-4">
									{/* Nombre y Codigo */}
									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
										<div className="flex flex-col gap-2">
											<Label htmlFor="name">Nombre *</Label>
											<Input
												className={cn({
													'border-red-500': errors.name
												})}
												id="name"
												{...register('name', {
													required: true
												})}
												// onChange={handleInputChange}
												placeholder='Ej: Cono Reflectivo 28"'
												required
											/>
											{errors.name && (
												<p className="text-red-500 text-sm">
													El Nombre del Producto es requerido
												</p>
											)}
										</div>
										<div className="flex flex-col gap-2">
											<Label htmlFor="code">Código *</Label>
											<Input
												id="code"
												{...register('code')}
												// onChange={handleInputChange}
												placeholder="Ej: CON28R"
												required
											/>
										</div>
									</div>

									{/* Categoria */}
									<div className="flex flex-col gap-2">
										<Label htmlFor="categoryName">Categoría</Label>
										<Select defaultValue={product.categoryName}>
											<SelectTrigger className="w-full">
												<SelectValue />
											</SelectTrigger>
											<SelectContent position="popper">
												<SelectGroup>
													<SelectLabel>Categorias</SelectLabel>
													{categories?.map((category) => (
														<SelectItem value={category}>{category}</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>

									{/* Descripcion */}
									<div className="flex flex-col gap-2">
										<Label htmlFor="description">Descripción</Label>
										<Textarea
											id="description"
											{...register('description')}
											// onChange={handleInputChange}
											placeholder="Describe el producto..."
											rows={4}
										/>
									</div>

									{/* Precio y Stock */}
									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
										<div className="flex flex-col gap-2">
											<Label htmlFor="price">Precio *</Label>
											<Input
												id="price"
												type="number"
												step="0.01"
												min="0"
												{...register('price')}
												// onChange={handleInputChange}
												placeholder="0.00"
												required
											/>
										</div>
										<div className="flex flex-col gap-2">
											<Label htmlFor="stock">Stock</Label>
											<Input
												id="stock"
												type="number"
												min="0"
												{...register('stock')}
												// onChange={handleInputChange}
												placeholder="0"
											/>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Disponibilidad */}
							<Card>
								<CardContent className="pt-6">
									<div className="flex items-center justify-between rounded-lg border p-4">
										<div className="flex flex-col gap-0.5">
											<Label>Disponible para venta</Label>
											<p className="text-sm text-muted-foreground">
												El producto será visible en el catálogo
											</p>
										</div>
										<Switch
											checked={product.isAvailable}
											// onCheckedChange={(checked) =>
											// 	setFormData((prev) => ({
											// 		...prev,
											// 		isAvailable: checked
											// 	}))
											// }
										/>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Right column - Image */}
						<div className="flex flex-col gap-6">
							<Card className="flex-1">
								<CardHeader>
									<CardTitle className="text-lg">Imagen del Producto</CardTitle>
								</CardHeader>
								<CardContent className="flex flex-col gap-4">
									{/* Image preview */}
									<div className="relative h-full w-full overflow-hidden rounded-lg border bg-muted min-h-96">
										{product.imageUrl ? (
											<>
												<img
													src={product.imageUrl}
													alt="Vista previa del producto"
													className="h-full w-full object-cover"
												/>
												<Button
													type="button"
													variant="destructive"
													size="sm"
													className="absolute right-2 top-2 h-8 w-8 p-0"
													// onClick={handleRemoveImage}
												>
													<X className="h-4 w-4" />
													<span className="sr-only">Eliminar imagen</span>
												</Button>
											</>
										) : (
											<div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
												<Package className="h-12 w-12" />
												<p className="text-sm">Sin imagen</p>
											</div>
										)}
									</div>

									{/* Upload button */}
									<input
										// ref={fileInputRef}
										type="file"
										accept="image/*"
										className="hidden"
										// onChange={handleImageSelect}
									/>
									<Button
										type="button"
										variant="outline"
										className="w-full gap-2 bg-transparent"
										// onClick={() => fileInputRef.current?.click()}
									>
										<Upload className="h-4 w-4" />
										{product.imageUrl ? 'Cambiar imagen' : 'Subir imagen'}
									</Button>

									{/* URL manual */}
									<div className="flex flex-col gap-2">
										<Label
											htmlFor="imageUrl"
											className="text-sm text-muted-foreground"
										>
											O ingresa una URL
										</Label>
										<Input
											id="imageUrl"
											name="imageUrl"
											value={product.imageUrl}
											// onChange={(e) => {
											// 	// handleInputChange(e)
											// 	if (e.target.value) {
											// 		setImagePreview(null)
											// 		setImageFile(null)
											// 	}
											// }}
											placeholder="https://..."
										/>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Action buttons */}
					<div className="flex items-center justify-end gap-3">
						<Button
							type="button"
							variant="outline"
							onClick={() => navigate('/admin/products')}
						>
							Cancelar
						</Button>
						<Button variant="secondaryColor" type="submit">
							Guardar cambios
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
