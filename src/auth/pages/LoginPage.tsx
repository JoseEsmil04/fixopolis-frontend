import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { CustomLogo } from '@/components/custom/CustomLogo'
import { Link } from 'react-router'
import {
	EyeIcon,
	EyeOffIcon,
	GithubIcon,
	GoogleIcon
} from '../components/AuthIcons'

export const LoginPage = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		await new Promise((resolve) => setTimeout(resolve, 1500))
		setIsLoading(false)
	}

	return (
		<main className="min-h-svh flex">
			{/* Panel izquierdo - Solo visible en desktop */}
			<div className="hidden lg:flex lg:w-1/2 bg-foreground text-background p-12 flex-col justify-between">
				<CustomLogo width="12" height="12" />

				<blockquote className="space-y-4">
					<p className="text-xl leading-relaxed text-balance">
						"Esta plataforma ha transformado completamente la manera en que
						gestionamos nuestro equipo. Simple, intuitiva y poderosa."
					</p>
					<footer className="text-sm text-background/70">
						Sofia Martinez, CEO de TechFlow
					</footer>
				</blockquote>

				<p className="text-sm text-background/50">
					2026 Acme Inc. Todos los derechos reservados.
				</p>
			</div>

			{/* Panel derecho - Formulario */}
			<div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
				<div className="w-full max-w-sm">
					{/* Logo móvil */}
					<div className="flex items-center gap-3 mb-8 lg:hidden">
						<div className="w-8 h-8 bg-foreground rounded-md" />
						<span className="font-semibold text-lg text-foreground">
							Acme Inc
						</span>
					</div>

					<div className="mb-8">
						<h1 className="text-2xl font-semibold tracking-tight text-foreground">
							Bienvenido de nuevo
						</h1>
						<p className="text-muted-foreground mt-2">
							Ingresa tus credenciales para acceder a tu cuenta
						</p>
					</div>

					<form onSubmit={handleSubmit} className="space-y-5">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="tu@email.com"
								required
								disabled={isLoading}
								className="h-11"
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
									type={showPassword ? 'text' : 'password'}
									placeholder="••••••••"
									required
									disabled={isLoading}
									className="h-11 pr-10"
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

						<div className="flex items-center gap-2">
							<Checkbox id="remember" />
							<Label
								htmlFor="remember"
								className="text-sm text-muted-foreground font-normal cursor-pointer"
							>
								Recordarme por 30 días
							</Label>
						</div>

						<Button type="submit" disabled={isLoading} className="w-full h-11">
							{isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
						</Button>
					</form>

					<div className="relative my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-border" />
						</div>
						<div className="relative flex justify-center text-xs">
							<span className="bg-background px-3 text-muted-foreground">
								o continúa con
							</span>
						</div>
					</div>

					<div className="flex gap-3">
						<Button variant="outline" className="flex-1 h-11 bg-transparent">
							<GoogleIcon className="w-4 h-4" />
							<span className="ml-2">Google</span>
						</Button>
						<Button variant="outline" className="flex-1 h-11 bg-transparent">
							<GithubIcon className="w-4 h-4" />
							<span className="ml-2">GitHub</span>
						</Button>
					</div>

					<p className="text-center text-sm text-muted-foreground mt-8">
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
