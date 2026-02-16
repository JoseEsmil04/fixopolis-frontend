import { useAuthStore } from '@/auth/store/auth.store'
import { Search, Bell, Settings, Menu } from 'lucide-react'
import { useRef } from 'react'
import { useSearchParams } from 'react-router'

interface AdminHeaderProps {
	onMobileMenuToggle?: () => void
}

export function AdminHeader({ onMobileMenuToggle }: AdminHeaderProps) {
	const [searchParams, setSearchParams] = useSearchParams()
	const { user } = useAuthStore()
	const query = searchParams.get('query') || ''
	const searchInputRef = useRef<HTMLInputElement>(null)
	const handleSearchChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') return
		const searchValue = searchInputRef.current?.value || ''

		setSearchParams((prev) => {
			if (searchValue.trim()) {
				prev.set('query', searchValue.trim())
			} else {
				prev.delete('query')
			}
			return prev
		})
	}

	return (
		<header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 lg:justify-end lg:px-6 backdrop-blur-md">
			{/* Mobile Menu Button */}
			<button
				type="button"
				onClick={onMobileMenuToggle}
				className="lg:hidden rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
				aria-label="Menú"
			>
				<Menu className="h-5 w-5" />
			</button>

			{/* Search */}
			<div className="relative mr-4 lg:mr-8 hidden lg:block">
				<Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<input
					type="search"
					ref={searchInputRef}
					defaultValue={query}
					placeholder="Productos, ordenes, clientes..."
					className="h-9 w-56 lg:w-72 rounded-full border border-border bg-muted/50 pl-11 pr-6 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:bg-background focus:outline-none focus:ring-1 focus:ring-primary/50"
					onKeyDown={(e) => handleSearchChange(e)}
				/>
			</div>
			<button
				type="button"
				className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
				aria-label="Buscar"
			>
				<Search className="h-5 w-5" />
			</button>
			{/* Actions */}
			<div className="flex items-center gap-1">
				{/* Settings */}
				<button
					type="button"
					className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
					aria-label="Ajustes"
				>
					<Settings className="h-5 w-5" />
				</button>
				{/* Notifications */}
				<button
					type="button"
					className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
					aria-label="Notificaciones"
				>
					<Bell className="h-5 w-5" />
					<span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
						3
					</span>
				</button>
				{/* Separator */}
				<div className="mx-2 h-6-px bg-border" />
				{/* User Avatar */}
				<div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
					<span className="text-sm font-semibold">{user!.name.at(0)}</span>
				</div>
			</div>
		</header>
	)
}
