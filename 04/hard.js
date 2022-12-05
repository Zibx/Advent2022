document.body.innerText
	.trim()
	.split( '\n' )
	.map(line=>
		line
			.split(',')
			.map(numbers =>
				numbers
					.split('-')
					.map(Number)

			)
			.map(arr=>({from: arr[0], to: arr[1]}))
	)
	.filter(pair =>
		!(
			(pair[0].from > pair[1].to) ||
			(pair[0].to < pair[1].from)
		)
	)
	.length