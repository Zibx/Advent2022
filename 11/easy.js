var txt = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`;

txt = txt
	.replace(/Monkey (\d+):/g, 'monkeys[$1] = {inspected:0,')
	.replace(/Starting items:([^\n]+)/g, 'items: [$1],')
	.replace(/Operation: new = ([^\n]+)/g, 'fn: function(old){return $1},')
	.replace(/Test: divisible by ([^\n]+)\n/g, 'test: function(num){return (num%$1)===0 ?')
	.replace(/If true: throw to monkey ([^\n]+)\n/g, '$1:')
	.replace(/If false: throw to monkey ([^\n]+)/g, '$1;}\n}')

var monkeys = [];
new Function('monkeys', txt)(monkeys);

var LogMoves = false, LogResult = false, LogTotal = true;
for(var r = 0; r<20; r++){
	var round = 1;
	monkeys.forEach(function(monkey, id){
		if(LogMoves){
			console.log(`Monkey ${id}:`);
		}
		var item;
		for(var i = monkey.items.length - 1; i>=0; i--){
			var item = monkey.items.splice(i, 1)[0];
			var level = monkey.fn(item)/3|0;
			var to = monkey.test(level)
			if(LogMoves){
				console.log(`  Monkey inspects an item with a worry level of ${item}`);
				console.log(`  Monkey gets bored with item. Worry level is divided by 3 to ${level}`);
				console.log(`  Item with worry level ${level} is thrown to monkey ${to}.`);
			}
			monkey.inspected++;
			monkeys[to].items.push(level)
		}
	});

	if(LogResult){
		console.log(`After round ${round}, the monkeys are holding items with these worry levels:`)
		monkeys.forEach(function(monkey, id){
			console.log(`  Monkey ${id} ${monkey.items.join(', ')}`);
		});
	}
	round++;
}


if(LogTotal){
	console.log(`Inspection stats:`)
	monkeys.forEach(function(monkey, id){
		console.log(`  Monkey ${id} inspected items ${monkey.inspected} times.`);
	});
}

monkeys.map(a=>a.inspected).sort((a,b)=>(b - a)).slice(0,2).reduce((a,b)=>a*b)
//console.log(monkeys)
