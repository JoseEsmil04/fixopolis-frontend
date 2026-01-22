import { Outlet } from 'react-router'
import { CustomHeader } from '../components/CustomHeader'
import { CustomFooter } from '../components/CustomFooter'

export const HomeLayout = () => {
	return (
		<div className="min-h-screen bg-background">
			<CustomHeader />
			<Outlet />
			<CustomFooter slogan="Soluciones sólidas para proyectos que exigen calidad." />
		</div>
	)
}
