import { Outlet } from 'react-router'

export const AuthLayout = () => {
	return (
		<div className="h-screen flex overflow-hidden">
			<Outlet />
		</div>
	)
}
