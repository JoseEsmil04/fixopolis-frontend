import { create } from 'zustand'
import type { User } from '../interfaces/user.interface'
import { loginAction } from '../actions/login.action'
import { logoutAction } from '../actions/logout.action'
import { checkAuthAction } from '../actions/check-auth.action'
import type { RegisterRequest } from '../interfaces/register.request'
import { registerAction } from '../actions/register.action'

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthStore = {
	user: User | null
	token: string | null
	authStatus: AuthStatus
	userIsAdmin: () => boolean
	userIsEmployee: () => boolean
	userisCustomer: () => boolean
	login: (email: string, password: string) => Promise<boolean>
	register: (registerOptions: RegisterRequest) => Promise<boolean>
	logout: () => Promise<void>
	checkAuthStatus: () => Promise<boolean>
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
	token: null,
	user: null,
	authStatus: 'checking',
	userIsAdmin: () => {
		const role = get().user?.role
		return role === 0
	},
	userIsEmployee: () => {
		const role = get().user?.role
		return role === 1
	},
	userisCustomer: () => {
		const role = get().user?.role
		return role === 2
	},
	login: async (email: string, password: string) => {
		try {
			const data = await loginAction(email, password)
			localStorage.setItem('token', data.token)
			set({ user: data.user, token: data.token, authStatus: 'authenticated' })
			return true
		} catch {
			localStorage.removeItem('token')
			set({ user: null, token: null, authStatus: 'not-authenticated' })
			return false
		}
	},
	register: async ({ name, email, password, role }: RegisterRequest) => {
		try {
			const data = await registerAction({ name, email, password, role })
			localStorage.setItem('token', data.token)
			set({ user: data.user, token: data.token, authStatus: 'authenticated' })
			return true
		} catch (error) {
			localStorage.removeItem('token')
			set({ user: null, token: null, authStatus: 'not-authenticated' })
			throw error
		}
	},
	logout: async () => {
		const token = get().token
		if (!token) return
		try {
			await logoutAction(token)
			localStorage.removeItem('token')
			set({ user: null, token: null, authStatus: 'not-authenticated' })
		} catch {
			return
		}
	},
	checkAuthStatus: async () => {
		try {
			const { user, token } = await checkAuthAction()
			set({ user: user, token: token, authStatus: 'authenticated' })
			return false
		} catch {
			set({ user: null, token: null, authStatus: 'not-authenticated' })
			return false
		}
	}
}))
