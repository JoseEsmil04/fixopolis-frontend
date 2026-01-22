import { RouterProvider } from 'react-router'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { appRouter } from './app.router'

const queryClient = new QueryClient()

export function FixopolisApp() {
	return (
		<QueryClientProvider client={queryClient}>
			{/* The rest of your application */}
			<RouterProvider router={appRouter} />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
