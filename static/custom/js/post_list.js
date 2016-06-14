$(window).load(function(){
		$("#user_info_icon").toggle(function(){
			$("#content").removeClass("col-md-8");
			$("#sidebar").removeClass("col-md-4").attr("style","display:none;");
			$("#header").attr("style","display:none;");
			$("#user_info_icon i").removeClass("fa-expand").addClass("fa-compress");
		},function(){
			$("#content").addClass("col-md-8");
			$("#sidebar").addClass("col-md-4").attr("style","display:'';");
			$("#header").attr("style","display:'';");
			$("#user_info_icon i").removeClass("fa-compress").addClass("fa-expand");
		});		
	}
);