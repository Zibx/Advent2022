var txt = (require('fs').readFileSync('input')+'').replace(/\r/g,'');



var rowN = 2000000, beaconsOnRow = [];

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
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

var s = txt
	.replace(/[^=\d\n\-]/g,'')
	.split('\n')
	.map(a=>a.split('='))
	.map(a=>a.map(Number))
	.map(a=>({S: {x: a[1],y:a[2]}, B: {x: a[3], y: a[4]}}));

var intervals = s.map(sb=>{

	var dx = sb.S.x-sb.B.x,
		dy = sb.S.y-sb.B.y,

		sum = Math.abs(dx)+Math.abs(dy);
	if(rowN === sb.B.y)
		beaconsOnRow.push(sb.B.x)

	if(Math.abs(sb.S.y-rowN) > sum)
		return false;
	var dsx = sum - Math.abs(sb.S.y-rowN);
	return [sb.S.x-dsx, sb.S.x+dsx]

}).filter(a=>a);

var nums = [].concat.apply([],intervals).sort(),
	min = nums[0], max = nums.pop();

var arr = [];
min-=2;
max+=2;
for(var i = 0; i <= max-min +2; i++){
	arr[i] = '.';
}
intervals.forEach(([from, to])=>{
	for(var i = from; i <= to; i++){
		arr[i-min] = '#'
	}
});
beaconsOnRow.forEach(b=>arr[b-min]='B');
console.log(arr.join(''));
console.log(arr.filter(a=>a==='#').length)