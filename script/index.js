window.onload = function(){
	const btn = document.querySelector('.star');
	const canvas = document.querySelector('canvas');
	const cxc = canvas.getContext('2d');
	canvas.width= 746;    
	canvas.height = 252;
	let isend = true;

	// images
	const bg = document.getElementById('bg')
	const mask = document.getElementById('mask');
	const doimg = document.getElementById('doimg');
	const drinkimg = document.getElementById('drinkimg');
	const eatimg = document.getElementById('eatimg');
	const arr = [doimg,drinkimg,eatimg,bg,mask];
	//___________________________________________________
	
	//maskHidden
	let maskHidden = {
		x:0,
	};
	//_________________________________________

	// the three column
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
		repeat(){
			this.random[0] = this.random[1];
			this.random[1] = Math.floor(Math.random()*3);
			this.random[2] = this.random[3];
			this.random[3] = Math.floor(Math.random()*11);
			this.step = parseInt(this.h/238);
		}
	};

	let obj1 = new Obj(83);
	let obj2 = new Obj(329);
	let obj3 = new Obj(575);
	let objArr = [obj1,obj2,obj3];

	for(let i = 0;i<objArr.length;i++){
		cxc.drawImage(arr[objArr[i].random[0]],88*objArr[i].random[2],0,88,98,objArr[i].x,78,88,98);
	}
	//_______________________________


	let tweenArr = [];
	// three TweenMax control three column's h
	for (let i = 0;i<objArr.length;i++){
		tweenArr.push(
			new TweenMax(objArr[i],5,{
				h:3570,
				ease:Power2.easeInOut,
				onUpdate:update,
				onUpdateParams:[objArr[i],i],
				onComplete:complete,
				onCompleteParams:[objArr[i],i],
				paused:true,
			})
		);
	}

	function update(obj,index){
		cxc.clearRect(index*canvas.width/3,0,canvas.width/3,canvas.height);
		if(Math.floor(obj.h/238)>obj.step){
			obj.repeat();
		}
		cxc.drawImage(arr[obj.random[0]],88*obj.random[2],0,88,98,obj.x,78-obj.h+obj.step*238,88,98);
		cxc.drawImage(arr[obj.random[1]],88*obj.random[3],0,88,98,obj.x,316-obj.h+obj.step*238,88,98);
		cxc.drawImage(bg,index*canvas.width/3,0,canvas.width/3,canvas.height,index*canvas.width/3,0,canvas.width/3,canvas.height);
		cxc.drawImage(mask,index*canvas.width/3,0,canvas.width/3,canvas.height,index*canvas.width/3,0,canvas.width/3,canvas.height);
	}

	// at the end,add 3570,mask hidden
	function complete(obj,index){
		// create a new TweenMax replace old
		tweenArr.splice(index,1,new TweenMax(obj,5,{
				h:obj.h+3570,
				onUpdate:update,
				onUpdateParams:[obj,index],
				onComplete:complete,
				onCompleteParams:[obj,index],
				ease:Power2.easeInOut,
				paused:true,
			})
		);

		// TweenMax controls maskHidden'x
		if(index==2){
			new TweenMax(maskHidden,0.2,{
				x:0.5,
				ease:Power1.easeOut,
				onUpdate:maskHiddenUpdate,
				onComplete:maskHiddenComplete,
			})
		};
	}

	function maskHiddenUpdate(){
		for(let i = 0;i<3;i++){
			cxc.clearRect(12+246*i,12,230,230);
			cxc.drawImage(mask,12+230*maskHidden.x,12+230*maskHidden.x,230-230*2*maskHidden.x,230-230*2*maskHidden.x,12+246*i,12,230,230);
			cxc.drawImage(arr[objArr[i].random[0]],88*objArr[i].random[2],0,88,98,objArr[i].x,78,88,98);
		}
	}

	function maskHiddenComplete(){
		maskHidden.x = 0;
		isend = true;
	}

	cxc.drawImage(bg,0,0);

	// game start
	btn.onclick = ()=>{
		if(isend){
			isend = false;
			cxc.drawImage(mask,0,0);
			for(let i = 0;i<tweenArr.length;i++){
				tweenArr[i].delay(i*0.5);
				tweenArr[i].play();
			}
		}
	}
}
