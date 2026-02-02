import type { PropsWithChildren } from 'react'
import { useAuthStore } from '../store/auth.store'
import { Navigate } from 'react-router'

export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
	const { authStatus } = useAuthStore()

	if (authStatus === 'checking') return null

	if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" />

	return children
}

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
	const { authStatus } = useAuthStore()

	if (authStatus === 'checking') return null

	if (authStatus === 'authenticated') return <Navigate to="/" />

	return children
}

export const AdminOrEmployeeRoute = ({ children }: PropsWithChildren) => {
	const { authStatus, userIsAdmin, userIsEmployee } = useAuthStore()

	if (authStatus === 'checking') return null

	if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" />

	if (!userIsAdmin() && !userIsEmployee()) return <Navigate to="/" />

	return children
}

export const CustomerRoute = ({ children }: PropsWithChildren) => {
	const { authStatus, userisCustomer } = useAuthStore()

	if (authStatus === 'checking') return null

	if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" />

	if (!userisCustomer()) return <Navigate to="/" />

	return children
}
