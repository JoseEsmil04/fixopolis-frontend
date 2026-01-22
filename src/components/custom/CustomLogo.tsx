import { Bolt } from 'lucide-react'
import { Link } from 'react-router'

export const CustomLogo = () => {
	return (
		<Link
			to="/"
			className="flex text-[#6D28D9] items-center gap-2 hover:text-[#0D9668] transition-colors"
		>
			<Bolt className="h-8 w-8 font-extrabold" />
			<span className="text-2xl font-extrabold font-gantari tracking-tight">
				Fixopolis
			</span>
		</Link>
	)
}
