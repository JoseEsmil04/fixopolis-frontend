import { RouterProvider } from 'react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
	QueryClient,
	QueryClientProvider,
	useQuery
} from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { appRouter } from './app.router'
import type { PropsWithChildren } from 'react'
import { checkAuthAction } from './auth/actions/check-auth.action'
import { CustomLoading } from './components/custom/CustomLoading'

const queryClient = new QueryClient()

export const CheckAuthProvider = ({ children }: PropsWithChildren) => {
	const { isLoading } = useQuery({
		queryKey: ['auth'],
		queryFn: () => checkAuthAction(),
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
