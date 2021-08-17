import Link from 'next/link';
import { useRouter } from 'next/router';

const NavPages = ({
	activeClasses = 'bg-gray-600 text-white',
	inactiveClasses = 'text-gray-300 hover:text-white hover:bg-gray-700 focus:text-white focus:bg-gray-700',
	classes = 'px-3 py-1 rounded-lg text-sm text-lg font-medium transition-colors',
}) => {
	const router = useRouter();

	return (
		<>
			<Link href='/'>
				<a
					className={`${classes} ${
						router.pathname === '/' ? activeClasses : inactiveClasses
					} focus:${activeClasses.split(' ').join(' focus:')}`}
					style={{ WebkitTapHighlightColor: 'transparent' }}
				>
					Home
				</a>
			</Link>
			<Link href='/chat'>
				<a
					className={`${classes} ${
						router.pathname === '/chat' ? activeClasses : inactiveClasses
					} focus:${activeClasses.split(' ').join(' focus:')}`}
					style={{ WebkitTapHighlightColor: 'transparent' }}
				>
					Chat
				</a>
			</Link>
			<Link href='/Groups'>
				<a
					className={`${classes} ${
						router.pathname === '/Groups' ? activeClasses : inactiveClasses
					} focus:${activeClasses.split(' ').join(' focus:')}`}
					style={{ WebkitTapHighlightColor: 'transparent' }}
				>
					Groups
				</a>
			</Link>
		</>
	);
};

export default NavPages;
