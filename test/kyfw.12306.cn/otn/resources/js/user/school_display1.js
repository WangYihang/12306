
var aPageNo=0;
var pagecount=0;
var curPageIndex=0;
var array_school_filter=[];// 当前搜索结果
var array_school_showing=[];// 显示中的城市
var onSelect=false;
var fliped_flag=false; //翻页标志，true=不触发$input.focus

//根据pageNo显示数据
function outterDisplayItems(_aPageNo){
	aPageNo=_aPageNo;
	//alert(aPageNo);
	

	$results = $('#schoolNameSuggest'); 
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
		//city_Bind( array_school_showing );
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
	//if( $("#form_cities").css("display")=="block" ) curObj.focus();
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
	html = suggest_tip + '<ul>' + html +flipHtml+ '</ul>';
	
	$results.html(html).show();
	$results.children('ul').children('li:first-child').addClass('ac_over');
	
	$results.children('ul')
		.children('li')
		.mouseover(function() {
			$results.children('ul').children('li').removeClass('ac_over');
			$(this).addClass('ac_over');
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
			$results.width(initWidth +18);
			//$results.height(initHeight +15);
		}
		fliped_flag=true;
		$("#schoolNameText").focus();
	} catch(e) { 
	}
	
	
	
}

	

function school_selectCurrentResult() {
	var $input = $("#schoolNameText");
	$currentResult = school_getCurrentResult();

	if ($currentResult) {
		$input.val($currentResult.children('a').html().replace(/<span>.+?<\/span>/i,''));
		$results.hide();

		if( $('#schoolCode') ) {
			// jombo edited the text value from rel to stationTelecode
			$('#schoolCode').val($currentResult.attr('stationtelecode'));
		}

		if (onSelect) {
			onSelect.apply($input[0]);
		}
	}

}

function school_getCurrentResult() {
	
	if (!$results.is(':visible'))
		return false;

	var $currentResult = $results.children('ul').children('li.' + 'ac_over');
	if (!$currentResult.length)
		$currentResult = false;
		
	return $currentResult;

}
