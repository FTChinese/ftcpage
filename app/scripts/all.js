function quizcheck(content) {
if  (content.value==1) {
content.parentNode.parentNode.getElementsByTagName("div")[0].style.display="block";

content.style.backgroundImage="url(img/quizright.png)";
} else {
content.style.backgroundImage="url(img/quizwrong.png)";
}

}

function hideparent (content) {
content.parentNode.style.display="none";
}


var i=0;
var fl=0;

function flashtext(content, themark, contentlength) {
if (fl) {
} else {
fl=0;
}

var oritext;
var timerID2;
             content.style.color = "#9E2F50";
             if (i<5 & i%2==0) {
                     content.style.color = "#9E2F50";
                     content.innerHTML = themark + content.innerHTML;
                     i++;
                     timerID2 = setTimeout(function () {
flashtext(content,themark,contentlength);
}, 500);

             } else if (i<5 & i%2==1) {
                     content.style.color = "#4781AA";
                     content.innerHTML=right(content.innerHTML, contentlength);
                     i++;
                     timerID2 = setTimeout(function () {
flashtext(content,themark,contentlength);
}, 1000);
             }
             else {
             i=0;
             content.style.color="#4781AA";
             content.innerHTML=right(content.innerHTML, contentlength);
             
TimerID2=setTimeout(function () {
flashtext(content,themark,contentlength);
}, 10000);

if (fl<500) {
fl++;
} else {
clearTimeout (TimerID2);
}

}

}

function getpvalue(theurl, thep) {
var k,thev;
if (theurl.toLowerCase().indexOf(thep + "=")>1) {
k=theurl.toLowerCase().indexOf(thep) + thep.length + 1;
thev=theurl.toLowerCase().substring(k,theurl.length);
thev=thev.replace(/\&.*/g,"");
} else {
thev="";
}
return thev;
}

function right(mainStr,lngLen) {
// alert(mainStr.length)
if (mainStr.length-lngLen>=0 && mainStr.length>=0 && mainStr.length-lngLen<=mainStr.length) {
return mainStr.substring(mainStr.length-lngLen,mainStr.length);}
else{return null;}
}


//start jquery functions
this.tooltip = function(){	
	/* CONFIG */		
		xOffset = -20;
		yOffset = -40;	
		// these 2 variable determine popup's distance from the cursor
		// you might want to adjust to get the right result		
	/* END CONFIG */		
	$("a[title]").hover(function(e){										
		this.t = this.title;
		this.title = "";									  
		$("body").append("<p id='tooltip'>"+ this.t +"</p>");
		$("#tooltip")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px")
			.fadeIn("fast");		
    },
	function(){
		if (this.t && this.t != undefined) {		
		this.title = this.t;		
		$("#tooltip").remove();
		}
    });	
	$("a[title]").mousemove(function(e){
		$("#tooltip")
			.css("top",(e.pageY - xOffset) + "px")
			.css("left",(e.pageX + yOffset) + "px");
	});			
};



// starting the script on page load

tooltip();
previeweffect();

var cssoption=getpvalue(window.location.href.toLowerCase(), "cssoption");
if (cssoption==1) {
$("#page-title h1 span").css("font-family","宋体");
$("#navigation ul li").css("font-family","宋体");
$(".topnews h2").css("font-family","宋体").css("font-size","25px").css("line-height","30px");
}



function previeweffect() {


$(".slidedown").parent().prepend("<div class=toggleslide></div>");
$(".toggleslide").click(function(){
$(this).parent().find(".slidedown").slideToggle("slow");
});

$(".toggleslide").toggle(
function () {
$(this).css("background-image","url(img/max.gif)");
},
function () {
$(this).css("background-image","url(img/min.gif)");
}
);



//flashtext(document.getElementById("feedback"), ">>>",4);
//flashtext(document.getElementById("italk"), ">>>",4);

$("#right336x60").hover(function (){
$("#right336x60-2").slideDown("slow");
},
function (){
$("#right336x60-2").slideUp("slow");
}
);
}


function trunchl(theid,l) {
$("#" + theid + " p a").each(function() {
if ($(this).html().length>l) {
$(this).html($(this).html().substring(0,l-2) + "...");
}
});
}

//trunchl("english",11);



window._wsodSymbolHover = {};
window._wsodSymbolHover.updateContent = function(str1,str2){
var str3=str2;
var lp=str2.replace(/.*lastPrice.{1,5}span[^>]*>([^<^>]*)<.*/g,"$1");
var pc="";
if (str2.indexOf("%")>0) {
pc=str2.replace(/.*>([^<]*\%)<.*/g,"$1");
}

//alert (lp);

if (str2.indexOf("currently unavailable")>0) {
} else {
$("#i" + str1.replace(/:/g,"-mh-").replace(/\./g,"-dot-").replace(/\@/g,"-at-")).html(lp);
$("#pi" + str1.replace(/:/g,"-mh-").replace(/\./g,"-dot-").replace(/\@/g,"-at-")).html(pc);
}

if (str2.indexOf("negChange")>0) {
$("#pi" + str1.replace(/:/g,"-mh-").replace(/\./g,"-dot-").replace(/\@/g,"-at-")).attr("class","dataValue negChange");
} else if (str2.indexOf("posChange")>0) {
$("#pi" + str1.replace(/:/g,"-mh-").replace(/\./g,"-dot-").replace(/\@/g,"-at-")).attr("class","dataValue posChange");
}

};


//getftcapi();


updatetab1();


function updatetab1() {
    getftdata("SHI:SHH");
    getftdata("HSI:HKG");
    getftdata("DJI:DJI");
    getftdata("INX:IOM");
    getftdata("IXTA:TAI");
    getftdata("n225:NIK");
    getftdata("COMP:NAS");
    getftdata("DAXX:GER");
}

function updatetab2() {
    getftdata("USDCNY");
    getftdata("USDJPY");
    getftdata("EURUSD");
    getftdata("GBPUSD");
    getftdata("USDCHF");
    getftdata("USDHKD");
    getftdata("AUDUSD");
    getftdata("USDCAD");
}

function updatetab3() {
    getftdata("IB.1:IEU");
    getftdata("CL.1:NYM");
    getftdata("US@RB.1:NYM");
    getftdata("GC.1:CMX");
    getftdata("US@SI.1:CMX");
    getftdata("US@HG.1:CMX");
    getftdata("SC1:CBT");
    getftdata("WC1:CBT");
}

function updatetab4() {
    getftdata("GOOG:NSQ");
    getftdata("BIDU:NSQ");
    getftdata("601857:SHH");
    getftdata("600028:SHH");
    getftdata("601398:SHH");
    getftdata("601988:SHH");
    getftdata("600050:SHH");
    getftdata("941:HKG");
}



function getftcapi() {
$.ajax({
type: "GET",
url: "/index.php/jsapi/ftmarket",
success:function(data){
data=data.replace(/[\r\n]/g,"").replace(/updateContent/g,"|");
data=data.replace(/(\);)[^|]+(window\.\_wsodSymbolHover)/g,"$1$2");
data=data.replace(/[\r\n]/g,"").replace(/\|/g,"updateContent");
eval(data);
}
});
}

function updatemd() {
$.ajax({
type: "GET",
url: "/index.php/jsapi/ftmarket",
success:function(data){
data=data.replace(/[\r\n]/g,"").replace(/updateContent/g,"|");
data=data.replace(/(\);)[^|]+(window\.\_wsodSymbolHover)/g,"$1$2");
data=data.replace(/[\r\n]/g,"").replace(/\|/g,"updateContent");
//$("#fullbody").append("<textarea rows=5 cols=40>"+data+"</textarea>");
eval(data);
$(".marketsdata").parent().parent().show();
}
});
}


function getftdata(s) {
s=s.replace(/:/g,"%3A").replace(/\s/g,"").replace(/\%E2\%80\%8E/g,"");
 $.ajax({
   type: "GET",
   url: "http://markets.ft.com/markets/data/getSymbolHover.asp?s=" + s + "&callback=updateContent&..contentType..=text%2Fjavascript&context=window._wsodSymbolHover&",
   dataType: "script"
   });
}

$("#regulars div p a").each(function(){
this.innerHTML=charheadline(this.innerHTML,25);
});

$("#regulars div p:not(:has(a))").each(function(){
this.innerHTML=charheadline(this.innerHTML,100);
});