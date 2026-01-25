import type React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	EyeIcon,
	EyeOffIcon,
	Mail,
	Lock,
	ArrowRight,
	Loader2
} from 'lucide-react'

export function LoginForm() {
	const [showPassword, setShowPassword] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500))
		setIsLoading(false)
		console.log('Login attempt:', { email, password })
	}

	return (
		<div className="space-y-5">
			{/* Header */}
			<div className="space-y-1">
				<h2 className="text-2xl font-bold text-foreground">
					Bienvenido de nuevo
				</h2>
				<p className="text-muted-foreground text-sm">
					Ingresa a tu cuenta para continuar
				</p>
			</div>

			{/* Social Login Buttons */}
			<div className="space-y-2">
				<Button
					type="button"
					variant="outline"
					className="w-full h-10 gap-3 bg-transparent border-border hover:bg-muted/50 hover:border-muted-foreground/20 transition-all duration-200"
				>
					<svg className="w-5 h-5" viewBox="0 0 24 24">
						<path
							fill="#4285F4"
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						/>
						<path
							fill="#34A853"
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						/>
						<path
							fill="#FBBC05"
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
						/>
						<path
							fill="#EA4335"
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						/>
					</svg>
					<span className="font-medium text-foreground">
						Continuar con Google
					</span>
				</Button>

				<div className="grid grid-cols-2 gap-3">
					<Button
						type="button"
						variant="outline"
						className="h-10 gap-2 bg-transparent border-border hover:bg-muted/50 hover:border-muted-foreground/20 transition-all duration-200"
					>
						<svg
							className="w-5 h-5 text-[#1877F2]"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
						</svg>
						<span className="font-medium text-foreground">Facebook</span>
					</Button>
					<Button
						type="button"
						variant="outline"
						className="h-10 gap-2 bg-transparent border-border hover:bg-muted/50 hover:border-muted-foreground/20 transition-all duration-200"
					>
						<svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
							<path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
						</svg>
						<span className="font-medium text-foreground">Apple</span>
					</Button>
				</div>
			</div>

			{/* Divider */}
			<div className="relative py-1">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-border" />
				</div>
				<div className="relative flex justify-center">
					<span className="bg-background px-4 text-xs text-muted-foreground">
						o continúa con email
					</span>
				</div>
			</div>

			{/* Login Form */}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="space-y-2">
					<Label
						htmlFor="email"
						className="text-foreground font-medium text-sm"
					>
						Correo electrónico
					</Label>
					<div className="relative group">
						<Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
						<Input
							id="email"
							type="email"
							placeholder="tu@email.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="h-10 pl-11 bg-muted/30 border-border focus:border-primary focus:bg-background transition-all duration-200"
						/>
					</div>
				</div>

				<div className="space-y-2">
					<div className="flex items-center justify-between">
						<Label
							htmlFor="password"
							className="text-foreground font-medium text-sm"
						>
							Contraseña
						</Label>
						<button
							type="button"
							className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
						>
							¿La olvidaste?
						</button>
					</div>
					<div className="relative group">
						<Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
						<Input
							id="password"
							type={showPassword ? 'text' : 'password'}
							placeholder="Ingresa tu contraseña"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="h-10 pl-11 pr-11 bg-muted/30 border-border focus:border-primary focus:bg-background transition-all duration-200"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
					<input
						type="checkbox"
						id="remember"
						className="w-4 h-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0 bg-muted/30"
					/>
					<Label
						htmlFor="remember"
						className="text-sm text-muted-foreground cursor-pointer"
					>
						Mantener mi sesión iniciada
					</Label>
				</div>

				<Button
					type="submit"
					disabled={isLoading}
					className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm gap-2 shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30"
				>
					{isLoading ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" />
							Ingresando...
						</>
					) : (
						<>
							Iniciar sesión
							<ArrowRight className="w-5 h-5" />
						</>
					)}
				</Button>
			</form>

			{/* Sign Up Link */}
			<p className="text-center text-muted-foreground text-sm">
				¿No tienes una cuenta?{' '}
				<button
					type="button"
					className="text-accent hover:text-primary/80 transition-colors font-semibold hover:underline"
				>
					Crear cuenta gratis
				</button>
			</p>
		</div>
	)
}
