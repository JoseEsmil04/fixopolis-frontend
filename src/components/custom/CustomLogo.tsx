import { Bolt } from 'lucide-react'
import { Link } from 'react-router'

interface Props {
	width?: string
	height?: string
	fontSize?: string
}

export const CustomLogo = ({
	width = '8',
	height = '8',
	fontSize = '2'
}: Props) => {
	return (
		<Link
			to="/"
			className="flex text-[#6D28D9] items-center gap-2 hover:text-[#0D9668] transition-colors"
		>
			<Bolt className={`h-${height} w-${width} font-extrabold`} />
			<span
				className={`text-${fontSize}xl font-extrabold font-gantari tracking-tight`}
			>
				Fixopolis
			</span>
		</Link>
	)
}
