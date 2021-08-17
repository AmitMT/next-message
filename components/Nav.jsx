import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/logo.svg';
import abstractUser from '/public/abstract-user.svg';
import Router, { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import Dropdown from './Dropdown';
import NavPages from './NavPages';
import { useState, useEffect } from 'react';

const Nav = ({ ...props }) => {
	const router = useRouter();
	const [isShowing, setIsShowing] = useState(false);
	const [session] = useSession();

	useEffect(() => {
		Router.events.on('routeChangeComplete', () => {
			setIsShowing(false);
		});
	}, []);

	return (
		<header className='relative z-50'>
			<nav className='bg-gray-800 shadow-lg text-white' {...props}>
				{/* Navbar width */}
				<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
					<div className='relative flex items-center justify-between h-16'>
						{/* Mobile hamburger */}
						<div className='flex items-center sm:hidden'>
							<button
								type='button'
								className={`inline-flex items-center justify-center p-2 rounded-md text-gray-400 transition-colors sm:hover:text-white${
									isShowing ? ' bg-gray-700' : ''
								} focus:outline-none`}
								onClick={() => setIsShowing(!isShowing)}
								style={{ WebkitTapHighlightColor: 'transparent' }}
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
							<div className='hidden sm:ml-10 sm:flex sm:items-center '>
								<div className='flex space-x-1 p-1 bg-gray-900 rounded-xl'>
									<NavPages />
								</div>
							</div>
						</div>
						{/* User Info */}
						{!session && router.pathname !== '/auth/signIn' && (
							<Link href={`/auth/signIn?callbackUrl=${router.pathname}`}>
								<a className='hidden pr-1 font-semibold cursor-pointer sm:block sm:hover:underline sm:text-blue-200 sm:hover:text-blue-300'>
									Sign In
								</a>
							</Link>
						)}
						<div className='flex items-center justify-center h-9'>
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
								allClass=''
							>
								<div className='flex items-center ml-auto'>
									<div className='sm:font-semibold sm:mr-2'>
										<div className='hidden sm:block'>
											{session
												? 'Hello, ' + session?.user?.name
												: router.pathname !== '/auth/signIn' && <div> to Start Messaging</div>}
										</div>
										<div className='block sm:hidden'></div>
									</div>
									{session?.user?.image ? (
										<img className='w-9 h-9 rounded-full' src={session?.user?.image} />
									) : (
										<Image
											className='rounded-full focus:outline-none'
											width={36}
											height={36}
											src={abstractUser}
										/>
									)}
								</div>
							</Dropdown>
						</div>
					</div>
				</div>
			</nav>
			<div
				className={`absolute w-full flex items-center justify-center h-16 ${
					isShowing ? 'nav-pages-out' : 'nav-pages-in'
				} left-0 bg-gray-800 rounded-b shadow sm:hidden nav-pages-transition`}
			>
				<div className='flex space-x-1 p-1 bg-gray-900 rounded-xl overflow-x-auto'>
					<NavPages />
				</div>
			</div>
		</header>
	);
};

export default Nav;
