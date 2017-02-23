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
		removeAllClass:function(){
			$("dl > .cur").removeClass("cur");
			$(".cur-txt").removeClass("cur-txt");
			$("dl > .prev").removeClass("prev");
			$(".nav-label").hide();
		},
		//显示需要的须知
		displaydiv : function (id){
			var txtbox=document.getElementById("txt-box");
			var regbox=document.getElementById("reg-box");
			var buybox=document.getElementById("buy-box");
			var expbox=document.getElementById("express-box");
			if(id=="reg"){
				$.sidebarStyle(0);
				regbox.style.display="";
				txtbox.style.display="none";
				buybox.style.display="none";
				expbox.style.display="none";
				insert(id);//动态改变上部导航
			}
			if(id=="txt"){
				$.sidebarStyle(2);
				regbox.style.display="none";
				txtbox.style.display="";
				buybox.style.display="none";
				expbox.style.display="none";
				insert(id);
			}
			if(id=="buy"){
				$.sidebarStyle(1);
				regbox.style.display="none";
				txtbox.style.display="none";
				expbox.style.display="none";
				buybox.style.display="";
				insert(id);
			}
			if(id=="express"){
				$.sidebarStyle(3);
				regbox.style.display="none";
				txtbox.style.display="none";
				buybox.style.display="none";
				expbox.style.display="";
				insert(id);//动态改变上部导航
			}
		}
	});
	//顶部导航随左侧导航的改变而改变
	function insert(id){
		document.getElementById("insert").innerHTML=document.getElementById(id).innerHTML;
	}
	$(function(){
		/*设置页面初始化样式*/
		initPageTitle("5");
		var linktype=window.location.href;
		value=linktype.split("?linktypeid=")[1];
		$.displaydiv(value);
	});
	
})(jQuery);



