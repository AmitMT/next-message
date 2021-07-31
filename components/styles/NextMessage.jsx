import MessagingList from '../MessagingList';

const NextMessage = ({ ...props }) => {
	return (
		<div
			className='flex pr-10 rounded-md w-screen h-screen sm:w-auto sm:border-2 sm:border-gray-200'
			{...props}
		>
			<MessagingList />
		</div>
	);
};

export default NextMessage;
