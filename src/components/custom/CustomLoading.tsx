interface Props {
	item?: string
}

export function CustomLoading({ item }: Props) {
	return (
		<div className="min-h-screen bg-white flex items-center justify-center">
			<div className="text-center space-y-6">
				<div className="relative">
					<div className="w-16 h-16 border-4 border-slate-200 rounded-full mx-auto"></div>
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 border-4 border-[#6D28D9] border-t-transparent rounded-full animate-spin"></div>
				</div>
				<div className="space-y-2">
					<p className="text-slate-600 font-medium animate-pulse">
						Cargando {item}
					</p>
					<div className="flex items-center justify-center gap-1">
						<div
							className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
							style={{ animationDelay: '0ms' }}
						></div>
						<div
							className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
							style={{ animationDelay: '150ms' }}
						></div>
						<div
							className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
							style={{ animationDelay: '300ms' }}
						></div>
					</div>
				</div>
			</div>
		</div>
	)
}
