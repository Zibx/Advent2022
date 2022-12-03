document.body.innerText
	.trim()
	.split( '\n' )
	.map(str=>({
		first: str.substr(0, str.length/2),
		second: str.substr(str.length/2)
	}))
	.map(obj => ({
		firstHash: obj.first.split('').reduce((store, letter)=>{store[letter] = true; return store;}, {} ),
		...obj
	}))
	.map(obj => obj.second.split('').filter(letter => letter in obj.firstHash)[0])
	.map(
		(letter, _, __, ___, isLower = letter.toLowerCase() === letter) =>
			letter.charCodeAt(0) - (isLower? 'a' : 'A').charCodeAt(0) + (isLower?1: 27) )
	.reduce((a,b)=>a+b)
