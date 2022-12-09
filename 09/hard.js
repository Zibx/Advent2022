var arr = document.body.innerText
	.trim().split('\n');
var visited = {};

var pH = [0,0], pT = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]], tailing = pT.length - 1, m = {L: [-1,0], R: [1,0], U: [0,-1], D: [0,1]};
var domove = ([d, c])=>{
	pH = [pH[0]+m[d][0], pH[1]+m[d][1]];
	var pHp = pH, pTp = pT;
	pT.forEach((_, i)=>{
		var pH = i === 0 ? pHp : pTp[i-1], pT = pTp[i];
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
	});
	visited[pT[tailing][0]+'.'+pT[tailing][1]] = 1;
	if(c > 1)
		domove([d,c-1])
}
arr.forEach(row=>domove(row.split(' ')))
Object.keys(visited).length