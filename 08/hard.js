var arr = document.body.innerText.trim().split('\n').map(a=>a.split(''));

var h = arr.length, w = arr[0].length;

var visibleMap = [];
for(var y = 0; y<h; y++){
	visibleMap[y] = [];
	for(var x = 0; x<w; x++)
		visibleMap[y][x] = false;
}
var calculate = function(x,y){
	var countR = 0, countL = 0, countU = 0, countD = 0;

	var height = arr[y][x];
	for(var i = x+1; i < w; i++){
		countR++;
		if(arr[y][i] < height){
		}else{ break; }
	}

	var height = arr[y][x];
	for(var i = x-1; i >= 0; i--){
		countL++;
		if(arr[y][i] < height){
		}else{ break; }
	}

	var height = arr[y][x];
	for(var j = y+1; j < h; j++){
		countD++;
		if(arr[j][x] < height){
		}else{ break; }
	}

	var height = arr[y][x];
	for(var j = y-1; j >= 0; j--){
		countU++;
		if(arr[j][x] < height){
		}else{ break; }
	}
	return [countU,countL,countR,countD].reduce((a,b)=>a*b);
};
for(var y = 0; y<h; y++){
	for(var x = 0; x<w; x++){
		visibleMap[y][x] = calculate(x, y)
	}
}
visibleMap.map(r=>r.reduce((c1,c2)=>Math.max(c1,c2))).reduce((c1,c2)=>Math.max(c1,c2))