function loadpage(total_Pages,visible_pages,current_index,home,privous,next,last,current_path){
	$('#pagination').jqPaginator({
		totalPages: total_Pages,
		visiblePages: visible_pages,
		currentPage: current_index,
		first: '<li class="first"><a href="'+ home +'">首页</a></li>',//特别注意属性需要引号包含
        prev: '<li class="prev"><a href="'+ privous +'"><i class="arrow arrow2"></i><span>上一页</span></a></li>',
        next: '<li class="next"><a href="'+ next +'">下一页<i class="arrow arrow3"></i></a></li>',
        last: '<li class="last"><a href="'+ last +'">末页</a></li>',
        page: '<li class="page"><a href="'+ current_path +'">{{page}}</a></li>',
		onPageChange: function (num, type) {
			//alert("当前第" + num + "页");
		}
	});
}