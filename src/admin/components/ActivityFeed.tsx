'use client'

import { CheckCircle, Clock, AlertCircle, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'

const activities = [
	{
		id: 1,
		type: 'completed',
		title: 'Servicio completado',
		description: 'Reparación de electrodoméstico - María García',
		time: 'Hace 5 min',
		icon: CheckCircle
	},
	{
		id: 2,
		type: 'pending',
		title: 'Nueva solicitud',
		description: 'Instalación de aire acondicionado - Carlos López',
		time: 'Hace 15 min',
		icon: Clock
	},
	{
		id: 3,
		type: 'service',
		title: 'Técnico asignado',
		description: 'Pedro Sánchez asignado a servicio #1234',
		time: 'Hace 30 min',
		icon: Wrench
	},
	{
		id: 4,
		type: 'alert',
		title: 'Servicio retrasado',
		description: 'Reparación plomería - Ana Martínez',
		time: 'Hace 1 hora',
		icon: AlertCircle
	},
	{
		id: 5,
		type: 'completed',
		title: 'Pago recibido',
		description: 'Pago de $150 por servicio #1228',
		time: 'Hace 2 horas',
		icon: CheckCircle
	}
]

export const ActivityFeed = () => {
	return (
		<div className="rounded-xl border border-border bg-card">
			<div className="border-b border-border p-5">
				<h3 className="text-lg font-semibold text-card-foreground">
					Actividad Reciente
				</h3>
				<p className="text-sm text-muted-foreground">
					Últimas acciones en la plataforma
				</p>
			</div>
			<div className="divide-y divide-border">
				{activities.map((activity) => (
					<div
						key={activity.id}
						className="flex items-start gap-4 p-4 transition-colors hover:bg-muted/50"
					>
						<div
							className={cn(
								'rounded-lg p-2',
								activity.type === 'completed' &&
									'bg-secondary/20 text-secondary',
								activity.type === 'pending' && 'bg-chart-3/20 text-chart-3',
								activity.type === 'service' && 'bg-primary/20 text-primary',
								activity.type === 'alert' &&
									'bg-destructive/20 text-destructive'
							)}
						>
							<activity.icon className="h-4 w-4" />
						</div>
						<div className="flex-1 space-y-1">
							<p className="text-sm font-medium text-card-foreground">
								{activity.title}
							</p>
							<p className="text-sm text-muted-foreground">
								{activity.description}
							</p>
						</div>
						<span className="shrink-0 text-xs text-muted-foreground">
							{activity.time}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}
