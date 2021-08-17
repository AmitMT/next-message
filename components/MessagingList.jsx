import { useRef } from 'react';
import SearchIcon from '@heroicons/react/outline/SearchIcon';
import PlusIcon from '@heroicons/react/outline/PlusSmIcon';

const MessagingList = ({
	session,
	chats,
	setShowChats,
	currentChatID,
	setCurrentChatID,
	...props
}) => {
	const searchInput = useRef(null);

	return (
		<div className='flex flex-col h-full divide-y-2 divide-gray-200' {...props}>
			<div className='flex m-2'>
				<div className='flex-1 group flex items-center justify-center border-2 rounded-xl transition-colors border-gray-200 focus-within:bg-gray-50 focus-within:border-indigo-300'>
					<input
						className='flex-1 bg-transparent text-gray-500 appearance-none py-2 pl-3 pr-1 rounded-l-xl caret-indigo-300 focus:outline-none transition-colors group-focus-within:text-gray-700'
						type='text'
						placeholder='Search'
						autoComplete='off'
						ref={searchInput}
					/>
					<button
						className='h-full rounded-r-xl'
						onClick={() => {
							searchInput.current.focus();
						}}
					>
						<SearchIcon className='h-full text-gray-300 cursor-pointer p-2 transition-colors hover:text-indigo-400 group-focus-within:text-indigo-400' />
					</button>
				</div>
				<button className='group ml-2 border-2 border-gray-200 rounded-xl overflow-hidden transition-colors sm:hover:bg-gray-50 active:border-indigo-300'>
					<PlusIcon className='h-full p-2 text-gray-400 transition-colors group-hover:text-indigo-400' />
				</button>
			</div>
			<ul className='mb-2 mx-0 divide-y divide-gray-300 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 snap snap-y'>
				{chats &&
					chats.map((chat, i) => (
						<li className='snap-start' key={i}>
							<div
								className={`p-4 overflow-hidden select-none cursor-pointer transition-colors ${
									currentChatID == chat.id ? 'bg-gray-200' : 'transition-none sm:hover:bg-gray-100'
								}`}
								onClick={() => {
									setCurrentChatID(chat.id);
									setShowChats(false);
								}}
							>
								<div className='truncate'>
									{chat.name ||
										chat.members
											.map((member) => (member.name === session.user.name ? 'You' : member.name))
											.sort()
											.join(', ')}
								</div>
								<div className='truncate text-gray-400 h-6'>
									{chat.lastMessage &&
										(chat.lastMessage.user.name === session.user.name
											? 'You'
											: chat.lastMessage.user.name) +
											': ' +
											chat.lastMessage.text}
								</div>
							</div>
						</li>
					))}
			</ul>
		</div>
	);
};

export default MessagingList;
