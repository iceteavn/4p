/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright ﾂｩ 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/
if(typeof jQuery != 'undefined'){
	jQuery.easing['jswing'] = jQuery.easing['swing'];

	jQuery.extend(
		jQuery.easing, {
		def:'easeOutQuad',
		swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},
		easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b;},
		easeOutQuad:function(x,t,b,c,d){return -c *(t/=d)*(t-2)+b;},
		easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1) return c/2*t*t+b;return -c/2 *((--t)*(t-2) - 1)+b;},
		easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b;},
		easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},
		easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1) return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},
		easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},
		easeOutQuart:function(x,t,b,c,d){return -c *((t=t/d-1)*t*t*t - 1)+b;},
		easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1) return c/2*t*t*t*t+b;return -c/2 *((t-=2)*t*t*t - 2)+b;},
		easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},
		easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},
		easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1) return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},
		easeInSine:function(x,t,b,c,d){return -c * Math.cos(t/d *(Math.PI/2))+c+b;},
		easeOutSine:function(x,t,b,c,d){return c * Math.sin(t/d *(Math.PI/2))+b;},
		easeInOutSine:function(x,t,b,c,d){return -c/2 *(Math.cos(Math.PI*t/d) - 1)+b;},
		easeInExpo:function(x,t,b,c,d){return(t==0)?b:c * Math.pow(2,10 *(t/d - 1))+b;},
		easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c *(-Math.pow(2,-10 * t/d)+1)+b;},
		easeInOutExpo:function(x,t,b,c,d){if(t==0) return b;if(t==d) return b+c;if((t/=d/2)<1) return c/2 * Math.pow(2,10 *(t - 1))+b;return c/2 *(-Math.pow(2,-10 *--t)+2)+b;},
		easeInCirc:function(x,t,b,c,d){return -c *(Math.sqrt(1 -(t/=d)*t) - 1)+b;},
		easeOutCirc:function(x,t,b,c,d){return c * Math.sqrt(1 -(t=t/d-1)*t)+b;},
		easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1) return -c/2 *(Math.sqrt(1 - t*t) - 1)+b;return c/2 *(Math.sqrt(1 -(t-=2)*t)+1)+b;},
		easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0) return b;if((t/=d)==1) return b+c;if(!p) p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI) * Math.asin(c/a);return -(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p ))+b;},
		easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0) return b;if((t/=d)==1) return b+c;if(!p) p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI) * Math.asin(c/a);return a*Math.pow(2,-10*t) * Math.sin((t*d-s)*(2*Math.PI)/p )+c+b;},
		easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0) return b;if((t/=d/2)==2) return b+c;if(!p) p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI) * Math.asin(c/a);if(t<1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p ))+b;return a*Math.pow(2,-10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )*.5+c+b;},
		easeInBack:function(x,t,b,c,d,s){if(s==undefined) s=1.70158;return c*(t/=d)*t*((s+1)*t - s)+b;},
		easeOutBack:function(x,t,b,c,d,s){if(s==undefined) s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},
		easeInOutBack:function(x,t,b,c,d,s){if(s==undefined) s=1.70158;if((t/=d/2)<1) return c/2*(t*t*(((s*=(1.525))+1)*t - s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},
		easeInBounce:function(x,t,b,c,d){return c - jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},
		easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}},
		easeInOutBounce:function(x,t,b,c,d){if(t<d/2) return jQuery.easing.easeInBounce(x,t*2,0,c,d) * .5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d) * .5+c*.5+b;}
	});
}

// remvoe no-js
(function(){
	if(document.documentElement.className.indexOf('no-js') !== -1){
		document.documentElement.className = document.documentElement.className.replace('no-js', '');
	}
})();

(function(){
	"use strict";

	var MODE_CSS3 = 1;
	var MODE_JS   = 2;
	var debugMode = MODE_CSS3;

	window.Shared = new function(){

		/*****************************************************************************************************************
		 * ユーザーエージェント判別
		 *****************************************************************************************************************/

		var _ua = window.navigator.userAgent.toLowerCase(),
		    _IE, _IEver,
		    _Chrome, _ChromeVer,
		    _FireFox, _FireFoxVer,
		    _Safari, _SafariVer,
		    _Opera, _OperaVer,
		    _Mac, _iPhone, _iPad, _iPod, _iOSver,
		    _Android, _AndroidMobile, _AndroidTablet, _AndroidVer,
		    _WindowsPhone, _nexus7,
			_3ds, _dsi, _wii, _wiiu, _ps3, _ps4, _psp, _psv, _xbox,
			_bot;

		// ブラウザ
		if (_ua.indexOf("msie") != -1){
			_IE = true;
			_ua.match(/msie (\d+\.\d)/);
			_IEver = parseFloat(RegExp.$1);

		}else if(_ua.indexOf('trident') != -1){
			_IE = true;
			_ua.match(/rv:(\d+\.\d)/);
			_IEver = parseFloat(RegExp.$1);

		}else if (_ua.indexOf("chrome")  != -1){
			_Chrome = true;
			_ua.match(/chrome[\/ ]?(\d+\.\d+)/);
			_ChromeVer = parseFloat(RegExp.$1);

		}else if (_ua.indexOf("firefox") != -1){
			_FireFox = true;
			_ua.match(/firefox[\/ ]?(\d+\.\d+)/);
			_FireFoxVer = parseFloat(RegExp.$1);

		}else if (_ua.indexOf("opera")   != -1){
			_Opera = true;
			_ua.match(/opera[\/ ]?(\d+\.\d+)/);
			_OperaVer = parseFloat(RegExp.$1);

		}else if (_ua.indexOf("safari")  != -1){
			_Safari = true;
			_ua.match(/version[\/ ]?(\d+\.\d+)/);
			_SafariVer = parseFloat(RegExp.$1);
		}

		// モバイル
		if (_ua.indexOf("iphone") != -1){
			_iPhone = true;
			_ua.match(/iphone os (\d+)_(\d+)/);
			_iOSver = RegExp.$1*1 + RegExp.$2*0.1;

		}else if (_ua.indexOf("ipad") != -1){
			_iPad = true;
			_ua.match(/cpu os (\d+)_(\d+)/);
			_iOSver = RegExp.$1*1 + RegExp.$2*0.1;

		}else if (_ua.indexOf("ipod") != -1){
			_iPod = true;
			_ua.match(/os (\d+)_(\d+)/);
			_iOSver = RegExp.$1*1 + RegExp.$2*0.1;

		}else if (_ua.indexOf("android") != -1){
			_Android = true;
			_ua.match(/android (\d+\.\d)/);
			_AndroidVer = parseFloat(RegExp.$1);

			if(_ua.indexOf('mobile') != -1){
				_AndroidMobile = true;
			}else{
				_AndroidTablet = true;
			}
		}else if (_ua.indexOf("windows phone") != -1) {
			_WindowsPhone = true;
		}

		
		if(_ua.indexOf('mac os') != -1){
			_Mac = true;
		}
		if(_ua.indexOf('nexus 7') != -1){
			_nexus7 = true;
		}

		// ゲーム機
		if(_ua.indexOf('playstation 3') != -1){
			_ps3 = true;
		}
		if(_ua.indexOf('playstation 4') != -1){
			_ps4 = true;
		}
		if(_ua.indexOf('playstation portable') != -1){
			_psp = true;
		}
		if(_ua.indexOf('playstation vita') != -1){
			_psv = true;
		}
		if(_ua.indexOf('nintendo') != -1){
			if(_ua.indexOf('dsi;') != -1){
				_dsi = true;
			}else if(_ua.indexOf('3ds;') != -1){
				_3ds = true;
			}else if(_ua.indexOf('wii;') != -1){
				_wii = true;
			}else if(_ua.indexOf('wiiu') != -1){
				_wiiu = true;
			}
		}


		// その他
		if(_ua.indexOf('mac os') != -1){
			_Mac = true;
		}
		if(_ua.indexOf('nexus 7') != -1){
			_nexus7 = true;
		}

		// BOT
		if(_ua.indexOf('googlebot') != -1 || _ua.indexOf('yahoo') != -1 || _ua.indexOf('msnbot') != -1){
			_bot = true;
		}

		var ua = {
			// IE系
			 isIE     : !!_IE
			,isIE6    : (_IEver == 6.0)
			,isIE7    : (_IEver == 7.0)
			,isIE8    : (_IEver == 8.0)
			,isIE9    : (_IEver == 9.0)
			,isIE10   : (_IEver == 10.0)
			,isIE11   : (_IEver == 11.0)
			,isIEgt6  : !!(_IEver > 6)
			,isIEgt7  : !!(_IEver > 7)
			,isIEgt8  : !!(_IEver > 8)
			,isIEgt9  : !!(_IEver > 9)
			,isIEgt10 : !!(_IEver > 10)
			,isIEgt11 : !!(_IEver > 11)
			,isIElt6  : !!(_IE && _IEver < 6)
			,isIElt7  : !!(_IE && _IEver < 7)
			,isIElt8  : !!(_IE && _IEver < 8)
			,isIElt9  : !!(_IE && _IEver < 9)
			,isIElt10 : !!(_IE && _IEver < 10)
			,isIElt11 : !!(_IE && _IEver < 11)

			// スマートフォン系
			,isiPhone : !!_iPhone
			,isiPad   : !!_iPad
			,isiPod   : !!_iPod
			,isiOS    : !!(_iPhone || _iPad || _iPod)
			,isAndroid       : !!_Android
			,isAndroidMobile	: !!_AndroidMobile
			,isAndroidTablet : !!_AndroidTablet
			,isWindowsPhone : !!_WindowsPhone
			,isSmartPhone   : (!!_iPhone || !!_iPad || !!_iPod || !!_Android || !!_WindowsPhone)
			,isMobile       : (!!_iPhone || !!_iPod || !!_AndroidMobile || !!_WindowsPhone)
			,isTablet       : (!!_iPad || !!_AndroidTablet)
			,isNexus7       : (!!_nexus7)

			// ゲーム系
			,isPS3    : (!!_ps3)
			,isPS4    : (!!_ps4)
			,isPSP    : (!!_psp)
			,isPSV    : (!!_psv)
			,is3DS    : (!!_3ds)
			,isDSi    : (!!_dsi)
			,isWii    : (!!_wii)
			,isWiiU   : (!!_wiiu)

			// ブラウザ種別
			,isSafari       : !!_Safari
			,isChrome       : !!_Chrome
			,isOpera        : !!_Opera
			,isFireFox      : !!_FireFox
			,isMac          : !!_Mac

			// ブラウザバージョン
			,verIE      : _IEver
			,verFireFox : _FireFoxVer
			,verChrome  : _ChromeVer
			,verSafari  : _SafariVer
			,verOpera   : _OperaVer
			,verAndroid : _AndroidVer
			,veriOS     : _iOSver

			// その他
			,isBot : !!_bot
		};


		/*****************************************************************************************************************
		 * CSS機能判別
		 *****************************************************************************************************************/

		var style  = document.createElement('div').style;
		var vendor = '';
		var prefix = '';

		var hasRGBA           = false;
		var hasZoom           = ('zoom' in style);
		var hasOpacity        = ('opacity' in style);
		var hasBoxShadow      = ('box-shadow' in style || 'boxShadow' in style);
		var hasBorderRadius   = ('border-radius' in style || 'borderRadius' in style);
		var hasBackgroundSize = ('background-size' in style || 'backgroundSize' in style);
		var hasTransition     = false;
		var hasAnimation      = false;
		var transitionEnd     = false;
		var hasFilter         = false;
		var hasMediaQuery     = false;
		var hasPositionFixed  = false;

		var cubicBezierParams = {
			linear : null,
			swing : [0.250, 0.100, 0.250, 1.000],
			easeInQuad : [0.55, 0.085, 0.68, 0.53],
			easeOutQuad : [0.25, 0.460, 0.45, 0.94],
			easeInOutQuad : [0.455, 0.03, 0.515, 0.955],
			easeInCubic : [0.550, 0.055, 0.675, 0.190],
			easeOutCubic : [0.215, 0.610, 0.355, 1.000],
			easeInOutCubic : [0.645, 0.045, 0.355, 1.000],
			easeInQuart : [0.895, 0.030, 0.685, 0.220],
			easeOutQuart : [0.165, 0.840, 0.440, 1.000],
			easeInOutQuart : [0.770, 0.000, 0.175, 1.000],
			easeInQuint : [0.755, 0.050, 0.855, 0.060],
			easeOutQuint : [0.230, 1.000, 0.320, 1.000],
			easeInOutQuint : [0.860, 0.000, 0.070, 1.000],
			easeInSine : [0.470, 0.000, 0.745, 0.715],
			easeOutSine : [0.390, 0.575, 0.565, 1.000],
			easeInOutSine : [0.445, 0.050, 0.550, 0.950],
			easeInExpo : [0.950, 0.050, 0.795, 0.035],
			easeOutExpo : [0.190, 1.000, 0.220, 1.000],
			easeInOutExpo : [1.000, 0.000, 0.000, 1.000],
			easeInCirc : [0.600, 0.040, 0.980, 0.335],
			easeOutCirc : [0.075, 0.820, 0.165, 1.000],
			easeInOutCirc : [0.785, 0.135, 0.150, 0.860],
			easeInBack : [0.600, -0.280, 0.735, 0.045],
			easeOutBack : [0.175, 0.885, 0.320, 1.275],
			easeInOutBack : [0.680, -0.550, 0.265, 1.550]
		};

		// RGBA
		try{
			style.backgroundColor = 'rgba(255,0,0,0.5)';
			hasRGBA = (style.backgroundColor.indexOf('rgba') == 0);
		}catch(e){}

		// vendor prefix
		prefix = (function(){
			var _vendors = ['o', 'ms', 'moz', 'Moz', 'webkit', ''];

			vendor = '';

			for(var i=1; i<_vendors.length; i++){
				if(_vendors[i] + 'Transform' in style){
					if(_vendors[i] != ''){
						vendor = _vendors[i].toLowerCase();
						return '-' + vendor + '-';
					}else{
						vendor = '';
						return '';
					}
				}
			}
			return '';
		})();

		// transition
		hasTransition = (function(){
			var prefixT = ['oT', 'msT', 'mozT', 'MozT', 'webkitT', 't'];

			for(var i=0; i<prefixT.length; i++){
				var property = prefixT[i] + 'ransition';
				if(property in style){
					style[property] = '';
					style[property] = 'left 1ms linear 1ms';
					if(style[property] != ''){
						if(property.indexOf('webkit') == 0){
							transitionEnd = 'webkitTransitionEnd';
						}else{
							transitionEnd = 'transitionend';
						}
						return true;
					}
				}
			}
			return false;
		})();

		// animation
		hasAnimation = (function(){
			var prefixA = ['oA', 'msA', 'mozA', 'MozA', 'webkitA', 'a'];
			for(var i=0; i<prefixA.length; i++){
				var property = prefixA[i] + 'nimation';
				if(property in style){
					style[property] = '';
					style[property] = 'check 1ms ease 0ms infinite';
					if(style[property] != ''){
						return true;
					}
				}
			}
			return false;
		})();

		// filter
		hasFilter = (function(){
			var prefixF = ['oF', 'msF', 'mozF', 'MozF', 'webkitF', 'f'];
			for(var i=0; i<prefixF.length; i++){
				var property = prefixF[i] + 'ilter';
				if(property in style){
					style[property] = '';
					style[property] = 'blur(10px)';
					if(style[property] != ''){
						if(_IE){
							return (typeof history.pushState === 'function');
						}else{
							return true;
						}

					}
				}
			}
			return false;
		})();

		// media query
		hasMediaQuery = (function(){
			if(typeof window.matchMedia == 'function'){
				try{
					return !!window.matchMedia('all').matches;
				}catch(ex){
					return (ua.isFireFox && window.parent != window);
				}
			}else if(typeof window.msMatchMedia == 'function'){
				return !!window.msMatchMedia('all').matches;
			}else{
				var dummyDiv = document.createElement('div');
				var checkDiv = document.createElement('div');
				var dummyCSS = '<style>@media all and (min-width: 0px) {#mqdummyelement{position:absolute;}}</style>';
				var head = document.getElementsByTagName('head')[0];

				dummyDiv.innerHTML = dummyCSS;
				head.appendChild(dummyDiv)

				checkDiv.setAttribute('id', 'mqdummyelement');
				dummyDiv.appendChild(checkDiv);

				var _has = (window.getComputedStyle ? getComputedStyle(checkDiv, null) : checkDiv.currentStyle)['position'] == 'absolute';
				head.removeChild(dummyDiv);

				return _has;
			}
		})();

		// position:fixed
		hasPositionFixed = (function(){
			// 誰か書いて
			return true;
		})();


		// transform
		var transform = {
			'translate'   : '1px, 1px',
			'translate3d' : '1px, 1px, 1px',
			'translateX'  : '1px',
			'translateY'  : '1px',
			'translateZ'  : '1px',
			'scale'       : '0, 0',
			'scale3d'     : '0, 0, 0',
			'scaleX'      : '1',
			'scaleY'      : '1',
			'scaleZ'      : '1',
			'rotate'      : '1deg',
			'rotate3d'    : '1, 1, 1, 1deg',
			'rotateX'     : '1deg',
			'rotateY'     : '1deg',
			'rotateZ'     : '1deg',
			'skew'        : '1deg, 1deg',
			'skewX'       : '1deg',
			'skewY'       : '1deg',
			'matrix'      : '1, 0, 0, 1, 1, 1',
			'matrix3d'    : '1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1',
			'perspective' : '100px'
		};

		if(debugMode == MODE_CSS3 && ('transform' in style || prefix+'transform' in style)){
			for(var property in transform){
				var val = property + '(' + transform[property] + ')';

				style[prefix+'transform'] = '';
				style[prefix+'transform'] = val;

				if(style[prefix+'transform'] != ''){
					transform[property] = true;
				}else{
					transform[property] = false;
				}
			}
		}else{
			for(var property in transform){
				transform[property] = false;
			}
		}

		var css = {
			// ブラウザベンダーの文字列
			 vendor : vendor

			// CSSプレフィックスの文字列
			,prefix : prefix

			// rgba()による色指定が可能かどうか
			,hasRGBA           : hasRGBA

			// zoomが使用可能かどうか
			,hasZoom           : hasZoom

			// プレフィックスなしにopacityが使用可能かどうか
			,hasOpacity        : hasOpacity

			// プレフィックスなしにboxshadowが使用可能かどうか
			,hasBoxShadow      : hasBoxShadow

			// プレフィックスなしにborder-radiusが使用可能かどうか
			,hasBorderRadius   : hasBorderRadius

			// プレフィックスなしにbackground-sizeが使用可能かどうか
			,hasBackgroundSize : hasBackgroundSize

			// メディアクエリが使用可能かどうか
			,hasMediaQuery     : hasMediaQuery

			// メディアクエリが使用可能かどうか
			,hasMediaQueries   : hasMediaQuery

			// positon:fixedが使用可能かどうか
			,hasPositionFixed  : hasPositionFixed

			// 使用可能なtransform判定オブジェクト
			,transform     : transform

			// transitionが使用可能かどうか
			,hasTransition : (debugMode == MODE_CSS3 ? hasTransition : false)

			// css-animationが使用可能かどうか
			,hasAnimation  : (debugMode == MODE_CSS3 ? hasAnimation  : false)

			// transtion-endが使用可能かどうか
			,transitionEnd : (debugMode == MODE_CSS3 ? transitionEnd : false)

			// filterが使用可能かどうか
			,hasFilter     : (debugMode == MODE_CSS3 ? hasFilter : false)

			// イージング名をcubic-bezierに変換する関数
			,easing : function(name){
				if(name in cubicBezierParams){
					var easing = cubicBezierParams[name];

					if(easing != null){
						return 'cubic-bezier('+easing[0]+', '+easing[1]+', '+easing[2]+', '+easing[3]+')';
					}else{
						return 'linear';
					}
				}else{
					return 'linear';
				}
			}
		};


		/*****************************************************************************************************************
		 * HTML機能判別
		 *****************************************************************************************************************/

		var hasFlash = false;

		try {
			hasFlash = !!(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'));
		}catch(e){
			hasFlash = (navigator.mimeTypes ["application/x-shockwave-flash"] != undefined);
		}

		var html = {
			// Flashが使用可能かどうか
			 hasFlash  : hasFlash

			// canvasが使用可能かどうか
			,hasCanvas : !!document.createElement('canvas').getContext

			// videoタグが使用可能かどうか
			,hasVideo  : !!document.createElement('video').canPlayType

			// audioタグが使用可能かどうか
			,hasAudio  : !!document.createElement('audio').canPlayType

			// SVGが使用可能かどうか
			,hasSVG    : !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)

			// WebGLが使用可能かどうか
			,hasWebGL  : !!window.WebGLRenderingContext

			// GPSが使用可能かどうか
			,hasGeolocation : ('geolocation' in navigator)

			// WebSocketが使用可能かどうか
			,hasWebSocket   : ('WebSocket' in window || 'MozWebSocket' in window)

			// WebWorkerが使用可能かどうか
			,hasWebWorkers  : ('Worker' in window)

			// HistoryAPIが使用可能かどうか
			,hasHistoryAPI  : (typeof history.pushState === 'function' && 'onpopstate' in window)

			// LocalStorageが使用可能かどうか
			,hasLocalStorage : ('localStorage' in window)

			// SessionStorageが使用可能かどうか
			,hasSessionStorage : ('sessionStorage' in window)
		};


		
		/*****************************************************************************************************************
		 * イベント機能判別
		 *****************************************************************************************************************/

		var event = {
			// orientationchangeイベント(画面の向きの変更)を持つ
			 hasOrientationChange : ('onorientationchange' in window)

			// hashchangeイベント(URLハッシュの変化)を持つ
			,hasHashChange        : ('onhashchange' in window)

			// devicemotionイベント(加速度センサ)を持つ
			,hasDeviceMotion      : ('ondevicemotion' in window)

			// propertychangeイベント(HTMLタグの属性変更)を持つ
			,hasPropertyChange    : ('onpropertychange' in document.documentElement)
		};



		/*****************************************************************************************************************
		 * 端末機能判別
		 *****************************************************************************************************************/

		var device = {
			// タッチイベントが発生するかどうか
			 hasTouch       : ('ontouchstart' in window)

			// 加速度センサが使用可能かどうか
			,hasMotion      : ('ondevicemotion' in window)

			// 向きセンサが使用可能かどうか
			,hasOrientation : (typeof window.orientation !== 'undefined')

			// 端末のdevicepixelratio
			,pixelRatio     : (window.devicePixelRatio ? window.devicePixelRatio : 1)
		};



		/*****************************************************************************************************************
		 * 便利関数
		 *****************************************************************************************************************/

		var resizeListeners = null;
		var scrollListeners = null;
		var winW;
		var winH;
		var seeds = [123456789, 362436069, 521288629, 88675123];


		function startResizeObserver(){
			if(resizeListeners === null){
				winW = window.innerWidth  || document.documentElement.clientWidth;
				winH = window.innerHeight || document.documentElement.clientHeight;

				var handler = function(){
					winW = window.innerWidth  || document.documentElement.clientWidth;
					winH = window.innerHeight || document.documentElement.clientHeight;
					for(var i=0; i<resizeListeners.length; i++){
						resizeListeners[i].call(null, winW, winH);
					}
				};

				resizeListeners = [];

				if(window.addEventListener){
					window.addEventListener('resize', handler, false);
					window.addEventListener('orientationchange', function(){
						setTimeout(handler, 1000);
					}, false);
				}else{
					window.attachEvent('onresize', handler);
				}
			}
		}

		function startScrollObserver(){
			if(scrollListeners === null){
				var handler = function(){
					var t = document.body.scrollTop || document.documentElement.scrollTop;
					var l = document.body.scrollLeft || document.documentElement.scrollLeft;
					var b = t + winH;
					var r = l + winW;

					for(var i=0; i<scrollListeners.length; i++){
						scrollListeners[i].call(null, t, b, l, r);
					}
				};

				scrollListeners = [];

				if(window.addEventListener){
					window.addEventListener('scroll', handler, false);
				}else{
					window.attachEvent('onscroll', handler);
				}
			}
		}

		var util = {
			/*
			 * @param n number
			 * @param d digit
			 * ex) zeroPad(12, 4) => 0012
			 */
			zeroPad : function(n, d){
				if(typeof d == 'number'){
					var len = (n+'').length;
					if(len < d) for(var i=0; i<d-len; i++) n = '0' + n;
					return n+'';
				}else{
					return n+'';
				}
			},

			/*
			 * requestAnimationFrameのラッパー。
			 * @param fn コールバック関数
			 * @param fps requestAnimationFrameが使えない場合のFPS。省略した場合は、30fps。
			 * 
			 * コールバック関数の引数は、[経過時間, 前回描画からの経過時間, 描画開始からの経過時間]
			 * コールバック関数内でfalseを返すと、終了する。
			 */
			reqAF : function(fn, fps){
				var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.mozRequestAnimationFrame || window.setTimeout;

				var t0 = +new Date();
				var pt = t0;
				var dt = (fps ? 1000/fps : 30);

				function tick(){
					var t1 = +new Date();

					if(fn(t1, t1-pt, t1-t0) !== false){
						requestAnimationFrame(tick, dt);
					}
					pt = t1;
				}
				requestAnimationFrame(tick, dt);
			},

			/*
			 * 配列オブジェクトか判定する関数。
			 */
			isArray : function(arg){
				return (
					   arg
					&& typeof arg == 'object'
					&& typeof arg.length == 'number'
					&& typeof arg.splice === 'function'
				);
			},

			/*
			 * 16進数カラーコードを、数値配列に変換する関数。
			 * ex) #aabbff => [170, 187, 255]
			 */
			hex2rgb : function(arg){
				var hexCode = new Array(3);

				if(arg.match(/#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/)){
					hexCode[0] = RegExp.$1;
					hexCode[1] = RegExp.$2;
					hexCode[2] = RegExp.$3;
				}else if(arg.match(/#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/)){
					hexCode[0] = RegExp.$1 + '' + RegExp.$1;
					hexCode[1] = RegExp.$2 + '' + RegExp.$2;
					hexCode[2] = RegExp.$3 + '' + RegExp.$3;
				}else{
					hexCode = null;
				}

				if(hexCode){
					var rgb = [0, 0, 0];

					for(var i=0; i<3; i++){
						rgb[i] = parseInt(hexCode[i], 16);
					}
					return rgb;
				}
				return null;
			},

			/*
			 * 色配列を16進数カラーコードに変換する関数。#がついて返ってくるので注意。
			 * ex) [170, 187, 255] => #aabbff
			 */
			rgb2hex : function(arg){
				if(util.isArray(arg)){
					return '#' + arg[0].toString(16) + arg[1].toString(16) + arg[2].toString(16);
				}else{
					return '#' + arguments[0].toString(16) + arguments[1].toString(16) + arguments[2].toString(16);
				}
			},

			/*
			 * URL分解関数。
			 * @param arg URL。省略した場合は、現在のURL。
			 */
			parseURI : function(arg){
				var p = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];
				var r = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
				var m = r.exec(arg || location.href);
				var u = {}
				var i = p.length;

				while(i--){
					u[p[i]] = m[i] || '';
				}
				return u;
			},

			/*
			 * クエリパラメータをオブジェクト化する関数。
			 * @param arg URL。省略した場合は、現在のlocation.search。
			 */
			parseParam : function(arg){
				var param = {};

				if(!arg){
					arg = location.search;
				}
				if(arg && arg.indexOf('?') != -1){
					arg = arg.split('?')[1];
				}else{
					arg = false;
				}
				if(arg){
					var _f = arg.split('&');

					for(var i=0; i<_f.length; i++){
						if(_f[i].indexOf('=') != -1){
							var _p = _f[i].split('=');
							param[_p[0]] = _p[1];
						}else{
							param[_f[i]] = '';
						}
					}
				}
				return param;
			},

			/*
			 * クラス継承を行う関数。
			 * @param superClass 親クラス
			 * @param subConstructor　子クラスのコンストラクタ
			 * @param methods 小クラスに登録するメソッド(オブジェクト形式)。

			 * @return 小クラスの定義。
			 */
			extend : function(superClass, subConstructor, methods){
				if (typeof Object.create !== 'function') {
					Object.create = function(o) {
						var F = function(){};
						F.prototype = o;
						return new F();
					};
				}
				subConstructor.prototype = Object.create(superClass.prototype);
				subConstructor.prototype.constructor = subConstructor;

				if(typeof methods == 'object'){
					for(name in methods){
						subConstructor.prototype[name] = methods[name];
					}
				}
				return subConstructor;
			},

			/*
			 * サイズ変更時のリスナを登録する関数。
			 * @param fn コールバック関数。関数には引数として、[画面幅, 画面高]が渡される。
			 * @param init 登録直後に実行するかどうか。省略した場合は、true。
			 */
			addResizeListener : function(fn, init){
				if(typeof fn === 'function'){
					startResizeObserver();

					resizeListeners.push(fn);

					if(init === undefined || init){
						fn(winW, winH);
					}
				}
			},

			/*
			 * スクロール時のリスナを登録する関数。
			 * @param fn コールバック関数。関数には引数として、[スクロールトップ, スクロールボトム, スクロールレフト, スクロールライト]が渡される。
			 * @param init 登録直後に実行するかどうか。省略した場合は、true。
			 */
			addScrollListener : function(fn, init){
				if(typeof fn === 'function'){
					startResizeObserver();
					startScrollObserver();

					scrollListeners.push(fn);

					if(init === undefined || init){
						var t = document.body.scrollTop || document.documentElement.scrollTop;
						var l = document.body.scrollLeft || document.documentElement.scrollLeft;
						var b = t + winW;
						var r = l + winH;
						fn(t, b, l, r);
					}
				}
			},

			/*
			 * リサイズ時のリスナを削除する関数。
			 * @param fn 削除するコールバック関数。
			 */
			removeResizeListener : function(fn){
				if(resizeListeners !== null){
					for(var i=0; i<resizeListeners.length;){
						fn == resizeListeners[i] ? resizeListeners.splice(i, 1) : i++;
					}
				}
			},

			/*
			 * スクロール時のリスナを削除する関数。
			 * @param fn 削除するコールバック関数。
			 */
			removeScrollListener : function(fn){
				if(scrollListeners !== null){
					for(var i=0; i<scrollListeners.length;){
						fn == scrollListeners[i] ? scrollListeners.splice(i, 1) : i++;
					}
				}
			},

			/*
			 * cookie読み込み/書き込み関数。
			 * @param name 第1引数のみの場合は、読み込みを行う。第2引数が存在する場合は、書き込みを行う。
			 * @param value 書き込む値。
			 * @param options path、domain、expires、secureの設定が可能。
			 * 
			 * expiresは、保存秒数または数値+単位で設定する。
			 * ex1) 3600 => 1時間
			 * ex2) 1month => 30日
			 */
			cookie : function(){
				var name = arguments[0];

				if(!!name){
					if(arguments.length > 1){
						// write
						var value   = (arguments[1] || '');
						var options = (arguments[2] || {});

						var path    = options.path   ? '; path=' + (options.path) : '';
	        			var domain  = options.domain ? '; domain=' + (options.domain) : '';
	       				var secure  = options.secure ? '; secure' : '';
						var expires = options.expires ? options.expires : '';

						if(expires != ''){
							var date;

							if(typeof expires == 'number'){
								date = new Date();
								date.setTime(date.getTime() + expires*1000);
							}else if(expires.toUTCString){
								date = expires;
							}else if(typeof expires == 'string'){
								var msec = 0;

								if(expires.match(/^([0-9]+)second(s)?$/)){
									msec = (RegExp.$1-0)*1000;
								}else if(expires.match(/^([0-9]+)minute(s)?$/)){
									msec = (RegExp.$1-0)*60*1000;
								}else if(expires.match(/^([0-9]+)hour(s)?$/)){
									msec = (RegExp.$1-0)*60*60*1000;
								}else if(expires.match(/^([0-9]+)day(s)?$/)){
									msec = (RegExp.$1-0)*24*60*60*1000;
								}else if(expires.match(/^([0-9]+)week(s)?/)){
									msec = (RegExp.$1-0)*7*24*60*60*1000;
								}else if(expires.match(/^([0-9]+)month(s)?$/)){
									msec = (RegExp.$1-0)*30*24*60*60*1000;
								}else if(expires.match(/^([0-9]+)year(s)?$/)){
									msec = (RegExp.$1-0)*365*24*60*60*1000;
								}
								if(msec > 0){
									date = new Date();
									date.setTime(date.getTime() + msec);
								}
							}
							if(date) expires = '; expires=' + date.toUTCString();
						}
						document.cookie = name + '=' + encodeURIComponent(value) + path + domain + secure + expires;
					}else{
						// read
						if(!!document.cookie){
							var sp = document.cookie.split(';');

							for(var i=0; i<sp.length; i++){
								var pair = sp[i].split('=');
								if(jQuery.trim(pair[0]) == name){
									return decodeURIComponent(jQuery.trim(pair[1]));
								}
							}
						}
						return undefined;
					}
				}
			},

			srand : function(seed){
				seeds[2] ^= seed;
				seeds[2] ^= seeds[2] >> 21;
				seeds[2] ^= seeds[2] << 35;
				seeds[2] ^= seeds[2] >> 4;
				seeds[2] *= 268582165;

			},

			rand : function(min, max){
				var t = (seeds[0]^(seeds[0]<<11));
				seeds[0]=seeds[1];
				seeds[1]=seeds[2];
				seeds[2]=seeds[3];
				
				var r = ( seeds[3]=(seeds[3]^(seeds[3]>>19))^(t^(t>>8)) );

				if(arguments.length >= 2){
					return min + r%(max-min);
				}else{
					return r;
				}
			}
		};


		/*****************************************************************************************************************
		 * readyイベント
		 *****************************************************************************************************************/

		var readyFn = [];

		function ready(fn){
			if(document.readyState === 'complete'){
				fn.call();
			}else{
				readyFn.push(fn);
			}
		};
		function doReady(){
			for(var i=0; i<readyFn.length; i++){
				readyFn[i].call();
			}
		}
		function check(){
			try {
				document.documentElement.doScroll('left');
			} catch(e) {
				setTimeout(check, 1);
				return;
			}
			doReady();
		}

		if(document.readyState === 'complete'){
			doReady();
		}else{
			if(document.addEventListener){
				document.addEventListener('DOMContentLoaded', doReady, false);
			}else{
				check();
			}
		}

		

		/*****************************************************************************************************************
		 * public
		 *****************************************************************************************************************/

		// 変更不可にする
		if(Object.freeze) ua = Object.freeze(ua);
		if(Object.freeze) css = Object.freeze(css);
		if(Object.freeze) html = Object.freeze(html);
		if(Object.freeze) event = Object.freeze(event);
		if(Object.freeze) device = Object.freeze(device);
	
		
		this.ua     = ua;
		this.css    = css;
		this.html   = html;
		this.event  = event;
		this.device = device;
		this.util   = util;
		this.ready  = ready;
		
		/*
		return {
			ua : ua,
			css : css,
			html : html,
			event : event,
			device : device,
			util : util,
			ready : ready
		};*/
	};
})();


// jQuery拡張
if(typeof $ != 'undefined'){

	/*******************************************************************************************************************************
	 * Utility
	 *******************************************************************************************************************************/

	var dummyElement = null;

	jQuery.extend({
		preload : function(src){
			if(!dummyElement){
				dummyElement = document.createElement('div');
				dummyElement.style.cssText = 'position:absolute; left:-9999px; top:-9999px; display:none';
				document.body.appendChild(dummyElement);
			}
			var img = document.createElement('img');
			img.src = src;
			img.setAttribute('width', 'auto');
			img.setAttribute('height', 'auto');
			dummyElement.appendChild(img);
		},

		useVML : function(){
			if(document.namespaces){
				if(!document.namespaces['v']){
					if(Shared.ua.isIE8){
						document.namespaces.add('v', 'urn:schemas-microsoft-com:vml', '#default#VML');
					}else{
						document.namespaces.add('v', 'urn:schemas-microsoft-com:vml');
					}
					document.createStyleSheet().cssText = "v\\:rect, v\\:fill, v\\:shape, v\\:group, v\\:path, v\\:oval, v\\:image { behavior: url(#default#VML); display:inline-block; margin:0; padding:0; }";
					document.createStyleSheet().cssText = "._rewrited2vml {visibility:hidden !important; position:absolute !important; top:-9999px !important; left:-9999px !important;}";
				}
				return true;
			}else{
				return false;
			}
		}
	});

	jQuery.fn.extend({

		img2vml : function(){
			if(Shared.ua.isIElt9){
				if(document.namespaces){
					jQuery.useVML();

					var images = this.filter('img');

					images.each(function(i){
						var img = this;
						var src = this.getAttribute('src');

						if(images.eq(i).hasClass('_rewrited2vml')){
							return true;
						}else{
							images.eq(i).addClass('_rewrited2vml');
						}
						if(Shared.ua.isIElt8){
							images.eq(i).css({visibility:'hidden', position:'absolute', top:'-9999px', left:'-9999px'});
						}
						if(Shared.ua.isIE8){
							var dummy = document.createElement('div');
							dummy.innerHTML = '<v:rect><v:fill></v:fill></v:rect>';
							var rect = dummy.firstChild;
							var fill = rect.firstChild;
						}else{
							var rect = document.createElement('v:rect');
							var fill = document.createElement('v:fill');
							rect.appendChild(fill);
						}
						var w = images.eq(i).attr('width');
						var h = images.eq(i).attr('height');

						fill.src     = src || '';
						fill.type    = 'frame';
						fill.opacity = 1;

						rect.fillcolor    = 'none';
						rect.stroked      = false;
						rect.coorsize     = w+','+h;
						rect.coordorigin  = '0,0';
						rect.style.width  = w + 'px';
						rect.style.height = h + 'px';

						img.parentNode.insertBefore(rect, img);

						fill.color = 'none';

						img.attachEvent('onpropertychange', function(e){
							if(e.propertyName == 'src'){
								fill.src = img.src;
							}
							else if(e.propertyName == 'width' || e.propertyName == 'style.width'){
								rect.style.width = img.currentStyle.width;
							}
							else if(e.propertyName == 'height' || e.propertyName == 'style.height'){
								rect.style.height = img.currentStyle.height;
							}
							else if(e.propertyName == 'style.filter'){
								var opacity = 1;

								if(img.style.filter){
									opacity = (img.style.filter.split('alpha(opacity=')[1]).split(')')[0]/100;
									if(opacity == 0) opacity = 0.001;
								}
								fill.opacity = opacity;
								fill.color = 'none';
							}
							else if(e.propertyName == 'style.marginTop'){
								rect.style.marginTop = img.style.marginTop;
							}
							else if(e.propertyName == 'style.marginLeft'){
								rect.style.marginLeft = img.style.marginLeft;
							}
							fill.color = 'none';
						});
					});
				}
			}
			return this;
		},

		img2bg : function(useFilter){
			if(!$('html').hasClass('_bgstyle')){
				$('html').addClass('_bgstyle');

				if(document.createStyleSheet){
					document.createStyleSheet().cssText = "._rewrited2bg { display:inline-block!important; width:auto!important; height:auto!important; } ._rewrited2bg img { visibility:hidden!important; }";
				}else{
					var style = document.createElement('style');
					style.innerHTML = "._rewrited2bg { display:inline-block!important; width:auto!important; height:auto!important; } ._rewrited2bg img { visibility:hidden!important; }";
					document.getElementsByTagName('head')[0].appendChild(style);
				}
			}

			this.filter('img').each(function(){
				var span = $('<span class="_rewrited2bg"></span>');

				if(!Shared.css.hasOpacity && useFilter){
					span.css({filter:'progid:DXImageTransform.Microsoft.AlphaImageLoader(Src='+this.src+',SizingMethod=scale)'});
				}else{
					span.css({background:'url('+this.src+') top left no-repeat', backgroundSize:'100% 100%'});
				}
				$(this).after(span);

				span.append(this);
			});
			return this;
		},

		ov : function(){
			return this.each(function(){
				var self = $(this);
				var area = self;

				function enter(){
					if(self.hasClass('ov')) self.attr('src', srcOv);
				}
				function leave(){
					if(self.hasClass('ov')) self.attr('src', srcOff);
				}

				if(this.tagName == 'IMG' || (this.tagName == 'INPUT' && this.type == 'image')){
					if(self.attr('data-src')){
						var srcOff = self.attr('data-src');
					}else{
						var srcOff = self.attr('src');
					}
					var srcOv  = srcOff.replace(/^(.+)(\..+)$/, '$1_ov$2');

					$.preload(srcOff);
					$.preload(srcOv);

					if(self.hasClass('_rewrited2vml')){
						if(this.parentNode.tagName == 'A' && this.parentNode.currentStyle['cursor'] == 'auto'){
							this.parentNode.style.cursor = 'pointer';
						}
					}
					if(this.parentNode.tagName == 'A'){
						area = self.parent('a');
					}
					if(Shared.device.hasTouch){
						area.bind('touchstart', enter).bind('touchend touchcancel', leave);
					}else{
						area.hover(enter, leave);

						if(this.parentNode.tagName == 'A'){
							$(this.parentNode).bind('focus', enter).bind('blur', leave);
						}
					}
				}
			});
		},

		/*
		 * HTMLエレメントのstyleプロパティを除去する。
		 */
		clearStyle : function(){
			return this.each(function(){
				this.setAttribute('style', ''); // 空にしてからでないと、chromeで属性名が残る
				this.removeAttribute('style');
			});
		},

		/*
		 * imgタグを遅延ロードする。
		 * @param fn 遅延ロード完了後に呼ばれるコールバック関数
		 * @param attrName imgタグのsrc属性に代入する属性。省略した場合は、data-src。
		 */
		postload : function(fn, attrName){
			var these = this;
			var target = new Array();

			if(!attrName) attrName = 'data-src';

			this.each(function(){
				if(this.getAttribute(attrName)){
					target.push(this);
				}
			});
			if(target.length > 0){
				var success = true;
				var count = 0;

				for(var i=0; i<target.length; i++){
					var src = target[i].getAttribute(attrName);
					target[i].removeAttribute(attrName);

					if(target[i].tagName === 'IMG'){
						target[i].src = src;
					}else{
						target[i].style.backgroundImage = 'url(' + src + ')';
					}
					var img = new Image();

					img.onload = function(){
						if(++count == target.length){
							if(fn && typeof fn == 'function') fn(success);
						}
					};
					img.onerror = function(){
						success = false;

						if(++count == target.length){
							if(fn && typeof fn == 'function') fn(success);
						}
					};
					img.src = src;
				}
			}else{
				if(fn && typeof fn == 'function') fn(false);
			}
			return this;
		},

		/*
		 * 要素および要素内の画像の読み込み完了のコールバック
		 * @param fn 関数
		 */
		loadEnd : function(fn){
			var imgSrc = new Array();
			var success = true;

			this.filter('img').each(function(){
				imgSrc.push(this.src);
			});
			this.find('img').each(function(){
				imgSrc.push(this.src);
			});

			if(imgSrc.length > 0){
				for(var i=0, count=0; i<imgSrc.length; i++){
					var img = new Image();

					img.onload = function(){
						if(++count == imgSrc.length) fn(success);
					};
					img.onerror = function(){
						success = false;
						if(++count == imgSrc.length) fn(success);
					};
					img.src = imgSrc[i];
				}
			}else{
				fn(undefined);
			}
			return this;
		},

		/*
		 * transtionを設定する関数
		 * @param prop 変化させるCSSプロパティ
		 * @param duration 変化にかかる時間
		 * @param easing イージング(jQuery.easingの名前)
		 * @param delay 遅延時間
		 */
		transition : function(prop, duration, easing, delay){
			if(Shared.css.hasTransition){
				if(prop){
					if(!duration) duration = 0;
					if(!easing) easing = 'linear';
					if(!delay) delay = 0;
					if(prop == 'filter') prop = Shared.css.prefix+prop;
					if(prop == 'transform') prop = Shared.css.prefix+prop;

					this.css('transition', prop+' '+duration+'ms '+Shared.css.easing(easing)+' '+delay+'ms');
					this.css(Shared.css.prefix+'transition', prop+' '+duration+'ms '+Shared.css.easing(easing)+' '+delay+'ms');
				}else{
					this.css('transition', 'none');
					this.css(Shared.css.prefix+'transition', 'none');
				}
			}
			return this;
		},

		/*
		 * transitionの終了イベントを登録する関数
		 * @param fn コールバック関数
		 * @param once 一度きりのコールバック実行か。省略した場合は、true。
		 * @param property transition対象のCSSプロパティ属性。省略した場合は、プロパティに関わらず実行。
		 */
		transitionEnd : function(fn, once, property){
			if(Shared.css.transitionEnd){
				if(fn){
					this.each(function(){
						function listener(e){
							if(e.target == this && (property === undefined || e.propertyName == property || e.propertyName == Shared.css.prefix + property)){
								if(once === undefined || once) this.removeEventListener(Shared.css.transitionEnd, listener);
								fn.call(this, e);
							}
						}
						this.addEventListener(Shared.css.transitionEnd, listener, false);
					});
				}else{
					this.each(function(i){
						this.removeEventListener(Shared.css.transitionEnd);
					});
				}
			}
			return this;
		},

		addTransition : function(prop, duration, easing, delay){
			if(Shared.css.hasTransition){
				if(!prop) prop = 'all';
				if(!duration) duration = 0;
				if(!easing) easing = 'linear';
				if(!delay) delay = 0;
				if(prop == 'transform') prop = Shared.css.prefix + 'transform';

				this.each(function(){
					var t = $.data(this, 'transition') || {};
					var s = '';
					var n = prop+' '+duration+'ms '+Shared.css.easing(easing)+' '+delay+'ms';
					var a = [], i = 0;

					if(prop == 'all'){
						t = {'all':n};
					}else{
						t[prop] = n;
					}
					for(var k in t){
						a[i++] = t[k];
					}
					this.style['transition'] = a.join(',');

					if(Shared.css.prefix != ''){
						this.style[Shared.css.prefix+'transition'] = a.join(',');
					}
					$.data(this, 'transition', t);
				});
			}
			return this;
		},

		removeTransition : function(prop){
			if(Shared.css.hasTransition){
				if(!prop) prop = 'all';
				if(prop == 'transform') prop = Shared.css.prefix + 'transform';

				this.each(function(){
					if(prop == 'all'){
						this.style['transition'] = '';

						if(Shared.css.prefix != ''){
							this.style[Shared.css.prefix+'transition'] = '';
						}
						$.data(this, 'transition', {});

					}else{
						var t = $.data(this, 'transition') || {};
						var a = [];

						for(var k in t){
							if(k == prop){
								delete t[prop];
							}else{
								a.push(t[k]);
							}
						}
						this.style['transition'] = a.join(',');

						if(Shared.css.prefix != ''){
							this.style[Shared.css.prefix+'transition'] = a.join(',');
						}
						$.data(this, 'transition', t);
					}
				});
			}
			return this;
		},

		setPerspective : function(number){
			if(Shared.css.transform.perspective){
				this.each(function(){
					var transform = $.data(this, 'transform') || Shared.css.getTransformTemplate();

					transform.perspective = number;

					$.data(this, 'transform', transform);
				});
			}
			return this;
		},

		/*
		 * transformのエイリアス。
		 */
		transform : function(){
			if(arguments.length > 0){
				this.css('transform', arguments[0]).css(Shared.css.prefix+'transform', arguments[0]);
			}else{
				this.css('transform', '').css(Shared.css.prefix+'transform', '');
			}
			return this;
		},

		/*
		 * translate3dのエイリアス。
		 * @param x x軸方向(右)の変量。省略した場合は、transformプロパティを除去
		 * @param y y軸方向(下)の変量。省略した場合は0。
		 * @param z z軸方向(前)の変量。省略した場合は0。
		 */
		translate3d : function(x, y, z){
			if(arguments.length > 0){
				if(x === undefined) x = 0;
				if(y === undefined) y = 0;
				if(z === undefined) z = 0;

				if(Shared.css.transform.translate3d){
					this.css(Shared.css.prefix+'transform', 'translate3d('+x+'px,'+y+'px,'+z+'px)');
				}else if(Shared.css.transform.translate){
					this.css(Shared.css.prefix+'transform', 'translate('+x+'px,'+y+'px)');
				}
			}else{
				if(Shared.css.transform.translate3d){
					this.css(Shared.css.prefix+'transform', '');
				}else if(Shared.css.transform.translate){
					this.css(Shared.css.prefix+'transform', '');
				}
			}
			return this;
		},

		/*
		 * transform-originのエイリアス。
		 * @param x x軸方向の中心。数値で指定した場合は自動的にpxを付ける。%による文字列指定も可能。
		 * @param y y軸方向の中心。数値で指定した場合は自動的にpxを付ける。%による文字列指定も可能。
		 */
		transformOrigin : function(x, y){
			if(x == undefined) x = '50%';
			if(y == undefined) y = '50%';

			if(typeof x === 'number') x += 'px';
			if(typeof y === 'number') y += 'px';

			if(Shared.css.transform.translate){
				this.css('transform-origin', x+' '+y);

				if(Shared.css.prefix !== ''){
					this.css(Shared.css.prefix+'transform-origin', x+' '+y);
				}
			}
			return this;
		},

		matrix : function(a, b, c, d, x, y){
			if(!x) x = 0;
			if(!y) y = 0;

			if(arguments.length == 0){
				a = d = 1;
				b = c = x = y = 0;
			}
			if(Shared.css.transform.matrix){
				this.css(Shared.css.prefix+'transform', 'matrix('+a+','+b+','+c+','+d+','+x+','+y+')');
			}else{
				this.css('filter', "progid:DXImageTransform.Microsoft.Matrix(M11="+a+", M12="+c+", M21="+b+", M22="+d+", SizingMethod='auto expand')");
			}
			return this;
		},

		cssAnimation : function(name, duration, easing, delay, iteration){

			if(arguments.length == 0){
				return this.css(Shared.css.prefix+'animation', '');
			}else{
				if(!delay){
					delay = 0;
				}
				if(!iteration){
					iteration = 'infinite';
				}
				return this.css(Shared.css.prefix+'animation', name+' '+duration+'ms '+delay+'ms '+Shared.css.easing(easing)+' '+iteration);
			}
		},

		rotateZ : function(deg, duration, easing, fn){
			if(Shared.css.transform.rotateZ){
				this.css(Shared.css.prefix+'transform', 'rotateZ('+deg+'deg)');
			}else if(Shared.css.transform.rotate){
				this.css(Shared.css.prefix+'transform', 'rotate('+deg+'deg)');
			}else{
				var cos = Math.cos(deg*Math.PI/180);
				var sin = Math.sin(deg*Math.PI/180);
				var that = this;

				return this.each(function(i){
					var w  = that.eq(i).outerWidth();
					var h  = that.eq(i).outerHeight();
					var mx = (w*cos + h*sin) - w;
					var my = (w*sin + h*cos) - h;
					//that.eq(i).css({marginLeft:-mx/2, marginTop:-my/2});
					this.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11="+cos+", M12="+(sin)+", M21="+(-sin)+", M22="+cos+", SizingMethod='auto expand')";
				});
			}
			return this;
		}
	});
}
