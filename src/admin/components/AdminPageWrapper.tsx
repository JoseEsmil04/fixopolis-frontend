interface AdminPageWrapperProps {
	children: React.ReactNode
}

export const AdminPageWrapper = ({ children }: AdminPageWrapperProps) => {
	return <main className="admin-main p-4 lg:p-6">{children}</main>
}
