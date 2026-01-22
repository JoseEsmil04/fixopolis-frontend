import { CustomLogo } from '../../components/custom/CustomLogo'
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react'

const services = [
	'Asesoría de Proyectos',
	'Presupuestos',
	'Entregas a Domicilio',
	'Instalación',
	'Garantía'
]

const categories = [
	'Obra Gris',
	'Terminaciones',
	'Equipos',
	'Puertas',
	'Cocinas',
	'Muebles'
]

interface Props {
	slogan: string
}

export const CustomFooter: React.FC<Props> = ({ slogan }) => {
	return (
		<footer className="border-t bg-[#1E293B] text-white mt-8">
			<div className="container mx-auto px-4 py-12">
				<div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
					{/* Brand */}
					<div className="lg:col-span-1">
						<CustomLogo />
						<p className="mt-4 text-sm text-white/60 leading-relaxed">
							{slogan}
						</p>
						{/* Social */}
						<div className="mt-4 flex items-center gap-2">
							<a
								href="#"
								className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-[#6D28D9] transition-colors"
							>
								<Facebook className="h-4 w-4" />
							</a>
							<a
								href="#"
								className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-[#6D28D9] transition-colors"
							>
								<Instagram className="h-4 w-4" />
							</a>
							<a
								href="#"
								className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-[#6D28D9] transition-colors"
							>
								<Twitter className="h-4 w-4" />
							</a>
						</div>
					</div>

					{/* Productos */}
					<div>
						<h4 className="font-serif font-semibold text-white">Productos</h4>
						<ul className="mt-4 space-y-2.5 text-sm text-white/60">
							{categories.map((item) => (
								<li key={item}>
									<a
										href="#"
										className="transition-colors hover:text-[#6D28D9]"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Servicios */}
					<div>
						<h4 className="font-serif font-semibold text-white">Servicios</h4>
						<ul className="mt-4 space-y-2.5 text-sm text-white/60">
							{services.map((item) => (
								<li key={item}>
									<a
										href="#"
										className="transition-colors hover:text-[#6D28D9]"
									>
										{item}
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Contacto */}
					<div>
						<h4 className="font-serif font-semibold text-white">Contacto</h4>
						<ul className="mt-4 space-y-3 text-sm text-white/60">
							<li className="flex items-start gap-3">
								<MapPin className="h-4 w-4 text-[#0D9668] shrink-0 mt-0.5" />
								<span>
									Av. Principal #123, Santo Domingo, República Dominicana
								</span>
							</li>
							<li className="flex items-center gap-3">
								<Phone className="h-4 w-4 text-[#0D9668] shrink-0" />
								<span>(829) 453-1272</span>
							</li>
							<li className="flex items-center gap-3">
								<Mail className="h-4 w-4 text-[#0D9668] shrink-0" />
								<span>info@fixopolis.do</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Bottom */}
			<div className="border-t border-white/10">
				<div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-5 text-center text-sm text-white/50">
					<p>© 2026 Fixopolis. Todos los derechos reservados.</p>
					<div className="flex items-center gap-4">
						<a href="#" className="hover:text-white transition-colors">
							Privacidad
						</a>
						<a href="#" className="hover:text-white transition-colors">
							Términos
						</a>
					</div>
				</div>
			</div>
		</footer>
	)
}
