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
				<div className='flex flex-col min-h-screen'>
					<Nav />
					<Component {...pageProps} />
				</div>
			</Provider>
		</>
	);
}

export default MyApp;
