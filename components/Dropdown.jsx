import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Dropdown = ({
	groups,
	children,
	colorClass = 'text-white',
	bgClass = 'bg-blue-600',
	allClass = '',
	...props
}) => {
	const activeClass = `${colorClass} ${bgClass}`;

	return (
		<Menu as='div' className={'relative ' + allClass} {...props}>
			<Menu.Button style={{ WebkitTapHighlightColor: 'transparent' }}>{children}</Menu.Button>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-90'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-90'
			>
				<Menu.Items className='absolute right-0 mt-2 min-w-10 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
					{groups.map((options, i) => (
						<div key={i} className='px-1 py-1'>
							{options.map((option, j) => (
								<Menu.Item key={j}>
									{({ active }) => (
										<button
											className={`${
												active ? activeClass : 'text-gray-900'
											} text-left transition-colors duration-75 rounded-md px-2 py-2 text-sm w-full`}
										>
											{typeof option === 'function' ? option({ active }) : option}
										</button>
									)}
								</Menu.Item>
							))}
						</div>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default Dropdown;
