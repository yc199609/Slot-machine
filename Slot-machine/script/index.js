const btn = document.querySelector('.star');
const canvas = document.querySelector('canvas');
const cxc = canvas.getContext('2d');
canvas.width= 746;    
canvas.height = 252;

let num = 0;
let isEnd = false;

const bg = './images/slot_bg.png';
const mask = "./images/slot_mask.png";
const doimg = "./images/doimgs.png";
const drinkimg = "./images/drinkimgs.png";
const eatimg = "./images/eatimgs.png";

const arr = [doimg,drinkimg,eatimg];

// preImage
function preImage(url,callback){
	var img = new Image();
	img.src = url;
	if(img.complete){
		callback.call(img);
		return;
	}
	img.onload = function(){
		callback.call(img); 
	}
}

class Obj {
	constructor(){
		this.h = 0,
		this.random = [
			[this.getRandom3(),this.getRandom3(),this.getRandom11(),this.getRandom11()],
			[this.getRandom3(),this.getRandom3(),this.getRandom11(),this.getRandom11()],
			[this.getRandom3(),this.getRandom3(),this.getRandom11(),this.getRandom11()],
		]
	}
	getRandom3(){
		return Math.floor(Math.random()*3);
	}
	getRandom11(){
		return Math.floor(Math.random()*11);
	}
	reset(){
		this.random = [
			[this.getRandom3(),this.getRandom3(),this.getRandom11(),this.getRandom11()],
			[this.getRandom3(),this.getRandom3(),this.getRandom11(),this.getRandom11()],
			[this.getRandom3(),this.getRandom3(),this.getRandom11(),this.getRandom11()],
		]
	}
}
let obj = new Obj()

const tween = TweenMax.to(obj,0.2,{
	h:250,
	repeat:-1,
	onUpdate:update,
	onRepeat:repeat,
	ease: Power0.easeNone,
	paused:true,
})

function repeat(){
	num++;
	// pause
	if(num==10){
		tween.pause();
		num=0;
		isEnd = true;
		update();
		obj.reset()
		return;
	}

	for(let i = 0;i<obj.random.length;i++){
		obj.random[i][0] = obj.random[i][1];
		obj.random[i][1] = parseInt(Math.floor(Math.random()*3));
		obj.random[i][2] = obj.random[i][3];
		obj.random[i][3] = parseInt(Math.floor(Math.random()*11));
	}

	update()
}

// running at h change
function update(){
	cxc.clearRect(0,0,canvas.width,canvas.height);

	for(let i = 0;i<obj.random.length;i++){

		preImage(arr[obj.random[i][0]],function(){
			cxc.drawImage(this,90*obj.random[i][2],0,90,100,75.5+250*i,75.5-obj.h,100,100);
		})
	
		preImage(arr[obj.random[i][1]],function(){
			cxc.drawImage(this,90*obj.random[i][3],0,90,100,75.5+250*i,250+75.5-obj.h,100,100);
		})
	}

	preImage(bg,function(){
		cxc.drawImage(this,0,0);
	})
	
	if(!isEnd){
		preImage(mask,function(){
			cxc.drawImage(this,0,0)
		})
	}else{
		isEnd = false;
	}
}

preImage(bg,function(){
	cxc.drawImage(this,0,0);
})

btn.onclick = ()=>{
	if(!isEnd){
		tween.play()
	}
}
