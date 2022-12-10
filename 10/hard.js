var x = 1, cycle = 0, cycleStats = [x], row, screen = [];
var pushCycle = ()=>{
	if((cycle%40)===0){row = []; screen.push(row)}
	cycleStats[cycle++] = x;
	var xPos = (cycle%40)-1;
	row[xPos] = xPos >=x-1 && xPos <=x+1;

}
$0.innerText.split('\n').forEach(line=>{
	if(line==='noop'){
		pushCycle();
	}else{
		var cmd = line.split(' '), cnt = cmd[1]-0;
		pushCycle();
		pushCycle();
		x+=cnt;
	}

})

//console.log([20,60,100,140,180,220].map(a=>cycleStats[a]*a).reduce((a,b)=>(a+b)))
console.log(screen.map(row=>row.map(s=>s?'#':'.').join('')).join('\n'))

/*
###..####.####.####.#..#.###..####..##.
#..#.#.......#.#....#.#..#..#.#....#..#
#..#.###....#..###..##...###..###..#..#
###..#.....#...#....#.#..#..#.#....####
#.#..#....#....#....#.#..#..#.#....#..#
#..#.#....####.####.#..#.###..#....#..#
..
 */