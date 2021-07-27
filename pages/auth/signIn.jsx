import { signIn, getSession, providers, csrfToken } from 'next-auth/client';
import Image from 'next/image';
import googleIcon from '/public/google-icon.svg';
import githubIcon from '/public/github-icon.svg';
import discordIcon from '/public/discord-icon.svg';

const providersUI = {
	google: { logo: googleIcon, bg: 'bg-red-500' },
	github: { logo: githubIcon, bg: 'bg-blue-600' },
	discord: { logo: discordIcon, bg: 'bg-purple-600' },
};

const SignIn = ({ authProviders }) => {
	const hoverBgClass = (className) =>
		className.substring(0, className.length - 3) +
		(parseInt(className[className.length - 3]) + 1) +
		className.substring(className.length - 2);

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-purple-100'>
			<div className='text-3xl font-bold mb-4'>Sign In:</div>
			<div className='border border-black p-3 pb-1 rounded-2xl bg-white'>
				{Object.values(authProviders).map((provider) => (
					<div key={provider.name}>
						<button
							className={`flex items-center font-bold py-2 px-4 mb-2 ${
								providersUI[provider.id].bg
							} text-white rounded transition-colors hover:${hoverBgClass(
								providersUI[provider.id].bg
							)} focus:outline-none focus:ring`}
							onClick={() => signIn(provider.id)}
						>
							<div className='flex items-center justify-center p-1 mr-4 bg-white rounded'>
								<Image src={providersUI[provider.id].logo} width={20} height={20} />
							</div>
							Continue with {provider.name}
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
