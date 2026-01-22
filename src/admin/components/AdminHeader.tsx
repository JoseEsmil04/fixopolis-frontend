import { Search, Bell } from 'lucide-react'

export const AdminHeader = () => {
	return (
		<header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-sm">
			<div className="flex items-center gap-4">
				<h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
			</div>
			<div className="flex items-center gap-3">
				{/* Search */}
				<div className="relative hidden md:block">
					<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<input
						type="text"
						placeholder="Buscar..."
						className="h-9 w-64 rounded-lg border border-border bg-input pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
					/>
				</div>

				{/* Notifications */}
				<button
					type="button"
					className="relative rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
				>
					<Bell className="h-5 w-5" />
					<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
						3
					</span>
				</button>
			</div>
		</header>
	)
}
