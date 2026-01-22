import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter
} from '@/components/ui/dialog'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import {
	Search,
	Plus,
	Pencil,
	Trash2,
	Package,
	Edit2,
	Save,
	X
} from 'lucide-react'

import { Suspense } from 'react'
import { AdminHeader } from '@/admin/components/AdminHeader'

interface Product {
	id: number
	nombre: string
	descripcion: string
	precio: number
	categoria: string
	stock: number
	estado: 'Activo' | 'Inactivo'
}

const initialProducts: Product[] = [
	{
		id: 1,
		nombre: 'Reparación de Pantalla',
		descripcion: 'Servicio de reparación de pantallas para smartphones',
		precio: 150,
		categoria: 'Reparaciones',
		stock: 50,
		estado: 'Activo'
	},
	{
		id: 2,
		nombre: 'Cambio de Batería',
		descripcion: 'Reemplazo de batería para dispositivos móviles',
		precio: 80,
		categoria: 'Reparaciones',
		stock: 100,
		estado: 'Activo'
	},
	{
		id: 3,
		nombre: 'Limpieza Interna',
		descripcion: 'Limpieza profunda de componentes internos',
		precio: 45,
		categoria: 'Mantenimiento',
		stock: 999,
		estado: 'Activo'
	},
	{
		id: 4,
		nombre: 'Instalación de Software',
		descripcion: 'Instalación y configuración de software',
		precio: 60,
		categoria: 'Software',
		stock: 999,
		estado: 'Activo'
	},
	{
		id: 5,
		nombre: 'Protector de Pantalla',
		descripcion: 'Protector de vidrio templado premium',
		precio: 25,
		categoria: 'Accesorios',
		stock: 200,
		estado: 'Inactivo'
	}
]

const categorias = ['Reparaciones', 'Mantenimiento', 'Software', 'Accesorios']

const Loading = () => null

export const AdminProductsPage = () => {
	const [products, setProducts] = useState<Product[]>(initialProducts)
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [editingProduct, setEditingProduct] = useState<Product | null>(null)
	const [searchTerm, setSearchTerm] = useState('')
	const [editingCell, setEditingCell] = useState<{
		id: number
		field: string
	} | null>(null)
	const [tempValue, setTempValue] = useState('')
	const [formData, setFormData] = useState({
		nombre: '',
		descripcion: '',
		precio: '',
		categoria: '',
		stock: '',
		estado: 'Activo' as 'Activo' | 'Inactivo'
	})

	const filteredProducts = products.filter(
		(product) =>
			product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.categoria.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const openCreateDialog = () => {
		setEditingProduct(null)
		setFormData({
			nombre: '',
			descripcion: '',
			precio: '',
			categoria: '',
			stock: '',
			estado: 'Activo'
		})
		setIsDialogOpen(true)
	}

	const openEditDialog = (product: Product) => {
		setEditingProduct(product)
		setFormData({
			nombre: product.nombre,
			descripcion: product.descripcion,
			precio: product.precio.toString(),
			categoria: product.categoria,
			stock: product.stock.toString(),
			estado: product.estado
		})
		setIsDialogOpen(true)
	}

	const startInlineEdit = (id: number, field: string, currentValue: string) => {
		setEditingCell({ id, field })
		setTempValue(currentValue)
	}

	const saveInlineEdit = () => {
		if (editingCell) {
			setProducts(
				products.map((p) => {
					if (p.id === editingCell.id) {
						if (
							editingCell.field === 'precio' ||
							editingCell.field === 'stock'
						) {
							return {
								...p,
								[editingCell.field]: parseFloat(tempValue) || 0
							}
						} else {
							return {
								...p,
								[editingCell.field]: tempValue
							}
						}
					}
					return p
				})
			)
			setEditingCell(null)
			setTempValue('')
		}
	}

	const cancelInlineEdit = () => {
		setEditingCell(null)
		setTempValue('')
	}

	const handleSubmit = () => {
		if (!formData.nombre || !formData.precio || !formData.categoria) return

		if (editingProduct) {
			setProducts(
				products.map((p) =>
					p.id === editingProduct.id
						? {
								...p,
								nombre: formData.nombre,
								descripcion: formData.descripcion,
								precio: Number.parseFloat(formData.precio),
								categoria: formData.categoria,
								stock: Number.parseInt(formData.stock) || 0,
								estado: formData.estado
							}
						: p
				)
			)
		} else {
			const newProduct: Product = {
				id: Math.max(...products.map((p) => p.id)) + 1,
				nombre: formData.nombre,
				descripcion: formData.descripcion,
				precio: Number.parseFloat(formData.precio),
				categoria: formData.categoria,
				stock: Number.parseInt(formData.stock) || 0,
				estado: formData.estado
			}
			setProducts([...products, newProduct])
		}
		setIsDialogOpen(false)
	}

	const handleDelete = (id: number) => {
		setProducts(products.filter((p) => p.id !== id))
	}

	const renderEditableCell = (
		product: Product,
		field: string,
		value: string | number,
		type: 'text' | 'number' = 'text'
	) => {
		const isEditing =
			editingCell?.id === product.id && editingCell?.field === field

		if (isEditing) {
			return (
				<div className="flex items-center gap-1">
					{type === 'number' ? (
						<Input
							type="number"
							value={tempValue}
							onChange={(e) => setTempValue(e.target.value)}
							className="h-8 w-20"
							autoFocus
						/>
					) : (
						<Input
							value={tempValue}
							onChange={(e) => setTempValue(e.target.value)}
							className="h-8 min-w-25"
							autoFocus
						/>
					)}
					<Button
						size="sm"
						variant="ghost"
						className="h-8 w-8 p-0"
						onClick={saveInlineEdit}
					>
						<Save className="h-3 w-3" />
					</Button>
					<Button
						size="sm"
						variant="ghost"
						className="h-8 w-8 p-0"
						onClick={cancelInlineEdit}
					>
						<X className="h-3 w-3" />
					</Button>
				</div>
			)
		}

		return (
			<div
				className="cursor-pointer hover:bg-muted/50 rounded px-2 py-1 min-w-20"
				onClick={() => startInlineEdit(product.id, field, value.toString())}
			>
				{field === 'precio' ? `$${value}` : value}
				<Edit2 className="h-3 w-3 ml-1 inline opacity-0 hover:opacity-50" />
			</div>
		)
	}

	return (
		<>
			<div className="pl-64 transition-all duration-300">
				<AdminHeader />
				<main className="p-6">
					<div className="mb-6 flex items-center justify-between">
						<div>
							<h2 className="text-2xl font-bold text-foreground">Productos</h2>
							<p className="text-muted-foreground">
								Gestiona tu catálogo de productos y servicios
							</p>
						</div>
						<Button
							onClick={openCreateDialog}
							className="bg-primary text-primary-foreground hover:bg-primary/90"
						>
							<Plus className="mr-2 h-4 w-4" />
							Nuevo Producto
						</Button>
					</div>

					<Card>
						<CardHeader className="pb-4">
							<div className="flex items-center justify-between">
								<CardTitle className="text-lg font-semibold">
									Catálogo de Productos
								</CardTitle>
								<div className="relative w-72">
									<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
									<Input
										placeholder="Buscar producto..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-9 bg-muted border-0"
									/>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<Suspense>
								<Table>
									<TableHeader>
										<TableRow className="border-border hover:bg-transparent">
											<TableHead className="text-muted-foreground">
												Producto
											</TableHead>
											<TableHead className="text-muted-foreground">
												Categoría
											</TableHead>
											<TableHead className="text-muted-foreground">
												Precio
											</TableHead>
											<TableHead className="text-muted-foreground">
												Stock
											</TableHead>
											<TableHead className="text-muted-foreground">
												Estado
											</TableHead>
											<TableHead className="text-muted-foreground w-12"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{filteredProducts.map((product) => (
											<TableRow
												key={product.id}
												className="border-border hover:bg-muted/50"
											>
												<TableCell>
													<div>
														<div className="font-medium text-foreground">
															{product.nombre}
														</div>
														<div className="text-sm text-muted-foreground line-clamp-1">
															{product.descripcion}
														</div>
													</div>
												</TableCell>
												<TableCell>
													{renderEditableCell(
														product,
														'categoria',
														product.categoria
													)}
												</TableCell>
												<TableCell className="font-medium">
													{renderEditableCell(
														product,
														'precio',
														product.precio,
														'number'
													)}
												</TableCell>
												<TableCell>
													{renderEditableCell(
														product,
														'stock',
														product.stock,
														'number'
													)}
												</TableCell>
												<TableCell>
													<span
														className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
															product.estado === 'Activo'
																? 'bg-secondary/20 text-secondary'
																: 'bg-muted text-muted-foreground'
														}`}
													>
														{product.estado}
													</span>
												</TableCell>
												<TableCell>
													<div className="flex gap-1">
														<Button
															variant="ghost"
															size="sm"
															className="h-8 w-8 p-0"
															onClick={() => openEditDialog(product)}
														>
															<Pencil className="h-4 w-4" />
														</Button>
														<Button
															variant="ghost"
															size="sm"
															className="h-8 w-8 p-0 text-destructive hover:text-destructive"
															onClick={() => handleDelete(product.id)}
														>
															<Trash2 className="h-4 w-4" />
														</Button>
													</div>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</Suspense>

							{filteredProducts.length === 0 && (
								<div className="flex flex-col items-center justify-center py-12 text-center">
									<Package className="h-12 w-12 text-muted-foreground mb-4" />
									<h3 className="text-lg font-medium text-foreground mb-1">
										No se encontraron productos
									</h3>
									<p className="text-muted-foreground">
										Intenta con otro término de búsqueda o crea un nuevo
										producto.
									</p>
								</div>
							)}
						</CardContent>
					</Card>
				</main>
			</div>

			{/* Create/Edit Product Dialog */}
			<Suspense fallback={<Loading />}>
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>
								{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
							</DialogTitle>
						</DialogHeader>
						<div className="space-y-4 py-4">
							<div className="space-y-2">
								<Label htmlFor="nombre">Nombre del producto</Label>
								<Input
									id="nombre"
									value={formData.nombre}
									onChange={(e) =>
										setFormData({ ...formData, nombre: e.target.value })
									}
									placeholder="Ej: Reparación de pantalla"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="descripcion">Descripción</Label>
								<Textarea
									id="descripcion"
									value={formData.descripcion}
									onChange={(e) =>
										setFormData({ ...formData, descripcion: e.target.value })
									}
									placeholder="Describe el producto o servicio..."
									rows={3}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="precio">Precio ($)</Label>
									<Input
										id="precio"
										type="number"
										value={formData.precio}
										onChange={(e) =>
											setFormData({ ...formData, precio: e.target.value })
										}
										placeholder="0.00"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="stock">Stock</Label>
									<Input
										id="stock"
										type="number"
										value={formData.stock}
										onChange={(e) =>
											setFormData({ ...formData, stock: e.target.value })
										}
										placeholder="0"
									/>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Categoría</Label>
									<Select
										value={formData.categoria}
										onValueChange={(value) =>
											setFormData({ ...formData, categoria: value })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Seleccionar" />
										</SelectTrigger>
										<SelectContent>
											{categorias.map((cat) => (
												<SelectItem key={cat} value={cat}>
													{cat}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label>Estado</Label>
									<Select
										value={formData.estado}
										onValueChange={(value: 'Activo' | 'Inactivo') =>
											setFormData({ ...formData, estado: value })
										}
									>
										<SelectTrigger>
											<SelectValue placeholder="Seleccionar" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Activo">Activo</SelectItem>
											<SelectItem value="Inactivo">Inactivo</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</div>
						<DialogFooter>
							<Button variant="outline" onClick={() => setIsDialogOpen(false)}>
								Cancelar
							</Button>
							<Button
								onClick={handleSubmit}
								className="bg-primary text-primary-foreground hover:bg-primary/90"
							>
								{editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</Suspense>
		</>
	)
}
