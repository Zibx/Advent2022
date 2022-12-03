var out = require('fs').readFileSync('input').toString('utf-8')
//rock paper scisors
/*
var out = `A X 4
A Y 8
A Z 3
B X 1
B Y 5
B Z 9
C X 7
C Y 2
C Z 6`
*/

	.split('\n')
	.map(
		(
			line, i, _,
			[op, my, should] = line.split(' ').map((symb, pos)=>pos===2?symb-0:symb.charCodeAt(0) - (pos?'X':'A').charCodeAt(0)).map((x,i)=>i===2?x:1+x)) =>
	//		[op, my, should,
				(op===my?3: (op-my+4)%3===0?6:0)+my
	//		]
	)
			//(my+ (op===my?3: (op-1-(my-1)+3)%3===2?6 : 0))-should  )//.reduce((a,b)=>a+b, 0)

console.log(out .reduce((a,b)=>a+b, 0))