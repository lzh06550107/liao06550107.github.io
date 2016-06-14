//生成目录结构
function generateTOC(insertBefore, heading, options) {
  var container = $("<div id='table-of-contents'></div>");
  var ul = $("<ul id='toc'></ul>");
  <!--目录上的按钮-->
  var button = $("<div id='user_info_icon'><a class='user_info_button' href='javascript:void(0)'><i class='fa fa-expand'></i></a></div>")
  var text_table_of_contents = $("<div id='text-table-of-contents'></div>");
  var content = $(insertBefore).first();

  if (heading != undefined && heading != null) {
    container.append('<h2 class="tocHeading">' + heading + '</h2>');
  }

  ul.tableOfContents(content,options);
  text_table_of_contents.append(ul);
  container.append(text_table_of_contents);
  container.append(button);
  container.insertBefore(insertBefore);
}

//配置并初始化目录
$(document).ready(function() {
    // Put a TOC right before the entry content.
    generateTOC('#post_list_conent_wrapper', 'Table of Contents', {
		startLevel: 2,
		depth: 3
	});
});

//给目录结构增加或删除文档内嵌目录的样式
function addAndRemove_nest_in_document(addOrRemove){
	$("#table-of-contents").toggleClass("nest_table-of-contents", addOrRemove);
	$("#table-of-contents #toc").toggleClass("nest_table-of-contents_toc", addOrRemove);
	$("#table-of-contents #toc ul").toggleClass("nest_table-of-contents_toc_ul", addOrRemove);
	
	$("#table-of-contents #toc ul li").toggleClass("nest_table-of-contents_toc_ul_li", addOrRemove);
}

//给目录结构增加或删除悬挂在右上角的目录样式
function addAndRemove_hang_top_right(addOrRemove){
	$("#table-of-contents").toggleClass("table-of-contents", addOrRemove);
	$("#table-of-contents h2").toggleClass("table-of-contents_h2", addOrRemove);
	$("#table-of-contents ul").toggleClass("table-of-contents_ul", addOrRemove);
	$("#table-of-contents ul li").toggleClass("table-of-contents_ul_li", addOrRemove);
	
	$("#table-of-contents #text-table-of-contents").toggleClass("table-of-contents_text-table-of-contents", addOrRemove);
	if( addOrRemove ){
		$("#table-of-contents").hover(function(){
			$("#text-table-of-contents").addClass("table-of-contents_hover_text-table-of-contents");
			//console.log("测试:添加了事件");
		},function(){
			$("#text-table-of-contents").removeClass("table-of-contents_hover_text-table-of-contents");
			//console.log("测试:删除了事件")
		});
	}else{
		$("#table-of-contents").off( "mouseenter mouseleave" );
	}
}

$(window).load(function(){
		//帖子开始时目录为嵌入页面目录样式
		addAndRemove_nest_in_document(true);
		$("#user_info_icon").toggle(function(){
			$("#content").removeClass("col-md-8");
			$("#sidebar").removeClass("col-md-4").attr("style","display:none;");
			$("#header").attr("style","display:none;");
			$("#user_info_icon i").removeClass("fa-expand").addClass("fa-compress");
			$("body").attr("style","background-color: #f0f5f6;");
			$("#content").attr("style","background-color:#fff;padding-left:40px;padding-right:40px;");
			//触发按钮之后，目录为悬挂右上角样式
			addAndRemove_nest_in_document(false);
			addAndRemove_hang_top_right(true);
		},function(){
			$("#content").addClass("col-md-8");
			$("#sidebar").addClass("col-md-4").attr("style","display:'';");
			$("#header").attr("style","display:'';");
			$("#user_info_icon i").removeClass("fa-compress").addClass("fa-expand");
			$("body").attr("style","");
			$("#content").attr("style","");
			//再次切换按钮时，为内嵌页面目录样式
			addAndRemove_hang_top_right(false);
			addAndRemove_nest_in_document(true);
		});		
	}
);