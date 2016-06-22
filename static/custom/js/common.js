(function(){
	var a=jQuery("body");
	var c=navigator.appVersion.indexOf("MSIE 6")!=-1?true:false;
	var b=function(){
		(jQuery(window).width()<1025)?jQuery(".scrollDiv").addClass("scrollDiv-resize"):jQuery(".scrollDiv").removeClass("scrollDiv-resize")
		};
	b();
	a.delegate(".sd_toTop","click",function(d){
		try{
			document.documentElement.scrollTop = 0
		}catch(e){};
		jQuery("html, body").animate({scrollTop:0},200)
	});
	jQuery(window).resize(function(){b()});
	window.onscroll=window.onload=function(){
		var e=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
		var d=document.documentElement.clientHeight;
		if(c){
			jQuery(".scrollDiv").css("top",e+d-180)
		}
		if(e<d){
			jQuery(".sd_toTop").hide();return
		}else{
			jQuery(".sd_toTop").show().css("display","block")
		}
	}
})();