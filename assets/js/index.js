(function(){

	// scroll controller
	var controller;

	// 画面最小値
	var minW = 960;
	var minH = 700;

	// CSS3トランジション使用フラグ
	var useTransition = Shared.css.hasTransition && !Shared.ua.isIElt11;

	// 3DレンダリングのSVG使用フラグ
	var useSVG = false;//Shared.html.hasSVG && Shared.ua.isFireFox;

	// タッチスクロールのハック
	var touchScroll = Shared.ua.isSmartPhone && Shared.device.hasTouch;

	// "ABOUOT US"の現在のスライドインデックス
	var currentSlide1 = 0;

	// "PEOPLE"の現在のスライドインデックス
	var currentSlide2 = 0;

	// カメラ位置変更関数
	var setCamera = function(){};

	// クエリパラメータ
	var query = Shared.util.parseParam();

	// debug flag
	var debug = ('debug' in query);

	var noTransform = Shared.ua.isSafari && Shared.ua.verSafari < 5.1;

	// set random seed
	if('seed' in query && !isNaN(query['seed'])){
		Shared.util.srand(parseInt(query['seed']));
	}else{
		Shared.util.srand(+new Date());
	}

	if(Shared.ua.isIElt9){
		$('html').addClass('ie8');
	}



	/*****************************************************************************************************************
	 * scroll controller
	 *****************************************************************************************************************/

	var ScrollController = function(N){

		this.current;

		this.sectionNum = N;

		this.listeners = [];

		this.scrollListeners = [];

		this.winW = null;

		this.winH = null;

		this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

		var self = this;


		function resize(w, h){
			this.winW = w > minW ? w : minW;
			this.winH = h > minH ? h : minH;

			if(this.current !== undefined){
				document.body.scrollTop = document.documentElement.scrollTop = this.current * this.winH;
			}
		}

		function scroll(t, b, l, r){
			var curr = this.current;

			for(var i=this.sectionNum-1; i>=0; i--){
				if(t >= i*this.winH-43){
					curr = i;
					break;
				}
			}
			if(curr != this.current){
				this.current = curr;

				for(var i=0; i<this.listeners.length; i++){
					this.listeners[i].call(controller, curr);
				}
			}
			for(var i=0; i<this.scrollListeners.length; i++){
				this.scrollListeners[i].call(self, t, b, l, r);
			}
		}

		Shared.util.addResizeListener(function(w, h){
			resize.call(self, w, h);
		});

		Shared.util.addScrollListener(function(t, b, l, r){
			scroll.call(self, t, b, l, r);
		});


		if(touchScroll){
			// タッチ疑似スクロール
			//$('html').addClass('touch');

			var touchY;
			var moving = false;
			var touching = false;

			$('body').bind('touchstart', function(e){
				touchY = e.originalEvent.touches[0].screenY;
			});

			$('body').bind('touchmove', function(e){
				e.preventDefault();

				if(!moving && !touching && Math.abs(e.originalEvent.touches[0].screenY - touchY) > 30){
					moving = true;
					touching = true;

					if(e.originalEvent.touches[0].screenY < touchY){
						smoothScroll(self.winH*(self.current+1));
					}else{
						smoothScroll(self.winH*(self.current-1));
					}
				}
			});

			$('body').bind('touchend touchcancel', function(e){
				touching = false;
			});

			function smoothScroll(top){
				$('html,body').stop().animate({scrollTop:top}, 1500, 'easeInOutQuart', function(){
					moving = false;
				});
			}
		}
	};

	ScrollController.prototype = {
		getCurrent : function(){
			return this.current;
		},
		addListener : function(fn){
			if(typeof fn == 'function'){
				this.listeners.push(fn);
			}
		},
		addScrollListener : function(fn){
			if(typeof fn == 'function'){
				this.scrollListeners.push(fn);
			}
		},
		getWinW : function(){
			return this.winW;
		},
		getWinH : function(){
			return this.winH;
		},
		getOffset : function(index){
			return this.winH*index;
		}
	};

	$(function(){
		controller = new ScrollController(5);
	});


	/*****************************************************************************************************************
	 * header
	 *****************************************************************************************************************/

	$(function(){
		var header = $('#header');
		var items  = $('#header li');
		var fixed  = $('.fixed');

		items.eq(controller.getCurrent()).addClass('current');

		// スクロールボタン
		items.each(function(i){
			items.eq(i).on('click', function(e){
				e.preventDefault();

				function prevent(e){
					e.preventDefault();
				}
				$('body').bind('mousewheel DOMMouseScroll touchmove', prevent);

				var duration  = Math.abs((document.body.scrollTop || document.documentElement.scrollTop) - controller.getOffset(i));

				if(duration > 900) duration = 900;

				$('html,body').stop().animate({scrollTop:controller.getOffset(i)}, {duration:duration, easing:'easeOutQuart', always:function(){
					$('body').unbind('mousewheel DOMMouseScroll touchmove', prevent);
				}});
			});
		});

		// セクション変化時のイベント
		controller.addListener(function(current){
			items.removeClass('current').eq(current).addClass('current');
		});

		// スクロール時のイベント
		controller.addScrollListener(function(t, b, l, r){
			// ヘッダー伸縮
			if(t > 200){
				if(!header.hasClass('shrink')){
					header.addClass('shrink');

					if(useTransition){
						header.transition('transform', 300, 'easeInOutQuart').translate3d(0, -17, 1);
					}else{
						header.stop().animate({top:-17}, 300, 'easeInOutQuart');
					}
				}
			}else{
				if(header.hasClass('shrink')){
					header.removeClass('shrink');

					if(useTransition){
						header.transition('transform', 300, 'easeInOutQuart').translate3d(0, 0, 1);
					}else{
						header.stop().animate({top:0}, 300, 'easeInOutQuart');
					}
				}
			}

			// position:fixed対策
			if(r-l < minW){
				if(l < 0){
					fixed.css({marginLeft:0});
				}else if(r > minW){
					fixed.css({marginLeft:(r-l-minW)});
				}else{
					fixed.css({marginLeft:-l});
				}
			}else{
				fixed.css({marginLeft:0});
			}
		});

		// 次のページに移動
		$('#nextpage').bind('click', function(e){
			e.preventDefault();

			if(controller.getCurrent() != 4){
				items.eq(controller.getCurrent()+1).trigger('click');
			}
		});

		// 次のページボタンの表示切り替え
		controller.addListener(function(index){
			if(index == 4){
				$('#nextpage').fadeOut('fast');
			}else{
				$('#nextpage').fadeIn('fast');
			}
		});
	});


	/*****************************************************************************************************************
	 * 3D sphere
	 *****************************************************************************************************************/

	var Sphere = Shared.util.extend(ObItem, function(ox, oy, oz, or, oc, range){
		// スーパーコンストラクタ
		ObItem.call(this, or, oc);

		// 正規のワールド座標
		this.ox = ox;
		this.oy = oy;
		this.oz = oz;
		this.or = or;

		// ランダムに位置を決定
		this.rx = (range ? Shared.util.rand(-range, range) : ox);
		this.ry = (range ? Shared.util.rand(-range, range) : oy);
		this.rz = (range ? Shared.util.rand(-range, range) : oz);

		this.vx = 0;
		this.vy = 0;
		this.vz = 0;
		this.dt = 0.001 + 0.007*Math.random();

		this.data.v[0] = this.rx;
		this.data.v[1] = this.ry;
		this.data.v[2] = this.rz;

		this.moving = false;
	}, {
		stepToOrigin : function(t, opacity, speed){
			this.data.v[0] += (this.ox - this.data.v[0])*t*speed + this.vx*t*speed;
			this.data.v[1] += (this.oy - this.data.v[1])*t*speed + this.vy*t*speed;
			this.data.v[2] += (this.oz - this.data.v[2])*t*speed + this.vz*t*speed;
			this.data.alpha += (opacity - this.data.alpha)*t*speed;
		},
		stepToRandom : function(t, opacity, speed){
			this.data.v[0] += (this.rx - this.data.v[0])*t*speed + this.vx*t*speed;
			this.data.v[1] += (this.ry - this.data.v[1])*t*speed + this.vx*t*speed;
			this.data.v[2] += (this.rz - this.data.v[2])*t*speed + this.vx*t*speed;
			this.data.alpha += (opacity - this.data.alpha)*t*speed;
		}
	});


	// fetch Good Innovation
	var request1 = jQuery.ajax({dataType:'xml', cache:true, url : 'xml/goodinnovation.xml'});

	// fetch OUR NETWORK
	//var request2 = jQuery.ajax({dataType:'xml', cache:true, url : 'xml/networkmap.xml'});

	// fetch ABOUT US
	var request3 = jQuery.ajax({dataType:'xml', cache:true, url : 'xml/aboutus.xml'});

	// fetch PHILOSOPHY
	var request4 = jQuery.ajax({dataType:'xml', cache:true, url : 'xml/philosophy.xml'});

	// fetch PEOPLE
	var request5 = jQuery.ajax({dataType:'xml', cache:true, url : 'xml/people.xml'});


	// 全てのリクエストを待機
	jQuery.when(request1, request3, request4, request5).done(function(data1, data3, data4, data5){
		$(function(){
			var canvasW = 1600;
			var canvasH = 1200;

			//!! ObStageは右手系
			var obStage = new ObStage('background', canvasW, canvasH, useSVG);

			// カメラ位置変数
			var radT = Math.PI/180;
			var camR = _camR = 2000;
			var camT = _camT = 0;
			var camP = _camP = 0;
			var camX = camR*Math.sin(camT*radT)*Math.cos(camP*radT);
			var camY = camR*Math.sin(camT*radT)*Math.sin(camP*radT);
			var camZ = camR*Math.cos(camT*radT);

			// 球体オブジェクト変数
			var items1 = $(data1).find('item');
			//var items2 = $(data2).find('item');
			var items3 = $(data3).find('item');
			var items4 = $(data4).find('item');
			var items5 = $(data5).find('item');
			var particles1 = [];
			var particles2 = [];
			var particles3 = [];
			var particles4 = [];
			var particles5 = [];

			// IE対応
			if(Shared.ua.isIElt9){
				$('.slide01 .icircle-01').prepend('<span class="circle-bg"><img src="assets/img/graphics/philosophy_bg_dummy1.png" alt="philosophy_bg_dummy1" width="302" height="302"></span>');
				$('.slide01 .icircle-02').prepend('<span class="circle-bg"><img src="assets/img/graphics/philosophy_bg_dummy2.png" alt="philosophy_bg_dummy2" width="302" height="302"></span>');
				$('.slide01 .icircle-03').prepend('<span class="circle-bg"><img src="assets/img/graphics/philosophy_bg_dummy3.png" alt="philosophy_bg_dummy2" width="302" height="302"></span>');
				$('.slide02 .icircle-01').prepend('<span class="circle-bg"><img src="assets/img/graphics/philosophy01.png" alt="philosophy01" width="237" height="236"></span>');
				$('.slide02 .icircle-02').prepend('<span class="circle-bg"><img src="assets/img/graphics/philosophy02.png" alt="philosophy01" width="237" height="236"></span>');
				$('.slide02 .icircle-03').prepend('<span class="circle-bg"><img src="assets/img/graphics/philosophy03.png" alt="philosophy01" width="237" height="236"></span>');
				$('#people .img').eq(0).prepend('<img src="assets/img/graphics/ourpeople01.png" alt="" width="152" height="152">');
				$('#people .img').eq(1).prepend('<img src="assets/img/graphics/ourpeople02.png" alt="" width="152" height="152">');
				$('#people .img').eq(2).prepend('<img src="assets/img/graphics/ourpeople03.png" alt="" width="152" height="152">');
				$('#people .img').eq(3).prepend('<img src="assets/img/graphics/ourpeople04.png" alt="" width="152" height="152">');
				$('#people .img').eq(4).prepend('<img src="assets/img/graphics/ourpeople05.png" alt="" width="152" height="152">');
			}

			// Good Innovation
			items1.each(function(i){
				particles1[i] = new Sphere(
					parseFloat(items1.eq(i).find('x').text()),
					parseFloat(items1.eq(i).find('y').text()),
					parseFloat(items1.eq(i).find('z').text()),
					parseFloat(items1.eq(i).find('r').text()),
					items1.eq(i).find('c').text(),
					1800
				);
				obStage.addItem(particles1[i]);
			});

			// OUR NETWORK
			if(!Shared.ua.isIElt9){
				var R = 800;

				for(var i=0; i<100; i++){
					particles2[i] = new Sphere(
						Shared.util.rand(-R, R),
						Shared.util.rand(-R, R),
						Shared.util.rand(-R, -30),
						Shared.util.rand(4, 12),
						(i < 70 ? '#c8e0eb' : '#f7b199'),
						1200
					);
					obStage.addItem(particles2[i]);
				}
			}

			// ABOUT US (IE8はなし)
			items3.each(function(i){
				if(Shared.ua.isIElt9) return false;
				particles3[i] = new Sphere(
					parseFloat(items3.eq(i).find('x').text()),
					parseFloat(items3.eq(i).find('y').text()),
					parseFloat(items3.eq(i).find('z').text()),
					parseFloat(items3.eq(i).find('r').text()),
					items3.eq(i).find('c').text(),
					1200
				);
				obStage.addItem(particles3[i]);
			});
			
			// PHILOSOPHY (IE8はなし)
			items4.each(function(i){
				if(Shared.ua.isIElt9) return false;
				particles4[i] = new Sphere(
					parseFloat(items4.eq(i).find('x').text()),
					parseFloat(items4.eq(i).find('y').text()),
					parseFloat(items4.eq(i).find('z').text()),
					parseFloat(items4.eq(i).find('r').text()),
					items4.eq(i).find('c').text(),
					1500
				);
				obStage.addItem(particles4[i]);
			});

			// PEOPLE (IE8はなし)
			items5.each(function(i){
				if(Shared.ua.isIElt9) return false;
				particles5[i] = new Sphere(
					parseFloat(items5.eq(i).find('x').text()),
					parseFloat(items5.eq(i).find('y').text()),
					parseFloat(items5.eq(i).find('z').text()),
					parseFloat(items5.eq(i).find('r').text()),
					items5.eq(i).find('c').text(),
					false
				);
				obStage.addItem(particles5[i]);
			});

			setCamera = function(r, t, p){
				_camR = r;
				_camT = t;
				_camP = p;
			};

			// マウス位置の推定
			var pointer = new Sphere(0, 0, 0, 2, '#ff0000');

			if(!Shared.device.hasTouch){
				$('body').bind('mousemove', function(e){
					if(controller.getCurrent() == 0){
						var mouseX = e.pageX - (document.body.scrollLeft || document.documentElement.scrollLeft);
						var mouseY = e.pageY - (document.body.scrollTop  || document.documentElement.scrollTop);

						pointer.data.v[0] = mouseX-controller.winW/2;
						pointer.data.v[1] = -mouseY+controller.winH/2;

						for(var i=0; i<particles1.length; i++){
							if(!particles1[i].moving){
								var dd = Math.pow(particles1[i].data.v[0]-pointer.data.v[0], 2) + Math.pow(particles1[i].data.v[1]-pointer.data.v[1], 2);

								if(dd < 10000){
									particles1[i].moving = true;
									particles1[i].vx = (1-2*Math.random())*200;
									particles1[i].vy = (1-2*Math.random())*200;
								}
							}
						}
					}
				});
			}

			// アニメーション
			Shared.util.reqAF(function(c, t, p){

				if(t > 100) t = 100;

				var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				var offsetTop = (scrollTop - controller.getOffset(controller.getCurrent()));

				// Good Innovationの位置計算
				if(scrollTop < controller.winH*0.5){
					for(var i=0; i<particles1.length; i++){
						particles1[i].stepToOrigin(t, 1, 0.005);

						if(particles1[i].moving){
							particles1[i].vx = 0;
							particles1[i].vy = 0;

							if(Math.abs(particles1[i].ox-particles1[i].data.v[0]) < 1 && Math.abs(particles1[i].oy-particles1[i].data.v[1]) < 1){
								particles1[i].moving = false;
							}
						}
					}
					for(var i=0; i<particles2.length; i++){
						particles2[i].stepToOrigin(t, 0.6, 0.0035);
					}
				}else{
					for(var i=0; i<particles1.length; i++){
						particles1[i].stepToRandom(t, 0.6, 0.005);
					}
					for(var i=0; i<particles2.length; i++){
						particles2[i].stepToRandom(t, 0.6, 0.0035);
					}
				}

				// ABOUT USの位置計算
				if(controller.getCurrent() == 1 && scrollTop < controller.getOffset(1) + controller.winH*0.6){
					for(var i=0; i<particles3.length; i++){
						particles3[i].stepToOrigin(t, (currentSlide1==0 ? 1:0), 0.0035);
						particles3[i].data.r += (particles3[i].or - particles3[i].data.r)*t*0.0035;
						particles3[i].data.offsetY = controller.getOffset(1) - scrollTop;
					}
				}else{
					for(var i=0; i<particles3.length; i++){
						particles3[i].stepToRandom(t, 0, 0.002);
						particles3[i].data.r += (0 - particles3[i].data.r)*t*0.003;
						particles3[i].data.offsetY = controller.getOffset(1) - scrollTop;
					}
				}

				// PHILOSOPHYの位置計算
				if(controller.getCurrent() == 1 && scrollTop < controller.getOffset(1) + controller.winH*0.6){
					for(var i=0; i<particles4.length; i++){
						particles4[i].stepToOrigin(t, (currentSlide1==1 ? 0.8:0), 0.0035);
						particles4[i].data.r += (particles4[i].or - particles4[i].data.r)*t*0.035;
						particles4[i].data.offsetY = controller.getOffset(1) - scrollTop;
					}
				}else{
					for(var i=0; i<particles4.length; i++){
						particles4[i].stepToRandom(t, 0, 0.002);
						particles4[i].data.r += (particles4[i].or/2 - particles4[i].data.r)*t*0.003;
						particles4[i].data.offsetY = controller.getOffset(1) - scrollTop;
					}
				}

				// PEOPLEの位置計算
				if(controller.getCurrent() == 3 && scrollTop < controller.getOffset(3) + controller.winH*0.6){
					for(var i=0; i<particles5.length; i++){
						if(currentSlide2 == 0){
							particles5[i].stepToOrigin(t, 0.6, 0.0035);
						}else{
							particles5[i].stepToOrigin(t, 0.05, 0.0035);
						}
					}
				}else{
					for(var i=0; i<particles5.length; i++){
						particles5[i].stepToOrigin(t, 0, 0.0035);
					}
				}
				for(var i=0; i<particles5.length; i++){
					particles5[i].data.r += (particles5[i].or - particles5[i].data.r)*t*0.035;
					particles5[i].data.offsetY = controller.getOffset(3) - scrollTop + 50;
				}



				// カメラ位置の更新
				camR += (_camR - camR)*t*0.0025;
				camT += (_camT - camT)*t*0.004;
				camP += (_camP - camP)*t*0.004;

				if(Math.abs(camR-_camR) > 0.01 || Math.abs(camT-_camT) > 0.01 || Math.abs(camP-_camP) > 0.01){
					camX = camR*Math.sin(camT*radT)*Math.cos(camP*radT);
					camY = camR*Math.sin(camT*radT)*Math.sin(camP*radT);
					camZ = camR*Math.cos(camT*radT);
				}

				// レンダリング
				obStage.setCamera(camX, camY, camZ);
				obStage.render();
			});

			// セクション変化時にカメラ位置を変更
			function setView(index){
				if(index == 0){
					setCamera(2000, 0, 0);

				}else if(index == 1){
					setCamera(2000, 90*currentSlide1, 0);
					
				}else if(index == 2){
					setCamera(500, 90, 180);

				}else if(index == 3){
					setCamera(2000+300*currentSlide2, 90, 180);

				}else if(index == 4){
					setCamera(5000, 0, 0);
				}
			}

			controller.addListener(setView);

			setView(controller.getCurrent());

			$('#contact a').hover(function(){
				setCamera(6500, 0, 0);
			}, function(){
				setCamera(5000, 0, 0);
			});

			$('#aboutus a').hover(function(){
				setCamera(1950, 90*currentSlide1, 0);
			}, function(){
				setCamera(2000, 90*currentSlide1, 0);
			});
		});
	});


	/*****************************************************************************************************************
	 * slide in "ABOUT US"
	 *****************************************************************************************************************/

	$(function(){
		var slides   = $('#aboutus .inner');
		var animate  = false;
		var duration = 1500;
		var easing   = 'easeOutExpo';

		function moveSlide(index){
			if(animate) return;

			animate = true;

			setCamera(2000, 90*index, 0);

			var prev = slides.eq(currentSlide1);
			var next = slides.eq(index);

			if(useTransition && !noTransform){
				if(index > currentSlide1){
					prev.transition('all', 0).transformOrigin('0%', '50%');
					next.transition('all', 0).transformOrigin('100%', '50%').transform('perspective(2000px) rotateY(90deg) translate3d(960px,0,0)').css({display:'block'});
				}else{
					prev.transition('all', 0).transformOrigin('100%', '50%');
					next.transition('all', 0).transformOrigin('0%', '50%').transform('perspective(2000px) rotateY(-90deg) translate3d(-960px,0,0)').css({display:'block'});
				}
				setTimeout(function(){
					if(index > currentSlide1){
						prev.transition('all', duration, easing).transform('perspective(2000px) rotateY(-90deg) translate3d(-960px,0,0)');
					}else{
						prev.transition('all', duration, easing).transform('perspective(2000px) rotateY(90deg) translate3d(960px,0,0px)');
					}
					next.transition('all', duration, easing).transform('perspective(2000px) rotateY(0deg) translate3d(0px,0,0)').transitionEnd(function(){
						animate = false;
						prev.css({display:'none'});
					}, 1);
					currentSlide1 = index;
				}, 20);
			}else if(Shared.css.transform.scale && !noTransform){
				// 擬似的に回転
				if(index > currentSlide1){
					prev.transformOrigin('0%', '50%').transform('scale(1, 1)');
					next.transformOrigin('100%', '50%').transform('scale(0, 1) translate(960px,0)').css({display:'block'});

					$('<div></div>').css({top:0}).animate({top:1}, {duration:duration, easing:easing, step:function(s){
						prev.transform('scale('+(1-s)+', 1) translate(-'+960*s+'px, 0)');
						next.transform('scale('+s+', 1) translate('+960*(1-s)+'px,0)');

					}, complete:function(){
						animate = false;
						prev.css({display:'none'});
					}});
				}else{
					prev.transformOrigin('100%', '50%').transform('scale(1, 1)');
					next.transformOrigin('0%', '50%').transform('scale(0, 1) translate(0,0)').css({display:'block'});

					$('<div></div>').css({top:0}).animate({top:1}, {duration:duration, easing:easing, step:function(s){
						prev.transform('scale('+(1-s)+', 1) translate('+960*s+'px, 0)');
						next.transform('scale('+s+', 1) translate(0px,0)');
					}, complete:function(){
						animate = false;
						prev.css({display:'none'});
					}});
				}
				currentSlide1 = index;
			}else{
				// 単純スライド
				prev.animate({left:(50+(index > currentSlide1 ? -100 : 100))+'%'}, duration, easing);

				next.css({display:'block', left:(50+(index > currentSlide1 ? 100 : -100))+'%'}).animate({left:'50%'}, duration, easing, function(){
					animate= false;
					prev.css({display:'none'});
				});
				currentSlide1 = index;
			}
		}

		$('#aboutus .inner .prev').bind('click', function(e){
			e.preventDefault();

			$('html,body').animate({scrollTop:controller.getOffset(1)}, Math.abs((document.body.scrollTop || document.documentElement.scrollTop) - controller.getOffset(1)), 'easeOutQuart', function(){
				moveSlide(currentSlide1-1);
			});
		});

		$('#aboutus .inner .next').bind('click', function(e){
			e.preventDefault();
			
			$('html,body').animate({scrollTop:controller.getOffset(1)}, Math.abs((document.body.scrollTop || document.documentElement.scrollTop) - controller.getOffset(1)), 'easeOutQuart', function(){
				moveSlide(currentSlide1+1);
			});
		});
	});

	
	/*****************************************************************************************************************
	 * slide in "PEOPLE"
	 *****************************************************************************************************************/

	$(function(){
		var slides   = $('#people .slide');
		var animate  = false;
		var duration = 800;
		var easing   = 'easeOutQuad';
		var dummy    = $('<div></div>').css({top:0});

		if(Shared.ua.isIElt9){
			$('#people .pager li').eq(0).addClass('cu');
		}else{
			$('#people .pager li').eq(0).transform('scale(1.3)');

			$('#people .pager li').each(function(i){
				$(this).hover(function(){
					if(i !== currentSlide2) $(this).transform('scale(1.3)');
				}, function(){
					if(i !== currentSlide2) $(this).transform('scale(1)');
				});
			})
		}


		function moveSlide(index){
			if(index == currentSlide2) return;

			setCamera(2000+index*200, 90, 180);


			if(Shared.css.transform.scale){
				dummy.stop().animate({top:index}, {duration:duration, easing:easing, step:function(s){
					slides.each(function(i){
						slides.eq(i).css({display:'block', opacity:1-Math.pow(s-i,2)}).transform('scale('+(1+(i-s)*0.25)+')');
					});
				}, complete:function(){
					slides.clearStyle().css({display:'none'}).eq(index).css({display:'block'});
				}});
			}else{
				var prev = slides.eq(currentSlide2);
				var next = slides.eq(index);

				prev.animate({left:-2000}, duration, easing);

				next.css({display:'block', left:-2000}).animate({left:0}, duration, easing, function(){
					prev.css({display:'none'});
				});
			}
			currentSlide2 = index;

			if(Shared.ua.isIElt9){
				$('#people .pager li').removeClass('cu').eq(index).addClass('cu');
			}else{
				$('#people .pager li').transform('scale(1)').eq(index).transform('scale(1.3)');
			}
		}

		$('#people a').each(function(i){
			$(this).bind('click', function(e){
				e.preventDefault();

				$('#people .slide').each(function(j){
					if(j <= i+1) $(this).find('img').postload();
				});

				$('html,body').animate({scrollTop:controller.getOffset(3)}, Math.abs((document.body.scrollTop || document.documentElement.scrollTop) - controller.getOffset(3)), 'easeOutQuart', function(){
					moveSlide(i+1);
				});
			});
		});

		$('#people .pager li').each(function(i){
			$(this).bind('click', function(e){
				e.preventDefault();

				$('#people .slide').each(function(j){
					if(j <= i) $(this).find('img').postload();
				});

				$('html,body').animate({scrollTop:controller.getOffset(3)}, Math.abs((document.body.scrollTop || document.documentElement.scrollTop) - controller.getOffset(3)), 'easeOutQuart', function(){
					moveSlide(i);
				});
			});
		});
	});


	/*****************************************************************************************************************
	 * Shareボタン
	 *****************************************************************************************************************/

	$(function(){

		var ogUrl = location.protocol + '//' + location.host + location.pathname;
		var ogTxt = '';
		var twURL = 'https://twitter.com/share';
		var fbURL = 'http://www.facebook.com/sharer.php';
		var gpURL = 'https://plus.google.com/share';

		$('meta').each(function(){
			var name  = this.getAttribute('name');
			var prop  = this.getAttribute('property');
			var value = this.getAttribute('content');

			if(value){
				if(prop == 'og:url'){
					ogUrl = value;
				}
				if(name == 'description' && ogTxt == ''){
					ogTxt = value;
				}
				if(prop == 'og:description'){
					ogTxt = value;
				}
			}
		});

		twURL += '?url='+ogUrl+'&text='+encodeURIComponent(ogTxt);
		fbURL += '?u='+ogUrl;
		gpURL += '?url='+ogUrl;

		function openSubWin(url, w, h){
			var sw = window.screen.width;
			var sh = window.screen.height;
			window.open(url, 'share', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+w+',height='+h+',left='+(sw/2-w/2)+',top='+(sh/2-h/2));
		}


		$('.social .facebook').attr('href', fbURL).bind('click', function(e){
			e.preventDefault();
			openSubWin(this.href, 600, 300);
		});

		$('.social .twitter').attr('href', twURL).bind('click', function(e){
			e.preventDefault();
			openSubWin(this.href, 550, 262);
		});

		$('.social .google').attr('href', gpURL).bind('click', function(e){
			e.preventDefault();
			openSubWin(this.href, 600, 600);
		});
	});

})();