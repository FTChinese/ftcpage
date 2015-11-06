function trackAd(adAction, adLabel) {
	var adLoadTime;
	var adTimeSpent;
	if (typeof window.ga === 'function') {
		adLoadTime = new Date().getTime();
		adTimeSpent = adLoadTime - window.adStartTime;
		ga('send','event','Third Party Ad',adAction, adLabel, {'nonInteraction':1});
		ga('send', 'timing', 'Third Party Ad', adAction, adTimeSpent, adLabel);
		if (typeof window.startTime === 'number') {
			adLoadTime = new Date().getTime();
			adTimeSpent = adLoadTime - window.startTime;
			ga('send', 'timing', 'Third Party Ad', adAction + ' VS Page Start', adTimeSpent, adLabel);
		}
		try {
			console.log (adAction + ' ' + adLabel + ': ' + adTimeSpent);
		} catch (ignore) {
		}
	}
}

function checkAdLoad() {
	var el;
	var aTag;
    var videoTag;
    var iFrameTag;
    var imgTag;
	var divTag;
	var objTag;
	var tagLength;
	if (window.adUnitTrack === '5') {
		el = document.body;
	} else if (document.getElementById(window.adUnitIds[window.adUnitTrack])) {
		el = document.getElementById(window.adUnitIds[window.adUnitTrack]);
	}
	if (typeof el === 'object') {
		aTag = el.getElementsByTagName("a").length || 0;
    	videoTag = el.getElementsByTagName("video").length || 0;
    	iFrameTag = el.getElementsByTagName("iframe").length || 0;
    	imgTag = el.getElementsByTagName("img").length || 0;
    	divTag = el.getElementsByTagName("div").length || 0;
    	objTag = el.getElementsByTagName("object").length || 0;
    	tagLength = aTag + videoTag + iFrameTag + imgTag + divTag + objTag;
		if (tagLength > 0) {
			trackAd ('Loaded Something', window.adPositionTrack + ' ' + window.adIdTrack);
		} else {
			setTimeout(function(){
				checkAdLoad();
			},1000);
		}
	} else {
		trackAd ('ID ' + window.adUnitIds[window.adUnitTrack] + ' not found', window.adPositionTrack + ' ' + window.adIdTrack);
	}
	try {
		console.log ('check ad load!');
	} catch(ignore) {

	}
}