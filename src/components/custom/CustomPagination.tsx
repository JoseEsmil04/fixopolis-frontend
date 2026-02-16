import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { useSearchParams } from 'react-router'

interface Props {
	totalPages: number
}

export const CustomPagination = ({ totalPages }: Props) => {
	const [searchParams, setSearchParams] = useSearchParams()
	const queryPage = searchParams.get('page') ?? '1'
	const page = isNaN(+queryPage) ? 1 : Number(queryPage)

	const handlePageChange = (page: number) => {
		if (page < 1 || page > totalPages) return

		searchParams.set('page', page.toString())
		setSearchParams(searchParams)
	}

	const maxVisiblePages = 5
	const showEllipsis = totalPages > maxVisiblePages
	const getVisiblePages = () => {
		if (totalPages <= maxVisiblePages) {
			return Array.from({ length: totalPages }, (_, i) => i + 1)
		}
		
		if (page <= 3) {
			return [1, 2, 3, 4, 5]
		}
		
		if (page >= totalPages - 2) {
			return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
		}
		
		return [page - 2, page - 1, page, page + 1, page + 2]
	}

	const visiblePages = getVisiblePages()

	return (
		<div className="flex items-center justify-center gap-1 sm:gap-2">
			<Button
				variant="outline"
				size="sm"
				disabled={page === 1}
				onClick={() => handlePageChange(page - 1)}
			>
				<ChevronLeft className="h-4 w-4" />
				<span className="hidden sm:inline">Anterior</span>
			</Button>

			{showEllipsis && page > 3 && (
				<>
					<Button
						variant="outline"
						size="sm"
						onClick={() => handlePageChange(1)}
						className="w-9 sm:w-10"
					>
						1
					</Button>
					<span className="px-1 text-muted-foreground hidden sm:inline">...</span>
				</>
			)}

			{visiblePages.map((pageNum) => (
				<Button
					key={pageNum}
					variant={page === pageNum ? 'secondaryColor' : 'outline'}
					onClick={() => handlePageChange(pageNum)}
					size="sm"
					className="w-9 sm:w-10"
				>
					{pageNum}
				</Button>
			))}

			{showEllipsis && page < totalPages - 2 && (
				<>
					<span className="px-1 text-muted-foreground hidden sm:inline">...</span>
					<Button
						variant="outline"
						size="sm"
						onClick={() => handlePageChange(totalPages)}
						className="w-9 sm:w-10"
					>
						{totalPages}
					</Button>
				</>
			)}

			<Button
				variant="outline"
				size="sm"
				disabled={page === totalPages}
				onClick={() => handlePageChange(page + 1)}
			>
				<span className="hidden sm:inline">Siguiente</span>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	)
}
