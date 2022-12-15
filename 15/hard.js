var txt = (require('fs').readFileSync('input')+'').replace(/\r/g,'');
var maxXY = 4000000;//20;
var FREQ = 4000000;



var sortByStart = function sortByStart(a, b) {
	return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
}

function union(...intervals) {
	if (!intervals.length) {
		return [];
	}
	intervals = intervals.sort(sortByStart);
	const result = [];
	let [start, end] = intervals[0];
	for (let i = 1, n = intervals.length; i < n; i++) {
		const [nextStart, nextEnd] = intervals[i];
		if (end < nextStart) {
			result.push([start, end]);
			start = nextStart;
		}
		if (end < nextEnd) {
			end = nextEnd;
		}
	}
	return [...result, [start, end]];
}

function arrayUnion(...arrays) {
	if (!arrays.length) {
		return [];
	}
	let flattenedIntervals = [];
	for (let i = 0, n = arrays.length; i < n; i++) {
		flattenedIntervals = flattenedIntervals.concat(arrays[i]);
	}
	return union(...flattenedIntervals);
}


var s = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`

var s = txt
	.
	replace( /[^=\d\n\-]/g, '' )
	.split( '\n' )
	.map( a => a.split( '=' ) )
	.map( a => a.map( Number ) )
	.map( a => ( [ a[ 1 ], a[ 2 ] , a[ 3 ], a[ 4 ] ] ) ); // Sx Sy Bx By
	//.map(a=>({S: {x: a[1],y:a[2]}, B: {x: a[3], y: a[4]}}));

var sL = s.length,
	abs = Math.abs;
var arr = [];
for(var r = 16500; r<=maxXY; r++) {
	if(r%100000===0)
		console.log(`${r} from ${maxXY}`)
	var rowN = r, beaconsOnRow = [];



	var intervals = [];
	for( var i = 0; i < sL; i++ ) {
		var sb = s[ i ];
		var dx = sb[0] - sb[2],
			dy = sb[1] - sb[3],

			sum = abs( dx ) + abs( dy );
		if( rowN === sb[3] && sb[2]>0 && sb[2]<=maxXY )
			beaconsOnRow.push( sb[2] )

		if( abs( sb[1] - rowN ) > sum )
			continue;

		var dsx = sum - abs( sb[1] - rowN );
		intervals.push([ sb[0] - dsx, sb[0] + dsx ])
	}


	//var nums = [].concat.apply( [], intervals ).sort(),
	var min = 0, max = maxXY;

	var ui = union(...intervals);
	if(!(ui.length>1 || ui[0]>0 || ui[1]<maxXY))
		continue;

	for( var i = 0; i <= max; i++ ) {
		arr[ i ] = 1;
	}
	intervals.forEach( ( [ from, to ] ) => {
		if(from<0)from = 0;
		if(from>max)from = max;
		if(to<0)to = 0;
		if(to>max)to = max;

		for( var i = from; i <= to; i++ ) {
			if(i>=0 && i <= maxXY) {
				arr[ i - min ] = 0
			}
		}
	} );
	beaconsOnRow.forEach( b => arr[ b - min ] = 2 );
	//console.log( arr.join( '' ) );
	var x = arr.indexOf(1);
	if(x>-1){
		console.log({x, y: rowN, freq: x*FREQ+rowN});
	}
	//console.log(arr.indexOf('.'))
	//console.log( arr.filter( a => a === '.' ).length )
}