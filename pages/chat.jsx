import Head from 'next/head';
import { setProtectedView } from '../api-functions/signIn';
import MessagingList from '../components/MessagingList';

const Chat = ({ session, ...props }) => {
	return (
		<>
			<Head>
				<title>Next Message - Chat</title>
				<meta name='description' content='Home' />
			</Head>

			<div className='flex items-center justify-center' {...props}>
				<div className='chat-main w-full'>
					<div className='flex-1 min-w-0 sm:max-w-xl sm:border-r-2 sm:border-gray-200'>
						<MessagingList />
					</div>
					<div className='hidden w-screen sm:block sm:w-auto flex-1'>hi</div>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = setProtectedView;

export default Chat;
