var refreshImg = null;
var _top_;
var isDebug=false;//是否开启debug
//二代证可购票
var two_isOpenClick=['93','95','97','99'];
//港澳台可购票
var other_isOpenClick=['93','98','99','91','95','97'];
/*公告*/
//function AutoScroll(obj){
//	$(obj).find("ul:first").animate({
//			marginTop:"-22px"
//	},500,function(){
//			$(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
//	});
//}
//
//$(function(){
//	setInterval('AutoScroll("#scroll")',3000);
//});
function login_errorMsg(msg){
	$('#login_errorMsg').html(msg).show();
}
function login_errorMsg_hide(){
	$('#login_errorMsg').html('').hide();
}
isCanGP=function(_type,tm){
	if("1"==_type){
		var len=two_isOpenClick.length;
		for(var i=0;i<len;i++){
			if(tm==two_isOpenClick[i]){
				return true;
			}
		}
		return false;
	}else{
		var len=other_isOpenClick.length;
        for(var i=0;i<len;i++){
        	if(tm==other_isOpenClick[i]){
				return true;
			}
		}
        return false;
	}
}
/**
 * 刷新验证码 登录状态下的验证码传入”randp“，非登录传入”sjrand“ 具体参看原otsweb中的传入参数
 */

function isLogin() {
	if ("undefined"!=typeof(sessionInit)&&(sessionInit) && (null != sessionInit) ) {
		$("#login_user").attr("href", ctx + "index/initMy12306");
		$("#login_user").prev('span').html("您好，");
		$("#login_user").html(sessionInit);
		$("#regist_out").attr("href", ctx + "login/loginOut");
		$("#regist_out").html("退出");
		
//		var memberId = sessionInit._CURRENT_USER.LoginUserDTO.member_id;
//		if(memberId == null || memberId == ""){
//			$("#isMember").css("display","none");
//		}
	} else {
		$("#login_user").attr("href", ctx + "login/init");
		$("#login_user").prev('span').html("您好，请&nbsp");
		$("#login_user").html("登录");		
		$("#regist_out").attr("href", ctx + "regist/init");
		$("#regist_out").html("注册");
	}
};
function loginAsyn(username){
	if(username!=null){
		$("#login_user").attr("href", ctx + "index/initMy12306");
		$("#login_user").prev('span').html("意见反馈:<a class='cursor colorA' href='mailto:12306yjfk@rails.com.cn'>12306yjfk@rails.com.cn</a> 您好，");
		$("#login_user").html(username);
		$("#regist_out").attr("href", ctx + "login/loginOut");
		$("#regist_out").html("退出");
	}else{
		$("#login_user").attr("href", ctx + "login/init");
		$("#login_user").prev('span').html("意见反馈:<a class='cursor colorA' href='mailto:12306yjfk@rails.com.cn'>12306yjfk@rails.com.cn</a> 您好，请&nbsp");
		$("#login_user").html("登录");	
		$("#regist_out").attr("href", ctx + "regist/init");
		$("#regist_out").html("注册");	
	}
};
function _initGuideShow(_index){
	var a_objs=$(".nav-list a");
	a_objs.removeClass("on");
	$("#js-xd").find(".nav-list").show();
	$("#js-xd").unbind("mouseout");
	$("#js-xd").unbind("mouseover");
	$.each(a_objs,function(n){
		if(n==_index){
			$(a_objs[n]).addClass("on");
			return;
		}
	});
}


//设置“我的12306”选中后的弹出层效果
function checkHover(e,target){
    if (getEvent(e).type=="mouseover")  {
        return !contains(target,getEvent(e).relatedTarget||getEvent(e).fromElement) && !((getEvent(e).relatedTarget||getEvent(e).fromElement)===target);
    } else {
        return !contains(target,getEvent(e).relatedTarget||getEvent(e).toElement) && !((getEvent(e).relatedTarget||getEvent(e).toElement)===target);
    }
}
function getEvent(e){
    return e||window.event;
}
function contains(parentNode, childNode) {
    if (parentNode.contains) {
        return parentNode != childNode && parentNode.contains(childNode);
    } else {
        return !!(parentNode.compareDocumentPosition(childNode) & 16);
    }
}


//设定页眉的选中（index=0时选中“首页”，1--车票预订 ，2--出行向导，3--帮助）
function initPageTitle(index){
	$('.nav ul li').not('#js-xd li').eq(index).children('a').addClass("current");
	var objs=$('.nav ul li a').not('.nav-list a');
	for(var k=0;k<objs.length;k++){
		if(index!=k){
			objs.eq(k).on("mouseenter",function(){
				$(this).addClass("current");
			}).on("mouseleave",function(){
				$(this).removeClass("current");
			});
		}
	}
}


function initNameNotice() {
	$("#name_rule").mouseenter(function(ev) {
		var Top = ev.pageY + 10;
		var Left = ev.pageX;
		$(".name-tips").eq(0).css({
			top : Top,
			left : Left
		});
		$(".name-tips").eq(0).show();

	});
	$("#name_rule").mouseleave(function() {
		$(".name-tips").hide();
	});
}


//点击复选框后面的识文字，触发事件
clickCheckBoxName=function  () {
	$("input[class='check']").each(function() {
		var $checkbox = $(this);
		var forId = $checkbox.next("label").attr('for');
		var inputId = $checkbox.attr('id');
		if (null == inputId ||"" == inputId || 'undefined' == inputId) {
			var inputId="checkbox_"+generateMixed();
			$checkbox.attr('id',inputId);
		}
		$checkbox.next("label").attr('for', inputId).css('cursor', 'pointer');
	});
};
//获取不重复的随机数
function generateMixed(){
	var res="";
	var chars=['0','1','2','3','4','5','6','7','8','9',
	           'A','B','C','D','E','F','G','H','I','J',
	           'K','L','M','N','O','P','Q','R','S','T',
	           'U','V','W','X','Y','Z',
	           'a','b','c','d','e','f','g','h','i','j',
	           'k','l','m','n','o','p','q','r','s','t',
	           'u','v','w','x','y','z'];
	for(var i=0;i<10;i++){
		var id=Math.ceil(Math.random()*61);
		res+=chars[id];
	}
	return res;
}
//用于帮助的用户名称显示
function showHelpName(){
		$.ajax({
			url: '../login/existUser',
			type: "POST",
			success : function(response){
				if(response.success){
					sessionInit=response.name;
					if ("undefined"!=typeof(sessionInit)&&(sessionInit) && (null != sessionInit) ) {
						$("#login_user").attr("href", "../index/initMy12306");
						$("#login_user").prev('span').html("意见反馈:<a class='cursor colorA' href='mailto:12306yjfk@rails.com.cn'>12306yjfk@rails.com.cn</a> 您好，");
						$("#login_user").html(sessionInit);
						$("#regist_out").attr("href", "../login/loginOut");
						$("#regist_out").html("退出");
						
				//		var memberId = sessionInit._CURRENT_USER.LoginUserDTO.member_id;
				//		if(memberId == null || memberId == ""){
				//			$("#isMember").css("display","none");
				//		}
					} else {
						$("#login_user").attr("href", "../login/init");
						$("#login_user").prev('span').html("意见反馈:<a class='cursor colorA' href='mailto:12306yjfk@rails.com.cn'>12306yjfk@rails.com.cn</a> 您好，请&nbsp");
						$("#login_user").html("登录");		
						$("#regist_out").attr("href", "../regist/init");
						$("#regist_out").html("注册");
					}
				}
			}			
		});		
}
//控制内容高度
function controContentHeight(){
	var subNum=0;
	var notLogin=0;
	if(window.attachEvent){
		var version=navigator.appVersion;
		if(version.indexOf('MSIE 7.0')>=0){
			subNum=53;
		}else{
			subNum=80;
			if(!document.getElementById("forget_password_id")){
				notLogin=12;
			}
		}
	}else{
		subNum=78;
		if(!document.getElementById("forget_password_id")){
			notLogin=15;
		}
	}
	var navH=0;
	if(!$(".nav-list").is(":hidden")){
		navH=$(".nav-list").height();
	}
	var minHeight=$(window).height()-$(".header").height()-$(".footer").height()-subNum+notLogin-navH;
	if(minHeight>400)
	if($("#scroll").css("display")=="block"){
	  	$(".content").css("min-height",minHeight-30);
	}else{
	 	$(".content").css("min-height",minHeight);
	}
}
jQuery.extend({
	//判断是否显示公告栏
	showNotice : function(){
		if("undefined" == typeof(isShowNotice) || "N" != isShowNotice ){
			$("#scroll").css("display","block");
			var contentHtml =  "<li><a >“网上购票”可购买预售期内不晚于开车前30分钟的列车车票；“网上订票”可预订4至20日列车车票。</a></li>";
			if(noticeContent&&"undefined" != typeof(noticeContent)) {
				var length = noticeContent.length;
				if(length > 0){
					for(var i = 0; i < length; i++){
						contentHtml+= "<li><a>"+noticeContent[i]+"</a></li>";
					}
				}
			}
			$("#scroll .notice_in ul").html(contentHtml);
		}else if("N" == isShowNotice){
			$("#scroll").hide();
			$("div.ban-area").hide();
		}
	}
});
$(function() {
	var mouseOnPanelMenu=0;
	
	$(document).ready(function() {
		if("undefined"==typeof(sessionInit)){
			showHelpName();
		}else{
			//isLogin();
		}
		
		controContentHeight();
		$(".menu-list").on("mouseover",function(event){
			if(checkHover(event,this)){
				mouseOnPanelMenu = 1; 
			}
		}).on("mouseleave",function(){
			mouseOnPanelMenu = 0;
			$(".menu-list").hide();
		});
		
		$('.nav>ul>li>a').click(function(){
			$('.nav>ul>li').removeClass();
			$(this).parent().addClass("current");
		});
		
		$('.notice_in ul a').click(function(){
			otsRedirect("post",ctx + "index/showAnnouncement");
		});

		//防止重复添加
		if($(".phone-link").html()==undefined){
			$('.login-info').prepend("<div class='phone-link'><a href='../appDownload/init'>手机版</a></div>");
		}
		returnTop();
	});

	function returnTop(){
		//<a href="#" class="return-top" title="返回顶部"></a>
		document.body.appendChild($('<a href="#" id="_return_top" class="return-top" title="返回顶部" style="display: block;"></a>')[0]);
		var cssfixedsupport=!window.XMLHttpRequest;//判断是否ie6
		$("#_return_top").css({
			position: cssfixedsupport ? 'absolute' : 'fixed',
			bottom:'30px',
			right:'30px'
		}).goToTop(5);
		$(window).on('scroll resize',function(){ 
			$("#_return_top").goToTop(5);    
		});
		
	}
	$("#js-my").on("mouseover",function(){
		if(timmermenu){
			clearTimeout(timmermenu);
		}
		$(".menu-list").show();
	});
	var timmermenu=null;
	$("#js-my").on("mouseout",function(){
		timmermenu=setTimeout(function(){
			if(mouseOnPanelMenu != 1){
				mouseOnPanelMenu = 0;
				$(".menu-list").hide();
			}
		},120);
	});
	
	/* 导航条 */
	$("#js-xd").on("mouseover",function(){
		if(timmer){
			clearTimeout(timmer);
		}
		$("#js-xd").addClass("nav-guide");
		$(this).find(".nav-list").show();	
	});
	var timmer=null;
	$("#js-xd").on("mouseout",function(event){
		var obj=$(this);
		timmer=setTimeout(function(){
			obj.find(".nav-list").hide();
		},120);
	});

	/* 信息输入放大 */
	$(".pos-rel input").focus(function() {
		$(this).next().show();
		$(this).css("border", "1px solid #2D8DCF");
	});

	$(".pos-rel input").blur(function() {
		$(this).next().hide();
		$(this).css("border", "1px solid #CFCDC7");
	});
	
	$("#scroll>a:last").click( function () {
		$.ajax({
			url: ctx + 'Notice/showNotice',
			type: "POST",
			success : function(response){
				if(response.status){
					$("#scroll").hide();
					$("div.ban-area").hide();
				}
			}			
		});		
	});
	
	//添加浏览器兼容的日志输出
	if(!window.debug){  
	    window.debug = function(message){  
	      try{  
	           if(!window.console){  
	               window.console = {};  
	               window.console.log = function(){  
	                  return;  
	               };  
	           }
	           if(isDebug)
	              window.console.log(message + ' ');  
	      }catch(e){}  
	    };
	}

});
(function($){
	$.fn.goToTop=function(topValue){
		var $window=$(window);
		var $this=$(this);
		var shouldvisible=( $window.scrollTop() > topValue )? true : false;
		
		if (shouldvisible){
			$this.stop().show();
		}else{
			$this.stop().hide();
		}
		return this;
	};
	
	$.fn.headerFloat=function() {
    	var position = function(element) {
	        var _left=false;
	        $(window).on('scroll resize',function(){ 
	            var scrolls = $(this).scrollTop();
	            if(!_left){
	            	_left=element.position().left-1;
	            }
	            //if(!_top_)
	            _top_=element.position().top;
	            if (scrolls > _top_+30) {
	                if (!(navigator.appVersion.indexOf("MSIE 6")>-1)) {
                        $("#floatTable")[0].style.position="fixed";
                        $("#floatTable")[0].style.top=0;
                        $("#floatTable").css("z-index","1900");
                        $("#floatTable").css("left",_left);
	                } else {
	                	 $("#floatTable").css({
	                    	position: "absolute",
	                        top: scrolls,
	                        left:_left
	                    });    
	                }
	                //element.hide();
	                $("#floatTable").show();
	            }else {
	            	//$("#floatTable").removeAttr("style");
	            	$("#floatTable").css({
	                    top: _top_
	                }); 
	            	//element.show();
	                $("#floatTable").hide();
	            }
	        });
	 };
   	 return $(this).each(function() {
       	 position($(this));                         
     });
	};
})(jQuery);
