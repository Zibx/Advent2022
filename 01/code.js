// easy
document.body.innerText
	.split( '\n\n' )
	.map( elfData =>
		elfData
			.split( '\n' )
			.map( Number )
			.reduce( ( a, b ) => a + b, 0 ) )
	.sort( ( a, b ) => b - a )[ 0 ]

// hard
document.body.innerText
	.split( '\n\n' )
	.map( elfData =>
		elfData
			.split( '\n' )
			.map( Number )
			.reduce( ( a, b ) => a + b, 0 ) )
	.sort( ( a, b ) => b - a )
	.slice( 0, 3 )
	.reduce( ( a, b ) => a + b )