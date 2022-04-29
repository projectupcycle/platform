module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{html,css,eot,ttf,woff,woff2,svg,js,json,png,ico,gif}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};