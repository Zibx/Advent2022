var arr = document.body.innerText.split('\n').map(a=>a.split(''));

var h = arr.length, w = arr[0].length;

var visibleMap = [];
for(var y = 0; y<h; y++){
	visibleMap[y] = [];
	for(var x = 0; x<w; x++)
		visibleMap[y][x] = false;
}

for(var y = 0; y<h; y++){
	var min = -1;
	for(var x = 0; x<w; x++){
		if(arr[y][x]>min){
			visibleMap[y][x] = true;
			min = arr[y][x];
		}
	}
}

for(var y = 0; y<h; y++){
	var min = -1;
	for(var x = w-1; x>=0; x--){
		if(arr[y][x]>min){
			visibleMap[y][x] = true;
			min = arr[y][x];
		}
	}
}

for(var x = 0; x<w; x++){
	var min = -1;
	for(var y = 0; y<h; y++){
		if(arr[y][x]>min){
			visibleMap[y][x] = true;
			min = arr[y][x];
		}
	}
}
for(var x = 0; x<w; x++){
	var min = -1;
	for(var y = h-1; y>=0; y--){
		if(arr[y][x]>min){
			visibleMap[y][x] = true;
			min = arr[y][x];
		}
	}
}
visibleMap.map(row=>row.filter(item=>item).length).reduce((a,b)=>a+b)