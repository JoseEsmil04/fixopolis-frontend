import { useState } from 'react'
import { cn } from '@/lib/utils'
import { categories, products } from '@/mocks/products'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion'
import { Search, SlidersHorizontal, LayoutGrid, List, X } from 'lucide-react'
import { useLocation, useSearchParams } from 'react-router'

export function FilterToolbar() {
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams()
	const { pathname } = useLocation()

	const maxPrice = Math.max(...products.map((p) => p.price))

	const selectedCategory = searchParams.get('category') ?? 'todos'
	const priceMin = Number(searchParams.get('priceMin')) || 0
	const priceMax = Number(searchParams.get('priceMax')) || maxPrice
	const viewMode = (searchParams.get('view') as 'grid' | 'list') || 'grid'
	const searchQuery = searchParams.get('search') || ''

	const priceRange: [number, number] = [priceMin, priceMax]

	const getCategoryCount = (category: string) => {
		if (category === 'Todas') return products.length
		return products.filter((p) => p.categoryName === category).length
	}

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('es-DO', {
			style: 'currency',
			currency: 'DOP',
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(price)
	}

	// Handler functions
	const handleCategoryChange = (category: string) => {
		if (category === 'todos') {
			searchParams.delete('category')
		} else {
			searchParams.set('category', category)
		}
		setSearchParams(searchParams)
	}

	const handlePriceRangeChange = (range: [number, number]) => {
		if (range[0] === 0) {
			searchParams.delete('priceMin')
		} else {
			searchParams.set('priceMin', range[0].toString())
		}

		if (range[1] === maxPrice) {
			searchParams.delete('priceMax')
		} else {
			searchParams.set('priceMax', range[1].toString())
		}
		setSearchParams(searchParams)
	}

	const handleViewModeChange = (mode: 'grid' | 'list') => {
		setSearchParams((prev) => {
			prev.set('view', mode)
			return prev
		})
	}

	const handleSearchChange = (query: string) => {
		if (query) {
			searchParams.set('search', query)
		} else {
			searchParams.delete('search')
		}
		setSearchParams(searchParams)
	}

	const clearAllFilters = () => {
		searchParams.delete('category')
		searchParams.delete('priceMin')
		searchParams.delete('priceMax')
		searchParams.delete('search')
		setSearchParams(searchParams)
	}

	const hasActiveFilters =
		selectedCategory !== 'todos' ||
		priceMin > 0 ||
		priceMax < maxPrice ||
		searchQuery

	return (
		<div className="border-b bg-white sticky top-16 z-40">
			<div className="container mx-auto px-4">
				<Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen}>
					<div className="flex items-center justify-between gap-4 py-4">
						{/* Search input - lado izquierdo */}
						<div className="relative flex-1 max-w-xl">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Buscar productos, SKU..."
								value={searchQuery}
								onChange={(e) => handleSearchChange(e.target.value)}
								className="w-full pl-10 pr-4 border-slate-200 focus:border-[#6D28D9] focus:ring-[#6D28D9]/20"
							/>
						</div>

						{/* Iconos lado derecho */}
						<div className="flex items-center gap-2">
							{/* Filter toggle button */}
							{pathname === '/' && (
								<CollapsibleTrigger asChild>
									<Button
										variant={isFilterOpen ? 'default' : 'outline'}
										size="icon"
										className={cn(
											'h-9 w-9 shrink-0',
											isFilterOpen
												? 'bg-[#6D28D9] hover:bg-[#5B21B6] text-white'
												: 'border-slate-200 hover:bg-slate-50'
										)}
									>
										<SlidersHorizontal className="h-4 w-4" />
										{hasActiveFilters && (
											<span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#0D9668]" />
										)}
									</Button>
								</CollapsibleTrigger>
							)}

							{/* View mode toggle */}
							<div className="flex items-center border rounded-lg overflow-hidden shrink-0">
								<Button
									variant="ghost"
									size="icon"
									onClick={() => handleViewModeChange('grid')}
									className={cn(
										'rounded-none h-9 w-9',
										viewMode === 'grid'
											? 'bg-[#6D28D9] text-white hover:bg-[#6D28D9] hover:text-white'
											: 'hover:bg-slate-50'
									)}
								>
									<LayoutGrid className="h-4 w-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onClick={() => handleViewModeChange('list')}
									className={cn(
										'rounded-none h-9 w-9',
										viewMode === 'list'
											? 'bg-[#6D28D9] text-white hover:bg-[#6D28D9] hover:text-white'
											: 'hover:bg-slate-50'
									)}
								>
									<List className="h-4 w-4" />
								</Button>
							</div>
						</div>
					</div>

					{/* Collapsible filter panel */}
					<CollapsibleContent className="pb-4">
						<div className="rounded-xl border bg-slate-50/50 p-4">
							{/* Filter header with clear button */}
							<div className="flex items-center justify-between mb-4">
								<h3 className="font-serif font-semibold text-[#1E293B]">
									Filtrar productos
								</h3>
								{hasActiveFilters && (
									<Button
										variant="ghost"
										size="sm"
										onClick={clearAllFilters}
										className="text-xs text-[#6D28D9] hover:text-[#5B21B6] hover:bg-[#6D28D9]/10 gap-1"
									>
										<X className="h-3 w-3" />
										Limpiar filtros
									</Button>
								)}
							</div>

							{/* Accordion filters */}
							<Accordion
								type="multiple"
								defaultValue={['categorias', 'precio']}
								className="w-full"
							>
								{/* Categories */}
								<AccordionItem
									value="categorias"
									className="border rounded-lg bg-white mb-3 px-4"
								>
									<AccordionTrigger className="py-3 text-sm font-medium text-[#1E293B] hover:no-underline">
										Categorías
									</AccordionTrigger>
									<AccordionContent className="pb-4">
										<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
											{categories.map((category) => (
												<label
													key={category}
													className={cn(
														'flex items-center gap-2 rounded-lg px-3 py-2.5 cursor-pointer transition-all text-sm',
														selectedCategory === category
															? 'bg-[#6D28D9]/10 border border-[#6D28D9]/30 text-[#6D28D9] font-medium'
															: 'bg-white hover:bg-slate-50 border border-slate-200'
													)}
												>
													<Checkbox
														checked={selectedCategory === category}
														onCheckedChange={() =>
															handleCategoryChange(category)
														}
														className="data-[state=checked]:bg-[#6D28D9] data-[state=checked]:border-[#6D28D9]"
													/>
													<span className="truncate flex-1">{category}</span>
													<Badge
														variant="secondary"
														className={cn(
															'text-xs shrink-0',
															selectedCategory === category
																? 'bg-[#6D28D9] text-white'
																: 'bg-slate-100 text-slate-600'
														)}
													>
														{getCategoryCount(category)}
													</Badge>
												</label>
											))}
										</div>
									</AccordionContent>
								</AccordionItem>

								{/* Price Range */}
								<AccordionItem
									value="precio"
									className="border rounded-lg bg-white px-4"
								>
									<AccordionTrigger className="py-3 text-sm font-medium text-[#1E293B] hover:no-underline">
										Rango de Precio
									</AccordionTrigger>
									<AccordionContent className="pb-4">
										<div className="space-y-4 pt-2 max-w-md">
											<Slider
												value={priceRange}
												onValueChange={(value) =>
													handlePriceRangeChange(value as [number, number])
												}
												max={maxPrice}
												step={500}
												className="**:[[role=slider]]:bg-[#6D28D9] **:[[role=slider]]:border-[#6D28D9] [&_.bg-primary]:bg-[#6D28D9]"
											/>
											<div className="flex items-center gap-4">
												<div className="flex-1 rounded-lg border bg-white px-3 py-2 text-center">
													<span className="text-xs text-muted-foreground">
														Mínimo
													</span>
													<p className="font-mono text-sm font-medium text-[#1E293B]">
														{formatPrice(priceRange[0])}
													</p>
												</div>
												<div className="h-px w-4 bg-slate-300" />
												<div className="flex-1 rounded-lg border bg-white px-3 py-2 text-center">
													<span className="text-xs text-muted-foreground">
														Máximo
													</span>
													<p className="font-mono text-sm font-medium text-[#1E293B]">
														{formatPrice(priceRange[1])}
													</p>
												</div>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</div>
					</CollapsibleContent>
				</Collapsible>
			</div>
		</div>
	)
}
