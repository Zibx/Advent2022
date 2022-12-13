var data = require('fs').readFileSync('input')+'';
var end = [], start = [];
var map = data.split(/\r\n|\n/).map((row,y)=>row.split('').map((symbol,x)=>{
	return symbol >= 'a' && symbol <= 'z' ? symbol.charCodeAt(0)-'a'.charCodeAt(0): (symbol === 'E' ? (end = [x,y]) && 'E' : (start = [x,y]) && 'S' );
}));
var h = map.length, w = map[0].length;
var inBound = ([x, y])=>x>=0 && y>=0 && x<w && y<h;
var wouldBeInBound = ([x,y], [dx,dy])=> inBound([x+dx, y+dy]);
var addIfWouldBeInBound = ([x,y], [dx,dy], val, v)=> inBound([x+dx, y+dy]) && add([x+dx, y+dy], val, v);
var add = (point, val, v)=> {
	if(!( _(point) in visited ) &&
		!( _(point) in wouldBeVisited )
	){
		var cellData = map[ point[ 1 ] ][ point[ 0 ] ];

		if(val === 'E'){
			val = 26;
		}
		if(val === cellData ||
			val === cellData + 1 ||
			val === cellData - 1) {
			if(val === cellData - 1)
				debugger
			wouldBeVisited[ _( point ) ] = round;
			var pp =  { p: point, v:(v+1), val };
			nextPoints.push( pp )
			if(val === 10){
				console.log(pp)
			}
		}
	}

};
var _ = p=>p.join(',');

var points = [];
var nextPoints = [{p: end, v: 0}];
var visited = {}, wouldBeVisited = {};
wouldBeVisited[_(end)] = '0'
var round = 0;
while(nextPoints.length) {
	console.log(`Round: ${++round}`);
	points = nextPoints;
	nextPoints = [];
	while( points.length ) {
		var { p, v } = points.shift();
		var val = map[ p[ 1 ] ][ p[ 0 ] ] || 0;

		if( !visited[ p.join( ',' ) ] ) {
			visited[ _( p ) ] = 1;
			map[ p[ 1 ] ][ p[ 0 ] ] = map[ p[ 1 ] ][ p[ 0 ] ]+('A'.charCodeAt(0)-'a'.charCodeAt(0));
			if( p === end ) {
				addIfWouldBeInBound( p, [ 0, 1 ], val, v );
				addIfWouldBeInBound( p, [ 1, 0 ], val, v );
				addIfWouldBeInBound( p, [ 0, -1 ], val, v );
				addIfWouldBeInBound( p, [ -1, 0 ], val, v );
			} else if( p[ 0 ] === start[ 0 ] && p[ 1 ] === start[ 1 ] ) {
				break;
			} else {
				addIfWouldBeInBound( p, [ 0, 1 ], val, v );
				addIfWouldBeInBound( p, [ 1, 0 ], val, v );
				addIfWouldBeInBound( p, [ 0, -1 ], val, v );
				addIfWouldBeInBound( p, [ -1, 0 ], val, v );
			}
		}
	}
	var pad = function(s){
		var si = String.fromCharCode(s + 'a'.charCodeAt(0));

		return typeof s === 'string' ? '&' : si === si.toLowerCase() ? '.': si;
	}
	console.log(map.map(row=>row.map(cell=>pad(cell)).join('|')).join('\n'));
	if( p[ 0 ] === start[ 0 ] && p[ 1 ] === start[ 1 ] ){
		break;
	}
}
var pad = function(s){

	return typeof s === 'string' ? s : String.fromCharCode(s + 'a'.charCodeAt(0));
}
val = wouldBeVisited[_(start)];

console.log(map.map(row=>row.map(cell=>pad(cell)).join('|')).join('\n'))
var p = start, step = 0;
var nextDot;
var isLower = function(p, add, val){
	nextDot = [p[0]+add[0], p[1]+add[1]]
    var w = wouldBeVisited[_(nextDot)];
	return w === void 0 ? Infinity : w;
};
var lowest;
wouldBeVisited[_(end)] = 0;
var checks = [[0,1], [1,0], [-1,0], [0,-1]];
while(!(p[0] === end[0] && p[1] === end[1])){
	var pNext, dir;
	step++;
	checks.forEach((additive,i)=>{
		var testVal = isLower(p, additive);
		if(lowest === void 0 || testVal === lowest-1) {
			lowest = testVal;
			pNext = nextDot;
			dir = i;
		}
	});
	map[p[1]][p[0]] = ({0: 'v', 1: '>', 2: '<', 3: '^'})[dir]
	p = pNext;
}
console.log(map.map(row=>row.map(cell=>pad(cell)).join('|')).join('\n'))

debugger

/*
vABv<<<<
>vCvYXX^
AvCvZEX^
A>v>>^W^
AB>>>>>^

v..v<<<<
>v.vv<<^
.>vv>E^^
..v>>>^^
..>>>>>^

 */