import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/logo.svg';
import abstractUser from '/public/abstract-user.svg';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/client';
import Dropdown from './Dropdown';

const Nav = ({ ...props }) => {
	const router = useRouter();
	const [session] = useSession();

	return (
		<nav className='sticky top-0 z-50 bg-gray-800 text-white' {...props}>
			{/* Navbar width */}
			<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
				<div className='relative flex items-center justify-between h-16'>
					{/* Mobile hamburger */}
					<div className='flex items-center sm:hidden'>
						<button
							type='button'
							className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
							aria-controls='mobile-menu'
							aria-expanded='false'
						>
							<svg
								className='block h-6 w-6'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
							<svg
								className='hidden h-6 w-6'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>
					<div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
						<Link href='/'>
							<a className='flex'>
								<Image src={logo} width={40} height={40} />
								<div className='hidden font-semibold text-xl lg:flex lg:items-center lg:ml-2'>
									Next Message
								</div>
							</a>
						</Link>
						<div className='hidden sm:ml-6 sm:flex sm:items-center '>
							<div className='flex space-x-4'>
								<Link href='/'>
									<a
										className={`${
											router.pathname === '/' ? 'bg-gray-900' : 'text-gray-300'
										} text-white px-3 py-2 rounded-md text-sm font-medium hover:text-white focus:bg-gray-900`}
									>
										Home
									</a>
								</Link>
								<Link href='/DirectMessages'>
									<a
										className={`${
											router.pathname === '/DirectMessages' ? 'bg-gray-900' : 'text-gray-300'
										} text-white px-3 py-2 rounded-md text-sm font-medium hover:text-white focus:bg-gray-900`}
									>
										DirectMessages
									</a>
								</Link>

								<Link href='/Groups'>
									<a
										className={`${
											router.pathname === '/Groups' ? 'bg-gray-900' : 'text-gray-300'
										} text-white px-3 py-2 rounded-md text-sm font-medium hover:text-white focus:bg-gray-900`}
									>
										Groups
									</a>
								</Link>
							</div>
						</div>
					</div>
					{/* User Info */}
					{!session && router.pathname !== '/auth/signIn' && (
						<Link href={`/auth/signIn?callbackUrl=${router.pathname}`}>
							<a className='pr-1 font-semibold cursor-pointer md:hover:underline md:text-blue-200 md:hover:text-blue-300'>
								Sign In
							</a>
						</Link>
					)}
					<Dropdown
						groups={[
							[
								<Link href='Profile'>
									<a>Your profile</a>
								</Link>,
								<Link href='Settings'>
									<a>Settings</a>
								</Link>,
							],
							[<div onClick={signOut}>Sign out</div>],
						]}
						bgClass='bg-gray-700'
					>
						<div className='flex items-center ml-auto'>
							<div className='hidden font-semibold mr-2 sm:block'>
								{session
									? 'Hello, ' + session?.user?.name
									: router.pathname !== '/auth/signIn' && <div> to Start Messaging</div>}
							</div>
							{session?.user?.image ? (
								<img className='w-9 h-9 rounded-full' src={session?.user?.image} />
							) : (
								<Image className='rounded-full' width={36} height={36} src={abstractUser} />
							)}
						</div>
					</Dropdown>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
