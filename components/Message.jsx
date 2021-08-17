const Message = ({ session, message: { user, text, top, bottom }, ...props }) => {
	return (
		<div className={`${session.user.name == user?.name ? '' : 'flex justify-end'}`} {...props}>
			<div
				className={`inline-block max-w-[75%] break-words rounded w-max ${
					top ? 'mt-4' : 'mt-[2px]'
				} px-4 py-2 ${top ? ' rounded-t-[20px]' : ' '}${bottom ? ' rounded-b-[20px]' : ' '}${
					session.user.name == user?.name
						? ' bg-indigo-500 text-white rounded-r-[20px]'
						: ' bg-gray-300 rounded-l-[20px]'
				}`}
			>
				{text}
			</div>
		</div>
	);
};

export default Message;
