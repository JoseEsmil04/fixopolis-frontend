import { fixopolisApi } from '@/api/fixopolis.api'
import type { AuthResponse } from '../interfaces/AuthResponse'

export const loginAction = async (
	email: string,
	password: string
): Promise<AuthResponse> => {
	try {
		const { data } = await fixopolisApi.post<AuthResponse>('/auth/login', {
			email,
			password
		})
		return data
	} catch (error) {
		console.log(error)
		throw error
	}
}
