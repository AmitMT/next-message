import Link from 'next/link';
import { useRouter } from 'next/router';

const NavPages = ({
	activeClasses = 'bg-gray-900 text-white',
	inactiveClasses = 'text-gray-300',
	classes = 'px-3 py-2 rounded-md text-sm font-medium hover:text-white',
}) => {
	const router = useRouter();

	return (
		<>
			<Link href='/'>
				<a
					className={`${classes} ${
						router.pathname === '/' ? activeClasses : inactiveClasses
					} focus:${activeClasses.split(' ').join(' focus:')}`}
				>
					Home
				</a>
			</Link>
			<Link href='/DirectMessages'>
				<a
					className={`${classes} ${
						router.pathname === '/DirectMessages' ? activeClasses : inactiveClasses
					} focus:${activeClasses.split(' ').join(' focus:')}`}
				>
					DirectMessages
				</a>
			</Link>
			<Link href='/Groups'>
				<a
					className={`${classes} ${
						router.pathname === '/Groups' ? activeClasses : inactiveClasses
					} focus:${activeClasses.split(' ').join(' focus:')}`}
				>
					Groups
				</a>
			</Link>
		</>
	);
};

export default NavPages;
