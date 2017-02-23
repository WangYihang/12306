	(function($) {
		var preference_from_station_suggest = null;
		var isMustInput = false;
		$.suggest = function(input, options) {
	
			var $input = $(input).attr("autocomplete", "off");
			var $results;
          //  var framestr='<iframe src="" style="border:none;position:absolute; visibility:inherit; top:0px; left:0px; width:100%; height:100%; z-index:-1; filter=progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0);"></iframe>';
			var timeout = false;		// hold timeout ID for suggestion results to appear	
			var prevLength = 0;			// last recorded length of $input.val()
			var cache = [];				// cache MRU list
			var cacheSize = 0;			// size of cache in chars (bytes?)
			
			//if($.trim($input.val())=='' || $.trim($input.val())=='请输入') $input.val('请输入').css('color','#aaa');
			if( ! options.attachObject )
				options.attachObject = $(document.createElement("ul")).appendTo('body');

			$results = $(options.attachObject);
			$results.addClass(options.resultsClass);
			resetPosition();
			$(window)
				.load(resetPosition)		// just in case user is changing size of page while loading
				.resize(resetPosition);

			$(document).click(function(event) {
				if(event.target ==input){
					return ;
				}
				setTimeout(function() { $results.hide(); }, 200);
				 
				if($.trim($(input).val())!=""&&$.trim($(options.dataContainer).val())!=""){
				}else{
					if($.trim($input.val())=='简码/汉字'){
						
					}else{
					$(input).val("");
					$(options.dataContainer).val("");
					}
				}
				
			});
			
			$input.focus(function(){
				$(input).val("");
				$(options.dataContainer).val("");
				/**
				if($.trim($(this).val())=='请输入'){
					$(this).val('').css('color','#000');
				}
				if($.trim($(this).val())==''){
					displayItems('');//显示热门城市列表
				}
				**/
			});
			$input.click(function(event){
				$(this).val("");
				$(options.dataContainer).val("");
//				var q=$.trim($(this).val());
//				displayItems(q);
				$(this).select();
			});

			$input.keyup(processKey);
			
			function resetPosition() {
				// requires jquery.dimension plugin
				var offset = $input.offset();
				$results.css({
					top: (offset.top + input.offsetHeight) + 'px',
					left: offset.left + 'px'
				});
			}
			
			function processKey(e) {
				if(isMustInput&&$input.val().length<2){
					return;
				}
				var from_station_name = $input.val();
				if(from_station_name != "" && from_station_name.length > 1) {
					//异步请求优惠发站城市名称
					$.ajax({
						url : ctx+'/order/querySingleAction.do?method=getStationName',
						type : "POST",
						data:{from_station_name : from_station_name},
						dataType : "json",
						success : function(data, textStatus) {
							options.source = data;
							options.hot_list = data;
						},
						error : function(e) {
						}
					});
				}
				// handling up/down/escape requires results to be visible
				// handling enter/tab requires that AND a result to be selected
				if ((/27$|38$|40$/.test(e.keyCode) && $results.is(':visible')) ||
					(/^13$|^9$/.test(e.keyCode) && getCurrentResult())) {
		            
		            if (e.preventDefault)
		                e.preventDefault();
					if (e.stopPropagation)
		                e.stopPropagation();

	                e.cancelBubble = true;
	                e.returnValue = false;
				
					switch(e.keyCode) {
	
						case 38: // up
							prevResult();
							break;
				
						case 40: // down
							nextResult();
							break;
						case 13: // return
							selectCurrentResult();
							break;
							
						case 27: //	escape
							$results.hide();
							break;
					}
					
				} else {

					if (timeout) 
						clearTimeout(timeout);
					timeout = setTimeout(suggest, options.delay);
					prevLength = $input.val().length;
				}			
			}
			
			function suggest() {
				$input.val($input.val().toUpperCase()); 
				var q = $.trim($input.val());
				displayItems(q);
			}		
			function displayItems(items) {
				if(isMustInput&&$input.val().length<2){
					return;
				}
				$results.empty();
				var html = '';
				if (items=='') {//热门城市遍历
					for(h in options.hot_list){
						html+='<li  stationtelecode="'+options.hot_list[h].stationTelecode+'"><a href="#'+h+'">'+options.hot_list[h].chineseName+'</a></li>';
						/**
						if(h>15){
							break;
						}
                        **/
					}
					html='<div class="gray ac_result_tip">输入或选择 </div><ul>'+html+'</ul>';
				}
				else {
					/*if (!items)
					return;
					if (!items.length) {
						$results.hide();
						return;
					}*/
					for (var i = 0; i < options.source.length; i++) {//国内城市匹配
						var reg = new RegExp('^' + items + '.*$', 'im');
						if ( reg.test(options.source[i].chineseName) || reg.test(options.source[i].allPin) || reg.test(options.source[i].simplePin)) {
							html += '<li  stationtelecode="'+options.hot_list[i].stationTelecode+'"><a href="#' + i + '" >' + options.source[i].chineseName + '</a></li>';
						}
					}
					if (html == '') {
						suggest_tip = '<div class="gray ac_result_tip">对不起，找不到：' + items +'</div>';
					}
					else {
						suggest_tip = '<div class="gray ac_result_tip">输入或选择</div>';
					}
					html = suggest_tip + '<ul>' + html + '</ul>';
				}

				$results.html(html).show();
				$results.children('ul').children('li:first-child').addClass(options.selectClass);
				
				$results.children('ul')
					.children('li')
					.mouseover(function() {
						$results.children('ul').children('li').removeClass(options.selectClass);
						$(this).addClass(options.selectClass);
					})
					.click(function(e) {
						e.preventDefault(); 
						e.stopPropagation();
						selectCurrentResult();
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
				} catch(e) { 
				}
			}
						
			function getCurrentResult() {
			
				if (!$results.is(':visible'))
					return false;
			
				var $currentResult = $results.children('ul').children('li.' + options.selectClass);
				if (!$currentResult.length)
					$currentResult = false;
					
				return $currentResult;

			}
			
			function selectCurrentResult() {
			
				$currentResult = getCurrentResult();
			
				if ($currentResult) {
					$input.val($currentResult.children('a').html().replace(/<span>.+?<\/span>/i,''));
					$results.hide();

					if( $(options.dataContainer) ) {
						// jombo edited the text value from rel to stationTelecode
						$(options.dataContainer).val($currentResult.attr('stationtelecode'));
					}
	
					if (options.onSelect) {
						options.onSelect.apply($input[0]);
					}
				}
			}
			
			function nextResult() {
			
				$currentResult = getCurrentResult();
			
				if ($currentResult)
					$currentResult
						.removeClass(options.selectClass)
						.next()
							.addClass(options.selectClass);
				else
					$results.children('ul').children('li:first-child').addClass(options.selectClass);
			
			}
			
			function prevResult() {
			
				$currentResult = getCurrentResult();
			
				if ($currentResult)
					$currentResult
						.removeClass(options.selectClass)
						.prev()
							.addClass(options.selectClass);
				else
					$results.children('ul').children('li:last-child').addClass(options.selectClass);
			
			}
	
		}
		
		$.fn.suggest = function(source, options) {
		
			if (!source){
			    	return;
			}
			options = options || {};
			options.source = source;
			options.hot_list=options.hot_list || [];
			options.delay = options.delay || 1000;
			options.resultsClass = options.resultsClass || 'ac_results';
			options.selectClass = options.selectClass || 'ac_over';
			options.matchClass = options.matchClass || 'ac_match';
			options.minchars = options.minchars || 1;
			options.delimiter = options.delimiter || '\n';
			options.onSelect = options.onSelect || false;
			options.dataDelimiter = options.dataDelimiter || '\t';
			options.dataContainer = options.dataContainer || '#SuggestResult';
			options.attachObject = options.attachObject || null;
            isMustInput = options.isMustInput || false;
			this.each(function() {
				new $.suggest(this, options);
			});
			return this;
		};
	})(jQuery);