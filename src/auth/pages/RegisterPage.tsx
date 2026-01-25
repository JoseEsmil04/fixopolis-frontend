import { Drill, Ruler, HardHat } from 'lucide-react'
import { RegisterForm } from '../components/RegisterForm'
import { CustomLogo } from '@/components/custom/CustomLogo'

export const RegisterPage = () => {
	return (
		<>
			{/* Left Panel - Branding */}
			<div className="hidden lg:flex lg:w-1/2 bg-[#161e2c] relative overflow-hidden">
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-20 left-20 w-64 h-64 border border-white/20 rounded-full" />
					<div className="absolute top-40 left-40 w-96 h-96 border border-white/10 rounded-full" />
					<div className="absolute -bottom-20 -left-20 w-80 h-80 border border-white/15 rounded-full" />
				</div>

				{/* Floating Elements */}
				<div className="absolute top-1/4 right-16 animate-pulse">
					<div className="w-16 h-16 rounded-2xl bg-secondary/20 backdrop-blur-sm flex items-center justify-center">
						<Drill className="w-8 h-8 text-secondary" />
					</div>
				</div>
				<div className="absolute top-1/2 right-32 animate-pulse delay-300">
					<div className="w-12 h-12 rounded-xl bg-secondary/20 backdrop-blur-sm flex items-center justify-center">
						<Ruler className="w-6 h-6 text-secondary" />
					</div>
				</div>
				<div className="absolute bottom-1/3 right-20 animate-pulse delay-500">
					<div className="w-14 h-14 rounded-2xl bg-secondary/20 backdrop-blur-sm flex items-center justify-center">
						<HardHat className="w-7 h-7 text-secondary" />
					</div>
				</div>

				{/* Content */}
				<div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
					{/* Logo */}
					<CustomLogo width="16" height="16" fontSize="4" />

					{/* Tagline */}
					<h2 className="text-3xl xl:text-4xl font-bold text-white leading-tight mb-6 text-balance mt-2">
						Únete a <span className="text-primary">Fixopolis</span>
					</h2>
					<p className="text-white/70 text-lg max-w-md leading-relaxed mb-12">
						Crea tu cuenta y accede a los mejores materiales de construcción
						para tus proyectos.
					</p>

					{/* Features */}
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="w-2 h-2 bg-primary rounded-full"></div>
							<span className="text-white/80">
								Catálogo completo de productos
							</span>
						</div>
						<div className="flex items-center gap-3">
							<div className="w-2 h-2 bg-primary rounded-full"></div>
							<span className="text-white/80">Asesoría experta gratis</span>
						</div>
						<div className="flex items-center gap-3">
							<div className="w-2 h-2 bg-primary rounded-full"></div>
							<span className="text-white/80">Entrega a domicilio</span>
						</div>
					</div>
				</div>

				{/* Bottom gradient */}
				<div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-900 to-transparent" />
			</div>

			{/* Right Panel - Register Form */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-background relative overflow-hidden">
				{/* Decorative elements */}
				<div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
				<div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

				<div className="w-full max-w-md relative z-10">
					{/* Mobile Logo */}
					<div className="flex lg:hidden items-center justify-center gap-3 mb-10">
						<CustomLogo />
					</div>

					<RegisterForm />

					{/* Footer */}
					<p className="text-center text-xs text-muted-foreground mt-4">
						Al continuar, aceptas nuestros{' '}
						<button className="text-accent hover:underline">
							Términos de Servicio
						</button>{' '}
						y{' '}
						<button className="text-accent hover:underline">
							Política de Privacidad
						</button>
					</p>
				</div>
			</div>
		</>
	)
}
