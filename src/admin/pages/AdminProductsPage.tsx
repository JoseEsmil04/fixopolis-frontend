import { useState } from 'react'
import { AdminPageWrapper } from '@/admin/components/AdminPageWrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogDescription
} from '@/components/ui/dialog'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { Plus, Pencil, Trash2, Package, AlertTriangle } from 'lucide-react'
import { CustomPagination } from '@/components/custom/CustomPagination'
import { useProducts } from '@/shop/hooks/useProducts'
import type { Product } from '@/shop/interfaces/product.interface'
import { CustomLoading } from '@/components/custom/CustomLoading'
import { Link } from 'react-router'

export const AdminProductsPage = () => {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
	const { data, isLoading } = useProducts()
	const products = data?.data

	if (isLoading || !products) {
		return <CustomLoading />
	}

	const openDeleteDialog = (product: Product) => {
		setSelectedProduct(product)
		setIsDeleteDialogOpen(true)
	}

	return (
		<AdminPageWrapper>
			<div className="p-6 h-full flex flex-col overflow-hidden">
				<div className="mb-6 flex items-center justify-between">
					<div>
						<h1 className="text-2xl font-bold text-foreground">Productos</h1>
						<p className="text-muted-foreground">
							Gestiona tu catálogo de productos
						</p>
					</div>
					<Link to={'/admin/products/new'}>
						<Button>
							<Plus className="mr-2 h-4 w-4" />
							Nuevo Producto
						</Button>
					</Link>
				</div>

				<div className="flex-1 overflow-hidden">
					<Card className="h-full flex flex-col">
						<CardHeader className="pb-4 ">
							<div className="flex items-center justify-between">
								<CardTitle className="text-lg font-semibold">
									Catálogo de Productos
								</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-25">Imagen</TableHead>
										<TableHead>Código</TableHead>
										<TableHead>Producto</TableHead>
										<TableHead>Categoría</TableHead>
										<TableHead className="text-right">Precio</TableHead>
										<TableHead className="text-center">Stock</TableHead>
										<TableHead className="text-center">Estado</TableHead>
										<TableHead className="w-25">Acciones</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{products.map((product) => (
										<TableRow key={product.id}>
											<TableCell>
												<div className="relative h-16 w-16 overflow-hidden rounded-md border bg-muted">
													{product.imageUrl ? (
														<img
															src={product.imageUrl || '/placeholder.svg'}
															alt={product.name}
															className="object-cover w-full h-full"
															sizes="64px"
														/>
													) : (
														<div className="flex h-full w-full items-center justify-center">
															<Package className="h-6 w-6 text-muted-foreground" />
														</div>
													)}
												</div>
											</TableCell>
											<TableCell>
												<code className="rounded bg-muted px-2 py-1 text-sm font-mono">
													{product.code}
												</code>
											</TableCell>
											<TableCell>
												<div>
													<div className="font-medium">{product.name}</div>
													<div className="text-sm text-muted-foreground line-clamp-1">
														{product.description}
													</div>
												</div>
											</TableCell>
											<TableCell>
												<span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
													{product.categoryName}
												</span>
											</TableCell>
											<TableCell className="text-right font-medium">
												${product.price.toLocaleString('es-MX')}
											</TableCell>
											<TableCell className="text-center">
												<span
													className={`font-medium ${
														product.stock === 0
															? 'text-destructive'
															: product.stock < 20
																? 'text-amber-500'
																: 'text-foreground'
													}`}
												>
													{product.stock}
												</span>
											</TableCell>
											<TableCell className="text-center">
												<span
													className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
														product.isAvailable
															? 'bg-emerald-500/10 text-emerald-600'
															: 'bg-muted text-muted-foreground'
													}`}
												>
													{product.isAvailable ? 'Disponible' : 'No disponible'}
												</span>
											</TableCell>
											<TableCell>
												<div className="flex gap-1">
													<Link
														to={`/admin/products/${product.id}`}
														className="h-8 w-8 p-0"
													>
														<Pencil className="h-4 w-4" />
														<span className="sr-only">Editar</span>
													</Link>
													<Button
														variant="ghost"
														size="sm"
														className="h-8 w-8 p-0 text-destructive hover:text-destructive"
														onClick={() => openDeleteDialog(product)}
													>
														<Trash2 className="h-4 w-4" />
														<span className="sr-only">Eliminar</span>
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>

							{products.length === 0 && (
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

							{/* Pagination */}
							<CustomPagination totalPages={data!.totalPages} />
						</CardContent>
					</Card>
				</div>
			</div>
			{/* Delete Confirmation Dialog */}
			<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle className="flex items-center gap-2">
							<AlertTriangle className="h-5 w-5 text-destructive" />
							Eliminar Producto
						</DialogTitle>
						<DialogDescription>
							Esta acción no se puede deshacer.
						</DialogDescription>
					</DialogHeader>
					{selectedProduct && (
						<div className="py-4">
							<div className="flex items-center gap-4 rounded-lg border p-4">
								<div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
									{selectedProduct.imageUrl ? (
										<img
											src={selectedProduct.imageUrl || '/placeholder.svg'}
											alt={selectedProduct.name}
											className="object-cover w-full h-full"
											sizes="64px"
										/>
									) : (
										<div className="flex h-full w-full items-center justify-center">
											<Package className="h-6 w-6 text-muted-foreground" />
										</div>
									)}
								</div>
								<div>
									<p className="font-medium">{selectedProduct.name}</p>
									<p className="text-sm text-muted-foreground">
										Código: {selectedProduct.code}
									</p>
								</div>
							</div>
						</div>
					)}
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsDeleteDialogOpen(false)}
						>
							Cancelar
						</Button>
						<Button variant="destructive">Eliminar</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</AdminPageWrapper>
	)
}
