import { Link } from 'react-router'
import FixopolisLogo from '@/assets/FixopolisLogo.webp'
import { cn } from '@/lib/utils'

const heightClasses: Record<string, string> = {
	'8': 'h-8',
	'10': 'h-10',
	'12': 'h-12',
	'14': 'h-14',
	'16': 'h-16',
	'18': 'h-18',
	'20': 'h-20',
	'24': 'h-24',
	'40': 'h-40'
}

const widthClasses: Record<string, string> = {
	'8': 'w-8',
	'10': 'w-10',
	'12': 'w-12',
	'14': 'w-14',
	'16': 'w-16',
	'18': 'w-18',
	'20': 'w-20',
	'24': 'w-24',
	'40': 'w-40'
}

const fontSizeClasses: Record<string, string> = {
	'2': 'text-xl',
	'3': 'text-2xl',
	'4': 'text-3xl',
	'5': 'text-4xl',
	'6': 'text-5xl',
	'7': 'text-6xl'
}

interface Props {
	width?: keyof typeof widthClasses
	height?: keyof typeof heightClasses
	fontSize?: keyof typeof fontSizeClasses
	className?: string
}

export const CustomLogo = ({
	width = '16',
	height = '16',
	fontSize = '4',
	className = ''
}: Props) => {
	return (
		<Link
			to="/"
			className={cn(
				'flex items-center hover:opacity-80 transition-opacity',
				className
			)}
		>
			<img
				src={FixopolisLogo}
				alt="Fixopolis"
				className={cn(
					heightClasses[height],
					widthClasses[width],
					'object-contain'
				)}
			/>
			<span
				className={cn(
					fontSizeClasses[fontSize],
					'font-extrabold font-gantari tracking-tight text-[#6D28D9] hover:text-[#0D9668]/80 transition-colors'
				)}
			>
				Fixopolis
			</span>
		</Link>
	)
}
