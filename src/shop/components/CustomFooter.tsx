import { Link } from 'react-router'
import { CustomLogo } from '../../components/custom/CustomLogo'
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react'

const categories = [
	{ name: 'Todos los productos', slug: '/' },
	{ name: 'Obra Gris', slug: '/category/Obra%20Gris' },
	{ name: 'Interiores', slug: '/category/Interiores' },
	{ name: 'Soluciones Ambientales', slug: '/category/Soluciones%20Ambientales' }
]

const services = [
	'Asesoría de Proyectos',
	'Presupuestos',
	'Entregas a Domicilio',
	'Instalación',
	'Garantía'
]

interface Props {
	slogan: string
}

export const CustomFooter: React.FC<Props> = ({ slogan }) => {
	return (
		<footer className="border-t bg-[#1E293B] text-white mt-8">
			<div className="container mx-auto px-4 py-8 sm:py-12">
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{/* Brand */}
					<div className="lg:col-span-1">
						<CustomLogo />
						<p className="mt-3 sm:mt-4 text-sm text-white/60 leading-relaxed">
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
						<ul className="mt-3 sm:mt-4 space-y-2 text-sm text-white/60">
							{categories.map((item) => (
								<li key={item.slug}>
									<Link
										to={item.slug}
										className="transition-colors hover:text-[#6D28D9] inline-block"
									>
										{item.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Servicios */}
					<div>
						<h4 className="font-serif font-semibold text-white">Servicios</h4>
						<ul className="mt-3 sm:mt-4 space-y-2 text-sm text-white/60">
							{services.map((item) => (
								<li key={item}>
									<span className="transition-colors hover:text-[#6D28D9] cursor-pointer">
										{item}
									</span>
								</li>
							))}
						</ul>
					</div>

					{/* Contacto */}
					<div>
						<h4 className="font-serif font-semibold text-white">Contacto</h4>
						<ul className="mt-3 sm:mt-4 space-y-3 text-sm text-white/60">
							<li className="flex items-start gap-3">
								<MapPin className="h-4 w-4 text-[#0D9668] shrink-0 mt-0.5" />
								<span className="text-xs sm:text-sm">
									Santo Domingo, República Dominicana
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
				<div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-4 sm:py-5 text-center text-xs sm:text-sm text-white/50">
					<p>© 2026 Fixopolis. Todos los derechos reservados.</p>
					<div className="flex items-center gap-4">
						<span className="cursor-pointer hover:text-white transition-colors">
							Privacidad
						</span>
						<span className="cursor-pointer hover:text-white transition-colors">
							Términos
						</span>
					</div>
				</div>
			</div>
		</footer>
	)
}
