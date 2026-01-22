import { Wrench, Hammer } from 'lucide-react'
import { Outlet } from 'react-router'

export const AuthLayout = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
				<div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
			</div>

			<div className="w-full max-w-md relative z-10">
				<div className="flex flex-col items-center gap-6 mb-8">
					<div className="relative">
						<div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary shadow-lg">
							<Wrench className="w-10 h-10 text-secondary-foreground" />
						</div>
						<div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md">
							<Hammer className="w-4 h-4 text-primary-foreground" />
						</div>
					</div>
					<div className="text-center space-y-2">
						<h1 className="text-4xl font-bold tracking-tight text-secondary">
							Ferretería Pro
						</h1>
						<p className="text-muted-foreground text-balance">
							Gestiona tu inventario y ventas en un solo lugar
						</p>
					</div>
				</div>

				<Outlet />
			</div>
		</div>
	)
}
