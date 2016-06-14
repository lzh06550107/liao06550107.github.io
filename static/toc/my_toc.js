function generateTOC(insertBefore, heading, options) {
  var container = $("<div id='tocBlock'></div>");
  var div1 = $("<ul id='toc'></ul>");
  <!--目录上的按钮-->
  var div2 = $("<div id='user_info_icon' class=""><a class='user_info_button' href='javascript:void(0)'><i class='fa fa-expand'></i></a></div>")
  var content = $(insertBefore).first();

  if (heading != undefined && heading != null) {
    container.append('<span class="tocHeading">' + heading + '</span>');
  }

  div.tableOfContents(content,options);
  container.append(div1);
  container.append(div2);
  container.insertBefore(insertBefore);
}

$(document).ready(function() {
    // Put a TOC right before the entry content.
    generateTOC('#post_list_conent_wrapper', 'Table of Contents', {
		startLevel: 2,
		depth: 3
	});
});