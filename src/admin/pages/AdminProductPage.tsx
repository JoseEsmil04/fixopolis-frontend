import React from 'react'

import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AdminPageWrapper } from '@/admin/components/AdminPageWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Package, Upload, X } from 'lucide-react'
import { CustomLoading } from '@/components/custom/CustomLoading'

// TODO: Reemplaza con tu hook real para obtener un producto por ID
// import { useProduct } from '@/shop/hooks/useProduct'

export const AdminProductPage = () => {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const isEditing = id !== 'new'

	// Estado del formulario
	const [formData, setFormData] = useState({
		name: '',
		code: '',
		categoryName: '',
		description: '',
		price: '',
		stock: '',
		imageUrl: '',
		isAvailable: true
	})

	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [, setImageFile] = useState<File | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [isFetching, setIsFetching] = useState(isEditing)
	const fileInputRef = useRef<HTMLInputElement>(null)

	// TODO: Reemplaza este efecto con tu hook real (ej: useProduct(id))
	// para cargar los datos del producto cuando se esta editando.
	useEffect(() => {
		if (!isEditing || !id) return

		const fetchProduct = async () => {
			setIsFetching(true)
			try {
				// TODO: Reemplaza con tu llamada API real
				// const product = await getProductById(id)
				// setFormData({
				//   name: product.name,
				//   code: product.code,
				//   categoryName: product.categoryName,
				//   description: product.description,
				//   price: String(product.price),
				//   stock: String(product.stock),
				//   imageUrl: product.imageUrl || '',
				//   isAvailable: product.isAvailable,
				// })
				// if (product.imageUrl) {
				//   setImagePreview(product.imageUrl)
				// }
			} catch (error) {
				console.error('Error al cargar el producto:', error)
			} finally {
				setIsFetching(false)
			}
		}

		fetchProduct()
	}, [id, isEditing])

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		setImageFile(file)

		const reader = new FileReader()
		reader.onload = (event) => {
			setImagePreview(event.target?.result as string)
		}
		reader.readAsDataURL(file)
	}

	const handleRemoveImage = () => {
		setImageFile(null)
		setImagePreview(null)
		setFormData((prev) => ({ ...prev, imageUrl: '' }))
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)

		try {
			// TODO: Implementa la logica de guardado real
			// Si hay imageFile, primero sube la imagen y obtiene la URL
			// Luego crea o actualiza el producto con formData

			// Ejemplo:
			// let finalImageUrl = formData.imageUrl
			// if (imageFile) {
			//   finalImageUrl = await uploadImage(imageFile)
			// }
			//
			// const productData = {
			//   ...formData,
			//   price: Number(formData.price),
			//   stock: Number(formData.stock),
			//   imageUrl: finalImageUrl,
			// }
			//
			// if (isEditing) {
			//   await updateProduct(id, productData)
			// } else {
			//   await createProduct(productData)
			// }

			navigate('/admin/products')
		} catch (error) {
			console.error('Error al guardar el producto:', error)
		} finally {
			setIsLoading(false)
		}
	}

	if (isFetching) {
		return <CustomLoading />
	}

	return (
		<AdminPageWrapper>
			<div className="p-6 h-full flex flex-col overflow-hidden">
				{/* Header */}
				<div className="mb-6 flex items-center gap-4 justify-between">
					<div>
						<h1 className="text-2xl font-bold text-foreground">
							{isEditing ? 'Editar Producto' : 'Nuevo Producto'}
						</h1>
						<p className="text-muted-foreground">
							{isEditing
								? 'Modifica los datos del producto'
								: 'Completa la información para crear un nuevo producto'}
						</p>
					</div>
					<Button
						variant="secondaryColor"
						size="sm"
						className="gap-2"
						onClick={() => navigate('/admin/products')}
					>
						<ArrowLeft className="h-4 w-4" />
						Volver
					</Button>
				</div>

				{/* Form */}
				<div className="flex-1 overflow-hidden">
					<form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full">
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-3 h-full">
							{/* Left column - Main info */}
							<div className="flex flex-col gap-6 lg:col-span-2">
								<Card className="flex-1">
									<CardHeader>
										<CardTitle className="text-lg">
											Información General
										</CardTitle>
									</CardHeader>
									<CardContent className="flex flex-col gap-4">
										{/* ID (solo en edicion) */}
										{isEditing && id && (
											<div className="flex flex-col gap-2">
												<Label className="text-muted-foreground">
													ID (no editable)
												</Label>
												<Input value={id} disabled className="bg-muted" />
											</div>
										)}

										{/* Nombre y Codigo */}
										<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
											<div className="flex flex-col gap-2">
												<Label htmlFor="name">Nombre *</Label>
												<Input
													id="name"
													name="name"
													value={formData.name}
													onChange={handleInputChange}
													placeholder='Ej: Cono Reflectivo 28"'
													required
												/>
											</div>
											<div className="flex flex-col gap-2">
												<Label htmlFor="code">Código *</Label>
												<Input
													id="code"
													name="code"
													value={formData.code}
													onChange={handleInputChange}
													placeholder="Ej: CON28R"
													required
												/>
											</div>
										</div>

										{/* Categoria */}
										<div className="flex flex-col gap-2">
											<Label htmlFor="categoryName">Categoría</Label>
											<Input
												id="categoryName"
												name="categoryName"
												value={formData.categoryName}
												onChange={handleInputChange}
												placeholder="Ej: Seguridad Vial"
											/>
										</div>

										{/* Descripcion */}
										<div className="flex flex-col gap-2">
											<Label htmlFor="description">Descripción</Label>
											<Textarea
												id="description"
												name="description"
												value={formData.description}
												onChange={handleInputChange}
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
													name="price"
													type="number"
													step="0.01"
													min="0"
													value={formData.price}
													onChange={handleInputChange}
													placeholder="0.00"
													required
												/>
											</div>
											<div className="flex flex-col gap-2">
												<Label htmlFor="stock">Stock</Label>
												<Input
													id="stock"
													name="stock"
													type="number"
													min="0"
													value={formData.stock}
													onChange={handleInputChange}
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
												checked={formData.isAvailable}
												onCheckedChange={(checked) =>
													setFormData((prev) => ({
														...prev,
														isAvailable: checked
													}))
												}
											/>
										</div>
									</CardContent>
								</Card>
							</div>

							{/* Right column - Image */}
							<div className="flex flex-col gap-6">
								<Card className="flex-1">
									<CardHeader>
										<CardTitle className="text-lg">
											Imagen del Producto
										</CardTitle>
									</CardHeader>
									<CardContent className="flex flex-col gap-4">
										{/* Image preview */}
										<div className="relative h-full w-full overflow-hidden rounded-lg border bg-muted min-h-100">
											{imagePreview || formData.imageUrl ? (
												<>
													<img
														src={imagePreview || formData.imageUrl}
														alt="Vista previa del producto"
														className="h-full w-full object-cover"
													/>
													<Button
														type="button"
														variant="destructive"
														size="sm"
														className="absolute right-2 top-2 h-8 w-8 p-0"
														onClick={handleRemoveImage}
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
											ref={fileInputRef}
											type="file"
											accept="image/*"
											className="hidden"
											onChange={handleImageSelect}
										/>
										<Button
											type="button"
											variant="outline"
											className="w-full gap-2 bg-transparent"
											onClick={() => fileInputRef.current?.click()}
										>
											<Upload className="h-4 w-4" />
											{imagePreview || formData.imageUrl
												? 'Cambiar imagen'
												: 'Subir imagen'}
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
												value={formData.imageUrl}
												onChange={(e) => {
													handleInputChange(e)
													if (e.target.value) {
														setImagePreview(null)
														setImageFile(null)
													}
												}}
												placeholder="https://..."
											/>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Action buttons */}
						<div className="flex items-center justify-end gap-3 border-t pt-6 mt-auto">
							<Button
								type="button"
								variant="outline"
								onClick={() => navigate('/admin/products')}
							>
								Cancelar
							</Button>
							<Button type="submit" disabled={isLoading}>
								{isLoading
									? 'Guardando...'
									: isEditing
										? 'Guardar cambios'
										: 'Crear producto'}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</AdminPageWrapper>
	)
}
