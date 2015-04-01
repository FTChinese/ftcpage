/* jshint devel:true */
(function(){
	'use strict';
	var gallery = {
		'gClass': 'c-gallery-container', 
		'dot': 'c-gallery-dot',
		'current': 0,
		'gLength': 0,
		'rotate': {}
	};
	gallery.gLength = $('.' + gallery.gClass).length;
	function showGallery(num){
		$('.' + gallery.gClass).removeClass('on animated fadeIn');
		$('.' + gallery.gClass).eq(num).addClass('on animated fadeIn');
		$('.' + gallery.dot).removeClass('on');
		$('.' + gallery.dot).eq(num).addClass('on');
		gallery.current = num;
	}
	function nextGallery() {
		if (gallery.current === gallery.gLength -1 ) {
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