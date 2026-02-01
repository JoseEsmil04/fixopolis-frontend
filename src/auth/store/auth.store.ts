import { create } from 'zustand'
import type { User } from '../interfaces/user.interface'
import { loginAction } from '../actions/login.action'
import { logoutAction } from '../actions/logout.action'

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthStore = {
	user: User | null
	token: string | null
	authStatus: AuthStatus
	login: (email: string, password: string) => Promise<boolean>
	logout: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
	token: null,
	user: null,
	authStatus: 'checking',
	login: async (email: string, password: string) => {
		try {
			const data = await loginAction(email, password)
			localStorage.setItem('token', data.token)
			set({ user: data.user, token: data.token })
			return true
		} catch {
			localStorage.removeItem('token')
			set({ user: null, token: null })
			return false
		}
	},
	logout: async () => {
		const token = get().token
		if (!token) return
		try {
			await logoutAction(token)
			localStorage.removeItem('token')
			set({ user: null, token: null })
		} catch {
			return
		}
	}
}))
