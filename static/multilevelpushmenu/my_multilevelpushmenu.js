/*响应式菜单布局*/
$(document).ready(function(){
     $('#menu').multilevelpushmenu({
		 containersToPush: [$( '#rightside' )],
		 menuWidth: '15%',
		 menuHeight: '100%',
		 
		 onItemClick: function() {
			// First argument is original event object
			var event = arguments[0],
				// Second argument is menu level object containing clicked item (<div> element)
				$menuLevelHolder = arguments[1],
				// Third argument is clicked item (<li> element)
				$item = arguments[2],
				// Fourth argument is instance settings/options object
				options = arguments[3];

			// You can do some cool stuff here before
			// redirecting to href location
			// like logging the event or even
			// adding some parameters to href, etc...

			// Anchor href
			var itemHref = $item.find( 'a:first' ).attr( 'href' );
			// Redirecting the page
			location.href = itemHref;
		}
	 });
});
$(window).resize(function () {
	$( '#menu' ).multilevelpushmenu( 'redraw' );
});