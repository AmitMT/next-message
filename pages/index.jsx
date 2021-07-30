import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useSessionView } from '../api-functions/signIn';
import phoneImage from '/public/phone.png';

export default function Home() {
	const [hi, setHi] = useState(false);
	return (
		<>
			<Head>
				<title>Next Message</title>
				<meta name='description' content='Home' />
			</Head>
			<div className='flex-1 flex items-center'>
				<div className='flex items-center max-w-full text-center mx-5 sm:text-left lg:mx-auto lg:max-w-3xl '>
					<div className='flex flex-col'>
						<div className='text-5xl font-bold'>
							<div className='font-light'>Welcome to</div> Next Message
						</div>
						<div className='text-xl mt-8'>
							A web application made with <b>next.js</b> for messaging people all around the world.
						</div>
						<div className='mx-auto'>
							<Link href='/DirectMessages'>
								<a className='block bg-indigo-600 border-b-4 border-indigo-900 transition hover:bg-indigo-700 text-white font-semibold mt-10 mb-5 py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:border-transparent'>
									Send a Message
								</a>
							</Link>
						</div>
					</div>
					<div className='hidden self-end md:block ml-10'>
						<Image
							src={phoneImage}
							layout='intrinsic'
							objectFit='scale-down'
							className='select-none'
						/>
					</div>
					<div
						className={`hi${hi ? ' transition' : ''}`}
						onClick={() => {
							setHi(!hi);
						}}
					>
						hi
					</div>
				</div>
			</div>
		</>
	);
}

export const getServerSideProps = useSessionView;
