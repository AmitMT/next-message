import { useState } from 'react';
import SearchIcon from '@heroicons/react/outline/SearchIcon';

const MessagingList = ({ session, chats, ...props }) => {
	const [currentChatID, setCurrentChatID] = useState(null);
	return (
		<div className='flex flex-col h-full'>
			<div className='group flex items-center justify-center border-2 rounded-xl m-2 mb-0 transition-colors border-gray-200 focus-within:border-indigo-300'>
				<input
					className='flex-1 text-gray-500 appearance-none py-2 px-3 rounded-l-xl focus:outline-none transition-colors group-focus-within:text-gray-700'
					id='username'
					type='text'
					placeholder='Search'
					autoComplete='off'
				/>
				<button className='h-full rounded-r-xl'>
					<SearchIcon className='h-full text-gray-300 cursor-pointer p-2 transition-colors hover:text-indigo-400 group-focus-within:text-indigo-400' />
				</button>
			</div>
			<ul className='m-2 mx-0 divide-y divide-gray-300 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 snap snap-y'>
				{chats &&
					chats.map((chat, i) => (
						<li className='snap-start' key={i}>
							<div
								className={`p-4 overflow-hidden select-none cursor-pointer transition-colors ${
									currentChatID == chat.id ? 'bg-gray-200' : 'transition-none sm:hover:bg-gray-100'
								}`}
								onClick={() => {
									setCurrentChatID(chat.id);
								}}
							>
								<div className='truncate'>
									{chat.name ||
										chat.members
											.map((member) => (member.name === session.user.name ? 'You' : member.name))
											.sort()
											.join(', ')}
								</div>
								<div className='truncate text-gray-400'>
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
