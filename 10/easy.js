var x = 1, cycle = 1, cycleStats = [x];
$0.innerText.split('\n').forEach(line=>{
	if(line==='noop'){
		cycleStats[cycle++] = x;
	}else{
		var cmd = line.split(' '), cnt = cmd[1]-0;
		cycleStats[cycle++] = x;
		cycleStats[cycle++] = x;
		x+=cnt;
	}

})

console.log([20,60,100,140,180,220].map(a=>cycleStats[a]*a).reduce((a,b)=>(a+b))
)