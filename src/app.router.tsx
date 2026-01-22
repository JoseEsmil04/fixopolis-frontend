import { createBrowserRouter } from 'react-router'
import { HomeLayout } from './shop/layouts/HomeLayout'
import HomePage from './shop/pages/home/HomePage'
import { AuthLayout } from './auth/layouts/AuthLayout'
import { Navigate } from 'react-router'
import { LoginPage } from './auth/pages/LoginPage'
import { ProductPage } from './shop/pages/ProductPage'
import { CategoryPage } from './shop/pages/category/CategoryPage'
import { AdminLayout } from './admin/layouts/AdminLayout'
import { DashboardPage } from './admin/pages/dashboard/DashboardPage'
import { CustomerPage } from './admin/pages/customer/CustomerPage'
import { OrderPage } from './admin/pages/order/OrderPage'
import { AdminProductsPage } from './admin/pages/admin-products/AdminProductsPage'
import { SettingsPage } from './admin/pages/settings/SettingsPage'

export const appRouter = createBrowserRouter([
	{
		path: '/',
		element: <HomeLayout />,
		children: [
			{
				index: true,
				element: <HomePage />
			},
			{
				path: 'product/:idSlug',
				element: <ProductPage />
			},
			{
				path: 'category/:categorySlug',
				element: <CategoryPage />
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				index: true,
				element: <Navigate to="/auth/login" />
			},
			{
				path: 'login',
				element: <LoginPage />
			}
		]
	},
	{
		path: '/admin',
		element: <AdminLayout />,
		children: [
			{
				index: true,
				element: <DashboardPage />
			},
			{
				path: 'customers',
				element: <CustomerPage />
			},
			{
				path: 'orders',
				element: <OrderPage />
			},
			{
				path: 'adminProducts',
				element: <AdminProductsPage />
			},
			{
				path: 'settings',
				element: <SettingsPage />
			}
		]
	},
	{
		path: '*',
		element: <Navigate to="/" />
	}
])
