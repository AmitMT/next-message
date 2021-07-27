import Head from 'next/head';
import Image from 'next/image';
import { useSessionView } from '../api/signIn';
import phoneImage from '/public/phone.png';

export default function Home() {
	return (
		<>
			<Head>
				<title>Next Message</title>
				<meta name='description' content='Home' />
			</Head>
			<div className='flex-1 flex items-center'>
				<div className='flex items-center mx-auto max-w-3xl max-h-96 '>
					<div className='flex flex-col'>
						<div className='text-5xl font-bold mr-40'>
							<span className='font-light'>Welcome to</span> Next Message
						</div>
						<div className='text-xl mt-8'>
							This is a web application for messaging people all around the world.
						</div>
						<div className='mt-10 mx-auto'>
							<button className='antialiased bg-indigo-600 transition transform hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:scale-95'>
								Send a Message
							</button>
						</div>
					</div>
					<div className='relative ml-10 w-72 h-96'>
						<Image src={phoneImage} layout='fill' objectFit='scale-down' className='select-none' />
					</div>
				</div>
			</div>
		</>
	);
}

export const getServerSideProps = useSessionView;

// useSessionView(Home);
