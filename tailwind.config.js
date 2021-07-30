module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		minWidth: {
			10: '10rem',
		},
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
