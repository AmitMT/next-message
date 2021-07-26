import { getSession } from 'next-auth/client';

export const setProtectedView = (component) =>
	(component.getInitialProps = async ({ req, res, asPath }) => {
		const session = await getSession({ req });

		if (!session && res) {
			res.writeHead(302, { Location: `/auth/signIn?callbackUrl=${asPath}` });
			res.end();
			return;
		}

		return {
			session: session,
		};
	});
