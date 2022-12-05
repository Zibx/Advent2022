var state = ['NHSJFWTD', 'GBNTQPRH', 'VQL', 'QRWSBN', 'BMVTFDN','RTHVBDM','JQBD','QHZRVJND','SMHNB'].map(a=>a.split(''))
cmds.split('\n').forEach(c=>{
	var ltr = c.split(' '), arr0 = [];
	for(var i = 0; i < ltr[1]; i++){
		state[ltr[5]-1].unshift(state[ltr[3]-1].shift())
	}
})

state.map(s=>s[0]).join('')