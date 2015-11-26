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

function checkAd(adOptions, adDomContainer) {
  var img;
  var passDomCheck = false;
  var adDomImgs = 0;
  var adDomObjects = 0;
  var adDomIFrames = 0;
  var adDomVideos = 0;
  var adName = '';
  if (adOptions.checking === true) {
    adName = adOptions.adClient + ' ' + adOptions.adWidth + 'x' + adOptions.adHeight + ' ' + adOptions.adNote;
    if (adOptions.checkingTime === 0) {
      trackAd('Impression Track Start', adName);
    }
    //Dom Check
    if (adDomContainer === null) {
      passDomCheck = false;
      //console.log ('no dom yet');
    } else if (adOptions.checkDom === true) {
      adDomImgs = adDomContainer.getElementsByTagName('img').length;
      adDomObjects = adDomContainer.getElementsByTagName('object').length;
      adDomIFrames = adDomContainer.getElementsByTagName('iframe').length;
      adDomVideos = adDomContainer.getElementsByTagName('video').length;
      if (adDomImgs > 0 || adDomIFrames > 0 || adDomObjects > 0 || adDomVideos > 0) {
        passDomCheck = true;
      } else {
        passDomCheck = false;
      }
    } else {
      passDomCheck = true;
    }
    if (passDomCheck === true) {
      adOptions.checking = false;
      trackAd('Impression Track Success', adName);
    } else if (adOptions.checkingTime < adOptions.checkingTimeMax) {
      //else if we still have time to check
      //check again in 1 second
      adOptions.checkingTime += 1;
      setTimeout(function(){
        checkAd(adOptions, adDomContainer);
      }, 1000);
    } else {
      //else if time runs out
      //tell Google Analytics ad has failed to load
      //load the fallback image
      trackAd('Impression Track Fail Main', adName);
      if (adOptions.fallBackImg !== undefined && adOptions.fallBackImg !== '') {
        img = new Image();
        img.src = adOptions.fallBackImg; 
        img.onload = function() {
          //fallback image is loaded successfully
          //tell Google Analytics that ad has loaded through the fallback
          adDomContainer.style.backgroundImage = 'url('+ img.src +')';
          trackAd('Impression Track Success', adName);
          trackAd('Impression Track Fallback Image', adName);
        };
        img.onerror = function() {
          //fallback image is not loaded successfully
          //tell Google Analytics that fallback image has also failed
          trackAd('Impression Track Fail Fallback', adName);
        };
      }
    }
  }
}