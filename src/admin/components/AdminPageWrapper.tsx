interface AdminPageWrapperProps {
	children: React.ReactNode
}

export const AdminPageWrapper = ({ children }: AdminPageWrapperProps) => {
	return <main className="admin-main flex-1">{children}</main>
}
