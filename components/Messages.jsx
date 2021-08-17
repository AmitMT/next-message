import { Transition } from '@headlessui/react';
import PaperAirplaneIcon from '@heroicons/react/outline/PaperAirplaneIcon';
import { Fragment, useRef } from 'react';
import ReactLoading from 'react-loading';
import Message from './Message';

const Messages = ({ session, currentMessages, loadingMessages, ...props }) => {
	const sendInput = useRef(null);
	const messagesAddons = currentMessages?.map((message, i) => {
		return {
			...message,
			...{
				top: i == 0 || message?.user?.name != currentMessages[i - 1]?.user?.name,
				bottom:
					i == currentMessages.length - 1 ||
					message?.user?.name != currentMessages[i + 1]?.user?.name,
			},
		};
	});

	return (
		<div className='flex min-w-0 flex-col relative h-full' {...props}>
			<div className='flex-1 flex flex-col relative px-2 overflow-y-scroll scrollbar-none'>
				<Transition
					as={Fragment}
					show={loadingMessages}
					enter='transition duration-200'
					enterFrom='bg-opacity-0 opacity-0'
					enterTo='bg-opacity-60 opacity-100'
					leave='transition ease-in duration-200'
					leaveFrom='bg-opacity-60 opacity-100'
					leaveTo='bg-opacity-0 opacity-0'
				>
					<div className='absolute w-full h-full bg-white flex items-center justify-center'>
						<ReactLoading type={'bars'} color={'rgba(129, 140, 248)'} height={70} width={70} />
					</div>
				</Transition>
				{messagesAddons &&
					messagesAddons.map((message, i) => <Message key={i} {...{ session, message }} />)}
			</div>
			<div className='flex border-t-2 border-gray-200 bg-gray-100 p-2'>
				<div className='flex-1 group flex items-center justify-center'>
					<input
						className='flex-1 bg-white text-gray-500 rounded-full appearance-none py-2 px-5 border-[2px] border-gray-200 caret-indigo-300 focus:outline-none transition-colors group-focus-within:text-gray-700 group-focus-within:border-indigo-200'
						type='text'
						placeholder='Type a message'
						autoComplete='off'
						ref={sendInput}
					/>
					<button
						className='h-full rounded-r-xl'
						onClick={() => {
							sendInput.current.focus();
						}}
					>
						<PaperAirplaneIcon className='h-full text-gray-400 cursor-pointer p-2 transition-colors group-focus-within:text-gray-500 hover:!text-indigo-500' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Messages;
