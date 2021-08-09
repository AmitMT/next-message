import Head from 'next/head';
import { setProtectedView } from '../api-functions/signIn';
import MessagingList from '../components/MessagingList';
import { io } from 'socket.io-client';
import axios from 'axios';

const Chat = ({ session, chats, chatsError, ...props }) => {
	const socket = io('http://localhost:5000');
	socket.emit('userID', session.user.id);
	socket.on('chatsData', (chatsData) => {
		console.log({ chatsData });
	});

	return (
		<>
			<Head>
				<title>Next Message - Chat</title>
				<meta name='description' content='Home' />
			</Head>

			<div className='flex items-center justify-center' {...props}>
				<div className='chat-main w-full'>
					<div className='flex-1 min-w-0 sm:max-w-xl sm:border-r-2 sm:border-gray-200 mr-2'>
						<MessagingList {...{ session, chats }} />
					</div>
					<div className='hidden w-screen sm:block sm:w-auto flex-1'>hi</div>
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = (context) =>
	setProtectedView(context, async (_context, session) => {
		try {
			const chatIDs =
				(await axios.get(process.env.SERVER_ORIGIN_URL + '/chats/users/' + session.user.id)).data ||
				[];
			const chats = await Promise.all(
				chatIDs.map(
					async (chatID) =>
						(
							await axios.get(process.env.SERVER_ORIGIN_URL + '/chats/' + chatID)
						).data
				)
			);
			return {
				chats,
			};
		} catch (error) {
			return { chatsError: error.message };
		}
	});

export default Chat;
