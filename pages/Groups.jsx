import { setProtectedView } from '../api/signIn';

const Groups = ({ ...props }) => {
	return <div {...props}>Groups</div>;
};

export const getServerSideProps = setProtectedView;

export default Groups;
