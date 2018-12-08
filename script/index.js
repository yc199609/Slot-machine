const btn = document.querySelector('.star');
const canvas = document.querySelector('canvas');
const cxc = canvas.getContext('2d');
canvas.width= 746;    
canvas.height =252;


const bg = './images/slot_bg.png';
const mask = "./images/slot_mask.png";
const doimg = "./images/doimgs.png";
const drinkimg = "./images/drinkimgs.png";
const eatimg = "./images/eatimgs.png";
const arr = [doimg,drinkimg,eatimg];

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




// 第一列的
// preImage(doimg,function () {
// 	cxc.drawImage(this,0,0,88,98,83,78-h,88,98)
// })
// 第二列的
// preImage(eatimg,function(){
// 	cxc.drawImage(this,88,0,88,98,329,78,88,98)
// })
// // 第三列的
// preImage(drinkimg,function(){
// 	cxc.drawImage(this,88,0,88,98,575,78,88,98)
// })
// // 背景
preImage(bg,function(){
	cxc.drawImage(this,0,0)
})
// // 遮板
// preImage(mask,function(){
// 	cxc.drawImage(this,0,0)
// })

// 第二张图
// preImage(doimg,function(){
// 	cxc.drawImage(this,0,0,88,98,83,316-h,88,98)
// })


class Obj{
	constructor(x){
		this.x = x;
		this.step = 0;
		this.h = 0;
		this.random = [
			this.getRandom3(),
			this.getRandom3(),
			this.getRandom11(),
			this.getRandom11(),
		];
	}
	getRandom3(){
		return Math.floor(Math.random()*3);
	}
	getRandom11(){
		return Math.floor(Math.random()*11);
	}
	reset(){
		this.random = [
			this.getRandom3(),
			this.getRandom3(),
			this.getRandom11(),
			this.getRandom11(),
		];
	}
	repeat(){
		this.random[0] = this.random[1];
		this.random[1] = Math.floor(Math.random()*3);
		this.random[2] = this.random[3];
		this.random[3] = Math.floor(Math.random()*11);
		this.step = parseInt(this.h/238);
	}
}

let obj1 = new Obj(83);
let obj2 = new Obj(329);
let obj3 = new Obj(575);
let objArr = [obj1,obj2,obj3];

for(let i = 0;i<objArr.length;i++){
	preImage(arr[objArr[i].random[0]],function () {
		cxc.drawImage(this,88*objArr[i].random[2],0,88,98,objArr[i].x,78,88,98);
	})
}


let tweenArr = [];
for (let i = 0;i<objArr.length;i++){
	tweenArr.push(
		new TweenMax(objArr[i],6,{
			h:2380,
			ease:Power1.easeInOut,
			onUpdate:update,
			onUpdateParams:[objArr[i],i],
			onComplete:complete,
			onCompleteParams:[objArr[i],i],
			paused:true,
		})
	)
}

function complete(obj,index){
	tweenArr.splice(index,1,new TweenMax(obj,6,{
			h:obj.h+2380,
			onUpdate:update,
			onUpdateParams:[obj,index],
			onComplete:complete,
			onCompleteParams:[obj,index],
			ease:Power1.easeInOut,
			paused:true,
		})
	)
}

function update(obj,index){
	cxc.clearRect(index*canvas.width/3,0,canvas.width/3,canvas.height);

	if(parseInt(obj.h/238)>obj.step){
		obj.repeat()
	}

	preImage(arr[obj.random[0]],function () {
		cxc.drawImage(this,88*obj.random[2],0,88,98,obj.x,78-obj.h+obj.step*238,88,98);
	})
	preImage(arr[obj.random[1]],function(){
		cxc.drawImage(this,88*obj.random[3],0,88,98,obj.x,316-obj.h+obj.step*238,88,98);
	})

	preImage(bg,function(){
		cxc.drawImage(this,index*canvas.width/3,0,canvas.width/3,canvas.height,index*canvas.width/3,0,canvas.width/3,canvas.height)
	})

	preImage(mask,function(){
		cxc.drawImage(this,index*canvas.width/3,0,canvas.width/3,canvas.height,index*canvas.width/3,0,canvas.width/3,canvas.height)
	})
}

btn.onclick = ()=>{
	preImage(mask,function(){
		cxc.drawImage(this,0,0)
	})
	for(let i = 0;i<tweenArr.length;i++){
		tweenArr[i].delay(i);
		tweenArr[i].play();
	}
}

