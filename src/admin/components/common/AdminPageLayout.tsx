import type { ReactNode } from 'react'

export interface AdminPageLayoutProps {
	title: string
	description: string
	children: ReactNode
	actionButton?: ReactNode
}

export const AdminPageLayout = ({ title, description, children, actionButton }: AdminPageLayoutProps) => {
	return (
		<div className="min-h-screen bg-background">
			<div className="pl-64 transition-all duration-300">
				<main className="p-6">
					<div className="mb-6 flex items-center justify-between">
						<div>
							<h2 className="text-2xl font-bold text-foreground">{title}</h2>
							<p className="text-muted-foreground">{description}</p>
						</div>
						{actionButton}
					</div>
					{children}
				</main>
			</div>
		</div>
	)
}