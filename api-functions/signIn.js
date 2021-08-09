import { getSession } from 'next-auth/client';

export const setProtectedView = async (
	context,
	callback = async () => {
		return {};
	}
) => {
	const { req, res, resolvedUrl } = context;
	const session = await getSession({ req });
	if (!session && res) {
		res.statusCode = 302;
		res.setHeader('Location', `/auth/signIn?callbackUrl=${resolvedUrl}`);
		return { props: { session: null } };
	}

	return { props: { session, ...(await callback(context, session)) } };
};

export const useSessionView = async ({ req, res, resolvedUrl }) => {
	const session = await getSession({ req });
	if (!session && res) {
		return { props: { session: null } };
	}

	return { props: { session } };
};
