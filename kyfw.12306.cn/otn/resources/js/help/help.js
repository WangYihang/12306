$(function(){

	$(document).ready(function() {
		/*设置页面初始化样式*/
		initPageTitle("4");
		var linktype=window.location.href;
		value=linktype.split("?no=")[1];
		if(value!="" && value!=undefined && value!="undefined"){
			var num = parseInt(value)-1;
			$('.q-list li').removeClass("on");
			$('.q-list li').eq(num).addClass("on");
		}
		
		/*点击常见问题下不同链接跳转到相应页面*/
		$(".down dd a").click(function(){
			otsRedirect("get","../" + "gonggao/"+this.id+".html");
		});
		$(".lay-bd dd").click(function(){
			var this_id = $(this).children().attr("id");
			otsRedirect("get","../" + "gonggao/"+this_id+".html");
		});
		
		/*左侧导航栏展开和关闭*/
		$('.my dl dt').click(function(){
			var $element = $(this).siblings("dd");
			$.removeCur();
			if($element.is(":visible")){
				$(this).parent().removeClass("on");
			}else{
				$(this).parent().addClass("on");
				$(this).parent().siblings("dl").removeClass("on");
			};
		});
		
		/*右侧内容栏展开和关闭*/
		$('.q-list li dt').click(function(){
			if($(this).siblings("dd").is(":visible")){
				$(this).parent().removeClass("on");
			}else{
				$(this).parent().addClass("on");
			}
		});
	});
	
	
	
    /*处理左侧导航栏样式随鼠标变化*/
	var mouseout=true;
	jQuery.extend({
		sidebar_init:function(index){
			var objs=$(".lay-bd dt,.lay-bd dd");
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
				mouseout=false;
			},function(){
				$(this).removeClass("cur");
				$(this).prev().removeClass("prev");
				$(this).children('a').removeClass("cur-txt");
				$(".nav-label").hide();
				mouseout=true;
			});
			if(index>=0){
				$.setCur(objs,index);
				$('.sidebar').mouseleave(function(){
					$.setCur(objs,index);
				});
			}

		},
		setCur:function(objs,index){
			var curObj=objs[index];
			$(curObj).addClass("cur");
			$(curObj).parent().addClass('on');
			$(curObj).parent().siblings("dl").removeClass("on");
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
		removeCur:function(objs,index){
			$(".nav-label").hide();
			$("dl > .cur").removeClass("cur");
			$(".cur-txt").removeClass("cur-txt");
			$("dl > .prev").removeClass("prev");
			$(".nav-label").hide();
		},
		removeAllClass:function(){
			$("dl > .cur").removeClass("cur");
			$(".cur-txt").removeClass("cur-txt");
			$("dl > .prev").removeClass("prev");
			$(".nav-label").hide();
		}
	});	
});
	


