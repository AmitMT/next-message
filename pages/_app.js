import { Provider } from 'next-auth/client';
import NextNprogress from 'nextjs-progressbar';
import 'tailwindcss/tailwind.css';
import Nav from '../components/Nav';
import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<NextNprogress
				color='#29D'
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				showOnShallow={true}
				options={{ showSpinner: false }}
			/>

			<Provider session={pageProps.session}>
				<div className='flex flex-col h-screen'>
					<header className='w-screen'>
						<Nav />
					</header>
					<main
						className='flex-1 h-96 overflow-x-hidden'
						style={{ WebkitTapHighlightColor: 'transparent' }}
					>
						<Component {...pageProps} />
					</main>
				</div>
			</Provider>
		</>
	);
}

export default MyApp;
