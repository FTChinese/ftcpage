/* jshint devel:true */
(function(){
	'use strict';
	var gallery = {
		'class': 'c-gallery-container', 
		'dot': 'c-gallery-dot',
		'current': 0,
		'length': 0,
		'rotate': {}
	};
	gallery.length = $('.' + gallery.class).length;
	function showGallery(num){
		$('.' + gallery.class).removeClass('on animated fadeIn');
		$('.' + gallery.class).eq(num).addClass('on animated fadeIn');
		$('.' + gallery.dot).removeClass('on');
		$('.' + gallery.dot).eq(num).addClass('on');
		gallery.current = num;
	}
	function nextGallery() {
		if (gallery.current === gallery.length -1 ) {
			gallery.current = 0;
		} else {
			gallery.current += 1;
		}
		showGallery(gallery.current);
	}
	showGallery(0);
	gallery.rotate = setInterval (function(){
		nextGallery();
	}, 8000);
})();