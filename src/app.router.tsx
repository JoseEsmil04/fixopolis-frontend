import { createBrowserRouter } from 'react-router'
import { HomeLayout } from './shop/layouts/HomeLayout'
import HomePage from './shop/pages/HomePage'
import { AuthLayout } from './auth/layouts/AuthLayout'
import { Navigate } from 'react-router'
import { LoginPage } from './auth/pages/LoginPage'
import { ProductPage } from './shop/pages/ProductPage'
import { CategoryPage } from './shop/pages/CategoryPage'
import { AdminLayout } from './admin/layouts/AdminLayout'
import { DashboardPage } from './admin/pages/DashboardPage'
import { CustomerPage } from './admin/pages/CustomerPage'
import { OrderPage } from './admin/pages/OrdersPage'
import { AdminProductsPage } from './admin/pages/AdminProductsPage'
import { SettingsPage } from './admin/pages/SettingsPage'
import { RegisterPage } from './auth/pages/RegisterPage'
import {
	AdminOrEmployeeRoute,
	CustomerRoute,
	NotAuthenticatedRoute
} from './auth/components/ProtectedRoutes'
import { AdminProductPage } from './admin/pages/AdminProductPage'
import { CustomerLayout } from './customer/layouts/CustomerLayout'
import { MyOrdersPage } from './customer/pages/MyOrdersPage'
import { CartPage } from './customer/pages/CartPage'
import { CustomerProfilePage } from './customer/pages/CustomerProfilePage'
import { CustomerSettingsPage } from './customer/pages/CustomerSettingsPage'

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
				path: 'products/:id',
				element: <ProductPage />
			},
			{
				path: 'category/:categorySlug',
				element: <CategoryPage />
			}
		]
	},
	{
		path: '/customer',
		element: (
			<CustomerRoute>
				<CustomerLayout />
			</CustomerRoute>
		),
		children: [
			{
				path: 'cart',
				element: <CartPage />
			},
			{
				path: 'my-orders',
				element: <MyOrdersPage />
			},
			{
				path: 'profile',
				element: <CustomerProfilePage />
			},
			{
				path: 'settings',
				element: <CustomerSettingsPage />
			}
		]
	},
	{
		path: '/auth',
		element: (
			<NotAuthenticatedRoute>
				<AuthLayout />
			</NotAuthenticatedRoute>
		),
		children: [
			{
				index: true,
				element: <Navigate to="/auth/login" />
			},
			{
				path: 'login',
				element: <LoginPage />
			},
			{
				path: 'register',
				element: <RegisterPage />
			}
		]
	},
	{
		path: '/admin',
		element: (
			<AdminOrEmployeeRoute>
				<AdminLayout />
			</AdminOrEmployeeRoute>
		),
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
				path: 'products',
				element: <AdminProductsPage />
			},
			{
				path: 'products/:id',
				element: <AdminProductPage />
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
