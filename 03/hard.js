document.body.innerText
	.trim()
	.split( '\n' )
	.reduce( (store, line) => {
		store.current.push(line);
		if(store.current.length === 3){
			store.groups.push(store.current);
			store.current = [];
		}
		return store;
	}, {groups: [], current: []})
	.groups
	.map(group => ({
		rucksackHash: group[0].split('').reduce((store, letter)=>{store[letter] = true; return store;}, {} ),
		group
	}))
	.map(obj => ({
		rucksackHash: obj.group[1].split('').reduce((store, letter) => {
			if(letter in obj.rucksackHash) store[letter] = true;
			return store;
		}, {}),
		group: obj.group
	}))
	.map(obj => ({
		rucksackHash: obj.group[2].split('').reduce((store, letter) => {
			if(letter in obj.rucksackHash) store[letter] = true;
			return store;
		}, {}),
		group: obj.group
	}))
	.map(obj => Object.keys(obj.rucksackHash)[0])
	.map((letter, _, __, ___,
		  isLower = letter.toLowerCase() === letter
	) =>
		letter.charCodeAt(0) - (isLower? 'a' : 'A').charCodeAt(0) + (isLower?1: 27) )
	.reduce((a,b)=>a+b)
