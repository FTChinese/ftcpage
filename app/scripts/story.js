var username=GetCookie("USER_NAME");
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

function setbackground(thebg) {
    if (thebg.indexOf("#")>=0) {
        $("#body-content-col").css("background-color",thebg).css("background-image","");
    } else if (thebg.indexOf(".")>=0) {
        $("#body-content-col").css("background-image","url(http://s.ftimg.net/img/" + thebg + ")").css("background-color","");
    }
  
    if (thebg=="#FFF1E0") {
        $("#body-content-col").css("padding-top","0").css("border-bottom","0").css("margin-left","0").css("width","620px");
        $("textarea.commentTextArea").css("width","565px");
        $("#bodywrapper").css("margin-left","0");
    } else {
        $("#body-content-col").css("padding-top","15px").css("border-bottom","0.1em solid #E9DECF").css("width","605px");
        $("textarea.commentTextArea").css("width","550px");
        $("#bodywrapper").css("margin-left","15px");
    }
 
    if (thebg=="#F0F0F0") {
        $(".cmt_quote").css("background-color","#FFFFED");
    } else {
        $(".cmt_quote").css("background-color","#F0F0F0");
    }
 
    //for deep color, change font color accordingly
    if (thebg=="#0C3202") {
        $("#body-content-col,#topictitle,.byline,.storyfunction,.content,#allcomments,#body-content-col a:link,#body-content-col a:visited").css("color","#FFF");
    } else {
        $("#body-content-col,#topictitle,.storyfunction,#allcomments").css("color","#000");
        $(".byline").css("color","#666");
        $("#body-content-col a:link,#body-content-col a:visited").css("color","");
    }

    $(".pagination a").css("color","#404040");
    SetCookie("bgcolor",thebg,"","/");
}

var thisday=new Date();
var thenow=thisday.getHours()*10000 + thisday.getMinutes()*100 + thisday.getSeconds();

$("#fontselection,#backselection").fadeIn("slow");



$("#fontselection,#backselection").hover(
    function () {
        $(this).css("background","#FFF url(http://s.ftimg.net/img/navigation.gif) no-repeat -155px -66px").css("border","1px solid #ccc");
        $(this).find("div").css("display","block");
    },
    function () {
        $(this).css("background","transparent").css("border","1px solid #FFF1E0");
        $(this).find("div").css("display","none");
    }
    );

$("#fontoptions a").hover(
    function () {
        $(this).css("background-color","#9E2F50").css("color","#FFF");
    },
    function () {
        $(this).css("background-color","").css("color","#000");
    }
    );
 
$("#fontoptions a").click (function() {
    var fz = $(this).attr("value");
    fz = parseInt(fz, 10) / 14;
    if ($("body").attr("class")!="storycomments") {
        $("#bodytext").css("font-size",fz + "em");
    } else {
        $("#body-content-col").css("font-size",fz + "em");
    }
    SetCookie("fontsize",$(this).attr("value"),"","/");
} );

$("#backoptions a").each(function() {
    if ($(this).attr("value").indexOf("#")>=0) {
        $(this).css("background-color",$(this).attr("value"));
    } else if ($(this).attr("value").indexOf(".")>=0) {
        $(this).css("background-image","url(http://s.ftimg.net/img/" + $(this).attr("value") + ")");
    }
});
    

$("#backoptions a").click(function(){
    setbackground($(this).attr("value"));
});

 
//$("#bodytext p:first").addClass("dropcap").css("text-indent","0");

function get_new_comments(storyid) {
    $.getJSON("/comments/newcomment/" + storyid, function(data,textStatus){
        if(textStatus != 'success') {
            $('#allcomments').html("<span class='error'>很抱歉。由于您与FT网络之间的连接发生故障,加载评论内容失败。请稍后再尝试。</span>");
            return;
        }
        $('#preload').empty();
        if (data.hot) {
            $.each(data.hot,function(entryIndex,entry){
                var c_m_str = "<div class=\"cmt_top\">";
                var nickname_html = entry.nickname;
                if(entry.sulink == 1){
                    nickname_html = '<a href="/profiles/' + entry.profiles_domain + '" id="' + entry.id + '_alink" target="_blank">' + entry.nickname + "</a>";
                    if(entry.isvip == 1) {
                        nickname_html += '<img src="http://s.ftimg.net/img/v.gif" width="16" height="14" />';
                    }
                }
                if(entry.user_icon) {
                    c_m_str += '<li class="cmt_avatar">'+'<a href="/profiles/' + entry.profiles_domain + '" target="_blank">'+'<img width="50" height="50" border="0" src="http://u.ftimg.net/' + entry.user_icon + '"></a></li><li class="cmt_content2">';
                } else {
                    c_m_str += '<li class="cmt_content">';
                }
                c_m_str += "<div class=\"cmt_u_info\"><div class=\"cmt_u_desc\"><img src='http://s.ftimg.net/img/hot_1.gif' width='22' height='14' /><b>" + nickname_html + "</b> <font class=grey>" + entry.user_area + "</font></div><div class=\"cmt_date_format\">" + entry.dnewdate + "</div></div><div class=\"cmt_talk\">" +entry.quote_content + entry.talk + "</div><div class=replybox id=re" + entry.id + "></div></li>";
                c_m_str += "<div class=replycomment>";
                c_m_str += '<a title="将此评论内容转发到微博" href="javascript:comments_rt(\''+entry.id+'\',\'#hrt\');">转发微博';
                if(entry.retweets > 0) {
                    c_m_str += '(<font id="hrt'+entry.id+'">'+entry.retweets+'</font>)';
                }
                c_m_str += "</a>";
                c_m_str += "<span>|</span>";
                c_m_str += "<a href='javascript:cmt_reply(\"" + entry.id + "\",\"\");'>回复</a>";
                c_m_str += "<span>|</span>";
                c_m_str += "<a id=hst" + entry.id + " href='javascript:support_cmt(\"" + entry.id + "\",\"#hst\");'>支持</a>(<font id='hsts" + entry.id + "'>" + entry.support_count + "</font>)";
                c_m_str += "<span>|</span>";
                c_m_str += "<a id=hdt" + entry.id + " href='javascript:disagree_cmt(\"" + entry.id + "\",\"#hdt\");'>反对</a>(<font id='hdtd" + entry.id + "'>" + entry.disagree_count + "</font>)";
                c_m_str += '</div><div style="clear: both;" id="hrt'+entry.id+'_box"></div></div>';
                $('#allcomments').append(c_m_str);
            });
        }
        $.each(data.result,function(entryIndex,entry){
            var c_m_str = "<div class=\"cmt_top\">";
                var nickname_html = entry.nickname;
                var face = '';
                if (entry.disagree_count-entry.support_count>29) {
                    face="<img src=http://s.ftimg.net/img/han.gif class=floatleft style='margin-left:5px;'>";
                } else if (entry.disagree_count-entry.support_count<-29) {
                    face="<img src=http://s.ftimg.net/img/deyi.gif class=floatleft style='margin-left:5px;'>";
                } else {
                    face="";
                }
                if(entry.sulink == 1){
                    nickname_html = '<a href="/profiles/'+entry.profiles_domain+'" id="'+entry.id+'_alink" target="_blank">'+entry.nickname+"</a>";
                    if(entry.isvip == 1) {
                        nickname_html += '<img src="http://s.ftimg.net/img/v.gif" width="16" height="14" />';
                    }
                }
                if(entry.user_icon) {
                    c_m_str += '<li class="cmt_avatar">'+'<a href="/profiles/'+entry.profiles_domain+'" target="_blank">'+'<img width="50" height="50" border="0" src="http://u.ftimg.net/'+entry.user_icon+'"></a></li><li class="cmt_content2">';
                } else {
                    c_m_str += '<li class="cmt_content">';
                }
                c_m_str += "<div class=\"cmt_u_info\"><div class=\"cmt_u_desc\"><b>" + nickname_html + "</b> <font class=grey>" + entry.user_area + "</font></div><div class=\"cmt_date_format\">" + entry.dnewdate + "</div></div><div class=\"cmt_talk\">" +entry.quote_content + entry.talk + "</div><div class=replybox id=re" + entry.id + "></div></li>";
                c_m_str += "<div class=replycomment>";
                c_m_str += '<a title="将此评论内容转发到微博" href="javascript:comments_rt(\''+entry.id+'\',\'#rt\');">转发微博';
                if(entry.retweets > 0) {
                    c_m_str += '(<font id="rt'+entry.id+'">'+entry.retweets+'</font>)';
                }
                c_m_str += "</a>";
                c_m_str += "<span>|</span>";
                c_m_str += "<a href='javascript:cmt_reply(\"" + entry.id + "\",\"\");'>回复</a>";
                c_m_str += "<span>|</span>";
                c_m_str += "<a id=st" + entry.id + " href='javascript:support_cmt(\"" + entry.id + "\",\"#st\");'>支持</a>(<font id='sts" + entry.id + "'>" + entry.support_count + "</font>)";
                c_m_str += "<span>|</span>";
                c_m_str += "<a id=dt" + entry.id + " href='javascript:disagree_cmt(\"" + entry.id + "\",\"#dt\");'>反对</a>(<font id='dtd" + entry.id + "'>" + entry.disagree_count + "</font>)";
                c_m_str += '</div><div style="clear: both;" id="rt'+entry.id+'_box"></div></div>';
                $('#allcomments').append(c_m_str);
        });
        if(data.count > 0) {
            $("#commentcount").html(" ( "+data.count+" ) ");
            $("#commentcount2").html(" [  "+data.count+" 条 ] ");
            $("#readercomment").html("评论[<font style='color:#9E2F50;'>"+data.count+"条</font>]");
            $("#sortcmts").show();
            //init_repeat_cmt();
        }
        var aw = $(".cmt_top").first().width();
        $(".cmt_content2").width((aw-60)+"px");
    });
}

function init_repeat_cmt() {
    $(".cmt_quote").each(function (i) {
        if (this.parentNode.tagName.toUpperCase() == "DD") {
            this.id = "cmt_quote_"+Math.round(Math.random()*1000000);
            if(this.childNodes[0].className == "cmt_quote") {
                this.childNodes[0].id = "cmt_quote_child_"+Math.round(Math.random()*1000000);
            }
        } else if(this.id != "recommendcomment"){
            this.style.display="none";
        }
    });
    $("div[id^='cmt_quote_child_']").each(function (i){
        this.style.display="";
        if(this.childNodes[0].className == "cmt_quote") {
            all_cmt = $("#"+this.id+" .cmt_quote").length;
            $("#"+this.id).prepend("<p class='showcmt'>重复 [ "+all_cmt+" ] 条引用已被隐藏,点击展开。</p>");
        }
    });
    $(".showcmt").click(function (){
        $("#"+this.parentNode.id+" .cmt_quote").css("display","");
        this.style.display="none";
    });
}


$("#addnewcomment").click(function() {
    usenickname = $("#useguest").attr("checked")==true ? 1 : 0;
    var issyncweibo = $("#sync_weibo").attr("checked")==true ? 1 : 0;
    $(this).attr("value","正在发布中...");
    $(this).attr("disabled",true);
    $.ajax({
        type: "POST",
        url: "/comments/add",
        data: {
            storyid:storyid,
            talk:$("#Talk").attr("value"),
            use_nickname:usenickname,
            NickName:$("#nick_name").attr("value"),
            sync_weibo:issyncweibo
        } ,
        success:function (data){
            if(data == "repeat") {
                 alert("请勿重复发表评论。");
                 return;
            }else if(data != "yes") {
                 alert("抱歉,现在我们的网站可能出现了一些小故障.您的留言可能没有发表成功,请您稍后再重新尝试发表一次。");
                 return;
            }
            alert('感谢您的参与，您的评论内容审核后就会立即显示出来。');

            $("#addnewcomment").attr("value","已发布成功");
        },
        error:function (xhr, ajaxOptions, thrownError){
            alert("很抱歉。由于您与FT网络之间的连接发生故障,发表评论失败. 请稍后再重新尝试提交.");
            $("#addnewcomment").attr("disabled",false);
            $("#addnewcomment").attr("value","提交评论");
            return;
        }
    });

});

function support_cmt(id,ctype) {
    var i;
    if(ctype == undefined || ctype == null) {
        ctype = '#st';
    }

    $(ctype + id).html("已支持");
    $(ctype + id).removeAttr("href");
    i=$(ctype+'s' + id).html();
    if (i=="") {
        i=0;
    }
    i=parseInt(i);
    i=i+1;
    $(ctype+'s' + id).html(i);

    $.post("/comments/addvote/", {
        cmtid: id,
        action: "support"
    }, function(data){

        });

}

function disagree_cmt(id,ctype) {
    var i;
    if(ctype === undefined || ctype === null) {
        ctype = '#dt';
    }
    $(ctype + id).html("已反对");
    $(ctype + id).removeAttr("href");
    i=$(ctype+'d' + id).html();
    if (i=="") {
        i=0;
    }
    i=parseInt(i);
    i=i+1;
    $(ctype+'d' + id).html(i);

    $.post("/comments/addvote/", {
        cmtid: id,
        action: "disagree"
    }, function(data){

        });
}

function cmt_reply(id,ctype) {
    var sitemsg_html;
    $(".replybox").empty();
    if(ctype == undefined || ctype == null) {
        ctype = '';
    }
    if(username==''||username==null){
        $('#re' + ctype+id).html("<div class=login_box><div>请先登录再发表评论，您也可以用一点点时间免费注册</div><div><form method=post action=/users/login>用户名<input type='text' class=text name=username> 密码 <input class=text type='password' name=password> <input type='checkbox' value=1 checked=checked name=saveme style='width:20px;'> 记住我 <input type=submit class=login_btn value=登录> <br><a id='ft-login-forgot-pasword-link' href='/users/findpassword'>找回密码</a> <a href=http://user.ftchinese.com/register>免费注册</a></form></div></div>");
    } else {
        if($("#"+id+"_alink").length>0){
            sitemsg_html = '<label for="send_sitemsg" title="将评论内容以私信的方式发送给评论者"><input name="send_sitemsg" type="checkbox" id="send_sitemsg" value="1" />悄悄话</label>';
        }else{
            sitemsg_html = '';
        }
        var reply_formhtml = '<div class="input_box clearFix"><div id=reply-input-container><b>回复此评论：</b>FT中文网欢迎读者发表评论，但保留编辑与出版的权利。<textarea id="replycontent" class="commentTextArea" cols="50" rows="2" style="background:#FFFFFF;"></textarea>\n\n<div style="float:left;"><label for="useguestr"><input name="use_nicknamer" type="checkbox" id="useguestr" value="1" />匿名发表</label>  '+sitemsg_html+'  </div><div style="float:right;"><input type="button" value="提交回复" class="comment_btn" id="addnewcommentr"/><input type="button" value="取消" class="comment_btn" id="closecomment"/></div></div></div>';
        $('#re' + ctype+id).html(reply_formhtml);

        var currentbg=GetCookie ("bgcolor");
        if (currentbg != null && currentbg!="#FFF1E0" && currentbg != "") {
            $("textarea.commentTextArea").css("width","99%");
        } else {
            $("textarea.commentTextArea").css("width","99%");
        }
        $("#nick_namer").attr("value",$("#nick_name").attr("value"));
        $("#addnewcommentr").click(function(){
            usenicknamer = $("#useguestr").attr("checked")==true ? 1 : 0;
            use_sitemsg = $("#send_sitemsg").attr("checked")==true ? 1 : 0;
            $.ajax({
                type: "POST",
                url: "/comments/add",
                data: {
                    storyid:storyid,
                    talk:$("#replycontent").attr("value"),
                    use_nickname:usenicknamer,
                    NickName:$("#nick_namer").attr("value"),
                    cmtid:id,
                    send_sitemsg : use_sitemsg
                } ,
                success:function (data){
                    if(data == "repeat") {
                        alert("请勿重复发表评论。");
                        return;
                    }else if(data != "yes" && !use_sitemsg) {
                        alert("抱歉,现在我们的网站可能出现了一些小故障.您的留言可能没有发表成功,请您稍后再重新尝试发表一次。");
                        return;
                    }
                    
                    if(use_sitemsg && data == "yes") {
                        alert("私信已经发送成功,您可以在您的私信列表中看到这条对话记录。");
                        $("#re" + ctype+id).empty();
                        return;
                    }else if(use_sitemsg && data != "yes"){
                        alert("发送私信失败，对方可能在您的黑名单或者您可能在对方的黑名单中.");
                        $("#addnewcommentr").attr("disabled",false);
                        return;
                    }
                    
                    $("#re" + ctype+id).empty();
                    alert('感谢您的参与，您的评论内容审核后就会立即显示出来。');
                    //if (document.getElementById("shareprompt")) {document.getElementById("shareprompt").innerHTML="提交成功，请耐心等待评论的审核。<br><b class=highlight>等不及了吗？请点击下面的图标，将您刚刚发表的评论内容立即分享给您的朋友</b>";}else{alert('感谢您的参与，您的评论内容审核后就会立即显示出来。');}
                },
                error:function (xhr, ajaxOptions, thrownError){
                    alert("很抱歉。由于您与FT网络之间的连接发生故障,发表评论失败. 请稍后再重新尝试提交.");
                    $("#addnewcommentr").attr("disabled",false);
                    return;
                }
            });
            $(this).attr("disabled",true);
        });
        $("#closecomment").click(function(){
            $(".replybox").empty();
        });

    }
}

function bind_replycmt_event(id) {
    $("#addnewcommentr").click(function(){
            usenicknamer = $("#useguestr").attr("checked")==true ? 1 : 0;
            use_sitemsg = $("#send_sitemsg").attr("checked")==true ? 1 : 0;
            $.ajax({
                type: "POST",
                url: "/comments/add",
                data: {
                    storyid:storyid,
                    talk:$("#replycontent").attr("value"),
                    use_nickname:usenicknamer,
                    NickName:$("#nick_namer").attr("value"),
                    cmtid:id,
                    send_sitemsg : use_sitemsg
                } ,
                success:function (data){
                    if(data == "repeat") {
                        alert("请勿重复发表评论。");
                        return;
                    }else if(data != "yes" && !use_sitemsg) {
                        alert("抱歉,现在我们的网站可能出现了一些小故障.您的留言可能没有发表成功,请您稍后再重新尝试发表一次。");
                        return;
                    }
                    
                    if(use_sitemsg && data == "yes") {
                        alert("私信已经发送成功,您可以在您的私信列表中看到这条对话记录。");
                        $("#re" + ctype+id).empty();
                        return;
                    }else if(use_sitemsg && data != "yes"){
                        alert("发送私信失败，对方可能在您的黑名单或者您可能在对方的黑名单中.");
                        $("#addnewcommentr").attr("disabled",false);
                        return;
                    }
                    
                    $("#re" + ctype+id).empty();
                    if (document.getElementById("shareprompt")) {document.getElementById("shareprompt").innerHTML="提交成功，请耐心等待评论的审核。<br><b class=highlight>等不及了吗？请点击下面的图标，将您刚刚发表的评论内容立即分享给您的朋友</b>";}else{alert('感谢您的参与，您的评论内容审核后就会立即显示出来。');}
                },
                error:function (xhr, ajaxOptions, thrownError){
                    alert("很抱歉。由于您与FT网络之间的连接发生故障,发表评论失败. 请稍后再重新尝试提交.");
                    $("#addnewcommentr").attr("disabled",false);
                    return;
                }
            });
            $(this).attr("disabled",true);
        });
}

$("#cmssort").change(function (){
    $('#allcomments').html("<img src='http://s.ftimg.net/img/loading.gif' width=34 height=34 /> 请稍后,评论正在载入中.....");
    $.getJSON("/comments/newcommentsbysort/"+storyid+"/"+$("#cmssort").val() , function(jsonobject) {
        $('#allcomments').html("");
        $.each(jsonobject.result,function(entryIndex,entry){
            var c_m_str = "<ul class=\"cmt_top\">";
            if(entry.user_icon) {
                c_m_str += '<li style="float: left; width: 60px;"><img width="50" height="50" src="http://u.ftimg.net/'+entry.user_icon+'"></li><li style="float:left;width:86%;">';
            } else {
                c_m_str += '<li style="float:left;width:100%;">';
            }
            c_m_str += "<dt><span>" + entry.dnewdate + "</span><b>" + entry.nickname + "</b> <font class=grey>" + entry.user_area + "</font></dt><dd>" +entry.quote_content + entry.talk + "</dd><div class=replybox id=re" + entry.id + "></div><dt class=replycomment><a href='javascript:cmt_reply(\"" + entry.id + "\",\"\");'>回复</a> <a id=st" + entry.id + " href='javascript:support_cmt(\"" + entry.id + "\",\"#st\");'>支持</a>(<font id='sts" + entry.id + "'>" + entry.support_count + "</font>) <a id=dt" + entry.id + " href='javascript:disagree_cmt(\"" + entry.id + "\",\"#dt\");'>反对</a>(<font id='dtd" + entry.id + "'>" + entry.disagree_count + "</font>)</dt><div class=clearfloat></div>";
            c_m_str += "</li></ul>";
            $('#allcomments').append(c_m_str);
        });
        //init_repeat_cmt();
    });
});

if (document.getElementById("storybread")) {
    var storybread=document.getElementById("storybread").innerHTML.replace(/<a [^<^>]+\/([A-Za-z0-9]+)\.html[^<^>]*>[^<^>]+<\/a>/g,"$1").replace(/<a [^<^>]+\/([A-Za-z0-9]+)[^<^>]*>[^<^>]+<\/a>/g,"").replace(/&gt;/g,"-").replace(/\//g,"-").replace(/\s/g,"").replace(/-$/g,"");
}

if (typeof (bc) != "undefined") {
    $("#body-content-col").css("background-color","#FFF").css("background-image","");
    $("#body-content-col").css("padding-top","15px").css("border-bottom","0.1em solid #E9DECF").css("width","605px");
    $("textarea.commentTextArea").css("width","550px");
    $("#bodywrapper").css("margin-left","15px");
}

if ($("#allspecials").html()=="1") {
    $("#middlemba").find(".rightarrow,.leftarrow,.moredata").hide();
}
function addstoryfav(storyid){
    if(username==''||username==null){
        alert("您必须登录后能才能收藏文章!");
        return;
    }
    $("#addfavlink").html("保存收藏中...");
    $.post("/users/addfavstory/"+storyid, {
        storyid: storyid
    }, function(data){
        if(data == "ok") {
            $("#addfavlink").html("已收藏!");
        }
    });
}


function comments_rt(id,ctype) {
    var i;
    var html_objid = ctype+id+"_box";
    
    if($("#"+'retweets_textarea_'+id).length > 0){
        if($(html_objid).css("display") == "none"){
            $(html_objid).show();
        }else{
            $(html_objid).hide();
        }
        return;
    }
    $(html_objid).html('<img src="http://s.ftimg.net/img/loading.gif" width="34" height="34" /> Loading ....');
    $.getJSON("/comments/getrt/"+id, function(data){
            var is_sync_weibo = GetCookie("bind_weibo");
            var retwtext = '<div class="cmt_reteweets_bgg">◆</div>';
            retwtext  += '<div class="cmt_re_main">';
            retwtext  += '    <div class="retweets_textarea" id="retweets_textarea_'+id+'">';
            if(is_sync_weibo == null || is_sync_weibo != "yes") {
                retwtext += "您还没有绑定您的微博,<a href='/index.php/snsapi/index' target='_blank'>点此立即绑定您的微博。随时随地将FT中文网的精彩内容与您的微博好友分享。</a>";
            }else{
                retwtext  += '        <textarea rows="3" style="width: 99%;font-size:12px;"  onkeyup="showinputchar(\'retweets_text_'+id+'\',120,\'rt_tips_'+id+'\');"  name="retweets_text" id="retweets_text_'+id+'">'+data.talk+'</textarea>';
                retwtext  += '        <input type="button" name="post_retweets" value="转发到我的微博" id="post_retweets_but_'+id+'" onclick="post_rt_talk(\''+id+'\')" />';
                retwtext  += '<span id="rt_tips_'+id+'" style="margin-left:20px;" class="char_ok"></span>';
            }
            retwtext  += '    </div>';
            if(data.history) {
                retwtext  += '    <div class="cmt_re_hr">这条微博也被他们转发了</div>';
                retwtext  += '    <ul class="retweets_history">';
                retwtext  += data.history;
                retwtext  += '    </ul>';
            }
            retwtext  += '</div>';
            $(html_objid).html(retwtext);
            setRangePos(document.getElementById('retweets_text_'+id),0);
        });
}

function post_rt_talk(id) {
    var rt_text_id = "retweets_text_"+id;
    $("#"+rt_text_id).val(jQuery.trim($("#"+rt_text_id).val()));
    var post_text = $("#"+rt_text_id).val();
    if(!post_text) {
        alert("要写一些内容才能成功转发到微博哦!");
        $("#"+rt_text_id).focus();
        return false;
    }
    
    if(post_text.length > 120) {
        alert("您的微博内容超长了哦。");
        $("#"+rt_text_id).focus();
        return false;
    }
    $("#post_retweets_but_"+id).attr("disable",true);
    $.ajax({
            type: "POST",
            url: "/comments/postrt",
            data: {
                cmtid:id,
                talk:$("#retweets_text_"+id).val()
            } ,
            success:function (data){
                if(data == "yes") {
                    $("#retweets_textarea_"+id).html("已经成功将转发请求提交到了您的微博。");
                }else{
                    alert("抱歉，可能FT网站发生了一些故障。请稍后再次尝试提交一次。");
                    $("#post_retweets_but_"+id).attr("disabled",false);
                }
            },
            error:function (xhr, ajaxOptions, thrownError){
                alert("很抱歉。由于您与FT网络之间的连接发生故障,提交内容失败. 请稍后再重新尝试提交.");
                $("#post_retweets_but_"+id).attr("disabled",false);
                return;
            }
        });
}

function setRangePos(obj, pos){
    if (obj.setSelectionRange){
      obj.focus();
      obj.setSelectionRange(pos,pos);
    }else if (obj.createTextRange){
      var range = obj.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

function get_rt_cmt(rtid) {
    $("#weibo_cmt_"+rtid).html('<img src="http://s.ftimg.net/img/loading.gif" width="34" height="34" /> Loading ....');
    $.getJSON("/comments/getrtcomments/"+rtid, function (data){
        var cmt_text = '';
        $.each(data , function(i,cmt){
            cmt_text += "<li><b>"+cmt.user+"</b>:"+cmt.text+" <span class=\"cmt_weibo_date_format\">("+cmt.times+")</span></li>";
        });
        $("#weibo_cmt_"+rtid).html(cmt_text);
    });
}

function showinputchar(objid , charlen , msgid) {
    charvalue = $("#"+objid).val();
    var k = charvalue.length;
    if(k > charlen) {
        $('#'+msgid).html(charlen-k).append("/" + charlen);
        $('#'+msgid).attr('class','char_error');
    }else {
        $('#'+msgid).html(k).append("/" + charlen);
        $('#'+msgid).attr('class','char_ok');
    }
}