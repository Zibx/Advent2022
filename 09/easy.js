var arr =
	`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`
var arr =     document.body.innerText
	.trim().split('\n');
var visited = {};

var pH = [0,0], pT = [0,0], m = {L: [-1,0], R: [1,0], U: [0,-1], D: [0,1]};
var domove = ([d, c])=>{
	pH = [pH[0]+m[d][0], pH[1]+m[d][1]];
	if(pT[0] === pH[0] && pT[1] !== pH[1]){
		if(Math.abs(pT[1]-pH[1])===2){
			pT[1] = (pT[1]+pH[1])/2;
		}
	}
	if(pT[0] !== pH[0] && pT[1] === pH[1]){
		if(Math.abs(pT[0]-pH[0])===2){
			pT[0] = (pT[0]+pH[0])/2;
		}
	}
	if(pT[0] !== pH[0] && pT[1] !== pH[1]){
		if(Math.abs(pT[0]-pH[0])===2){
			pT[1] = pH[1];
			pT[0] = (pT[0]+pH[0])/2;
		}else if(Math.abs(pT[1]-pH[1])===2){
			pT[0] = pH[0];
			pT[1] = (pT[1]+pH[1])/2;
		}
	}
	visited[pT[0]+'.'+pT[1]] = 1;
	if(c > 1)
		domove([d,c-1])
}
arr.forEach(row=>domove(row.split(' ')))
Object.keys(visited).length