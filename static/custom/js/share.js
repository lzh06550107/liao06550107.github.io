<!--分享组件函数-->
$(window).load(function(){
	$("div.blog_post_share").mouseover(function() {
		$(this).children().addClass("animating" );
	});
	$("div.blog_post_share").mouseout(function() {
		$(this).children().removeClass("animating" );
	});
}
);