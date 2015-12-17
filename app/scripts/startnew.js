var adTrack=0;
function trackerNew() {
    var l=window.location.href,
        keyTag, 
        vsource, 
        vtype,
        ccode="",
        usource, 
        umedium,
        pagetype="",
        trackerpage, 
        pagePara, 
        ftcteam1,
        i,
        keyTagArray,
        username=GetCookie("USER_NAME") || "",
        userId = GetCookie("USER_ID") || "",
        ccodeCookie=GetCookie("ccode") || "";
    ccode=paravalue(l,"ccode");
    if (l.indexOf("isappinstalled")>0  && l.indexOf("code")<0) {
        vsource="marketing";
        ccode="2G158002";
    } else if (l.indexOf("#s=d")>0) {
        vsource="DailyEmail";
        ccode="1D110215";
    } else if (l.indexOf("#s=n")>0) {
        vsource="DailyEmail";
        ccode="1D130201";
    } else if (l.indexOf("#s=o")>0) {
        vsource="DailyEmail";
        ccode="1D130202";
    } else if (l.indexOf("#s=p")>0) {
        vsource="PMEmail";
        ccode="1P110215";
    } else if (l.indexOf("#s=w")>0) {
        vsource="WeeklyEmail";
        ccode="1W110215";
    } else if (l.indexOf("?wt")>0) {
        vsource="Marketing";
        ccode="WeChatNewsQuiz";
    } else if (ccode==="1D110215") {
        vsource="DailyEmail";
    } else if (ccode==="1P110215") {
        vsource="PMEmail";
    } else if (ccode==="1W110215") {
        vsource="WeeklyEmail";
    } else if (ccode==="1R110215") {
        vsource="RSS";
    } else if (ccode==="1Z120420") {
        vsource="Zacker";
    } else if (l.indexOf("utm_campaign")>=0) {
        ccode=paravalue(l,"utm_campaign");
        vsource=paravalue(l,"utm_source");
    } else if (ccode==="") {
        ccode=GetCookie("ccode") || "";
        vsource="Other";
    }else {
        vsource="Other";
    }
    try{
        if (ccode!=="" && ccode!==ccodeCookie) {
            SetCookie("ccode",ccode,86400*100,"/",".ftchinese.com");
            SetCookie("ccode",ccode,86400*100,"/");
        }
    } catch (ignore) {
    
    }
    usource="marketing";
    umedium="campaign";
    if (vsource.indexOf("Email")>=0) {
        usource="EmailNewsletter";
        umedium="referral";
    } else if (vsource.indexOf("RSS")>=0) {
        usource="RSS";
        umedium="referral";
    } else if (vsource.indexOf("Zacker")>=0) {
        usource="Zacker";
        umedium="referral";
    } 
    try{
        ga('set', 'AllowAnchor', true);
        if (ccode!=="" && l.indexOf("utm_campaign")<0) {
            ga('set', 'campaignName', ccode);
            ga('set', 'campaignSource', usource);
            ga('set', 'campaignMedium', umedium);
            l=window.location.href;
        }
    }catch(ignore){
    
    }

    if (window.FTAdchID !== undefined && window.FTAdchID !== null && window.FTAdchID !== "") {
        ga('set', 'dimension1', window.FTAdchID);
    }

    if (username === "") {vtype="visitor";} else {vtype="member";}
    if (userId !== "") {ga('set', 'dimension14', userId);}

    ga('set', 'dimension2', vtype);
    ga('set', 'dimension13', vsource);

    try {
        keyTag=$('meta[name=keywords]').attr("content") || "";
        keyTag=keyTag.replace(/白底/g,"").replace(/靠右/g,"").replace(/单页/g,"").replace(/插图/g,"").replace(/透明/g,"").replace(/高清/g,"").replace(/置顶/g,"").replace(/沉底/g,"").replace(/资料/g,"").replace(/突发/g,"").replace(/,+/g,",");
    } catch(ignore){    
    }
    pagetype="";
    ftcteam1="";
    if (l.indexOf("story")>=0) {
        pagetype="Story";
    } else if (l.indexOf("interactive")>=0){
        pagetype="Interactive";
        ftcteam1="product";
    } else if (l.indexOf("photo")>=0){
        pagetype="Photo";
        ftcteam1="product";
    } else if (l.indexOf("video")>=0){
        pagetype="Video";
        ftcteam1="video";
    } else if (l.indexOf("search")>=0){
        pagetype="Search";
    } else if (l.indexOf("channel")>=0){
        pagetype="Channel";
    } else if (l.indexOf("comment")>=0){
        pagetype="coment";
    } else if (l.indexOf("column")>=0){
        pagetype="Column";
    } else if (l.indexOf("tag")>=0){
        pagetype="Tag";
    } else if (l.indexOf("topic")>=0){
        pagetype="Topic";
    } else if (l==="/" || l==="/?refresh=" || l.indexOf("index.php")>=0){
        pagetype="Home";
    } else {
        pagetype="Other";
    }
    ga('set', 'dimension4', pagetype);

    if (window.ftcteam === undefined || window.ftcteam === null || window.ftcteam === "") {
        if (ftcteam1!==""){
            ga('set', 'dimension5', ftcteam1);
        }
    } else {
        ga('set', 'dimension5', window.ftcteam);
    }
    if (window.gauthor !== undefined && window.gauthor !== null && window.gauthor !== "") {
        ga('set', 'dimension6', window.gauthor);
    }
    if (window.storyGenre !== undefined && window.storyGenre !== null && window.storyGenre !== "") {
        ga('set', 'dimension8', window.storyGenre);
    }
    if (window.storyArea !== undefined && window.storyArea !== null && window.storyArea !== "") {
        ga('set', 'dimension9', window.storyArea);
    }
    if (window.storyIndustry !== undefined && window.storyIndustry !== null && window.storyIndustry !== "") {
        ga('set', 'dimension10', window.storyIndustry);
    }
    if (window.mainTopic !== undefined && window.mainTopic !== null && window.mainTopic !== "") {
        ga('set', 'dimension11', window.mainTopic);
    }
    if (window.subTopic !== undefined && window.subTopic !== null && window.subTopic !== "") {
        ga('set', 'dimension12', window.subTopic);
    }
	
    
    if (window.bpage !== undefined && window.bpage !== 0 && window.bpage !== null) {
        trackerpage=l;
        if (window.virtualPage !== undefined){
            trackerpage=window.virtualPage;
        } else {
            trackerpage=trackerpage.replace(/^.*\/story/g,"story");
        }
        if (window.metaInfo !== undefined){
            trackerpage=trackerpage + "?" + window.metaInfo;
        }
        trackerpage="/barrier/"+window.bpage+"/"+trackerpage;
        ga('send', 'pageview', trackerpage);
    } else if (window.virtualPage !== undefined){
        pagePara=l;
        pagePara=pagePara.replace(/^.*\/(story|video|interactive)\/[0-9]+/g,"").replace(/^.*\.com[\/]*/g,"").replace(/search\/.*$/g,"");
        if (window.metaInfo !== undefined){            
            if (/\?.*\#/i.test(pagePara)) {
                pagePara=pagePara.replace(/#/g,"&" + window.metaInfo +"#");
            } else if (pagePara.indexOf("?") >=0){
                pagePara=pagePara + "&" + window.metaInfo;
            } else if (pagePara.indexOf("#") >=0) {
                pagePara=pagePara.replace(/#/g,"?" + window.metaInfo +"#");
            }else {
                pagePara=pagePara + "?" + window.metaInfo;
            }
        } else {
            if (/\?/i.test(pagePara)) {
                pagePara=pagePara.replace(/\?/g,"&");
            }
        }
        if (window.gAutoStart === undefined) {ga('send', 'pageview', window.virtualPage+pagePara);}
    } else {
        if (window.gAutoStart === undefined) {ga('send', 'pageview');}
    }
    if (typeof window.FTStoryid === "string") {
        keyTagArray=keyTag.split(',');
        for (i = 0; i < keyTagArray.length; i++) {
            ga('send','event','Story Tag',keyTagArray[i],'',{'nonInteraction':1});
        }
    }
}

function bindClickEvent(containerID,eventCategory,eventAction,eventLabel) {
    $(containerID).each(function(index){
        var n=index+1;
        $(this).find('a').unbind().bind("click",function(){
            if ($(this).attr("href") && !/story|video|interactive|photonews/i.test($(this).attr("href"))){
                ga('send','event',eventCategory, eventAction, eventLabel+":"+$(this).attr("href"));
            } else {
                ga('send','event',eventCategory, eventAction, eventLabel+" "+n);
            }
        });
    });
}

function trackposition() {
var trackSource="Home";
if (window.cleanHeader !== undefined) {
    trackSource="HomeClean";
} else if (location.href.indexOf("story")>=0) {
    trackSource="Channel";
} else if (location.href.indexOf("interactive")>=0) {
    trackSource="Interactive";
} else if (location.href.indexOf("channel")>=0){
    trackSource="Channel";
} else if (location.href.indexOf("tag")>=0) {
    trackSource="Tag";
} else if (location.href.indexOf("topic")>=0) {
    trackSource="Topic";
} else if (location.href.indexOf("photo")>=0) {
    trackSource="Photo";
} else if (location.href.indexOf("video")>=0) {
    trackSource="Video";
}
bindClickEvent("#skylines div",trackSource,"Click","Skyline");
bindClickEvent("#navigation",trackSource,"Click","Navigation");
$("#coverstory a,#ecover a").unbind().bind("click",function(){ga('send','event',trackSource, 'Click', 'Cover');});
bindClickEvent("#highlights div",trackSource,"Click","VideoInteractive");
bindClickEvent("#column1 h3",trackSource,"Click","News");
bindClickEvent("#column2 h3",trackSource,"Click","Feature");
bindClickEvent("#regulars div",trackSource,"Click","Columnist");
bindClickEvent("#specials div",trackSource,"Click","Special Report");
bindClickEvent("#mostpopulars ul li",trackSource,"Click","Most Popular");
bindClickEvent("#mostcomments ul li",trackSource,"Click","Most Commented");
bindClickEvent(".column3 h3,.column4 h3,.column3 li,.column4 li",trackSource,"Click","More Content");
bindClickEvent(".letter ul li",trackSource,"Click","Letters");
$(".sns a").unbind().bind("click",function(){ga('send','event',trackSource, 'Share', $(this).html());});
bindClickEvent("#coverstory .story-packages li,#ecover .story-packages li",trackSource,"Click","Cover Package");
bindClickEvent("#column1 .story-packages li",trackSource,"Click","News Package");
bindClickEvent("#column2 .story-packages li",trackSource,"Click","Feature Package");
$("#archive a").unbind().bind("click",function(){ga('send','event',trackSource, 'Click', 'Archive');});
}

function trackAdClick() {
    if (adTrack===0) {
        $("body").on("click","a[href]",function(){
            var targetAdCh="", 
                adid, 
                adUnitContainer = '#top728x90,#top235x90,#right300x250,#right300x250-2,#mpu3,.ad-unit-container',
                urlLink = $(this).attr("href"),
                getLocation = function(href) {
                    var l = document.createElement("a");
                    l.href = href;
                    return l;
                },
                urlHost = getLocation(urlLink).hostname || "";
                if (urlHost === "" && /^http/i.test(urlLink)) {
                    urlHost = urlLink.replace(/https?:\/\//g,"").replace(/\/.*$/g,"");
                }
            if (window.FTAdchID !== undefined) {
                targetAdCh = window.FTAdchID;
            }
            if ($(this).parents(adUnitContainer).length) {//if clicking an ad
                ga('send', 'event', 'AdClick', $(this).parents(adUnitContainer).attr("id"), targetAdCh);
                if (typeof fa === 'function') {
                    adid = $(this).parents(adUnitContainer).find('input.ad_cell_id').val() || '';
                    fa('send', 'event', 'AD_CLICK', adid, $(this).attr("id"));
                }
            // outbound link: assume all ftchinese.com and ftmailbox.com sites 
            // are already tracked on GA and we don't need to track relative links
            } else if (!/ftchinese|ftmailbox/i.test(urlHost) && urlHost !== window.location.hostname && urlHost !== "" && /^http/i.test(urlLink)){
                ga('send','event','Outbound Link', 'click link', $(this).attr("href") + "[" + window.location.href + ":"+ $(this).html() +"]");
                if (typeof fa === 'function') {
                    fa('send','event','Outbound Link', 'Click', urlLink);
                }
            } else if (/\.pdf/i.test(urlLink)) {
                ga('send','event','Download PDF', window.location.href, $(this).attr("href") + "[" + $(this).html() + "]");
                if (typeof fa === 'function') {
                    fa('send','event','Download PDF', window.location.href, $(this).attr("href") + "[" + $(this).html() + "]");
                }
            }
        });
        $('body').on('click','[event-category]', function() {
            var eventCategory = $(this).attr('event-category') || '';
            var eventAction = $(this).attr('event-action') || '';
            var eventLabel = $(this).attr('event-label') || '';
            if (eventCategory !== '' && eventAction !== '' && eventLabel !== '') {
                ga('send', 'event', eventCategory, eventAction, eventLabel);
                if (typeof fa === 'function') {
                    fa('send', 'event', eventCategory, eventAction, eventLabel);
                }
            }
        });
        adTrack=1;
        /*
        try {
            console.log ("亲爱的前端开发者，FT中文网正在找你。复制这个网址，来看看我们的工作机会吧：http://www.ftchinese.com/jobshow/ft_20140218175933");
        }catch(ignore) {
        
        }
        */
    }
}

function insertAds(targetId, sourceId) {
    var adCode = document.getElementById(sourceId).innerHTML;
    adCode = adCode.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,'');
    document.getElementById(targetId).innerHTML = adCode;
    document.getElementById(sourceId).innerHTML = '';
}

// FTC
function ad_cell_callback(id) {
    document.write('<input type="hidden" class="ad_cell_id" value="' + id + '" />');
    if (typeof fa === 'function') {
        fa('send', 'event', 'AD_SHOW', id);
    }
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

function displayslide (theslides,cs,i,j,tagtype, onepage) {
    var k,ccc,currentslide,slidesnumber = document.getElementById(theslides).getElementsByTagName(tagtype).length;

    if (slidesnumber < 1) {
        return false;
    }

    if (onepage===null) {
        onepage=1;
    }


    for (k=0;k<slidesnumber; k++) {
        document.getElementById(theslides).getElementsByTagName(tagtype)[k].style.display="none";
    }
    ccc=cs;
    ccc=cs * onepage;
    for (k=0;k<onepage; k++) {
        ccc = ccc % slidesnumber;

        if (document.getElementById(theslides).getElementsByTagName(tagtype)[ccc].getElementsByTagName("img")[0] && document.getElementById(theslides).getElementsByTagName(tagtype)[ccc].getElementsByTagName("img")[0].getAttribute('src1')) 
		{
            document.getElementById(theslides).getElementsByTagName(tagtype)[ccc].getElementsByTagName("img")[0].setAttribute('src',document.getElementById(theslides).getElementsByTagName(tagtype)[ccc].getElementsByTagName("img")[0].getAttribute('src1'));
            document.getElementById(theslides).getElementsByTagName(tagtype)[ccc].getElementsByTagName("img")[0].removeAttribute('src1');
        }

        document.getElementById(theslides).getElementsByTagName(tagtype)[ccc].style.display="";
        ccc = ccc + 1;
    }

    currentslide=cs;
    slidesnumber = Math.ceil(slidesnumber/onepage);
    currentslide = currentslide%slidesnumber +1;
    currentslide = Math.ceil(currentslide);
    document.getElementById(i).innerHTML=currentslide;
    document.getElementById(j).innerHTML=slidesnumber;
}



function prevnext(theslides,m,i,j,tagtype, onepage) {
    var currentslide = document.getElementById(i).innerHTML-1,
        slidesnumber = document.getElementById(j).innerHTML;
	
    if (m===0) {
        currentslide --;
    } else {
        currentslide ++;
    }

    if (currentslide===-1) {
        currentslide = slidesnumber -1;
    }

    if (currentslide===slidesnumber) {
        currentslide = 0;
    }

    displayslide (theslides,currentslide,i,j,tagtype, onepage);

}


function logout() {
    DeleteCookie ("USER_NAME");
    window.location.href += "?logout=y";
}

function openlogin() {
    document.getElementById("ft-login-swizzy-popup").style.display="block";
}

function closelogin() {
    document.getElementById("ft-login-swizzy-popup").style.display="none";
}

function wtd(thesymbol,chinese,evenodd) {
    var
	evenoddclass="",
	trstart="",
	trend="",
	thesymbol1=thesymbol.substring(1,20).replace(/\-mh\-/g,":").replace(/\-dot\-/g,".").replace(/\-at\-/g,"@"),
		thesymbol2="p" + thesymbol;
    if (evenodd===1) {
        evenoddclass=" secondaryColumn";
        trend="</tr>";
    } else {
        trstart="<tr>";
    }
    document.write (trstart + '<td class="text' + evenoddclass + '"><a target="_blank"  href="http://markets.ft.com/tearsheets/performance.asp?s=' + thesymbol1 + '">' + chinese + '</a></td><td class="last' + evenoddclass + '"><span class="dataValue" id=' + thesymbol + '>...</span></td><td class="pctChange' + evenoddclass + '"><span class="dataValue" id=' + thesymbol2 + '>...</span></td>' + trend);
}


function tabFix() {
    document.getElementById("tabstock").className="";
    document.getElementById("tabforex").className="";
    document.getElementById("tabcommodity").className="";
    document.getElementById("tabbond").className="";
}

function tabFix2() {
    document.getElementById("tabday").className="";
    document.getElementById("tabweek").className="";
    document.getElementById("tabmonth").className="";
    document.getElementById("tabcomment").className="";
}

function searchbox() {
    document.getElementById('type_quotes').onclick=function() 
	{
        if (this.checked===true) {
            document.getElementById('searchtxt').value="yyyy-mm-dd";
            document.getElementById('searchtxt').style.color="#666";
        }
    } ;
	document.getElementById('searchtxt').onclick=function() 
	{
        if (this.value==="yyyy-mm-dd" || this.value===textad) {
            this.value="";
        }
        this.style.color="#000";
    };

    document.getElementById('searchForm').onsubmit=function() {
        if (document.getElementById('searchtxt').value===textad && textadurl!=="") {
            document.getElementById('redirecturl').value=textadurl;
        } else {
            document.getElementById('redirecturl').value="";
        }
    };
}

function theuser() {
    var user_name=GetCookie ("USER_NAME"),
			logged_in_el = document.getElementById("logged-in");

    if (user_name !== null) {
		logged_out_el = document.getElementById("logged-out");
        if (logged_in_el) 
		{logged_in_el.style.display="";}
        if (logged_out_el) 
		{logged_out_el.style.display="none";}
        document.getElementById("ft-login-user").innerHTML=user_name + document.getElementById("ft-login-user").innerHTML;
    }

    if (document.getElementById("memberbox")) {
        displayslide ('memberinfos',0,'thismemberinfo','allmemberinfos', 'a', 3);
        setInterval ( function() {
            prevnext('memberinfos',1,'thismemberinfo','allmemberinfos', 'a', 3);
        }, 6000);
    } else {
        if (document.getElementById("searchtxt")) 
		{document.getElementById("searchtxt").style.width="185px";}
    }
}

function flexlinks() {
    if (document.getElementById("archive")) {
        document.getElementById("datetab").appendChild(document.getElementById("archive"));
    }
    if (document.getElementById("flexible-links")) {
        document.getElementById("flexible-links").getElementsByTagName("ul")[0].getElementsByTagName("li")[0].className="first-child";
    }
}

function offers() {
    displayslide ('offers',0,'thisoffer','alloffers', 'div', 3);
    displayslide ('regulars',0,'thisregular','allregulars', 'div', 3);
}

function liandongad() {
	var adsegment="",
			allyes_kv=GetCookie("ALLYES_KV");
	if(GetCookie("ALLYES_KV")){
		adsegment = "&kv=" + allyes_kv;
	}
    if (typeof mpu1==="string") {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|"+mpu1+"&db=ftchinese&border=0&local=yes&js=ie"+adsegment+"\'></SCR" + "IPT>");
    } else if (allyes==="undefined") {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|NP_Homepage|hp_MPU_1&db=ftchinese&border=0&local=yes&js=ie"+adsegment+"\'></SCR" + "IPT>");
    } else if (allyes==="cp") {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|NP_liandong|mpu_01&db=ftchinese&border=0&local=yes&js=ie"+adsegment+"\'></SCR" + "IPT>");
    } else if (allyes==="jl") {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|NP_liandong|mpu_01_1026&db=ftchinese&border=0&local=yes&js=ie"+adsegment+"\'></SCR" + "IPT>");
    } else if (allyes==="br") {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|NP_liandong|mpu_01_1101&db=ftchinese&border=0&local=yes&js=ie"+adsegment+"\'></SCR" + "IPT>");
    } else {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|NP_Homepage|hp_MPU_1&db=ftchinese&border=0&local=yes&js=ie"+adsegment+"\'></SCR" + "IPT>");
    }
}

function liandongad2() {
	var 	adsegment="",
			allyes_kv=GetCookie("ALLYES_KV");
	if(GetCookie("ALLYES_KV")){
		adsegment = "&kv=" + allyes_kv;
	}
    if (typeof mpu2==="string") {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|"+mpu2+"&db=ftchinese&border=0&local=yes&js=ie"+adsegment+"\'></SCR" + "IPT>");
    } else {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|NP_Homepage|hp_MPU_2&db=ftchinese&border=0&local=yes&js=ie"+adsegment+"\'></SCR" + "IPT>");
    }
}

function liandongad3() {
    if (typeof mpu3==="string") {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|"+mpu3+"&db=ftchinese&border=0&local=yes&js=ie\'></SCR" + "IPT>");
    } else {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|NP_Homepage|hp_MPU_3&db=ftchinese&border=0&local=yes&js=ie\'></SCR" + "IPT>");
    }
}

function liandongstory(){
	var adsegment="",
			allyes_kv=GetCookie("ALLYES_KV");
	if(GetCookie("ALLYES_KV")){
		adsegment = "&kv=" + allyes_kv;
	}
    if (typeof mpu1==="string") {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|"+mpu1+"&db=ftchinese&border=0&local=yes&js=ie"+adsegment+"\'></SCR" + "IPT>");
    } else if (allyes==="undefined") {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|" + FTAdch + "|MPU_1&db=ftchinese&border=0&local=yes&js=ie"+adsegment+"\'></SCR" + "IPT>");
    } else if (allyes.indexOf("cp")>=0) {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|NP_liandong|mpu_01&db=ftchinese&border=0&local=yes&js=ie"+adsegment+"\'></SCR" + "IPT>");
    } else if (allyes.indexOf("jl")>=0) {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|NP_liandong|mpu_01_1026&db=ftchinese&border=0&local=yes&js=ie"+adsegment+"\'></SCR" + "IPT>");
    } else {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|" + FTAdch + "|MPU_1&db=ftchinese&border=0&local=yes&js=ie"+adsegment+"\'></SCR" + "IPT>");
    }
}


function liandongstory2(){
	var adsegment="",
			allyes_kv=GetCookie("ALLYES_KV");
	if(GetCookie("ALLYES_KV")){ 
		adsegment = "&kv=" + allyes_kv;
	}
    if (typeof mpu2==="string") {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|"+mpu2+"&db=ftchinese&border=0&local=yes&js=ie"+adsegment+"\'></SCR" + "IPT>");
    } else {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|" + FTAdch + "|MPU_2&db=ftchinese&border=0&local=yes&js=ie"+adsegment+"\'></SCR" + "IPT>");
    }
}

function datong() {
    datongnew();
}


function datongnew() {
    if (typeof topbutton==="string" && topbutton!=="hide") {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|"+topbutton+"&db=ftchinese&border=0&local=yes&js=ie\'></SCR" + "IPT>");
    } else if ((typeof topbutton==="string" && topbutton==="hide") || (typeof allyes==="string" && allyes.indexOf("dt")>=0)) {
        document.getElementById("top235x90").style.display="none";
        document.getElementById("top728x90").style.width="969px";
        document.getElementById("top728x90").style.float="none";
        document.getElementById("top728x90").style.backgroundColor="transparent";
        document.getElementById("topad").style.width="969px";
    } else if (window.location.href.indexOf("story")>=0 || window.location.href.indexOf("video")>=0 || window.location.href.indexOf("channel")>=0 || window.location.href.indexOf("interactive")>=0) {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|"+FTAdch+"|Button&db=ftchinese&border=0&local=yes&js=ie\'></SCR" + "IPT>");
    }else if(window.location.href.indexOf(".com/tag/")>=0){
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|"+FTAdch+"|Section_Button&db=ftchinese&border=0&local=yes&js=ie\'></SCR" + "IPT>");
    }else {
        document.writeln("<SCR" + "IPT LANGUAGE=\'JavaScript\' SRC=\'http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|NP_Homepage|hp_button&db=ftchinese&border=0&local=yes&js=ie\'></SCR" + "IPT>");
    }
}

//dolphin datong
function dolDaTong(pID,cID,buttonNodeID,leaderboardNodeID,containerID){
    var adCode = '<scr'+'ipt type="text/javascript" src="http://dolphin.ftimg.net/s?z=ft&c='+cID+pID+slotStr+'" charset="gbk" ></scr'+'ipt>';
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

function tab1() {
    wtd("iSHI-mh-SHH","上证综指",0);
    wtd("iHSI-mh-HKG","香港恒生",1);
    wtd("iDJI-mh-DJI","道琼斯",0);
    wtd("iINX-mh-IOM","标普500",1);
    wtd("iCOMP-mh-NAS","纳斯达克",0);
    wtd("iIXTA-mh-TAI","台湾加权",1);
    wtd("in225-mh-NIK","日经225",0);
    wtd("iDAXX-mh-GER","DAX",1);
}

function tab2() {
    wtd("iUSDCNY","美元/人民币",0);
    wtd("iUSDJPY","美元/日元",1);
    wtd("iEURUSD","欧元/美元",0);
    wtd("iGBPUSD","英镑/美元",1);
    wtd("iUSDCHF","美元/瑞郎",0);
    wtd("iUSDHKD","美元/港元",1);
    wtd("iAUDUSD","澳元/美元",0);
    wtd("iUSDCAD","美元/加元",1);
}

function tab3() {
    wtd("iIB-dot-1-mh-IEU","布伦特原油",0);
    wtd("iCL-dot-1-mh-NYM","WTI原油",1);
    wtd("iUS-at-RB-dot-1-mh-NYM","RBOB汽油",0);
    wtd("iGC-dot-1-mh-CMX","黄金",1);
    wtd("iUS-at-SI-dot-1-mh-CMX","银",0);
    wtd("iUS-at-HG-dot-1-mh-CMX","铜",1);
    wtd("iSC1-mh-CBT","大豆",0);
    wtd("iWC1-mh-CBT","小麦",1);
}

function tab4() {
    wtd("iGOOG-mh-NSQ","谷歌(美)",0);
    wtd("iBIDU-mh-NSQ","百度(美)",1);
    wtd("i601857-mh-SHH","中国石油(A)",0);
    wtd("i600028-mh-SHH","中国石化(A)",1);
    wtd("i601398-mh-SHH","工商银行(A)",0);
    wtd("i601988-mh-SHH","中国银行(A)",1);
    wtd("i600050-mh-SHH","中国联通(A)",0);
    wtd("i941-mh-HKG","中国移动(H)",1);
//wtd("i601668-mh-SHH","中国建筑(A)",0);
//wtd("i601318-mh-SHH","中国平安(A)",1);
}

function tabmouse() {
    document.getElementById("tabstock").onmouseover=function () {
        tabFix();
        this.className="on1";
        displayslide ('dataslides',0,'thisslide','allslides', 'table', 1);
		if (updatetab1 !== "undefined") {updatetab1();}
    };

    document.getElementById("tabforex").onmouseover=function () {
        tabFix();
        this.className="on1";
        displayslide ('dataslides',1,'thisslide','allslides', 'table', 1);
		if (updatetab2 !== "undefined") {updatetab2();}
    };

    document.getElementById("tabcommodity").onmouseover=function () {
        tabFix();
        this.className="on1";
        displayslide ('dataslides',2,'thisslide','allslides', 'table', 1);
		if (updatetab3 !== "undefined") {updatetab3();}
    };

    document.getElementById("tabbond").onmouseover=function () {
        tabFix();
        this.className="on1";
        displayslide ('dataslides',3,'thisslide','allslides', 'table', 1);
		if (updatetab4 !== "undefined") {updatetab4();}
    };

    displayslide ('dataslides',0,'thisslide','allslides', 'table', 1);
}

function mptabmouse() {
    document.getElementById("tabday").onmouseover=function () {
        tabFix2();
        this.className="on1";
        displayslide ('mostpopulars',0,'thismostpopular','allmostpopulars', 'span', 1);
    };
    document.getElementById("tabweek").onmouseover=function () {
        tabFix2();
        this.className="on1";
        displayslide ('mostpopulars',1,'thismostpopular','allmostpopulars', 'span', 1);
    };
    document.getElementById("tabmonth").onmouseover=function () {
        tabFix2();
        this.className="on1";
        displayslide ('mostpopulars',2,'thismostpopular','allmostpopulars', 'span', 1);
    };
    document.getElementById("tabcomment").onmouseover=function () {
        tabFix2();
        this.className="on1";
        displayslide ('mostpopulars',3,'thismostpopular','allmostpopulars', 'span', 1);
    };

    displayslide ('mostpopulars',0,'thismostpopular','allmostpopulars', 'span', 1);
}


function paravalue(theurl, thep) {
var k,thev;
if (theurl.indexOf(thep + "=")>1) {
k=theurl.indexOf(thep) + thep.length + 1;
thev=theurl.substring(k,theurl.length);
thev=thev.replace(/[\&\#].*/g,"");
} else {
thev="";
}
return thev;
}


function adiframe(adchannel,adname,adwidth,adheight) {
    //var  adsegment="";
	/*
	if (GetCookie("rsi_segs") && GetCookie("rsi_segs").indexOf("11546")>=0) {
		adsegment="&kv=seg|11546";
	}
	*/
    //document.write ('<iframe marginheight=0 marginwidth=0 frameborder="0" width="' + adwidth + '" height="' + adheight + '" scrolling="no" src="http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|' + adchannel + '|' + adname + '&db=ftchinese&border=0&local=yes'+adsegment+'" allowTransparency="true"></iframe>');
}

function advalue(adchannel,adname,adwidth,adheight) {
    var
	adsegment="";
	
	if (GetCookie("rsi_segs") && GetCookie("rsi_segs").indexOf("11467")>=0) {
		adsegment="&kv=seg|11467";
	}
	
	if (typeof mpu3==="string" && mpu3==="hide") {
		    return '';
    } 
    if (typeof mpu3==="string" && mpu3.indexOf("mpu_03")>=0) {
    return '<iframe marginheight=0 marginwidth=0 frameborder="0" width="' + adwidth + '" height="' + adheight + '" scrolling="no" src="http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|' + mpu3 + '&db=ftchinese&border=0&local=yes" allowTransparency="true"></iframe>';
    }
    return '<iframe marginheight=0 marginwidth=0 frameborder="0" width="' + adwidth + '" height="' + adheight + '" scrolling="no" src="http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|' + adchannel + '|' + adname + '&db=ftchinese&border=0&local=yes'+adsegment+'" allowTransparency="true"></iframe>';
}

function adauto() {
    if (document.referrer.toLowerCase().indexOf("world")>0) {
        FTAdch = "NP_Global";
    } else if (GetCookie ("adchannel") && GetCookie ("adchannel") !== "" && document.referrer.toLowerCase().indexOf("channel")>0) {
        FTAdch = GetCookie ("adchannel");
        SetCookie ("adchannel", "",30,"/");
        DeleteCookie ("adchannel");
        DeleteCookie ("adchannel");
    } else if (FTAdch==="") {
        FTAdch="NP_Other_story_page";
    }
}

function useit(){
    document.getElementById("nick_name").disabled = false;
}
function useitr(){
    document.getElementById("nick_namer").disabled = false;
}
function unuseit(){
    document.getElementById("nick_name").disabled = true;
}
	
function unuseitr(){
    document.getElementById("nick_namer").disabled = true;
}

function talkclick(){
    document.getElementById("Talk").onclick = function() {
        if(this.value === this.defaultValue){
            this.value = '';
        }
    };

document.getElementById("Talk").onblur = function(){
    if(document.getElementById("Talk").value === ''){
        this.value = this.defaultValue;
    }
};
}

function checkPost() {
    if(document.getElementById("Talk").value === document.getElementById("Talk").defaultValue) {
        return false;
    }
    if (document.getElementById("shareprompt")) {
        document.getElementById("shareprompt").innerHTML="感谢您的参与,您的评论内容审核后就会立即显示出来。<br>等不及了吗？点击下面的图标，将您刚刚发表的评论内容立即分享给您的朋友";
    }
    else {
        alert('感谢您的参与，您的评论内容审核后就会立即显示出来。');
    }
    document.getElementById("storyForm").submit();
}


function commentlog() {
    var username=GetCookie("USER_NAME"),is_sync_weibo = GetCookie("bind_weibo");
    if(username!==''&&username!==null)
    {
        document.getElementById("logincomment").style.display='block';
    }
    else
    {
        document.getElementById("nologincomment").style.display='block';
    }
 
    if(is_sync_weibo === null || is_sync_weibo !== "yes") {
        document.getElementById("show_sync_weibo").innerHTML = "<a href='/index.php/snsapi/index' target='_blank' class=highlight>点此绑定您的微博，让您的朋友也能分享您在FT中文网发表的精彩评论。</a>";
    }
}

function printtext(i) {
  
    document.getElementById("printoption").style.display = "none";
    document.getElementById("print_content").style.fontSize = i + "px";
    window.print();
}
var bpage=0;
function viewhistory() {
    var username=GetCookie("USER_NAME"),
        unixday=Math.round(new Date().getTime()/1000),
        viewstart=GetCookie ("viewstart"),
        clearhistory=0,
        v,
        k,
        barrierversion,
        ie6,
        isIE;
    if (typeof storyid==="string" && storyid!=="" && (username===''||username===null) && (location.href.match(/\/story\/[0-9]{9}$/g)!==null||location.href.indexOf("barrierversion")>0)) {
        
        if (viewstart===null || viewstart==="") {
            viewstart=unixday;
            SetCookie("viewstart",unixday,86400*100,"/");
        } else if (unixday-viewstart>=30*86400) {
            DeleteCookie ("viewstart");
            DeleteCookie ("viewhistory");
            SetCookie("viewstart",unixday,86400*100,"/");
            clearhistory=1;
        }

        v=GetCookie ("viewhistory");
        if (v===null || clearhistory===1) {
            v="";
        }
        v=v.replace(storyid,"").replace(/[\|]+/g,"|");
        v=v+"|"+storyid;
        v=v.replace(/^\|+/g,"").replace(/^[0-9]{1,8}\|/g,"");
        if (v.length>=120) {
            v=v.replace(/^[0-9]+\|/g,"");
        }
        DeleteCookie ("viewhistory");
        SetCookie("viewhistory",v,86400*100,"/");
        if (v.length>=50  && (document.referrer.indexOf("ftchinese.com")>=0 ||location.href.indexOf("barrierversion")>0)) {
            bpage=1;
            if (location.href.indexOf("ftchinese.com")>=0) {
				
				//if(i<0.3){bpage=2}else if(i<0.5){bpage=3}
				if (v.length>=100) {bpage=3;}
				k=GetCookie("bp");
				if (k!==null&&k!==""&&k>=2){bpage=k;}
				barrierversion=paravalue(window.location.href,"barrierversion");
				if (barrierversion!==null && barrierversion!==""){bpage=parseInt(barrierversion,0);}
				//如果是IE6，则不弹出全屏模式，但是一定让他登录才能看文章
				ie6=!!window.ActiveXObject&&!window.XMLHttpRequest;
				isIE=!!window.ActiveXObject;
				if (ie6 && v.length>=100) {
					bpage=6;
					$.get("/m/marketing/reg.html", function(data){
						$("#bodytext p").slice(2).remove();
						$("#bodytext p").eq(1).after(data.replace(/5篇以上文章/g,"10篇以上文章")+"<div style='font-weight:bold;color:#FFF;padding:5px;background:#9E2F50;margin-bottom:15px;'>友好提示：我们注意到您还在使用IE6浏览，这会带来安全隐患。建议您升级到更高的版本，或使用最新的FireFox或Chrome等浏览器。</div>");
					});			
				} else if (isIE && v.length>=100) {
					$.get("/m/marketing/reg.html", function(data){
						$("#bodytext p").slice(2).remove();
						$("#bodytext p").eq(1).after(data.replace(/5篇以上文章/g,"10篇以上文章"));
					});			
				} else if (bpage>=2 && v.length>=100 && $(window).width()>1024 && (window.Modernizr === undefined || !window.Modernizr.touch)) {
					$.get("/m/marketing/reg"+bpage+".html", function(data){
					if (data.indexOf("用户名或电子邮件")>0) {
						$("#bodytext").html(data);
						$("#rail-content").empty();
						$(".story_list,#top590x60,#commentheader,#logincomment,#nologincomment,.commentcontainer,#sharelinks,.announce").remove();
						SetCookie("bp",bpage,86400*100,"/");
						}
					});
				} else {
					$.get("/m/marketing/reg.html", function(data){
						$("#bodytext p").eq(1).after(data);
					});
				}
            }
        }


    }
}

function recordpv() {
var FTAdchID,
    FTAdch,
    hasad,
    allyes_kv,
    adsegment,
    dolLeaderboard,
    i,
    j;
       
    if(!FTAdchID){
        FTAdchID="1701";
    }
    if (FTAdch==="undefined") {
        FTAdch="NP_FT_Business_School";
        } else if (FTAdch===null || FTAdch ==="") {
        FTAdch="NP_FT_Business_School";
        }
    if (document.getElementById("adch") && document.getElementById("adch").value!=="") {
        FTAdch=document.getElementById("adch").value;
        }
        hasad="";
	adsegment="";
	if(GetCookie("ALLYES_KV")){
		allyes_kv=GetCookie("ALLYES_KV");
		adsegment = "&kv=" + allyes_kv;
	}
    if (document.getElementById("top728x90")) {
        $("#top728x90").empty();
        $("#top728x90").show();
        if(ADSwitch){
            dolLeaderboard = dolphinAD(ADPO.Leaderboard,FTAdchID,"top728x90",728,90);
			$("#top728x90").html(dolLeaderboard);
        }else{
            $("#top728x90").html('<iframe marginheight="0" marginwidth="0" frameborder="0" width="730" height="90" scrolling="no" src="http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|' + FTAdch + '|Leaderboard&db=ftchinese&border=0&local=yes' + adsegment +'" allowTransparency="true"></iframe>');
        }        
        hasad=1;
    }
    if (document.getElementById("top969x90")) {
        $("#top969x90").empty();
        $("#top969x90").show();
        $("#top969x90").html('<iframe marginheight="0" marginwidth="0" frameborder="0" width="969" height="90" scrolling="no" src="http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|' + FTAdch + '|Leaderboard&db=ftchinese&border=0&local=yes' + adsegment +'" allowTransparency="true"></iframe>');
        hasad=1;
    }
    if (document.getElementById("top265x90")) {
        $("#top265x90").empty();
        $("#top265x90").show();
        if(!ADSwitch){
            $("#top265x90").html('<iframe marginheight="0" marginwidth="0" frameborder="0" width="730" height="90" scrolling="no" src="http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|' + FTAdch + '|Top_button&db=ftchinese&border=0&local=yes' + adsegment +'" allowTransparency="true"></iframe>');
        }
        
        hasad=1;
    }
    if (document.getElementById("right300x250")) {
        $("#right300x250").empty();
        $("#right300x250").show();
        i=Math.random();
        if (i<0.5) {
            j="NP_Economy|MPU_1";
        } else if (i<1) {
            j="NP_China|MPU_1";
        } else {
            j=FTAdch + "|MPU_1";
        }
        $("#right300x250").html('<iframe marginheight="0" marginwidth="0" frameborder="0" width="300" height="250" scrolling="no" src="http://ftchinese.allyes.com/main/adfshow?user=FTCHINESE|' + j + '&db=ftchinese&border=0&local=yes" allowTransparency="true"></iframe>');
        hasad=1;
    }
    if (hasad===1) {
        try{
            ga('send', 'pageview');
            fa('send', 'pageview');
        }catch(err){
            if (pageTracker!==null) {pageTracker._trackPageview();}
        }     
        if (document.getElementById("mypv")) {
            j=$("#mypv").html();
            j=j.replace(/<script.*\/script>/,"");
            $("#mypv").empty();
            $("#mypv").html(j);
        }
    }
}

function internallinks(id) {
//    var id;
    var i,
        anchor,
        anchors;
    if (document.getElementById(id)) {
        anchors = document.getElementById(id).getElementsByTagName("a");
        for (i=0; i<anchors.length; i++) {
            anchor = anchors[i];
            anchor.target = "_self";
        }
    }
}

function closeblock(){
    document.getElementById("roadblock").style.display="none";
}

function storyfont() {
    var fz=GetCookie ("fontsize"),
        bg=GetCookie ("bgcolor");
    fz = parseInt(fz, 10) / 14;
    if (fz!=null) {
        if ($("body").attr("class")!="storycomments") {
            $("#bodytext").css("font-size",fz + "em");
        } else {
            $("#body-content-col").css("font-size",fz + "em");
        }
    }
    if (bg!==null && bg.indexOf("#")>=0) {
        document.getElementById("body-content-col").style.backgroundColor=bg;
    } else if (bg!==null && bg.indexOf(".")>=0) {
        document.getElementById("body-content-col").style.backgroundImage="url(http:\/\/s.ftimg.net\/img\/" + bg + ")";
    }
}

function checkMeta(metaname) {
    var metas = document.getElementsByTagName('META'),
        i,
        content="";
    for (i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('NAME') === metaname){
            content = metas[i].getAttribute('CONTENT');
        }
    }
    return content;
}

function getnewsitemsg(){
    var username=GetCookie("USER_NAME");
    if(username!==''&&username!==null){
        $.get("/index.php/jsapi/getnewmsgnum",function(data) {
            if(data > 0) {
                $("#sitemsgcount").html("<font style='color:#9E2F50;font-size:18px;font-weight:bold;'>("+data+")</font>");
            }
        });
    }
}

function gotomobilesite(){
    if(location.href.indexOf('source=viewpc') > 0){
        SetCookie("viewpc","1",86400*100,"/");
    }
}

function lang_select() {
    if(location.href.indexOf('lang=t') === -1){
    var zh_langReg_t = /^zh-tw|zh-hk$/i,
	zh_autoLang_s = GetCookie("lang_select_s");
    if (navigator.language) {
       zh_browserLang = navigator.language;
    }else if (navigator.browserLanguage) {
       zh_browserLang = navigator.browserLanguage;
    }
    if (zh_autoLang_s !== 1 && zh_langReg_t.test(zh_browserLang)) {
        window.location="http://big5.ftchinese.com/";
    }
    }else{
        SetCookie("lang_select_s","1",86400*100,"/");
    }
}

function charheadline(theheadline,thelen) {
    
	var theheadline1="",
        k=0,
        i;
    for(i = 0;i<theheadline.length;i++){
        if(theheadline.charCodeAt(i) >255){
            k += 2;
        } else {
            k += 1;
        }
        if (k<=thelen) {
            theheadline1=theheadline1+theheadline.charAt(i);
        }
    }
    if (theheadline!==theheadline1) {
        theheadline1=theheadline1.replace(/.$/g,"...");
    }
    return theheadline1;
}



function closenote(idorclass) {
$("#"+idorclass+",."+idorclass).slideUp("500");
setTimeout(function(){$("#"+idorclass+",."+idorclass).hide();},800);
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
        adCode = '<scr'+'ipt type="text/javascript" src="http://dolphin.ftimg.net/s?z=ft&c='+cID+pID+slotStr+'" charset="gbk" ></scr'+'ipt>';
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

function fixAdLink() {
    window.uaString=navigator.userAgent || navigator.vendor || "";
    if (/micromessenger/i.test(uaString) || 1===1) {
        var gUrls  = document.getElementsByTagName('a');
        for (var i = 0; i < gUrls.length; i++) {
            var u = gUrls[i].getAttribute('href') || '';
            if (u.indexOf('dolphin.ftimg.net')>=0) {
                u = u.replace(/^.*go.php\?url=/g,'');
                u = u.replace(/dolphin.ftimg.net/g,'dolphin.ftchinese.com');
                //u = u.replace(/^http.*http/g,'http');
                //u = u.replace(/^http.*http/g,'http');
                //u = u.replace(/^http.*http/g,'http');
                u = decodeURIComponent(u);
                //alert (u);
                gUrls[i].setAttribute('href', u);
            }
        }
    }
}

var slotStr=setDolphinSlot("USER_KV");

// this would send too many events to Google that exceeds our event label quota for a free account
/*
window.onerror = function(errorMsg, url, lineNumber) {
  ga('send','event', 'CatchError', 'window', errorMsg + ' in ' + url + ' line ' + lineNumber, {'nonInteraction':1});
};
*/