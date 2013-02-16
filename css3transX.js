/* ----------------
モバイル用 css3transition ライブラリー(独自
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
		var _ua = navigator.userAgent.toLowerCase();
		t.css3SupportNum = ( _ua.indexOf('webkit') > 0 )? 1:0;// 0の場合は、非webkitブラウザ (主にmozilla)
		// transform3d(Webkit) check BASE=2 (iOS6)
		t.css3SupportNum = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix())? 2:t.css3SupportNum;
		t.css3SupportNum = (!!document.uniqueID)? 3:t.css3SupportNum;// IE10 以上用 Transitionで tramsform3d が使える。
		
		var attr = ["transition","transform"];
		for(var i = 0;i<2; i++){
			if(t.css3SupportNum > 0 && t.css3SupportNum <3){
				t.param[i] = "webkit" + attr[i];
				attr[i] ="-webkit-"+ attr[i];// for webkit
				//t.param[i] = $.camelCase(attr[i]);// depend jQuery
				if(i<1){
					t.param[6] = 'webkitTransitionEnd';//for Webkit
				}
				
			}else{
				t.param[i] = attr[i];
				if(i<1){
					t.param[6] = 'transitionend';//for mozzila or IE10upper
				}
			}
			t.param[i+2] = attr[i];//
		}//END for

		if(t.css3SupportNum %2 !=0){
			t.param[4] = 'translate(';
			t.param[5] = 'px, 0)';
		}else{
			t.param[4] = 'translateX(';
			t.param[5] = 'px)';
		}

	},
	setPositionX:function(targetElm, posX){
		var t = this;
		var elm = targetElm[0];
		elm.style.removeProperty(t.param[0]);//rest animation
		elm.style[t.param[1]] = t.param[4] + posX + t.param[5];
	},
	
	setTransX:function(targetElm, targetPosX, easeType){//easeArrayはあらかじめ決めて書いておく
		var t = this;
		var elm = targetElm[0];
		elm.style[t.param[0]] = t.param[3] + t.easeArray[easeType];
		elm.style[t.param[1]] = t.param[4] + targetPosX + t.param[5];
		
		targetElm.one(t.param[6], function(e){// depend jQuery
			elm.style.removeProperty(t.param[0]);//rest animation
		});
	}

}//

css3transX.init();
