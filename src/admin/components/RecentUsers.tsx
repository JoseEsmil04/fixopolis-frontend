import { Badge } from '@/components/ui/badge'
import { MoreHorizontal } from 'lucide-react'

const users = [
	{
		id: 1,
		name: 'María García',
		email: 'maria@email.com',
		role: 'Cliente',
		status: 'Activo',
		joined: 'Hace 2 días'
	},
	{
		id: 2,
		name: 'Carlos López',
		email: 'carlos@email.com',
		role: 'Técnico',
		status: 'Activo',
		joined: 'Hace 3 días'
	},
	{
		id: 3,
		name: 'Ana Martínez',
		email: 'ana@email.com',
		role: 'Cliente',
		status: 'Pendiente',
		joined: 'Hace 5 días'
	},
	{
		id: 4,
		name: 'Pedro Sánchez',
		email: 'pedro@email.com',
		role: 'Técnico',
		status: 'Activo',
		joined: 'Hace 1 semana'
	},
	{
		id: 5,
		name: 'Laura Torres',
		email: 'laura@email.com',
		role: 'Cliente',
		status: 'Inactivo',
		joined: 'Hace 2 semanas'
	}
]

export const RecentUsers = () => {
	return (
		<div className="rounded-xl border border-border bg-card">
			<div className="flex items-center justify-between border-b border-border p-5">
				<div>
					<h3 className="text-lg font-semibold text-card-foreground">
						Usuarios Recientes
					</h3>
					<p className="text-sm text-muted-foreground">
						Últimos usuarios registrados en la plataforma
					</p>
				</div>
				<button
					type="button"
					className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
				>
					Ver todos
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead>
						<tr className="border-b border-border text-left text-sm text-muted-foreground">
							<th className="px-5 py-3 font-medium">Usuario</th>
							<th className="px-5 py-3 font-medium">Rol</th>
							<th className="px-5 py-3 font-medium">Estado</th>
							<th className="px-5 py-3 font-medium">Registro</th>
							<th className="px-5 py-3 font-medium" />
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr
								key={user.id}
								className="border-b border-border last:border-0 transition-colors hover:bg-muted/50"
							>
								<td className="px-5 py-4">
									<div className="flex items-center gap-3">
										<div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
											<span className="text-sm font-semibold">
												{user.name
													.split(' ')
													.map((n) => n[0])
													.join('')}
											</span>
										</div>
										<div>
											<p className="font-medium text-card-foreground">
												{user.name}
											</p>
											<p className="text-sm text-muted-foreground">
												{user.email}
											</p>
										</div>
									</div>
								</td>
								<td className="px-5 py-4">
									<span className="text-sm text-card-foreground">
										{user.role}
									</span>
								</td>
								<td className="px-5 py-4">
									<Badge
										variant={
											user.status === 'Activo'
												? 'default'
												: user.status === 'Pendiente'
													? 'secondary'
													: 'outline'
										}
										className={
											user.status === 'Activo'
												? 'bg-secondary/20 text-secondary hover:bg-secondary/30'
												: user.status === 'Pendiente'
													? 'bg-chart-3/20 text-chart-3 hover:bg-chart-3/30'
													: 'bg-muted text-muted-foreground'
										}
									>
										{user.status}
									</Badge>
								</td>
								<td className="px-5 py-4">
									<span className="text-sm text-muted-foreground">
										{user.joined}
									</span>
								</td>
								<td className="px-5 py-4">
									<button
										type="button"
										className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
									>
										<MoreHorizontal className="h-4 w-4" />
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
