import { fixopolisApi } from '@/api/fixopolis.api'
import type { AuthResponse } from '../interfaces/auth.response'
import type { RegisterRequest } from '../interfaces/register.request'
import { AxiosError } from 'axios'
// import { AxiosError } from 'axios'

export const registerAction = async ({
	name,
	email,
	password,
	role
}: RegisterRequest): Promise<AuthResponse> => {
	try {
		const { data } = await fixopolisApi.post<AuthResponse>('/auth/signup', {
			name,
			email,
			password,
			role
		})
		return data
	} catch (error) {
		if (error instanceof AxiosError) {
			const message =
				error.response?.data?.message || 'Error al registrar el usuario'

			throw new Error(message)
		}

		throw new Error('Error inesperado')
	}
}
