(function($){
	jQuery.extend({
		sidebarStyle : function(index){
			var objs = $("dd");
			objs.hover(function(){
				$.removeAllClass();
				$(this).addClass("cur");
				var top=$(this).position().top;
				var top2=$(this).closest('dl').position().top;
				$(".nav-label").css('top',top+top2-1).show();
				$(this).children('a').hover(function(){
					$(this).addClass("cur-txt");
				},function(){
					$(this).removeClass("cur-txt");
				});
				$(this).prev().addClass("prev");
			},function(){
				$(this).removeClass("cur");
				$(this).prev().removeClass("prev");
				$(this).children('a').removeClass("cur-txt");
				$(".nav-label").hide();
			});
			if(index >= 0){
				$.setCur(objs,index);
				$(".sidebar").mouseleave(function(){
					$.removeAllClass();
					$.setCur(objs,index);
				});
			}
		},
		setCur : function(objs,index){
			var curObj=objs[index];
			$(curObj).addClass("cur");
    		$(curObj).children("a").addClass("cur-txt");
    		if(index>0){
    		  var pre=index-1;
    		  var preObj=objs[pre];
    		  $(preObj).addClass("prev");
    		}
			var top=$(curObj).position().top;
			var top2=$(curObj).closest('dl').position().top;
			$(".nav-label").css('top',top+top2-1).show();	
		},
		removeAllClass : function(){
			$("dl > .cur").removeClass("cur");
			$(".cur-txt").removeClass("cur-txt");
			$("dl > .prev").removeClass("prev");
			$(".nav-label").hide();
		},
		//显示需要的须知
		displaydiv : function(id){			
			if(id=="means1"){
				$.sidebarStyle(0);
				$("#means1-box").css("display","block");
				$("#means2-box").css("display","none");
				$("#means3-box").css("display","none");
				$("#means4-box").css("display","none");
				$("#means5-box").css("display","none");
				$("#means6-box").css("display","none");
				setdaohang("means1");  //设置顶端导航
			}
			if(id=="means2"){
				$.sidebarStyle(1);
				$("#means1-box").css("display","none");
				$("#means2-box").css("display","block");
				$("#means3-box").css("display","none");
				$("#means4-box").css("display","none");
				$("#means5-box").css("display","none");
				$("#means6-box").css("display","none");
				setdaohang("means2");  //设置顶端导航
			}
			if(id=="means3"){
				$.sidebarStyle(2);
				$("#means1-box").css("display","none");
				$("#means2-box").css("display","none");
				$("#means3-box").css("display","block");
				$("#means4-box").css("display","none");
				$("#means5-box").css("display","none");
				$("#means6-box").css("display","none");
				setdaohang("means3");  //设置顶端导航
			}
			if(id=="means4"){
				$.sidebarStyle(3);
				$("#means1-box").css("display","none");
				$("#means2-box").css("display","none");
				$("#means3-box").css("display","none");
				$("#means4-box").css("display","block");
				$("#means5-box").css("display","none");
				$("#means6-box").css("display","none");
				setdaohang("means4");  //设置顶端导航
			}
			if(id=="means5"){
				$.sidebarStyle(4);
				$("#means1-box").css("display","none");
				$("#means2-box").css("display","none");
				$("#means3-box").css("display","none");
				$("#means4-box").css("display","none");
				$("#means5-box").css("display","block");
				$("#means6-box").css("display","none");
				setdaohang("means5");  //设置顶端导航
			}
			if(id=="means6"){
				$.sidebarStyle(5);
				$("#means1-box").css("display","none");
				$("#means2-box").css("display","none");
				$("#means3-box").css("display","none");
				$("#means4-box").css("display","none");
				$("#means5-box").css("display","none");
				$("#means6-box").css("display","block");
				setdaohang("means6");  //设置顶端导航
			}
		}
	});

	function setdaohang(value){
		var show="";
		if(value=="means1")
			show="铁路互联网售票暂行办法";
		if(value=="means3")
			show="铁路互联网购票须知";
		if(value=="means2")
			show="铁路旅客运输规程";
		if(value=="means4")
			show="铁路旅客运输办理细则";
		if(value=="means5")
			show="铁路互联网购票身份核验须知";
		if(value=="means6")
			show="铁路互联网车票快递服务须知";
		document.getElementById("daohang").innerHTML=show;
	}
	
	$(document).ready(function() {
		/*设置页面初始化样式*/
		initPageTitle("4");
		var linktype=window.location.href;
		value=linktype.split("?linktypeid=")[1];
		$.displaydiv(value);  //初始化左边导航
		setdaohang(value);  //设置顶端导航
	});
	
	
})(jQuery);