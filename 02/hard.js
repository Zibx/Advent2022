var arr = 'rock paper scisors'.split(' ');


var out = require('fs').readFileSync('input').toString('utf-8')
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

out = `A Y
B X
C Z`
*/
	.split('\n')
	.map(
		(
			line, n, _,
			[op, should, s] =
				line
					.split(' ')
					.map((symb, pos)=>symb.charCodeAt(0) - (pos?'X':'A').charCodeAt(0)).map((x,i)=>i===2?x:1+x),
			my = should===2? op : ((op-1+3 +should-2)%3)+1
		) =>
					//[arr[op-1], arr[my-1], should,
			(op===my?3: (op-my+4)%3===0?6:0)+my
				//]
	)
//(my+ (op===my?3: (op-1-(my-1)+3)%3===2?6 : 0))-should  )//.reduce((a,b)=>a+b, 0)

console.log(out .reduce((a,b)=>a+b, 0))
console.log(out)