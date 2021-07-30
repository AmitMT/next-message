import { signIn, getSession, providers, csrfToken } from 'next-auth/client';
import Image from 'next/image';
import googleIcon from '/public/google-icon.svg';
import githubIcon from '/public/github-icon.svg';
import discordIcon from '/public/discord-icon.svg';
import { useState } from 'react';
import ReactLoading from 'react-loading';

const providersUI = {
	google: { logo: googleIcon },
	github: { logo: githubIcon },
	discord: { logo: discordIcon },
};

const SignIn = ({ authProviders }) => {
	const [loading, setLoading] = useState('');

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-purple-100'>
			<div className='text-3xl font-bold mb-4'>Sign In:</div>
			<div className='border border-black p-3 pb-1 rounded-2xl bg-white'>
				{Object.values(authProviders).map((provider) => (
					<div key={provider.name}>
						<button
							className={
								'flex items-center justify-center w-full text-xl font-bold py-2 px-4 mb-2 text-white rounded border-b-4 transition-colors focus:border-transparent focus:outline-none focus:ring focus:ring--3} ' +
								provider.id
							}
							onClick={() => {
								setLoading(provider.id);
								signIn(provider.id);
							}}
						>
							{loading === provider.id ? (
								<ReactLoading type={'spin'} color={'#ffffff'} height={28} width={28} />
							) : (
								<>
									<div className='flex items-center justify-center p-1 mr-4 bg-white rounded'>
										<Image src={providersUI[provider.id].logo} width={20} height={20} />
									</div>
									Continue with {provider.name}
								</>
							)}
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

SignIn.getInitialProps = async (context) => {
	const { req, res, query } = context;
	const session = await getSession({ req });

	if (session && res && session.accessToken) {
		res.writeHead(302, { Location: query.callbackUrl || '/' });
		res.end();
		return {};
	}

	return {
		session: null,
		authProviders: await providers(context),
		authCsrfToken: await csrfToken(context), // Email signIn
	};
};

export default SignIn;
