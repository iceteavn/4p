(function(){

	/*****************************************************************************************************************
	 * UTILITY
	 *****************************************************************************************************************/

	if(typeof Object.create !== 'function'){
		Object.create = function(o){
			var F = function(){};
			F.prototype = o;
			return new F();
		};
	}

	function splitSp(str){
		var s = str.split(' ');
		var r = [];

		for(var i=0; i<s.length; i++){
			if(s[i] != '') r.push(s[i]);
		}
		return r;
	}


	/*****************************************************************************************************************
	 * MATRIX
	 *****************************************************************************************************************/

	function inner(a, b){
		return (a[0]*b[0] + a[1]*b[1] + a[2]*b[2]);
	}

	function cross(a, b){
		return [(a[1]*b[2] - a[2]*b[1]), (a[2]*b[0] - a[0]*b[2]), (a[0]*b[1] - a[1]*b[0])];
	}

	function size(a){
		return Math.sqrt(a[0]*a[0] + a[1]*a[1] + a[2]*a[2]);
	}

	function normalize(a){
		var L = Math.sqrt(a[0]*a[0] + a[1]*a[1] + a[2]*a[2]);
		return [a[0]/L, a[1]/L, a[2]/L];
	}

	function MM(M1, M2){
		var M = new Array(4);

		for(var i=0; i<4; i++) M[i] = new Array(4);

		for(var i=0; i<4; i++){
			for(var j=0; j<4; j++){
				M[i][j] = 0;
				for(var k=0; k<4; k++){
					M[i][j] += M1[i][k]*M2[k][j];
				}
			}
		}
		return M;
	}

	function MV(M, V){
		return [(M[0][0]*V[0]+M[0][1]*V[1]+M[0][2]*V[2]+M[0][3]), (M[1][0]*V[0]+M[1][1]*V[1]+M[1][2]*V[2]+M[1][3]), (M[2][0]*V[0]+M[2][1]*V[1]+M[2][2]*V[2]+M[2][3])];
	}



	/*****************************************************************************************************************
	 * STAGE
	 *****************************************************************************************************************/

	window.ObStage = function(id, w, h, svg){
		var stage = document.getElementById(id);

		this.stageW  = w;
		this.stageH  = h;
		this.obItems = [];
		this.camera  = [0, 0, 1000];
		this.lookAt  = [0, 0, 0];
		this.light   = [0, 0, 1000];
		this.grid    = false;
		this.background = '#ffffff';
		this.useSVG  = svg;

		// 視野角
		this.angle   = Math.PI*60/180;

		// アスペクト比
		this.aspect = this.stageW/this.stageH;


		if(svg){
			stage.innerHTML = '<svg width="'+w+'" height="'+h+'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>';
			this.container = stage.firstChild;
		}else{
			if(Shared.html.hasCanvas){
				stage.innerHTML = '<canvas width="'+w+'" height="'+h+'" />';
				this.canvas = stage.getElementsByTagName('canvas')[0];
				this.contxt = this.canvas.getContext('2d');
			}else{
				jQuery.useVML();
				this.container = document.createElement('div');
				this.container.style.width  = w + 'px';
				this.container.style.height = h + 'px';
				stage.appendChild(this.container);
			}
		}
	};


	window.ObStage.prototype = {

		addItem : function(item){
			if(item instanceof ObItem){
				if(this.useSVG){
					var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
					this.container.appendChild(circle);
					item.data.el = circle;
				}else{
					if(Shared.html.hasCanvas){
						;
					}else{
						var dummy  = document.createElement('span');
						dummy.innerHTML = '<v:oval fillcolor="" strokecolor="" strokeweight="0px" style="position:absolute;" />';

						var circle = dummy.firstChild;
						this.container.appendChild(circle);
						item.data.el = circle;
					}
				}
				this.obItems.push(item);
			}
		},

		removeItem : function(item){
			if(item instanceof ObItem){
				for(var i=0; i<this.obItems.length;){
					if(this.obItems[i] == item){
						this.obItems.splice(i, 1);
					}else{
						i++;
					}
				}
			}
		},

		setLookAt : function(x, y, z){
			this.lookAt = [x, y, z];
		},

		setAngle : function(deg){
			this.angle = Math.PI*deg/180;
		},

		setCamera : function(x, y, z){
			this.camera = [x, y, z];
		},

		setLight : function(x, y, z){
			this.light = [x, y, z];
		},

		setBackground : function(bg){
			this.background = bg;
		},

		setGrid : function(f){
			this.grid = f;
		},

		render : function(){
			// ビュー変換行列
			var V = [this.camera[0]-this.lookAt[0], this.camera[1]-this.lookAt[1], this.camera[2]-this.lookAt[2]];
			var U = [0, 1, 0];
			var Z = normalize(V);
			var X = normalize(cross(U, Z));
			var Y = cross(Z, X);
			var L = size(V);

			var zSort = new Array();

			for(var i=0; i<this.obItems.length; i++){
				// 計算簡略化
				if(this.obItems[i].data.r < 0.1 || this.obItems[i].data.alpha < 0.01){
					if(this.obItems[i].data.el) this.obItems[i].data.el.style.display = 'none';
					continue;
				}

				// ビュー座標変換
				var x = X[0]*this.obItems[i].data.v[0] + X[1]*this.obItems[i].data.v[1] + X[2]*this.obItems[i].data.v[2];
				var y = Y[0]*this.obItems[i].data.v[0] + Y[1]*this.obItems[i].data.v[1] + Y[2]*this.obItems[i].data.v[2];
				var z = Z[0]*this.obItems[i].data.v[0] + Z[1]*this.obItems[i].data.v[1] + Z[2]*this.obItems[i].data.v[2] - L;


				// 透視投影 + ビューポート変換
				if(-300 > z && z > -10000){
					var cotan = -1/(z*Math.tan(this.angle/2));
					var viewX = this.obItems[i].data.offsetX + this.stageW/2 + this.stageW*x*cotan/this.aspect;
					var viewY = this.obItems[i].data.offsetY + this.stageH/2 - this.stageH*y*cotan;

					// 視錐台の内部にいるか判定
					if(viewX > 0 && viewX < this.stageW && viewY > 0 && viewY < this.stageH){
						zSort.push({
							x : viewX,
							y : viewY,
							z : z,
							r : this.stageW*this.obItems[i].data.r*cotan,
							o : this.obItems[i]
						});
					}else{
						if(this.obItems[i].data.el) this.obItems[i].data.el.style.display = 'none';
					}
				}else{
					if(this.obItems[i].data.el) this.obItems[i].data.el.style.display = 'none';
				}
			}

			zSort.sort(function(a, b){
				return (a.z > b.z ? 1 : -1);
			});

			// レンダリング
			if(this.useSVG){
				for(var i=0; i<zSort.length; i++){
					zSort[i].o.data.el.setAttributeNS(null, 'fill', zSort[i].o.data.c);
					zSort[i].o.data.el.setAttributeNS(null, 'cx', zSort[i].x);
					zSort[i].o.data.el.setAttributeNS(null, 'cy', zSort[i].y);
					zSort[i].o.data.el.setAttributeNS(null, 'r', zSort[i].r);
					zSort[i].o.data.el.style.opacity = zSort[i].o.data.alpha;
					zSort[i].o.data.el.style.display = 'block';
				}
			}else{
				if(Shared.html.hasCanvas){
					this.contxt.lineWidth = 1;
					this.contxt.fillStyle = 'transparent';
					this.contxt.clearRect(0, 0, this.stageW, this.stageH);
					this.contxt.fillRect(0, 0, this.stageW, this.stageH);

					// 円描画
					for(var i=0; i<zSort.length; i++){
						this.contxt.fillStyle = 'rgba('+zSort[i].o.data.rgb[0]+','+zSort[i].o.data.rgb[1]+','+zSort[i].o.data.rgb[2]+','+zSort[i].o.data.alpha+')';
						this.contxt.beginPath();
						this.contxt.arc(zSort[i].x, zSort[i].y, zSort[i].r, 0, 2*Math.PI);
						this.contxt.closePath();
						this.contxt.fill();
					}
				}else{
					for(var i=0; i<zSort.length; i++){
						zSort[i].o.data.el.style.width   = zSort[i].r*2 + 'px';
						zSort[i].o.data.el.style.height  = zSort[i].r*2 + 'px';
						zSort[i].o.data.el.style.left    = zSort[i].x + 'px';
						zSort[i].o.data.el.style.top     = zSort[i].y + 'px';
						//zSort[i].o.data.el.style.filter  = 'alpha(opacity='+(zSort[i].o.data.alpha*100)+')';
						zSort[i].o.data.el.style.display = 'block';

						zSort[i].o.data.el.fillcolor     = zSort[i].o.data.c;
						zSort[i].o.data.el.strokecolor   = zSort[i].o.data.c;
					}
				}
			}
			return zSort.length;
		}
	};



	/*****************************************************************************************************************
	 * 3D ITEM
	 *****************************************************************************************************************/

	window.ObItem = function(radius, colorCode){
		this.data  = {
			// 半径
			r  : radius,
			
			// 色
			c  : colorCode,
			rgb : Shared.util.hex2rgb(colorCode),
			alpha : 1,

			// ワールド座標
			v  : [0, 0, 0],

			// ローカル座標
			x  : 0,  // x軸方向移動量[px]
			y  : 0,  // y軸方向移動量[px]
			z  : 0,  // z軸方向移動量[px]
			rx : 0,  // x軸回転角度[deg]
			ry : 0,  // y軸回転角度[deg]
			rz : 0,  // z軸回転角度[deg]
			s  : 1,   // 拡大率

			// スクリーン座標
			//p  : [0, 0, 0],
			offsetX : 0,
			offsetY : 0,

			// Canvasが使えないブラウザ用の変数
			el : null
		};
	};


	window.ObItem.prototype = {
		setRotate : function(rx, ry, rz){
			this.data.rx = rx;
			this.data.ry = ry;
			this.data.rz = rz;
			return this;
		},

		setRotateX : function(deg){
			this.data.rx = deg;
			return this;
		},

		setRotateY : function(deg){
			this.data.ry = deg;
			return this;
		},

		setRotateZ : function(deg){
			this.data.rz = deg;
			return this;
		},

		setPosition : function(x, y, z){
			this.data.x = x;
			this.data.y = y;
			this.data.z = z;
			return this;
		},

		setScale : function(s){
			this.data.s = s;
			return this;
		},

		setAlpha : function(a){
			this.data.alpha = a;
			return this;
		}
	}

})();
