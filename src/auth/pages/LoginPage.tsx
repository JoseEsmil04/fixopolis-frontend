import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { CustomLogo } from '@/components/custom/CustomLogo'
import { Link, useNavigate } from 'react-router'
import {
	EyeOffIcon,
	EyeIcon,
	GithubIcon
} from 'lucide-react'
import { GoogleIcon } from '../components/AuthIcons'
import { toast } from 'sonner'
import { useAuthStore } from '../store/auth.store'

export const LoginPage = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()
	const { login } = useAuthStore()

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsLoading(true)

		const formData = new FormData(event.target as HTMLFormElement)
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		const isLogged = await login(email, password)

		if (isLogged) {
			navigate('/')
			return
		}

		toast.error(`Correo y/o contraseña no validos`)
		setIsLoading(false)
	}

	return (
		<main className="min-h-svh flex">
			{/* Panel izquierdo - Solo visible en desktop */}
			<div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] text-white p-8 lg:p-12 flex-col justify-between">
				<CustomLogo width="12" height="12" />

				<blockquote className="space-y-4">
					<p className="text-xl lg:text-2xl leading-relaxed text-balance">
						"En Fixopolis encontré todos los materiales que necesitaba para mi
						proyecto. Excelente atención y precios justos."
					</p>
					<footer className="text-sm text-white/70">
						Carlos Rodríguez, Constructor
					</footer>
				</blockquote>

				<p className="text-sm text-white/50">
					2026 Fixopolis. Todos los derechos reservados.
				</p>
			</div>

			{/* Panel derecho - Formulario */}
			<div className="flex-1 w-full flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-background">
				<div className="w-full max-w-md mx-auto flex flex-col">
					{/* Logo móvil */}
					<div className="flex justify-center mb-6 lg:hidden">
						<CustomLogo width="10" height="10" />
					</div>

					<div className="mb-6 lg:mb-8 text-center">
						<h1 className="text-2xl font-semibold tracking-tight text-foreground">
							Bienvenido de nuevo
						</h1>
						<p className="text-muted-foreground mt-2 text-sm sm:text-base">
							Ingresa tus credenciales para acceder a tu cuenta
						</p>
					</div>

					<form onSubmit={(event) => handleLogin(event)} className="space-y-4 lg:space-y-5">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								name="email"
								placeholder="tu@email.com"
								required
								disabled={isLoading}
								className="w-full h-10 lg:h-11"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Contraseña</Label>
								<a
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground transition-colors"
								>
									Olvidaste tu contraseña?
								</a>
							</div>
							<div className="relative">
								<Input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="••••••••"
									required
									disabled={isLoading}
									className="w-full h-10 lg:h-11 pr-10"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
									aria-label={
										showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
									}
								>
									{showPassword ? (
										<EyeOffIcon className="w-4 h-4" />
									) : (
										<EyeIcon className="w-4 h-4" />
									)}
								</button>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<Checkbox id="remember" />
							<Label
								htmlFor="remember"
								className="text-sm text-muted-foreground font-normal cursor-pointer leading-tight"
							>
								Recordarme por 30 días
							</Label>
						</div>

						<Button type="submit" disabled={isLoading} className="w-full h-10 lg:h-11">
							{isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
						</Button>
					</form>

					<div className="relative my-5 lg:my-6 w-full">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-border" />
						</div>
						<div className="relative flex justify-center text-xs">
							<span className="bg-background px-3 text-muted-foreground">
								o continúa con
							</span>
						</div>
					</div>

					<div className="w-full flex gap-3">
						<Button variant="outline" className="flex-1 h-10 lg:h-11 bg-transparent">
							<GoogleIcon className="w-4 h-4" />
							<span className="ml-2">Google</span>
						</Button>
						<Button variant="outline" className="flex-1 h-10 lg:h-11 bg-transparent">
							<GithubIcon className="w-4 h-4" />
							<span className="ml-2">GitHub</span>
						</Button>
					</div>

					<p className="text-center text-sm text-muted-foreground mt-6 lg:mt-8 w-full">
						No tienes cuenta?{' '}
						<Link
							to="/auth/register"
							className="text-foreground font-medium hover:underline"
						>
							Regístrate gratis
						</Link>
					</p>
				</div>
			</div>
		</main>
	)
}
