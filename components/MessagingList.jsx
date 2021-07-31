import { useState } from 'react';
import SearchIcon from '@heroicons/react/outline/SearchIcon';

const MessagingList = ({ ...props }) => {
	const people = [
		{
			name: 'Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaqqqqqqqqqqqqqqqqqqwww',
			date: '31/7/21',
			id: 0,
		},
		{ name: 'A', date: '31/7/21', id: 1 },
		{ name: 'A', date: '31/7/21', id: 2 },
		{ name: 'A', date: '31/7/21', id: 3 },
		{ name: 'A', date: '31/7/21', id: 4 },
		{ name: 'A', date: '31/7/21', id: 5 },
		{ name: 'A', date: '31/7/21', id: 6 },
		{ name: 'A', date: '31/7/21', id: 7 },
		{ name: 'A', date: '31/7/21', id: 8 },
		{ name: 'A', date: '31/7/21', id: 9 },
		{ name: 'A', date: '31/7/21', id: 10 },
		{ name: 'A', date: '31/7/21', id: 10 },
		{ name: 'A', date: '31/7/21', id: 10 },
		{ name: 'A', date: '31/7/21', id: 10 },
		{ name: 'A', date: '31/7/21', id: 10 },
		{ name: 'A', date: '31/7/21', id: 10 },
		{ name: 'A', date: '31/7/21', id: 10 },
		{ name: 'A', date: '31/7/21', id: 10 },
		{ name: 'A', date: '31/7/21', id: 10 },
		{ name: 'A', date: '31/7/21', id: 10 },
		{ name: 'A', date: '31/7/21', id: 10 },
		{ name: 'A', date: '31/7/21', id: 10 },
		{ name: 'A', date: '31/7/21', id: 10 },
	];
	const [currentChat, setCurrentChat] = useState(null);

	return (
		<div className='flex flex-col h-full'>
			<div className='group flex items-center justify-center border-2 rounded-xl m-2 mb-0 transition-colors border-gray-200 focus-within:border-gray-400'>
				<input
					class='flex-1 text-gray-500 appearance-none py-2 px-3 rounded-l-xl focus:outline-none group-focus-within:text-gray-700'
					id='username'
					type='text'
					placeholder='Search'
				/>
				<button className='h-full rounded-r-xl'>
					<SearchIcon className='h-full text-gray-400 cursor-pointer p-2' />
				</button>
			</div>
			<ul className='m-2 mr-0 pr-2 divide-y divide-gray-200 overflow-y-scroll'>
				{people.map((person, i) => (
					<li className='' key={i}>
						<div
							className={` my-1 p-4 rounded-md overflow-hidden select-none transition-colors ${
								currentChat?.id == person.id ? 'bg-gray-800 text-white' : 'sm:hover:bg-gray-200'
							}`}
							onClick={() => {
								setCurrentChat(person);
							}}
						>
							<div className='truncate'>{person.name}</div>
							<div className='truncate'>{person.date}</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default MessagingList;
