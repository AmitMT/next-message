import { setProtectedView } from '../api-functions/signIn';

const DirectMessages = ({ ...props }) => {
	return <div {...props}>DirectMessages</div>;
};

export const getServerSideProps = setProtectedView;

export default DirectMessages;
