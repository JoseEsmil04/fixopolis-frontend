import { fixopolisApi } from '@/api/fixopolis.api'

export const logoutAction = async (token: string) => {
	const { data } = await fixopolisApi.post(
		'/auth/logout',
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	)

	return data
}
