import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { CustomLogo } from '@/components/custom/CustomLogo'
import { Link, useNavigate } from 'react-router'
import { EyeOffIcon, EyeIcon, GithubIcon } from 'lucide-react'
import { GoogleIcon } from '../components/AuthIcons'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectItem
} from '@/components/ui/select'
import { toast } from 'sonner'
import { useAuthStore } from '../store/auth.store'

export const RegisterPage = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [role, setRole] = useState<string | undefined>(undefined)
	const { register } = useAuthStore()
	const navigate = useNavigate()

	const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setIsLoading(true)

		const formData = new FormData(event.target as HTMLFormElement)
		const name = formData.get('name') as string
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const confirmPassword = formData.get('confirmPassword') as string

		if (password !== confirmPassword) {
			toast.error(
				'Las contraseñas no coinciden. Por favor, verifica la confirmación.'
			)
			setIsLoading(false)
			return
		}

		if (!role) {
			toast.error('El Rol es obligatorio. Por favor, selecciona un rol.')
			setIsLoading(false)
			return
		}

		try {
			const isRegistered = await register({
				name,
				email,
				password,
				role: Number(role)
			})

			if (isRegistered) {
				navigate('/')
				return
			}
		} catch (error) {
			if (error instanceof Error) {
				toast.error(`${error}`)
				setIsLoading(false)
			}
			return
		}

		setIsLoading(false)
	}

	return (
		<>
			{/* Panel izquierdo - Solo visible en desktop */}
			<div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] text-white p-8 lg:p-12 flex-col justify-between">
				<CustomLogo width="40" height="40" fontSize="7" />

				<blockquote className="space-y-3">
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
			<div className="flex-1 w-full flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-background overflow-y-auto">
				<div className="w-full max-w-lg mx-auto flex flex-col items-center px-6 py-8">
					{/* Logo móvil */}
					<div className="flex justify-center mb-6 lg:hidden">
						<CustomLogo width="20" height="20" fontSize="5" />
					</div>

					<div className="mb-6 lg:mb-8">
						<h1 className="text-2xl font-semibold tracking-tight text-foreground">
							Crear cuenta
						</h1>
						<p className="text-muted-foreground mt-2 text-sm sm:text-base">
							Regístrate para acceder a nuestros productos y servicios
						</p>
					</div>

					<form onSubmit={handleRegister} className="space-y-4 lg:space-y-5">
						<div className="space-y-2">
							<Label htmlFor="name">Nombre completo</Label>
							<Input
								id="name"
								name="name"
								type="text"
								placeholder="Juan Pérez"
								required
								disabled={isLoading}
								className="h-10 lg:h-11"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="tu@email.com"
								required
								disabled={isLoading}
								className="h-10 lg:h-11"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="role">Rol</Label>
							<Select value={role} onValueChange={setRole}>
								<SelectTrigger className="w-full h-10 lg:h-11">
									<SelectValue placeholder="Selecciona un rol" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Rol</SelectLabel>
										<SelectItem value="1">Empleado</SelectItem>
										<SelectItem value="2">Cliente</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>

						<div className="space-y-2">
							<Label htmlFor="password">Contraseña</Label>
							<div className="relative">
								<Input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									placeholder="••••••••"
									required
									disabled={isLoading}
									className="h-10 lg:h-11 pr-10"
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

						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Confirmar contraseña</Label>
							<div className="relative">
								<Input
									id="confirmPassword"
									name="confirmPassword"
									type={showConfirmPassword ? 'text' : 'password'}
									placeholder="••••••••"
									required
									disabled={isLoading}
									className="h-10 lg:h-11 pr-10"
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
									aria-label={
										showConfirmPassword
											? 'Ocultar contraseña'
											: 'Mostrar contraseña'
									}
								>
									{showConfirmPassword ? (
										<EyeOffIcon className="w-4 h-4" />
									) : (
										<EyeIcon className="w-4 h-4" />
									)}
								</button>
							</div>
						</div>

						<div className="flex items-start gap-2">
							<Checkbox id="terms" required />
							<Label
								htmlFor="terms"
								className="text-sm text-muted-foreground font-normal cursor-pointer leading-tight"
							>
								Acepto los términos y condiciones y la política de privacidad
							</Label>
						</div>

						<Button
							type="submit"
							disabled={isLoading}
							className="w-full h-10 lg:h-11"
						>
							{isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
						</Button>
					</form>

					<div className="relative my-5 lg:my-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-border" />
						</div>
						<div className="relative flex justify-center text-xs">
							<span className="bg-background px-3 text-muted-foreground">
								o continúa con
							</span>
						</div>
					</div>

					<div className="flex gap-x-3">
						<Button
							variant="outline"
							className="flex-1 h-10 lg:h-11 bg-transparent"
						>
							<GoogleIcon className="w-4 h-4" />
							<span className="ml-2">Google</span>
						</Button>
						<Button
							variant="outline"
							className="flex-1 h-10 lg:h-11 bg-transparent"
						>
							<GithubIcon className="w-4 h-4" />
							<span className="ml-2">GitHub</span>
						</Button>
					</div>

					<p className="text-center text-sm text-muted-foreground mt-6 lg:mt-8">
						Ya tienes cuenta?{' '}
						<Link
							to="/auth/login"
							className="text-foreground font-medium hover:underline"
						>
							Inicia sesión
						</Link>
					</p>
				</div>
			</div>
		</>
	)
}
