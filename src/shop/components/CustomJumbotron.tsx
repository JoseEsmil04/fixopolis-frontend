import { useLocation } from 'react-router'

interface Props {
	title: string
	subtitle?: string
}
export const CustomJumbotron = ({ title, subtitle }: Props) => {
	const { pathname } = useLocation()

	return (
		<section className="relative overflow-hidden bg-linear-to-b from-slate-50 to-white py-12 lg:py-16">
			{/* Subtle pattern */}
			<div
				className="absolute inset-0 opacity-[0.02]"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%231E293B' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
				}}
			/>

			<div className="container relative mx-auto px-4 text-center">
				<h1 className="font-serif text-4xl font-bold tracking-tight text-[#1E293B] sm:text-5xl lg:text-6xl text-balance">
					{title}
					{pathname === '/' && (
						<span className="block text-[#6D28D9]">de Proyectos</span>
					)}
				</h1>
				<p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground text-pretty leading-relaxed">
					{subtitle}
				</p>
			</div>
		</section>
	)
}
