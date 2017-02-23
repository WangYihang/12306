 
var school_options;
var school_timeout = false;		
var school_prevLength = 0;


$(document).ready(
		
	function(){
		// 空条件过滤出所有城市列表
		// 出发地事件
		$("#schoolNameText").focus(
			function(){
				if($.trim($(this).val())=='请输入'){
					$(this).val('').css('color','#000');
				}
				
				if($.trim($(this).val())=='' && !fliped_flag){
					school_displayItems('',0);//显示热门城市列表
				}
			}
		).keyup(
			school_processKey
		).click(
			function() {
				$(this).parent().parent().css("z-index","9999");
				$(this).val("");
				$(school_options.dataContainer).val("");
				var q=$.trim($(this).val());
				school_displayItems(q,0);
			}
		);
		
		$(document).click(function(event) {
			var $results = $('#schoolNameSuggest'); 
			var $input = $("#schoolNameText");
			var input=document.getElementById("schoolNameText");
			if( typeof($input) == "undefined" ){
				return ;
			}
			if(event.target ==input){
				return ;
			}
			
			//点击向前向后
			var event_id=event.target.id;
			if(event_id =="back_flip" || event_id =="forward_flip"){
				return ;
			}
			
			setTimeout(function() { $results.hide(); }, 200);
			 
			if($.trim($input.val())!=""&&$.trim($(school_options.dataContainer).val())!=""){
			}else{
				if($.trim($input.val())=='简码/汉字'){
					
				}else{
					fliped_flag=false;
					$input.val("简码/汉字");
				//$(school_options.dataContainer).val("");
				}
			}
			
		});
	}
);

//显示当前学校列表中的指定分页
function school_showlist(aPageNo,items){ 
	var html='';
	var flipHtml='';
	if(array_school_filter.length>7){
		// 取分页数据
		var pagecount = Math.ceil((array_school_filter.length+1)/7);
		if(aPageNo==-1) 
			aPageNo = (pagecount-1);
		else if(aPageNo==pagecount) 
			aPageNo = 0;  
		array_school_showing = array_school_filter.slice(7*(aPageNo),  Math.min(7*(aPageNo+1), array_school_filter.length) );
		// 翻页控制                                                         &laquo;&nbsp;向前":"<a href='' class='cityflip' onclick='city_showlist("+(aPageNo-1)+");return false;'>&laquo;&nbsp;向前</a>";
		flipHtml ="<div id=flip_schools>";
		flipHtml += (aPageNo==0)?"&nbsp;&nbsp;&nbsp;&nbsp;<font style='color:black;'>&laquo;&nbsp;向前</font>":"<a href='javascript:void(0);' id='forward_flip'  class='cityflip' onclick='outterDisplayItems("+(aPageNo-1)+");'>&nbsp;&nbsp;&nbsp;&nbsp;&laquo;&nbsp;向前</a>";
		flipHtml += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp";
		flipHtml += (aPageNo==pagecount-1)?"<font style='color:black;'>向后&nbsp;&raquo;</font>":"<a href='javascript:void(0);' id='back_flip'   class='cityflip' onclick='outterDisplayItems("+(aPageNo+1)+");'>向后&nbsp;&raquo;</a>";
		flipHtml +="</div>";
	} else {
		aPageNo=0;
		array_school_showing = array_school_filter;
		
	}
	var _size=array_school_showing.length;
	for(var k=0;k<_size;k++){
		h=array_school_showing[k];
		if(h.chineseName&&h.chineseName!="undefined")
		html+='<li  stationtelecode="'+h.stationTelecode+'" item_index="'+k+'"><a href="#'+k+'">'+h.chineseName+'</a></li>';
	}
	if (html == '') {
		var reg = new RegExp('^[a-zA-Z\u3400-\u9FFF]+$');
		if(!reg.test(items)){
			suggest_tip = '<div class="gray ac_result_school_tip">对不起，只能输入中文或者英文！</div>';
		}else{
			suggest_tip = '<div class="gray ac_result_school_tip">对不起，找不到：' + items +'</div>';
		}
	}
	else {
		suggest_tip = '<div class="gray ac_result_tip">输入或选择</div>';
	}
	html = suggest_tip + '<ul>' + html + '</ul>'+flipHtml;	
	return html;
}

function school_suggest() {
	var $input=$("#schoolNameText");
	$input.val($input.val().toUpperCase()); 
	var q = $.trim($input.val());
	school_displayItems(q,0);
}	
 
 function school_displayItems(items,page) {
	//过滤html标签
	 var reg=/<\/?[^>]*>/g;
	items = items.replace(reg,'');
	var $results = $('#schoolNameSuggest'); 
	$results.empty();
	var html = '';
	array_school_filter=[];
	if (items!='') {//热门城市遍历
		for (var i = 0; i < school_options.source.length; i++) {
			var reg = new RegExp('^' + items + '.*$', 'im');
			if ( reg.test(school_options.source[i].chineseName)  || reg.test(school_options.source[i].simplePin)) {
				array_school_filter.push(school_options.source[i]);
			}
		}
	}
	else {
		array_school_filter=school_options.source;
	}
	
	if(page==0 || page==''){
		html=school_showlist(0,items);
	}else{
		html=school_showlist(parseInt(page,10),items);
	}
	$results.css({
		top: $("#schoolNameText").position().top +$("#schoolNameText").height()+12,
		left:$("#schoolNameText").position().left
	});
	$results.html(html).show();
	$results.children('ul').children('li:first-child').addClass(school_options.selectClass);
	
	$results.children('ul')
		.children('li')
		.mouseover(function() {
			$results.children('ul').children('li').removeClass(school_options.selectClass);
			$(this).addClass(school_options.selectClass);
		})
		.click(function(e) {
			e.preventDefault(); 
			e.stopPropagation();
			school_selectCurrentResult();
		});
	try {
		$results.bgiframe();
		if($results.width()>$('> ul',$results).width()){
			$results.css("overflow","hidden");
		}else{
			$('> iframe.bgiframe',$results).width($('> ul',$results).width());
			$results.css("overflow","scroll");
		}
		if($results.height()>$('> ul',$results).height()){
			$results.css("overflow","hidden");
		}else{
			$('> iframe.bgiframe',$results).height($('> ul',$results).height());
			$results.css("overflow","scroll");
		}
		if($('> iframe.bgiframe',$results).length>0){
			//$results.width($results.width()+18);	// IE6下会无限加长加宽,故改成如下方式
			//$results.height($results.height()+15);
			if(!initWidth){
				initWidth =  $results.width();
			}
			if(!initHeight){
				initHeight =  $results.height();
			}
			//IE下会多出空白一行
			//$results.width(initWidth +18);
			//$results.height(initHeight +15);
		}
	} catch(e) { 
	}
	}
 
 function school_processKey(e) {
	 var $results = $('#schoolNameSuggest'); 
	 var $input = $("#schoolNameText");
			// handling up/down/escape requires results to be visible
			// handling enter/tab requires that AND a result to be selected
			if ((/27$|38$|40$/.test(e.keyCode) && $results.is(':visible')) ||
				(/^13$|^9$/.test(e.keyCode) && school_getCurrentResult())) {
	        
	        if (e.preventDefault)
	            e.preventDefault();
			if (e.stopPropagation)
	            e.stopPropagation();
	
	        e.cancelBubble = true;
	        e.returnValue = false;
	
			switch(e.keyCode) {
		
				case 38: // up
					school_prevResult();
					break;
		
				case 40: // down
					school_nextResult();
					break;
				case 13: // return
					school_selectCurrentResult();
					break;
					
				case 27: //	escape
					$results.hide();
					break;
			}
	} else  {
		if ($input.val().length != school_prevLength){
			if (school_timeout) 
			clearTimeout(school_timeout);
			school_timeout = setTimeout(school_suggest, school_options.delay);
			school_prevLength = $input.val().length;
		}
	}			
}
 
 function school_nextResult() {
	var $results = $('#schoolNameSuggest'); 
	$currentResult = school_getCurrentResult();
	var next=$currentResult.next();
	if(next==null || next.length==0){
		$currentResult.removeClass(school_options.selectClass);
		$results.children('ul').children('li:first-child').addClass(school_options.selectClass);
		return;
	}
	//item_index=6，不执行
	var hasGoing=($currentResult.attr('item_index'))=='6';
	if ($currentResult && !hasGoing){
		$currentResult
			.removeClass(school_options.selectClass)
			.next()
				.addClass(school_options.selectClass);
	}else{
		$currentResult.removeClass(school_options.selectClass);
		$results.children('ul').children('li:first-child').addClass(school_options.selectClass);
		
	}

}
	
function school_prevResult() {
	var $results = $('#schoolNameSuggest'); 
	$currentResult = school_getCurrentResult();
	//item_index=0，不执行
	var hasGoing=($currentResult.attr('item_index'))=='0';
	if ($currentResult && !hasGoing)
		$currentResult
			.removeClass(school_options.selectClass)
			.prev()
				.addClass(school_options.selectClass);
	else{
		$currentResult.removeClass(school_options.selectClass);
		$results.children('ul').children('li:last').addClass(school_options.selectClass);
	}
}

(function($) {
	$.schoolSuggest = function(input, options) {
		var $input = $(input).attr("autocomplete", "off");
				//if($.trim($input.val())=='' || $.trim($input.val())=='请输入') $input.val('请输入').css('color','#aaa');
		if( ! school_options.attachObject )
			school_options.attachObject = $(document.createElement("ul")).appendTo('body');

		$results = $(school_options.attachObject);
		$results.addClass(school_options.resultsClass);
		school_resetPosition();
		$(window)
			.load(school_resetPosition)		// just in case user is changing size of page while loading
			.resize(school_resetPosition);
		function school_resetPosition() {
			// requires jquery.dimension plugin
			var offset = $input.offset();
			$results.css({
				top: $input.position().top + $input.height()+12,
				left: $input.position().left
			});
		}
		
	};

	$.fn.schoolSuggest = function(source, _options) {
		if (!source){
	    	return;
	}
	_options = _options || {};
	_options.source = source;
	_options.hot_list=_options.hot_list || [];
	_options.delay = _options.delay || 0;
	_options.resultsClass = _options.resultsClass || 'ac_results';
	_options.selectClass = _options.selectClass || 'ac_over';
	_options.matchClass = _options.matchClass || 'ac_match';
	_options.minchars = _options.minchars || 1;
	_options.delimiter = _options.delimiter || '\n';
	_options.onSelect = _options.onSelect || false;
	_options.dataDelimiter = _options.dataDelimiter || '\t';
	_options.dataContainer = _options.dataContainer || '#SuggestResult';
	_options.attachObject = _options.attachObject || null;
	
	
	school_options=_options;
	this.each(function() {
	    new $.schoolSuggest(this, school_options);
	});
	
	return this;
		
	};
		
 })(jQuery);

