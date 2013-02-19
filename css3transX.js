/* ----------------
モバイル用 css3transition ライブラリー
setPositionX(targetElm, posX, percent)
resetPositionX(targetElm, posX, percent)
setTransX(targetElm, targetPosX, easeType, callback, percent)
2013/2/11
---------------- */

var css3transX = {
	//
	css3SupportNum:0,
	// customize
	easeArray:{
		0:" 500ms cubic-bezier(0, .5, .36, 1)",
		1:""
	},
	
	param:{
	},
	
	init:function(){
		var t = this;
		var w = 'webkit';
		var _ua = navigator.userAgent.toLowerCase();
		t.css3SupportNum = ( _ua.indexOf(w) > 0 )? 1:0;// 0の場合は、非webkitブラウザ (主にmozilla)
		// transform3d(Webkit) check BASE=2 (iOS6)
		t.css3SupportNum = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix())? 2:t.css3SupportNum;
		t.css3SupportNum = (!!document.uniqueID)? 3:t.css3SupportNum;// IE10 以上用 Transitionで tramsform3d が使える。
		
		var attr = ["transition","transform"];
		for(var i = 0;i<2; i++){
			var a = attr[i];
			if(t.css3SupportNum > 0 && t.css3SupportNum <3){
				t.param[i] = w + a.charAt(0).toUpperCase() + a.slice(1);
				a = "-" + w + "-" + a;// for webkit
				if(i<1){
					t.param[7] = w + 'TransitionEnd';//for WebkitEvent
				}
				
			}else{
				t.param[i] = a;
				if(i<1){
					t.param[7] = a + 'end';//Event for mozzila or IE10upper
				}
			}
			t.param[i+2] = a;//
		}//END for

		if(t.css3SupportNum % 2 != 0){
			t.param[4] = 'translate(';//2d
			t.param[5] = 'px, 0)';
			t.param[6] = '%, 0)';
		}else{
			t.param[4] = 'translateX(';//3d
			t.param[5] = 'px)';
			t.param[6] = '%)';
		}

	},
	setPositionX:function(targetElm, posX, percentFlag){
		targetElm[0].style[this.param[1]] = this.param[4] + posX + this.param[5+percentFlag];
	},
	resetPositionX:function(targetElm, posX, percentFlag){
		var t = this;
		var elm = targetElm[0];
		elm.style.removeProperty(t.param[2]);//rest animation
		elm.style[t.param[1]] = t.param[4] + posX + t.param[5+percentFlag];//transform reset
		elm.style['left'] = posX + (percentFlag)? "%":"px";// strong reflesh
	},
	
	setTransX:function(targetElm, targetPosX, easeType, callback, percentFlag){//easeArrayはあらかじめ決めて書いておく
		var t = this;
		var elm = targetElm[0];
		elm.style[t.param[0]] = t.param[3] + t.easeArray[easeType];
		elm.style[t.param[1]] = t.param[4] + targetPosX + t.param[5+percentFlag];
		
		targetElm.one(t.param[7], function(e){// depend jQuery
			elm.style.removeProperty(t.param[2]);//rest animation
			callback();
		});
	}

}//

css3transX.init();
