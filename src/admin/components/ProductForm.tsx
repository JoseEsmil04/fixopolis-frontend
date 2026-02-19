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
import { useState, useRef, type ChangeEvent } from 'react'
interface Props {
	product: Product
	onSubmit: (productLike: Partial<Product> & { image?: File }) => Promise<void>
	isLoading?: boolean
}
export const ProductForm = ({
	product,
	onSubmit,
	isLoading = false
}: Props) => {
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
		handleSubmit,
		setValue,
		watch
	} = useForm({
		defaultValues: {
			...product,
			categoryId: product.categoryId || '',
			isAvailable: product.isAvailable ?? true
		}
	})

	const isAvailable = watch('isAvailable')
	const watchedImageUrl = watch('imageUrl')
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string>('')
	const [isRemovingCurrentImage, setIsRemovingCurrentImage] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const imageToShow = imagePreview || (watchedImageUrl && !isRemovingCurrentImage ? watchedImageUrl : product.imageUrl)
	const { data: categories } = useQuery({
		queryKey: ['categories'],
		queryFn: () => getCategoriesNameAction(),
		retry: false,
		staleTime: 1000 * 5 * 60
	})

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files && files[0]) {
			const file = files[0]
			setSelectedImage(file)
			const reader = new FileReader()
			reader.onloadend = () => {
				setImagePreview(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	const handleRemoveImage = () => {
		setSelectedImage(null)
		setImagePreview('')
		setIsRemovingCurrentImage(true)
		setValue('imageUrl', '')
		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}
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
					onSubmit={handleSubmit((data) => {
						const submitData = { ...data, image: selectedImage || undefined }
						onSubmit(submitData)
					})}
				>
					<div className="grid grid-cols-1 gap-5 lg:grid-cols-3 h-full">
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
													required: 'El Nombre del Producto es requerido',
													validate: (value) =>
														value.trim().length > 0 ||
														'El nombre no puede contener solo espacios'
												})}
												placeholder='Ej: Cono Reflectivo 28"'
											/>
											{errors.name && (
												<p className="text-red-500 text-sm">
													{errors.name.message}
												</p>
											)}
										</div>
										<div className="flex flex-col gap-2">
											<Label htmlFor="code">Código *</Label>
											<Input
												className={cn({
													'border-red-500': errors.code
												})}
												id="code"
												{...register('code', {
													required: 'El Código del Producto es requerido',
													minLength: {
														value: 6,
														message: 'El código debe tener mínimo 6 caracteres'
													},
													validate: (value) =>
														value.trim().length > 0 ||
														'El código no puede contener solo espacios'
												})}
												placeholder="Ej: CON28R"
											/>
											{errors.code && (
												<p className="text-red-500 text-sm">
													{errors.code.message}
												</p>
											)}
										</div>
									</div>
									{/* Categoria */}
									<div className="flex flex-col gap-2">
										<Label htmlFor="categoryId">Categoría *</Label>
										<Select
											value={watch('categoryId') || ''}
											onValueChange={(value) =>
												setValue('categoryId', value, {
													shouldValidate: true
												})
											}
										>
											<SelectTrigger
												className={cn('w-full', {
													'border-red-500': errors.categoryId
												})}
											>
												<SelectValue placeholder="Selecciona una categoría" />
											</SelectTrigger>
											<SelectContent position="popper">
												<SelectGroup>
													<SelectLabel>Categorías</SelectLabel>
													{categories?.map((category) => (
														<SelectItem value={category.id} key={category.id}>
															{category.name}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
										{/* Hidden input para categoryId */}
										<input
											type="hidden"
											{...register('categoryId', {
												required: 'La categoría es requerida'
											})}
										/>
										{errors.categoryId && (
											<p className="text-red-500 text-sm">
												{errors.categoryId.message}
											</p>
										)}
									</div>
									{/* Descripcion */}
									<div className="flex flex-col gap-2">
										<Label htmlFor="description">Descripción</Label>
										<Textarea
											className={cn({
												'border-red-500': errors.description
											})}
											id="description"
											{...register('description')}
											placeholder="Describe el producto..."
											rows={4}
										/>
									</div>
									{/* Precio y Stock */}
									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
										<div className="flex flex-col gap-2">
											<Label htmlFor="price">Precio *</Label>
											<Input
												className={cn({
													'border-red-500': errors.price
												})}
												id="price"
												type="number"
												step="0.01"
												min="0"
												{...register('price', {
													required: 'El Precio es requerido',
													valueAsNumber: true,
													validate: (value) =>
														(value !== null &&
															value !== undefined &&
															value > 0) ||
														'El precio debe ser mayor a 0'
												})}
												placeholder="0.00"
											/>
											{errors.price && (
												<p className="text-red-500 text-sm">
													{errors.price.message}
												</p>
											)}
										</div>
										<div className="flex flex-col gap-2">
											<Label htmlFor="stock">Stock</Label>
											<Input
												className={cn({
													'border-red-500': errors.stock
												})}
												id="stock"
												type="number"
												min="0"
												{...register('stock', {
													valueAsNumber: true,
													validate: (value) =>
														value === undefined ||
														value === null ||
														value >= 0 ||
														'El stock no puede ser negativo'
												})}
												placeholder="0"
											/>
											{errors.stock && (
												<p className="text-red-500 text-sm">
													{errors.stock.message}
												</p>
											)}
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
											checked={isAvailable}
											onCheckedChange={(checked) =>
												setValue('isAvailable', checked)
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
									<CardTitle className="text-lg">Imagen del Producto</CardTitle>
								</CardHeader>
								<CardContent className="flex flex-col gap-4">
									{/* Image preview */}
									<div className="relative h-full w-full overflow-hidden rounded-lg border bg-muted min-h-100">
										{imageToShow ? (
											<>
												<img
													src={imageToShow}
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
										onChange={(e) => handleFileChange(e)}
										id="image-upload"
									/>
									<Button
										type="button"
										variant="outline"
										className="w-full gap-2 bg-transparent"
										onClick={() => fileInputRef.current?.click()}
									>
										<Upload className="h-4 w-4" />
										{imageToShow ? 'Cambiar imagen' : 'Subir imagen'}
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
											{...register('imageUrl')}
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
							disabled={isLoading}
						>
							Cancelar
						</Button>
						<Button variant="secondaryColor" type="submit" disabled={isLoading}>
							{isLoading ? 'Guardando...' : 'Guardar cambios'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
