import { fixopolisApi } from '@/api/fixopolis.api'
import type { AuthResponse } from '../interfaces/AuthResponse'

export const checkAuthAction = async (): Promise<AuthResponse> => {
	const token = localStorage.getItem('token')
	if (!token) throw new Error('No token found')

	try {
		const { data } = await fixopolisApi.get<AuthResponse>('/auth/checkstatus')
		localStorage.setItem('token', data.token)
		return data
	} catch (error) {
		console.error({ error })
		localStorage.removeItem('token')
		throw new Error('Token expired or not valid')
	}
}
