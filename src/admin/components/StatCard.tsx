import { cn } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'

interface Props {
	title: string
	value: string
	change: string
	trend: 'up' | 'down'
	icon: React.ReactNode
}

export const StatCard = ({ title, value, change, trend, icon }: Props) => {
	return (
		<div className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30">
			<div className="flex items-start justify-between">
				<div className="space-y-3">
					<p className="text-sm font-medium text-muted-foreground">{title}</p>
					<p className="text-3xl font-bold tracking-tight text-card-foreground">
						{value}
					</p>
					<div className="flex items-center gap-1.5">
						{trend === 'up' ? (
							<TrendingUp className="h-4 w-4 text-secondary" />
						) : (
							<TrendingDown className="h-4 w-4 text-destructive" />
						)}
						<span
							className={cn(
								'text-sm font-medium',
								trend === 'up' ? 'text-secondary' : 'text-destructive'
							)}
						>
							{change}
						</span>
						<span className="text-sm text-muted-foreground">
							vs mes anterior
						</span>
					</div>
				</div>
				<div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
			</div>
		</div>
	)
}
