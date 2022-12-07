const threshold = 100000,
	allDirs = [];

var File = function(cfg){
		var [size, name] = cfg;
		if(size === 'dir')
			return new Dir(name);
		this.name = name; this.size = size-0;
	},
	Dir = function(name){
		this.name = name;
		this.items = [];
		this.dirs = {};
	};
Dir.prototype = {
	getDir: function(path){
	    return this.dirs[path];
	},
	push: function(item){
		this.items.push( item );
	    if(item instanceof Dir) {
			this.dirs[item.name] = item;
		}
	},
	calculateSize: function(){
	    for(var dirName in this.dirs){
			this.dirs[dirName].calculateSize();
		}
		this.size = this.items.map(item => item.size).reduce((a,b)=>a+b, 0);

		allDirs.push(this);
	}
};

var disk = new Dir('/'),
	pwd = [disk]

var lines = (require('fs').readFileSync('input')+'').split(/\r\n|\n/);

var cmds = {
	cd: function([path]){
	    if(path === '/') {
			pwd = [ disk ];
		}else if(path === '..') {
			pwd.pop();
		}else{
			pwd.push(pwd[pwd.length - 1].getDir(path));
		}
	},
	ls: function(){
		var path = pwd[pwd.length - 1];
	    while(i+1<_i && lines[i+1][0] !== '$'){
			var out = lines[++i];
			path.push(new File(out.split(/\s+/)))
		}
	}
};

for(var i=0, _i = lines.length; i < _i; i++){
	var cmd = lines[i].substr(2), args;
	[cmd, ...args] = cmd.split(/\s+/);
	
	if(cmd in cmds){
		cmds[cmd](args);
	}
}

disk.calculateSize()
var needSpace = 30000000-(70000000-disk.size);

var sizes = allDirs.map(a=>a.size).sort((a,b)=>a-b);
for( var i = 0; i < sizes.length; i++ ) {
	var size = sizes[ i ];
	if(size>=needSpace) {
		console.log( size );
		break;
	}
}
//36358362
debugger