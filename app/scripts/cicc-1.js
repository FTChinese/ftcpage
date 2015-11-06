/* jshint devel:true */
(function(){
	'use strict';
	var gallery = {
		'gClass': 'c-gallery-container', 
		'dots': 'c-gallery-dots',
		'dot': 'c-gallery-dot',
		'current': 0,
		'gLength': 0,
		'rotate': {},
		'hover': false
	};
	gallery.gLength = $('.hide-on-mobile .' + gallery.gClass).length;
	function showGallery(num){
		var galleryWide = $('.hide-on-mobile .' + gallery.gClass);
		var galleryMobile = $('.mobile-only .' + gallery.gClass);
		var dotWide = $('.hide-on-mobile .' + gallery.dot);
		var dotMobile = $('.mobile-only .' + gallery.dot);
		$('.' + gallery.gClass).removeClass('on animated fadeIn');
		galleryWide.eq(num).addClass('on animated fadeIn');
		galleryMobile.eq(num).addClass('on animated fadeIn');
		$('.' + gallery.dot).removeClass('on');
		dotWide.eq(num).addClass('on');
		dotMobile.eq(num).addClass('on');
		gallery.current = num;
	}
	function nextGallery() {
		if (gallery.hover === false) {
			if (gallery.current === gallery.gLength -1 ) {
				gallery.current = 0;
			} else {
				gallery.current += 1;
			}
			showGallery(gallery.current);
		}
	}
	function initGallery() {
		$('.' + gallery.dots).each(function(){
			for (var i=0;i<gallery.gLength; i++) {
				$(this).append('<div class="c-gallery-dot" value=' + i + '>&#149;</div>');
			}
		});
		$('body').on('click', '.' + gallery.dot, function(){
			var i = $(this).attr('value') || 0;
			i = parseInt(i, 10);
			showGallery(i);
		});
		$('.' + gallery.gClass).hover(
			function(){
				gallery.hover = true;
			},
			function(){
				gallery.hover = false;
			}
		);
	}


	function GetCookie(name){
	    var start = document.cookie.indexOf(name+"="),
	        len = start+name.length+1,
			end = document.cookie.indexOf(";",len);
	    if ((!start) && (name !== document.cookie.substring(0,name.length))) {return null;}
	    if (start === -1) {return null;}
	    if (end === -1) {end = document.cookie.length; }
	    return decodeURIComponent(document.cookie.substring(len,end));
	}

	function SetCookie (name, value , sec , path , domain) {  
	    var argv = SetCookie.arguments,
	        argc = SetCookie.arguments.length,
	        expires = new Date(),
	        secure = (argc > 5) ? argv[5] : false;
	    path = (argc > 3) ? argv[3] : null;
	    domain = (argc > 4) ? argv[4] : null;
	   if(sec === null || sec === "") {sec = 600 * (24 * 60 * 60 * 1000);}
		else {sec = 1000*sec;}
	    expires.setTime (expires.getTime() + sec);
	    document.cookie = name + "=" + escape (value) +((expires === null) ? "" : ("; expires=" + expires.toGMTString())) +((path === null) ? "/" : ("; path=" + path)) +((domain === null) ? "" : ("; domain=" + domain)) +((secure === true) ? "; secure" : "");  
	}

	function DeleteCookie (name) {  
	    var exp = new Date(),cval = GetCookie (name);
	    exp.setTime (exp.getTime() - 1);
	    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
	}

	function checkUser() {
	    var user_name=GetCookie ("USER_NAME");
		if (user_name !== null) {
			$('#log-in').remove();
			$('#log-out').show();
		} else {
			$('#log-out').remove();
		}
	}
	checkUser();
	initGallery();
	showGallery(0);
	gallery.rotate = setInterval (function(){
		nextGallery();
	}, 8000);


})();