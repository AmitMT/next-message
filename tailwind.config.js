module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		minWidth: {
			0: '0rem',
			10: '10rem',
		},
		extend: {},
	},
	variants: {
		scrollbar: ['rounded'],
		scrollSnapType: ['responsive'],
		extend: { textColor: ['selection', 'important'], backgroundColor: ['selection'] },
	},
	plugins: [
		require('tailwind-scrollbar'),
		require('tailwindcss-scroll-snap'),
		require('tailwindcss-important'),
	],
};
