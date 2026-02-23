import { RouterProvider } from 'react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
	QueryClient,
	QueryClientProvider,
	useQuery
} from '@tanstack/react-query'
import { Toaster } from 'sileo'
import { appRouter } from './app.router'
import type { PropsWithChildren } from 'react'
import { CustomLoading } from './components/custom/CustomLoading'
import { useAuthStore } from './auth/store/auth.store'

const queryClient = new QueryClient()

export const CheckAuthProvider = ({ children }: PropsWithChildren) => {
	const { checkAuthStatus } = useAuthStore()
	const { isLoading } = useQuery({
		queryKey: ['auth'],
		queryFn: () => checkAuthStatus(),
		retry: false,
		refetchInterval: 1000 * 60 * 1.5,
		refetchOnWindowFocus: true
	})

	if (isLoading) return <CustomLoading item="... Espere por favor." />
	return children
}

export function FixopolisApp() {
	return (
		<QueryClientProvider client={queryClient}>
			{/* The rest of your application */}
			<Toaster />
			<CheckAuthProvider>
				<RouterProvider router={appRouter} />
			</CheckAuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
