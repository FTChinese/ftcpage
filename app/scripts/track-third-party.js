function adReachability() {
  var thirdPartyVendors = {
    'dcR': '_dc',
    'mmR': '_mm',
    'szR': '_sz',
    'amR': '_am'
  };
  var adParameter = '';
  var adReachabilityStatus;
  for (var k in thirdPartyVendors) {
      if (thirdPartyVendors.hasOwnProperty(k)) {
         //user[k] = data[k];
         //console.log (k + ': ' + thirdPartyVendors[k]);
         adReachabilityStatus = GetCookie(k);
         if (adReachabilityStatus === 'reachable') {
          adParameter += '&' + thirdPartyVendors[k] + '=1';
         } else if (adReachabilityStatus === null) {
          adParameter += '&' + thirdPartyVendors[k] + '=2';
         }
      }
  }
//  console.log (adParameter);
  return adParameter;
}

function trackAd(adAction, adLabel, reachabilityStatus) {
  var adLoadTime;
  var adTimeSpent;
  if (typeof window.ga === 'function') {
    adLoadTime = new Date().getTime();
    adTimeSpent = adLoadTime - window.adStartTime;
    ga('send','event','Third Party Ad', adAction + ' - all', adLabel, {'nonInteraction':1});
    ga('send', 'timing', 'Third Party Ad', adAction, adTimeSpent, adLabel);
    // console.log (reachabilityStatus);
    if (reachabilityStatus !== undefined && reachabilityStatus !== '') {
      ga('send','event','Third Party Ad', adAction + ' - ' + reachabilityStatus, adLabel, {'nonInteraction':1});
    }
    if (typeof window.startTime === 'number') {
      adLoadTime = new Date().getTime();
      adTimeSpent = adLoadTime - window.startTime;
      ga('send', 'timing', 'Third Party Ad', adAction + ' VS Page Start', adTimeSpent, adLabel);
    }
    try {
      console.log (adAction + ' - ' + reachabilityStatus + ' ' + adLabel + ': ' + adTimeSpent);
    } catch (ignore) {
    }
  }
}

function checkAd(adOptions, adDomContainer) {
  // to be on the safe side
  // use setTimeout so that the third party script will be 
  // captured in the innerHTML in all browsers
  var img;
  var passDomCheck = false;
  var adDomImgs = 0;
  var adDomObjects = 0;
  var adDomIFrames = 0;
  var adDomVideos = 0;
  var adName = '';
  var fallbackImgContainer = adDomContainer.getElementsByTagName('div')[0];
  var thirdPartyVendor = '';
  var reachabilityStatus = ''; // reachable, unreachable, unknown
  var cookieSeconds = 60 * 30;
  var expression;
  var regex;

  if (adOptions.checking === true) {
    adName = adOptions.adClient + ' ' + adOptions.adWidth + 'x' + adOptions.adHeight + ' ' + adOptions.adNote;
    if (adOptions.thirdPartyVendor !== undefined) {
      thirdPartyVendor = adOptions.thirdPartyVendor;
    } else if (/doubleclick|adsafeprotected\.com\/.*\/dc\//i.test(adOptions.fallBackImg)) {
      thirdPartyVendor = 'dcR';
    }
    if (adOptions.checkingTime === 0) {
      if (thirdPartyVendor !== '') {
        // Check reachability status
        reachabilityStatus = GetCookie (thirdPartyVendor) || 'unknown';
        adOptions.reachabilityStatus = reachabilityStatus;
        //adOptions.thirdPartyVendor = thirdPartyVendor;
      }
      trackAd('Impression Track Start', adName, reachabilityStatus);
      //SetCookie(thirdPartyVendor, 'unknown', cookieSeconds, '/');
    } else {
      if (adOptions.reachabilityStatus !== undefined ) {
        reachabilityStatus = adOptions.reachabilityStatus;
      //console.log (reachabilityStatus);
      }
      if (adOptions.thirdPartyVendor !== undefined) {
        thirdPartyVendor = adOptions.thirdPartyVendor;
      }
    }
    //console.log (thirdPartyVendor);
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
      trackAd('Impression Track Success', adName, reachabilityStatus);
      SetCookie(thirdPartyVendor, 'reachable', cookieSeconds, '/');
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
      trackAd('Impression Track Fail Main', adName, reachabilityStatus);
      SetCookie(thirdPartyVendor, 'unreachable', cookieSeconds, '/');
      if (adOptions.fallBackImg !== undefined && adOptions.fallBackImg !== '') {
      expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
      regex = new RegExp(expression);
        if (adOptions.fallBackImg.match(regex)) {
          img = new Image();
          img.src = adOptions.fallBackImg; 
          img.onload = function() {
            //fallback image is loaded successfully
            //tell Google Analytics that ad has loaded through the fallback
            //adDomContainer.style.backgroundImage = 'url('+ img.src +')';
            fallbackImgContainer.innerHTML = '<img src="' + img.src + '">';
            trackAd('Impression Track Success', adName, reachabilityStatus);
            trackAd('Impression Track Fallback Image', adName, reachabilityStatus);
          };
          img.onerror = function() {
            //fallback image is not loaded successfully
            //tell Google Analytics that fallback image has also failed
            trackAd('Impression Track Fail Fallback', adName, reachabilityStatus);
          };
        } else {
          trackAd('Impression Track Fail Fallback Invalid', adName, reachabilityStatus);
          ga('send','event','FallBack Image Error', adName, adOptions.fallBackImg, {'nonInteraction':1});
        }
      }
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


//dolphin datong
function dolDaTong(pID,cID,buttonNodeID,leaderboardNodeID,containerID){
    var adCode = '<scr'+'ipt type="text/javascript" src="http://dolphin.ftimg.net/s?z=ft&c='+cID+pID+slotStr+adReachability()+'" charset="gbk" ></scr'+'ipt>';
    if (document.getElementById('top728x90') && (window.topbutton === 'hide' || $('#top728x90 > div').width()>800 || $('#top728x90 iframe').width()>800 || $('#top728x90 object').width()>800 || $('#top728x90 img').width()>800)) {
        document.getElementById(buttonNodeID).style.display="none";
        document.getElementById(leaderboardNodeID).style.width="969px";
        document.getElementById(leaderboardNodeID).style.float="none";
        document.getElementById(leaderboardNodeID).style.backgroundColor="transparent";
        document.getElementById(containerID).style.width="969px";
    }else{
        document.write(adCode);
    }
}


/****dolphin广告****/
//参数依次为
//位置ID
//频道ID
//DOM节点ID(script选填，script方式不需要NodeID，采用document.write)
//iframe宽高（选填，不传这两个参数将添加script广告）
function dolphinAD(pID,cID,NodeID,w,h){
    var adCode;
    if(!pID){
        return "positionID missing";
    }
    if(!cID){
        return "channelID missing";
    }
    if(w&&h){//iframe方式
        if(!w){
            return "width missing";
        }
        if(!h){
            return "height missing";
        }
        //adCode = '<iframe width="'+w+'" height="'+h+'" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" src="http://dolphin.ftimg.net/s?z=ft&c='+cID+pID+slotStr+'&op=1" ></iframe>';
        adCode = '<iframe width="'+w+'" height="'+h+'" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" src="/m/marketing/ad.html#adid=' + cID + pID + slotStr + '" ></iframe>';
        if (document.getElementById(NodeID)){
            document.getElementById(NodeID).innerHTML=adCode;
            return adCode;
        }
        return "node missing";
    }
    //script 方式
    try {
        adCode = '<scr'+'ipt type="text/javascript" src="http://dolphin.ftimg.net/s?z=ft&c='+cID+pID+slotStr+adReachability()+'" charset="gbk" ></scr'+'ipt>';
        document.write(adCode);
    } catch (err) {
        var k=err.toString();
        ga('send','event', 'CatchError', 'AD', pId + '' + cID + ':' + k, {'nonInteraction':1});
    }
    return adCode;
}

function setDolphinSlot(key){
  //定义slot随机数实现联动互斥功能
  var rString = window.dolRand?"&slot="+window.dolRand:"",
      cString = GetCookie(key),
      x;
  if(!cString){return rString;}
  window.cArray = cString.split(";");
  for(x in window.cArray){
      if (window.cArray.hasOwnProperty(x)) {
          window.cArray[x]=window.cArray[x].replace("|","=");
          rString += "&_"+window.cArray[x];
      }
  }
  return rString;
}

