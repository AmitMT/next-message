import Head from 'next/head';
import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import ChevronLeftIcon from '@heroicons/react/outline/ChevronLeftIcon';
import { setProtectedView } from '../api-functions/signIn';
import MessagingList from '../components/MessagingList';
import Messages from '../components/Messages';

const Chat = ({ session, chatsError, ...props }) => {
	const [chats, setChats] = useState(null);
	const [currentChatID, setCurrentChatID] = useState(null);
	const [currentMessages, setCurrentMessages] = useState(null);
	const [loadingMessages, setLoadingMessages] = useState(false);
	const [showChats, setShowChats] = useState(true);
	const [socket] = useState(io(process.env.NEXT_PUBLIC_SERVER_ORIGIN_URL));

	useEffect(() => {
		socket.emit('userID', session.user.id);
		socket.on('chatsData', (chatsData) => {
			setChats(chatsData);
		});
		socket.on('currentMessages', (messages) => {
			setCurrentMessages(messages);
			setLoadingMessages(false);
		});

		return () => {
			socket.disconnect();
		};
	}, []);

	useEffect(() => {
		if (currentChatID) {
			socket.emit('changeCurrentChat', currentChatID);
			setLoadingMessages(true);
		}
	}, [currentChatID]);

	return (
		<>
			<Head>
				<title>Next Message - Chat</title>
				<meta name='description' content='Chat' />
			</Head>

			<div className='flex items-center chat-all justify-center bg-gray-50' {...props}>
				<div className='hidden sm:flex chat-main shadow-xl bg-white'>
					{chats ? (
						<>
							<div className='flex-1 min-w-0 sm:max-w-xl sm:border-r-2 sm:border-gray-200'>
								<MessagingList
									{...{ session, chats, setShowChats, currentChatID, setCurrentChatID }}
								/>
							</div>

							<div className='hidden sm:block flex-1 min-w-0'>
								<Messages {...{ session, currentMessages, loadingMessages }} />
							</div>
						</>
					) : (
						<div className='flex flex-col items-center justify-center w-full bg-white'>
							<ReactLoading type={'spin'} color={'#000'} height={70} width={70} />
							<div className='text-2xl mt-4 font-semibold'>Connecting to socket...</div>
						</div>
					)}
				</div>
				<div className='relative sm:hidden chat-main w-full h-full bg-white'>
					{chats ? (
						<>
							<div
								className={`absolute w-full h-full shadow-2xl z-10 bg-white MessagingListTransition 
									${showChats ? 'MessagingListShown' : 'MessagingListHidden'}
										`}
							>
								<MessagingList
									{...{ session, chats, setShowChats, currentChatID, setCurrentChatID }}
								/>
							</div>
							<div className='flex flex-col absolute w-full h-full'>
								<div className='flex border-b-2 p-2'>
									<div className='flex-1 flex items-center justify-center border-gray-200'>
										<button
											className='group h-full'
											onClick={() => {
												setShowChats(true);
											}}
										>
											<ChevronLeftIcon className='h-full text-gray-400 p-2 rounded-xl transition-colors group-active:text-gray-700 group-active:bg-gray-100' />
										</button>
										<div className='flex-1 text-gray-500 p-2 font-semibold text-lg'>
											{chats.find((n) => n.id == currentChatID)?.name ||
												chats
													.find((n) => n.id == currentChatID)
													?.members.map((member) =>
														member.name === session.user.name ? 'You' : member.name
													)
													.sort()
													.join(', ')}
										</div>
									</div>
								</div>
								<Messages {...{ session, currentMessages, loadingMessages }} />
							</div>
						</>
					) : (
						<div className='w-full h-full flex flex-col items-center justify-center bg-white'>
							<ReactLoading type={'spin'} color={'#000'} height={70} width={70} />
							<div className='text-2xl mt-4 font-semibold'>Connecting to socket...</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export const getServerSideProps = setProtectedView;

export default Chat;
