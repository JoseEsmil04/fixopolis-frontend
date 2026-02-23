import { CustomLogo } from '@/components/custom/CustomLogo'
import { Outlet } from 'react-router'
import { TESTIMONIALS } from '../data/testimonials'

const t = TESTIMONIALS[Math.floor(Math.random() * TESTIMONIALS.length)]

export const AuthLayout = () => {
	return (
		<div className="min-h-screen flex">
			<div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] text-white p-8 lg:p-12 flex-col justify-between">
				<CustomLogo width="32" height="32" fontSize="7" />

				<blockquote className="space-y-3">
					<p className="text-xl lg:text-2xl leading-relaxed text-balance">
						"{t.quote}"
					</p>
					<footer className="text-sm text-white/70">
						{t.author}, {t.role}
					</footer>
				</blockquote>

				<p className="text-sm text-white/50">
					2026 Fixopolis. Todos los derechos reservados.
				</p>
			</div>

			<Outlet />
		</div>
	)
}
