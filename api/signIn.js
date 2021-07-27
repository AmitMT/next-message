import { getSession } from 'next-auth/client';

export const setProtectedView = async ({ req, res, resolvedUrl }) => {
	const session = await getSession({ req });
	if (!session && res) {
		res.statusCode = 302;
		res.setHeader('Location', `/auth/signIn?callbackUrl=${resolvedUrl}`);
		return { props: { session: null } };
	}

	return { props: { session: session } };
};

export const useSessionView = async ({ req, res, resolvedUrl }) => {
	const session = await getSession({ req });
	if (!session && res) {
		return { props: { session: null } };
	}

	return { props: { session: session } };
};
