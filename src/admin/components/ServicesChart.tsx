import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

const data = [
	{ month: 'Ene', ordenes: 65, ingresos: 4200 },
	{ month: 'Feb', ordenes: 78, ingresos: 5100 },
	{ month: 'Mar', ordenes: 92, ingresos: 6300 },
	{ month: 'Abr', ordenes: 85, ingresos: 5800 },
	{ month: 'May', ordenes: 110, ingresos: 7500 },
	{ month: 'Jun', ordenes: 125, ingresos: 8200 },
	{ month: 'Jul', ordenes: 142, ingresos: 9100 }
]

export function ServicesChart() {
	return (
		<div className="rounded-xl border border-border bg-card p-5">
			<div className="mb-6">
				<h3 className="text-lg font-semibold text-card-foreground">
					Órdenes por Mes
				</h3>
				<p className="text-sm text-muted-foreground">
					Evolución de órdenes completadas
				</p>
			</div>
			<div className="h-70">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={data}>
						<defs>
							<linearGradient id="colorOrdenes" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="oklch(0.50 0.22 290)"
									stopOpacity={0.3}
								/>
								<stop
									offset="95%"
									stopColor="oklch(0.50 0.22 290)"
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>
						<XAxis
							dataKey="month"
							axisLine={false}
							tickLine={false}
							tick={{ fill: 'oklch(0.65 0.02 285)', fontSize: 12 }}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fill: 'oklch(0.65 0.02 285)', fontSize: 12 }}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: 'oklch(0.13 0.008 285)',
								border: '1px solid oklch(0.22 0.015 285)',
								borderRadius: '8px',
								color: 'oklch(0.97 0 0)'
							}}
						/>
						<Area
							type="monotone"
							dataKey="ordenes"
							stroke="oklch(0.50 0.22 290)"
							strokeWidth={2}
							fillOpacity={1}
							fill="url(#colorOrdenes)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}
