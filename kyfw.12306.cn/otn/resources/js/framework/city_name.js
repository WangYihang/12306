(function ($) {
	
  jQuery.extend({
    ht_getcookie:function(name){
	   var cookie_start = document.cookie.indexOf(name);
	   var cookie_end = document.cookie.indexOf(";", cookie_start);
	   return cookie_start == -1 ? '' : unescape(document.cookie.substring(
				cookie_start + name.length + 1,
				(cookie_end > cookie_start ? cookie_end
						: document.cookie.length)));	
	},
	ht_setcookie:function(cookieName, cookieValue, seconds, path, domain,secure) {
	   var expires = new Date();
	   expires.setTime(expires.getTime() + seconds * 1000);
	   document.cookie = escape(cookieName) + '=' + escape(cookieValue)
			  + (expires ? '; expires=' + expires.toGMTString() : '')
			  + (path ? '; path=' + path : '; path=/')
			  + (domain ? '; domain=' + domain : '')
			  + (secure ? '; secure' : '');
	},
	textFocus:function(v){ 
		var range,len,v=v===undefined?0:parseInt(v); 
		this.each(function(){ 
			if(!this.setSelectionRange){ 
				range=this.createTextRange(); //文本框创建范围 
				v===0?range.collapse(false):range.move("character",v); //范围折叠 
				range.select(); //选中 
			}else{ 
				len=this.value.length;
				v===0?this.setSelectionRange(len,len):this.setSelectionRange(v,v); 
			} 
			this.focus(); 
		}); 
		return this; 
	}
  });
  
  var array_cities = [];// 完整城市列表
  var fav_cities = [];// 常用城市列表
  var array_cities_filter = [];// 当前搜索结果
  var array_cities_showing = [];// 显示中的城市
  var sugSelectItem = 0;// 选中项目
  var sugSelectItem2 = 0;// 选中项目
  var sugSelectTurn = 0;// 显示中选中项的序号
  var citySelected = 0;// 选中城市[SHIJIAZHUANG, 石家庄, 1301]
  var cityfield_focused = false;// 输入框是否获得焦点
  var mousedownOnPanel = false;// 鼠标按在小菜单上
  var mousedownOnPanel2 = false;// 鼠标按在大菜单上
  var curPageIndex = 0;// 当前分页序号
  var curObj = null; // 当前作用对象
  var cur = -1;
  var liarray_cities = {};
  var liarray_cities1 = [];// 城市列表
  var liarray_cities2 = [];
  var liarray_cities3 = [];
  var liarray_cities4 = [];
  var liarray_cities5 = [];
  
  var city_name_character = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z");
  //计算每页数量用
  var count_num = [];
  var count_num_flag = false
  
  var liarray_cities_array = [];
  for(var k=0;k<26;k++){
	  liarray_cities_array[k] =[];
  }
  
  var list_stations = [];
  for(var i=0;i<5;i++)
  {
	  list_stations[i]=[];
  }
  
  var ularray_cities_showing1 = [];// 显示中的城市
  var ularray_cities_showing2 = [];// 显示中的城市
  var ularray_cities_showing3 = [];// 显示中的城市
  var ularray_cities_showing4 = [];// 显示中的城市
  var ularray_cities_showing5 = [];// 显示中的城市
  var ularray_cities_showing  = [];
  var isClick = false;
  var loadJsFlag = true;
  var ulPageSize = 12;// 全部城市大列表中每页显示的城市个数
  var _12306_top_show_value="简码/汉字";//简拼/全拼/汉字
  var _12306_top_4_initInput="简码/汉字";//简拼/全拼/汉字或↑↓
  var _12306_selected_class='inp-txt_select';
  var _12306_unselected_class='inp-txt';
  var _12306_openFavorite=false;
  //选中值回调
  var confirmCallBack=null;
  //自定义位置
  var setPosition=null;
  //是否包含cookie信息
  var cookie_false=false;

  var favcityID = $.ht_getcookie("hj_favcity");
  $.stationFor12306={
	//绑定id集合 
	bindInputs:[],
	get_initInputValue:function(){
		return _12306_top_show_value;
	},
	get_initTopInputValue:function(){
		return _12306_top_4_initInput;
	},
	//TODO 显示给定的城市列表片段
	city_Bind:function(acitylist){
		if (acitylist.length == 0)
			return;
		var tHtml = "";
		$.each(acitylist, function(aIndex) {
			if (favcityID == acitylist[aIndex][2])
				tHtml += "<div class='cityline' id='citem_" + aIndex
						+ "' cturn='" + acitylist[aIndex][6]
						+ "'><span class='ralign'><b>" + acitylist[aIndex][1]
						+ "</b></span></div>\n";
			else
				tHtml += "<div class='cityline' id='citem_" + aIndex
						+ "' cturn='" + acitylist[aIndex][6]
						+ "'><span class='ralign'>" + acitylist[aIndex][1]
						+ "</span><span style='float:right;' class='ralign'>" + acitylist[aIndex][3]
						+ "</span></div>\n";
		});
		$('#panel_cities').html(tHtml);
		$('.cityline').mouseover(function() {
			$.stationFor12306.city_shiftSelect(this);
		}).click(function() {
			$.stationFor12306.city_confirmSelect();
			// 空条件过滤出所有城市列表
			array_cities_filter = $.stationFor12306.filterCity("");
			$.stationFor12306.city_showlist(0);
		});
		$.stationFor12306.city_shiftSelect($("#citem_0"));	
	},
	//TODO 移动当前选中项
	city_changeSelectIndex:function(aStep){
		var asugSelectTurn = sugSelectTurn + aStep;
		if (asugSelectTurn == -1) {
			$.stationFor12306.city_showlist(curPageIndex - 1);
			$.stationFor12306.city_shiftSelect($("#citem_" + (array_cities_showing.length - 1)));
		} else if (asugSelectTurn == array_cities_showing.length) {
			$.stationFor12306.city_showlist(curPageIndex + 1);
			$.stationFor12306.city_shiftSelect($("#citem_0"));
		} else {
			$.stationFor12306.city_shiftSelect($("#citem_" + asugSelectTurn));
		}
	},
	//TODO 确认选择
	city_confirmSelect:function(){
		curObj.val(citySelected[1]);
		curObjCode.val(citySelected[2]);
		if(_12306_openFavorite){
		   $.stationFor12306.setStationInCookies(citySelected[1],citySelected[2]);
		}
		$("#form_cities").css("display", "none");
		$("#form_cities2").css("display", "none");
		$("#form_cities3").css("display", "none");
		cur = -1;
		sugSelectItem2 = 0;
		$.stationFor12306.setStationStyle();
		if (loadJsFlag) {
			$.stationFor12306.LoadJS(citySelected[2]);
		}
		if(confirmCallBack){
			confirmCallBack(curObj,curObjCode);
		}
	},
	//TODO 指定新的选中项，恢复旧项
	city_shiftSelect:function(atarget){
		if (sugSelectItem != atarget) {
			if (sugSelectItem != 0)
				$(sugSelectItem).removeClass('citylineover').addClass(
						'cityline').css("backgroundColor", "white");
			if (atarget != 0) {
				try {
					sugSelectItem = atarget;
					var city_j = $(sugSelectItem).removeClass('cityline')
							.addClass('citylineover').css("backgroundColor",
									"#c8e3fc");
					sugSelectTurn = Number(city_j.attr('id').split("_")[1]);
					citySelected = array_cities[Number(city_j.attr('cturn'))];
					$("#cityid").val(citySelected[2]);
				} catch (e) {
				}
			}
		}
	},
	//TODO 指定新的选中项，恢复旧项
	city_shiftSelectInLi:function(atarget) {
		if (sugSelectItem2 != atarget) {
			if (sugSelectItem2 != 0)
				$(sugSelectItem2).removeClass('ac_over').addClass('ac_odd');
			if (atarget != 0) {
				try {
					sugSelectItem2 = atarget;
					$(sugSelectItem2).removeClass('ac_odd').addClass('ac_over');
				} catch (e) {
				}
			}
		}
	},
	//TODO tab栏点击事件
	js:function (el) {
		var i;
		//先取消高亮
		for (i = 1; i <= 7; i++) {
			if($("#nav_list" + i).attr('class')){
				$("#ul_list" + i).css("display", "none");
				$("#nav_list" + i).removeClass("action");
			}
		}
		for (i = 1; i <= 7; i++) {
			if (i == el) {
				$("#ul_list" + i).css("display", "block");
				$("#nav_list" + i).addClass("action");
				if (i == 1||i==7) {
					$("#flip_cities2").css("display", "none");
				}
				if (i > 1&&i<7) {
					var totelLength = $.stationFor12306.tHtmlGetCityName(el - 1, -1, 0);
					if (totelLength > ulPageSize) {
						// 取分页数据
						var pagecount = Math.ceil(totelLength / ulPageSize);
						if (pagecount > 1) {
							$.stationFor12306.pageDesigh(pagecount, 0, i);
						}
						$("#flip_cities2").css("display", "block");
					} else {
						$("#flip_cities2").css("display", "none");
					}
				}else{
					curObj.focus();
				}
			} else {
				$("#ul_list" + i).css("display", "none");
				$("#nav_list" + i).removeClass("action");
			}
		}
		//事件丢失问题
		if(1!=el){
			$('.ac_even').on('mouseover', function() {
				 $.stationFor12306.city_shiftSelectInLi(this);
			}).on('click', function() {
				curObj.val($(this).text());
				curObjCode.val($(this).attr("data"));
				if(_12306_openFavorite)
				  $.stationFor12306.setStationInCookies($(this).text(),$(this).attr("data"));
				$("#form_cities2").css("display", "none");
				cur = -1;
				sugSelectItem2 = 0;
				$.stationFor12306.setStationStyle();
				if (loadJsFlag) {
					$.stationFor12306.LoadJS($(this).attr("data"));
				}
				if(confirmCallBack){
					confirmCallBack(curObj,curObjCode);
				}
			});
		}
	},
	//TODO
	tHtmlGetCityName:function (nod, at, aPageNo) {
		switch (nod) {
		case 0:
			if (at == -1) {
				return fav_cities.length;
			}
			if (at == -2) {
				return fav_cities;
			}
			return fav_cities[at];
			break;
		case 1:
			if (at == -1) {
				return liarray_cities_array[3].length;
			}
			if (at == -2) {
				return liarray_cities1;
			}
			if (liarray_cities1.length > ulPageSize) {
				// 取分页数据
				var pagecount = Math.ceil((liarray_cities1.length)
						/ ulPageSize);
				if (pagecount > 1) {
					ularray_cities_showing1 = liarray_cities1.slice(ulPageSize
							* (aPageNo), Math.min(ulPageSize * (aPageNo + 1),
							liarray_cities1.length));
					return ularray_cities_showing1[at];
				}
			}
			return liarray_cities1[at];
			break;
		case 2:
			if (at == -1) {
				return liarray_cities_array[7].length;
			}
			if (at == -2) {
				return liarray_cities2;
			}
			if (liarray_cities2.length > ulPageSize) {
				// 取分页数据
				var pagecount = Math.ceil((liarray_cities2.length)
						/ ulPageSize);
				if (pagecount > 1) {
					ularray_cities_showing2 = liarray_cities2.slice(ulPageSize
							* (aPageNo), Math.min(ulPageSize * (aPageNo + 1),
							liarray_cities2.length));
					return ularray_cities_showing2[at];
				}
			}
			return liarray_cities2[at];
			break;
		case 3:
			if (at == -1) {
				return liarray_cities_array[11].length;
			}
			if (at == -2) {
				return liarray_cities3;
			}
			if (liarray_cities3.length > ulPageSize) {
				// 取分页数据
				var pagecount = Math.ceil((liarray_cities3.length)
						/ ulPageSize);
				if (pagecount > 1) {
					ularray_cities_showing3 = liarray_cities3.slice(ulPageSize
							* (aPageNo), Math.min(ulPageSize * (aPageNo + 1),
							liarray_cities3.length));
					return ularray_cities_showing3[at];
				}
			}
			return liarray_cities3[at];
			break;
		case 4:
			if (at == -1) {
				return liarray_cities_array[18].length;
			}
			if (at == -2) {
				return liarray_cities4;
			}
			if (liarray_cities4.length > ulPageSize) {
				// 取分页数据
				var pagecount = Math.ceil((liarray_cities4.length)
						/ ulPageSize);
				if (pagecount > 1) {
					ularray_cities_showing4 = liarray_cities4.slice(ulPageSize
							* (aPageNo), Math.min(ulPageSize * (aPageNo + 1),
							liarray_cities4.length));
					return ularray_cities_showing4[at];
				}
			}
			return liarray_cities4[at];
			break;
		case 5:
			if (at == -1) {
				return liarray_cities_array[24].length;
			}
			if (at == -2) {
				return liarray_cities5;
			}
			if (liarray_cities5.length > ulPageSize) {
				// 取分页数据
				var pagecount = Math.ceil((liarray_cities5.length)
						/ ulPageSize);
				if (pagecount > 1) {
					ularray_cities_showing5 = liarray_cities5.slice(ulPageSize
							* (aPageNo), Math.min(ulPageSize * (aPageNo + 1),
							liarray_cities5.length));
					return ularray_cities_showing5[at];
				}
			}
			return liarray_cities5[at];
			break;
		default:
			return "error";
			break;
		}
	},
	//TODO
	closeShowCity:function () {
		$("#form_cities2").css("display", "none");
		cur = -1;
		sugSelectItem2 = 0;
		$.each($.stationFor12306.bindInputs,function(n,value) { 
			var hidenTextInput="#"+value;
			var textInput="#"+value+"Text";
			var textValue=$(textInput).val();
			if (""==textValue) {
				$(textInput).val(_12306_top_show_value);
				$.stationFor12306.from_to_station_class_gray($(textInput));
				$(hidenTextInput).val("");
			}
		}); 
	},
	//TODO
	showAllCity:function () {
		// $("#form_cities2").css("display","none");
		var tHtml = "";
		// tHtml = '<div style="position: absolute; z-index: 2000; top: 140px; left:138.5px;" winstyle="hot">'
		var _width='440px';
		if(_12306_openFavorite){
			_width='400px';
		}
		tHtml = '<div class="com_hotresults" id="thetable" style="width:'+_width+'">'
				+ '<div style="width:100%;">'
				+ '<div class="ac_title">'
				+ '<span>'
				+ '拼音支持首字母输入'
				+ '</span>'
				+ '<a class="ac_close" style="cursor:pointer" title="关闭" onclick="$.stationFor12306.closeShowCity()"></a>'
				+ '</div>'

				//js() line183
				+ '<ul class="AbcSearch clx" id="abc">';
		if(_12306_openFavorite){
			tHtml = tHtml +'<li class="action" index="7" method="liHotTab"  onclick="$.stationFor12306.js(7)" id="nav_list7">常用</li>';
		}
		tHtml = tHtml + '<li index="1" method="liHotTab"  onclick="$.stationFor12306.js(1)" id="nav_list1">热门</li>'
				+ '<li index="2" method="liHotTab"  onclick="$.stationFor12306.js(2)" id="nav_list2">ABCDE</li>'
				+ '<li index="3" method="liHotTab"  onclick="$.stationFor12306.js(3)" id="nav_list3">FGHIJ</li>'
				+ '<li index="4" method="liHotTab"  onclick="$.stationFor12306.js(4)" id="nav_list4">KLMNO</li>'
				+ '<li index="5" method="liHotTab"  onclick="$.stationFor12306.js(5)" id="nav_list5">PQRST</li>'
				+ '<li index="6" method="liHotTab"  onclick="$.stationFor12306.js(6)" id="nav_list6">UVWXYZ</li>'
				+ '</ul>';

				if(_12306_openFavorite){
					tHtml += '<ul class="popcitylist" style="overflow: auto;max-height: 280px;height: 191px;" method="hotData" id="ul_list7">';
			        var cookieStations=$.stationFor12306.getStationInCookies();
			        var cookieSize=cookieStations.length;
			        if(cookieSize>2){
			        	cookie_false=true;
			        	for ( var b = 0; b < cookieSize; b++) {
							tHtml += '<li class="ac_even"   title="'
									+  cookieStations[b][0] + '" data="'
									+  cookieStations[b][1] + '">'
									+  cookieStations[b][0] + '</li>';
						}
			        }
					tHtml += '</ul>';	
				}
				tHtml += '<ul class="popcitylist" style="overflow: auto;max-height: 280px;height: 191px;display:none;" method="hotData" id="ul_list1">';
				var favTotelLength = $.stationFor12306.tHtmlGetCityName(0, -1, 0);
				var _openClass='';
				if(!_12306_openFavorite){
					_openClass=' openLi';
				}
				for ( var b = 0; b < favTotelLength; b++) {
					tHtml += '<li class="ac_even'+_openClass+'"   title="'
							+  $.stationFor12306.tHtmlGetCityName(0, b, 0)[1] + '" data="'
							+  $.stationFor12306.tHtmlGetCityName(0, b, 0)[2] + '">'
							+  $.stationFor12306.tHtmlGetCityName(0, b, 0)[1] + '</li>';
				}
				tHtml += '</ul>';

		for ( var a = 2; a <= 6; a++) {
			var c = a - 1;
			var totelLength =  $.stationFor12306.tHtmlGetCityName(c, -1, 0);
			if (totelLength > ulPageSize) {
				// 取分页数据
				var pagecount = Math.ceil((totelLength) / ulPageSize);
				if (pagecount > 1) {
					tHtml += '<div id="ul_list'
						+ a + '">';
					 $.stationFor12306.pageDesigh(pagecount, 0, a);
				}
				$("#flip_cities2").css("display", "block");
			} else {
				tHtml += '<ul  class="popcitylist" style="overflow: auto; max-height: 260px; height: 191px;display:none;" id="ul_list'
						+ a + '">';
				$("#flip_cities2").css("display", "none");
				var _openClass='';
				if(!_12306_openFavorite){
					_openClass=' openLi';
				}
				for ( var b = 0; b <  $.stationFor12306.tHtmlGetCityName(c, -1, 0); b++) {
					tHtml += '<li class="ac_even'+_openClass+'"   title="'
							+  $.stationFor12306.tHtmlGetCityName(c, b, 0)[1] + '" data="'
							+  $.stationFor12306.tHtmlGetCityName(c, b, 0)[2] + '">'
							+  $.stationFor12306.tHtmlGetCityName(c, b, 0)[1] + '</li>';
				}
			}
			tHtml += '</div>';
		}

		tHtml += '<div id="flip_cities2"> 翻页控制区</div>';
		tHtml += '</div>';
		$('#panel_cities2').html(tHtml);

		$('#thetable').on("click",function() {
			if ($("#form_cities2").css("display") == "block") {
				if (cur == 1 | cur == 0) {
					cur == -1;
				}
				curObj.select();
			}
		});
		$('#form_cities').on("click",function() {
			if ($("#form_cities").css("display") == "block") {
				if (cur == 1 | cur == 0) {
					cur == -1;
				}
				curObj.select();
			}
		});
		$('.ac_even').on('mouseover', function() {
			 $.stationFor12306.city_shiftSelectInLi(this);
		}).on('click', function() {
			curObj.val($(this).text());
			curObjCode.val($(this).attr("data"));
			if(_12306_openFavorite)
			  $.stationFor12306.setStationInCookies($(this).text(),$(this).attr("data"));
			$("#form_cities2").css("display", "none");
			cur = -1;
			sugSelectItem2 = 0;
			$.stationFor12306.setStationStyle();
			if (loadJsFlag) {
				$.stationFor12306.LoadJS($(this).attr("data"));
			}
			if(confirmCallBack){
				confirmCallBack(curObj,curObjCode);
			}
		});

		$("#flip_cities2").css("display", "none");
		return array_cities;
	},
	//TODO
	LoadJS:function (file) {

		if (((typeof (mm_addjs) != "undefined")) && ('' != mm_addjs)
				&& (mm_addjs == 1)) {
			var head = document.getElementsByTagName('HEAD').item(0);
			var script = document.createElement('SCRIPT');
			script.src = mm_srcjs + file + ".js";
			script.type = "text/javascript";
			head.appendChild(script);
		}
	},
	//TODO
	addZMHtml:function(data,_openClass){
		var ulHtml =''
		if(data&&data.length>0){
			var firstZm = data[0][0].charAt(0);
			ulHtml +='<ul  class="popcitylist" style="overflow: auto; max-height: 260px; " >';
			ulHtml += '<li class="ac_letter">' + firstZm.toUpperCase() + '</li>';
			for ( var b = 0; b < 12; b++) {
				var show = data[b];
				if(show){
					ulHtml += '<li class="ac_even'+_openClass+'"   title="' + show[1]
					+ '" data="' + show[2] + '">' + show[1] + '</li>';
				}else{
					ulHtml += '<li class="ac_even'+_openClass+'" </li>';
				}
			}
			ulHtml +='</ul>';
		}
		return ulHtml;
	},
	pageDesigh:function (pagecount, aPageNo, idIndex) {
		var ulHtml = "";
		if (pagecount > 1) {
			if (aPageNo == -1)
				aPageNo = (pagecount - 1);
			else if (aPageNo == pagecount)
				aPageNo = 0;

			var _openClass='';
			if(!_12306_openFavorite){
				_openClass=' openLi';
			}
			
			for(var k =2 ; k<=6 ; k++){
				if(k==idIndex){
					var array = list_stations[k-2];
					for(var kk=0;kk<array.length;kk++){
						ularray_cities_showing = array[kk].slice(aPageNo*ulPageSize,(aPageNo+1)*ulPageSize);
						ulHtml += $.stationFor12306.addZMHtml(ularray_cities_showing,_openClass);
					}
				}
			}
			$("#ul_list" + idIndex).html(ulHtml);
			$("#ul_list" + idIndex).css('height',270)
			if(ulHtml){
				var flipHtml = (aPageNo == 0) ? "&laquo;&nbsp;上一页"
						: "<a style='cursor:pointer'    class='cityflip' onclick='$.stationFor12306.pageDesigh(" + pagecount
								+ ',' + (aPageNo - 1) + ',' + idIndex
								+ ");return false;'>&laquo;&nbsp;上一页</a>";
				flipHtml += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;";
				flipHtml += (aPageNo == pagecount - 1) ? "下一页&nbsp;&raquo;"
						: "<a style='cursor:pointer' class='cityflip'  onclick='$.stationFor12306.pageDesigh("
								+ pagecount + "," + (aPageNo + 1) + "," + idIndex
								+ ")'>下一页&nbsp;&raquo;</a>";
				$("#flip_cities2").html(flipHtml);
			}else{
				$("#flip_cities2").html('');
			}

			if (cur == 1|cur == 0|cur == 2) {
				cur == -1;
			}
			if(curObj)
			  curObj.select();

		} else {
			// $("#flip_cities2").css("display", "none");
		}
		//事件丢失问题
		$('.ac_even').on('mouseover', function() {
			 $.stationFor12306.city_shiftSelectInLi(this);
		}).on('click', function() {
			curObj.val($(this).text());
			curObjCode.val($(this).attr("data"));
			if(_12306_openFavorite){
			   $.stationFor12306.setStationInCookies($(this).text(),$(this).attr("data"));
			}
			$("#form_cities2").css("display", "none");
			cur = -1;
			sugSelectItem2 = 0;
			$.stationFor12306.setStationStyle();
			if (loadJsFlag) {
				$.stationFor12306.LoadJS($(this).attr("data"));
			}
			if(confirmCallBack){
				confirmCallBack(curObj,curObjCode);
			}
		});
	},
	//TODO 搜索符合关键字的城市
	filterCity:function (aKeyword) {
		if (aKeyword.length == 0) {
			$("#top_cities").html(_12306_top_4_initInput);
			return array_cities;
		}
		//过滤html标签
		var reg=/<\/?[^>]*>/g;
		aKeyword = aKeyword.replace(reg,'');
		var aList = [];
		var isPinyin = /[^A-z]/.test(aKeyword);
		for ( var i = 0; i < array_cities.length; i++) {
			if ($.stationFor12306.isMatchCity(array_cities[i], aKeyword, isPinyin))
				aList.push(array_cities[i]);
		}
		if (aList.length > 0) {
			$("#top_cities").html(
					"按\"<font color=red>" + aKeyword + "</font>\"检索：");
			return aList;
		} else {
			$("#top_cities").html(
					"无法匹配:<font color=red>" + aKeyword + "</font>");
			return [];
		}
	},
	//TODO
	replaceChar:function (astring, aindex, raha) {
		return astring.substr(0, aindex) + raha
				+ astring.substr(aindex + 1, astring.length - 1);
	},
	//TODO 判断某城市是否符合搜索条件,只要拼音或中文顺序包含排列关键词字符元素即可
	isMatchCity:function (aCityInfo, aKey, aisPinyin) {
		var aKey = aKey.toLowerCase();

		var aInfo = [ aCityInfo[4].toLowerCase(), aCityInfo[1],
				aCityInfo[3].toLowerCase() ];
		// aCityInfo [bjb,北京北,VAP,beijing,bjb,0]
		// 是否含有汉字
		var lastIndex = -1;
		var lastIndex_py = -1;
		if (aisPinyin) {
			aKey = aKey.split("");
			for ( var m = 0; m < aKey.length; m++) {
				var newIndex = aInfo[1].indexOf(aKey[m]);
				if (newIndex > lastIndex && newIndex <= m) {// newIndex<=m 即左匹配
					aInfo[1] = $.stationFor12306.replaceChar(aInfo[1], newIndex, "-");
					lastIndex = newIndex;
				} else {
					return false;
				}
			}
		} else { // 处理拼音的
			aKey = aKey.split("");
			var yesOrNoJm = true;// 简码校验
			var yesOrNoPy = true;// 拼音校验

			// 按简码检索
			for ( var m = 0; m < aKey.length; m++) {
				var newIndex = aInfo[0].indexOf(aKey[m]);
				if (newIndex > lastIndex && newIndex <= m) {
					aInfo[0] = $.stationFor12306.replaceChar(aInfo[0], newIndex, "-");
					lastIndex = newIndex;
				} else {
					yesOrNoJm = false;
					break;
				}
			}

			// 按拼音检索
			for ( var m = 0; m < aKey.length; m++) {
				var newIndex_py = aInfo[2].indexOf(aKey[m]);
				if (newIndex_py > lastIndex_py && newIndex_py <= m) {
					aInfo[2] = $.stationFor12306.replaceChar(aInfo[2], newIndex_py, "-");
					lastIndex_py = newIndex_py;
				} else {
					yesOrNoPy = false;
					break;
				}
			}
			if ((yesOrNoJm == false) && (yesOrNoPy == false)) {
				return false;
			}
		}
		return true;
	},
	///分页下方数字
	city_showlist_page : function(aPageNo,pagecount){
		var html='';
		html +='<div class="citypage">';
		html += (aPageNo == 0) ? ''/*'<a style="cursor:auto;" href="" class="pagetxt"><<</a>'*/
				: '<a href="#" class="pagetxt" onclick="$.stationFor12306.city_showlist('
						+ (aPageNo - 1)
						+ ');return false;"><<</a>';
		var curr = aPageNo+1; //当前 
	    var max = pagecount; //最大页数     
	    var diff = 2; //页差         
	    var show = 5; //显示页数   
	    var start = (curr - diff) > 0 ? (curr + diff > max ? max - show + 1 : curr - diff) : 1; //开始页数
	    var end = start + show > max ? max + 1 : start + show; //结束页数
	    if (max < show) {//最大页数小于显示页数   
	        for (var i = 1; i < max + 1; i++) {
	            if (curr == i) {
	            	html += "<a href='' class='cur' onclick='$.stationFor12306.city_showlist("
						+ (i-1)
						+ ");return false;'>"+(i)+"</a>";
	            } else {
	            	html += "<a href='' onclick='$.stationFor12306.city_showlist("
						+ (i-1)
						+ ");return false;'>"+(i)+"</a>";
	            }
	        }
	    }
	   else {
	        for (var i = start; i < end; i++) {
	            if (curr == i) {
	            	html += "<a href='' class='cur' onclick='$.stationFor12306.city_showlist("
						+ (i-1)
						+ ");return false;'>"+(i)+"</a>";
	            } else {
	            	html += "<a href='' onclick='$.stationFor12306.city_showlist("
						+ (i-1)
						+ ");return false;'>"+(i)+"</a>";
	            }
	        }
	    }
		html += (aPageNo == pagecount - 1) ? ''/*'<a style="cursor:auto;" href="" class="pagetxt">>></a>'*/
					: '<a href="" class="pagetxt" onclick="$.stationFor12306.city_showlist('
							+ (aPageNo + 1)
							+ ');return false;">>></a>';
		html +='</div>';
		return html;
	},
	//TODO 显示当前城市列表中的指定分页
	city_showlist:function (aPageNo) {
		if (array_cities_filter.length > 6) {
			// 取分页数据
			var pagecount = Math.ceil((array_cities_filter.length) / 6);
			if (aPageNo == -1)
				aPageNo = (pagecount - 1);
			else if (aPageNo == pagecount)
				aPageNo = 0;
			array_cities_showing = array_cities_filter.slice(6 * (aPageNo),
					Math.min(6 * (aPageNo + 1), array_cities_filter.length));
			$.stationFor12306.city_Bind(array_cities_showing);
			// 翻页控制
			var flipHtml = "";
			flipHtml += $.stationFor12306.city_showlist_page(aPageNo,pagecount);

			$("#flip_cities").html(flipHtml);
			$("#flip_cities").css("display", "block");
		} else {
			aPageNo = 0;
			array_cities_showing = array_cities_filter;
			$.stationFor12306.city_Bind(array_cities_showing);
			$("#flip_cities").css("display", "none");
		}
		curPageIndex = aPageNo;
		if ($("#form_cities").css("display") == "block") {
			isClick = true;
			curObj.focus();
		}
	},
	//TODO 取得显示提示的div,用于在IE6下遮挡下拉框
	fixDivBugInIE6:function ($results) {
		try {
			$results.bgiframe();
			if ($results.width() > $('> ul', $results).width()) {
				$results.css("overflow", "hidden");
			} else {
				$('> iframe.bgiframe', $results).width(
						$('> ul', $results).width());
				$results.css("overflow", "scroll");
			}
			if ($results.height() > $('> ul', $results).height()) {
				$results.css("overflow", "hidden");
			} else {
				$('> iframe.bgiframe', $results).height(
						$('> ul', $results).height());
				$results.css("overflow", "scroll");
			}
		} catch (e) {
		
		}
	},
	//TODO 判断是否可清除发到站
	clearStation:function (event) {
		cur = -1;
		var fromStationText = curObj.val();
		var fromStation = curObjCode.val();
		if (fromStationText == "" || fromStation == '') {
			curObj.val('');
			curObjCode.val('');
		} else {
			var join = fromStationText + '|' + fromStation;
			if (typeof (station_names) != "undefined") {
				if (station_names.indexOf(join) == -1) {
					curObj.val('');
					curObjCode.val('');
				} else if ('click' == event) {
					curObj.select();
					if($("#form_cities").is(":hidden")){
						$("#form_cities2").css("display", "block");
					}
				}
			} else {
				curObj.val('');
				curObjCode.val('');
			}
		}
	},
	//TODO
	MapCityID:function (aCityname) {
		// [Beijing, 北京, 1100]
		for ( var i = 0; i < array_cities.length; i++) {
			if (array_cities[i][1] == aCityname) {
				return array_cities[i][2];
			}
		}
		return 0;
	},
	//TODO
	MapCityName:function (aCidyID) {
		// [Beijing, 北京, 1100]
		for ( var i = 0; i < array_cities.length; i++) {
			if (array_cities[i][2] == aCidyID) {
				return array_cities[i][1];
			}
		}
		return "";
	},
	//TODO
	SetISPos:function (obj) {
		if(setPosition){
			setPosition($("#form_cities"),$("#form_cities2"));
		}else{
			$("#form_cities").css("left", obj.position().left);
			$("#form_cities").css("top", obj.position().top + obj.height() +12);
			$("#form_cities2").css("left", obj.position().left);
			$("#form_cities2").css("top", obj.position().top + obj.height() +12);
		}
		
		var top = obj.offset().top;
		var searchDiv=$("#search_div");
		var choiceDiv=$("#choice_div");
		searchDiv.css("top",top);
		choiceDiv.css("top",top);
		var left = obj.offset().left;
		searchDiv.css("left",left);
		choiceDiv.css("left",left);
	},
	//TODO 事件处理函数
	myHandlerFg:function (evt) {
		// 判断浏览器
		if (evt == null) {// 是IE
			evt.keyCode = 9;
			// evt = window.event;
			// evt.returnValue=false;//屏蔽IE默认处理
		} else {// 是Firefox
			if (!evt.which && evt.which == 13) {
				// evt.which=9;
				evt.preventDefault();// 屏蔽Firefox默认处理！！！
			} else if (evt.which && evt.keyCode == 13) {
				evt.which = 9;
			}
		}
	},
	//TODO 事件处理函数
	myHandler2:function (evt) {
		// 判断浏览器
		if (evt == null) {// 是IE
			evt = window.event;
			evt.returnValue = false;// 屏蔽IE默认处理
		} else {// 是Firefox
			if (evt.which && evt.which == 13) {
				var fireOnThis = document.getElementById("Upload_Data3");
				if (document.createEvent) {
					var evObj = document.createEvent('MouseEvents');
					evObj.initEvent('click', true, false);
					fireOnThis.dispatchEvent(evObj);
				} else if (document.createEventObject) {
					fireOnThis.fireEvent('onclick');
				}
			} else if (!evt.which && evt.which == 13) {
				// evt.which=13;
				evt.preventDefault();// 屏蔽Firefox默认处理！！！
			}
		}
	},
	//TODO 文本框样式：正常样式
	from_to_station_class_plain:function (obj) {
		if(_12306_unselected_class&&_12306_unselected_class!=''){
			obj.removeClass(_12306_unselected_class);	
		}
		if(_12306_selected_class&&_12306_selected_class!=''){
			obj.addClass(_12306_selected_class);	
		}
	},
	//TODO 文本框样式：灰色字体
	from_to_station_class_gray:function (obj) {
		if(_12306_selected_class&&_12306_selected_class!=''){
			obj.removeClass(_12306_selected_class);	
		}
		if(_12306_unselected_class&&_12306_unselected_class!=''){
			obj.addClass(_12306_unselected_class);	
		}
	},
	//TODO 设置样式
	setStationStyle:function () {
		var fromStationText = curObj.val();
		if (fromStationText == "") {
			curObj.val(_12306_top_show_value);
			$.stationFor12306.from_to_station_class_gray(curObj);
			curObjCode.val("");
		} else {
			$.stationFor12306.from_to_station_class_plain(curObj);
		}
	},
	//TODO
	setCurValue:function(){ 
		curObj.val(citySelected[1]);
		curObjCode.val(citySelected[2]);
	},
	//TODO
	bindEvent:function(preId){
		var hidenTextInput="#"+preId;
		var textInput="#"+preId+"Text";
		$(textInput).keydown(
				function(aevent) {
					curObj = $(textInput);
					curObjCode = $(hidenTextInput);
					cur = 0;
					isClick = true;
					loadJsFlag = true;
					$("#form_cities2").css("display", "none");
					sugSelectItem2 = 0;
					//设置显示宽度
					var width=$(textInput).width();
					if(-[1,]){  
						width=width-4;
					}
					width = width < 220 ? 220 : width;
					$("#form_cities").css("width",width );
					$("#form_cities").css("display", "block");
					$(".AbcSearch li").removeClass('action');
					$('.popcitylist').css("display", "none");
					if(cookie_false&&_12306_openFavorite){
						$("#ul_list7").css("display", "block");
						$("#nav_list7").addClass("action");
					}else{
						$("#nav_list1").addClass("action");
						$("#ul_list1").css("display", "block");
					}
					$("#flip_cities2").css("display", "none");
					$('.ac_even').removeClass('ac_over').addClass(
							'ac_odd');

					aevent = aevent || window.event;
					if (aevent.keyCode == 40) {
						$.stationFor12306.city_changeSelectIndex(1);
						$("#form_cities").css("display", "block");
						$.stationFor12306.SetISPos(curObj);
						$.stationFor12306.setCurValue();
					} else if (aevent.keyCode == 38) {
						$.stationFor12306.city_changeSelectIndex(-1);
						$.stationFor12306.setCurValue();
						$("#form_cities").css("display", "block");
						$.stationFor12306.SetISPos(curObj);
					} else if (aevent.keyCode == 13) {
						$.stationFor12306.city_confirmSelect();
						if (document.addEventListener) {// 如果是Firefox
							document.addEventListener("keypress",
									$.stationFor12306.myHandlerFg, true);
						} else {
							// document.onkeypress=submitDefault;//如果是IE
							evt = window.event;
							evt.keyCode = 9;
							// evt.returnValue=false;//屏蔽IE默认处理
						}
					}
				}).focus(
				  function() {
					loadJsFlag = true;
					if (isClick) {
						$("#form_cities2").css("display", "none");
						sugSelectItem2 = 0;
						isClick = false;
						cur = -1;
					} else {
						// showAllCity();
						if (cur == -1) {
							$(".AbcSearch li").removeClass('action');
							$('.popcitylist').css("display", "none");
							$("#flip_cities2").css("display", "none");
							if(cookie_false&&_12306_openFavorite){
								$("#ul_list7").css("display", "block");
								$("#nav_list7").addClass("action");
							}else{
								$("#nav_list1").addClass("action");
								$("#ul_list1").css("display", "block");
							}
							$('.ac_even').removeClass('ac_over').addClass('ac_odd');
							$("#form_cities2").css("display", "block");
							
							for(var i=2;i<=6;i++){
								$("#ul_list" + i).css("height", 0);
							}
						}
					}
					curObj = $(textInput);
					curObjCode = $(hidenTextInput);
					cur = 0;
					cityfield_focused = true;
					$.stationFor12306.SetISPos(curObj);
				}).blur(function() {
					curObj = $(textInput);
					curObjCode = $(hidenTextInput);
					cur = 0;
					isClick = false;
					loadJsFlag = true;
					if (!mousedownOnPanel && !mousedownOnPanel2) {
						$.stationFor12306.clearStation('blur');
		
						cityfield_focused = false;
						$("#form_cities").css("display", "none");
						$("#form_cities2").css("display", "none");// 这里
						cur = -1;
						sugSelectItem2 = 0;
						// 空条件过滤出所有城市列表
						array_cities_filter = $.stationFor12306.filterCity("");
						// array_cities_filter = showAllCity();
						$.stationFor12306.city_showlist(0);
						$.stationFor12306.setStationStyle();
			        }
		         }).keyup(function(aevent) {
					curObj = $(textInput);
					curObjCode = $(hidenTextInput);
					cur = 0;
					isClick = true;
					aevent = aevent || window.event;
					if (aevent.keyCode != 40 && aevent.keyCode != 38
							&& aevent.keyCode != 37
							&& aevent.keyCode != 39
							&& aevent.keyCode != 13
							&& aevent.keyCode != 9) {
						array_cities_filter = $.stationFor12306.filterCity(curObj.val());
						$.stationFor12306.city_showlist(0);
					}
				}).click(function() {
					$.stationFor12306.clearStation('click');
		        });	
		$.stationFor12306.bindInputs.push(preId);
	},
	//TODO 获取常用城市
	getStationInCookies:function(){
		var cities=[];
		var cnss=$.ht_getcookie("_city_name_save_station");
		if(cnss){
			var tempArr=cnss.split(',');
			if(tempArr&&tempArr.length>0){
				$.each(tempArr,function(n,value){
					var values=value.split('#');
					var stationArr=[];
					stationArr[0]=values[0];
					stationArr[1]=values[1];
					cities[n]=stationArr;
				});
			}
		}
		return cities;
	},
	//TODO 设置cookie城市
	setStationInCookies:function(text,code){
		var cookieStation=$.stationFor12306.getStationInCookies();
		var _tempCookieStation=[];
		var size=cookieStation.length;
		// 判断是否包含
		var hasFlag=true;
		// 显示城市数
		var showNum=10;
		for(var k=0;k<size;k++){
			if(cookieStation[k][0]==text&&cookieStation[k][1]==code){
				hasFlag=false;
			}
			_tempCookieStation.push(cookieStation[k]);
		}
		if(hasFlag){
			_tempCookieStation.push([text,code]);
		}
		var newArr=_tempCookieStation;
		var saveStr='';
		var newSize=newArr.length;
		var k=0;
		if(newSize>showNum){
			k=1;
		}
		var indexNum=k;
		//当常用城市大于1时 显示常用城市
		if(newSize>1){
			$('#ul_list7').html('');
			cookie_false=true;
		}
		var liHtml='';
		for(;k<newSize;k++){
			if(k>indexNum)
				saveStr+=',';
			saveStr+=newArr[k][0]+'#'+newArr[k][1];
			//重新设置常用城市列表
			if(cookie_false&&_12306_openFavorite)
			liHtml += '<li class="ac_even" onmouseover="$.stationFor12306.city_shiftSelectInLi(this);" onclick="$.stationFor12306.li_click(this);"   title="'
				+  newArr[k][0] + '" data="'
				+  newArr[k][1] + '">'
				+  newArr[k][0] + '</li>';
		}
		if(cookie_false&&_12306_openFavorite)
		   $('#ul_list7').html(liHtml);
		$.ht_setcookie("_city_name_save_station",saveStr,365*24*60*60);
	},
	li_click:function(obj){
		curObj.val($(obj).text());
		curObjCode.val($(obj).attr("data"));
		if(_12306_openFavorite){
			$.stationFor12306.setStationInCookies($(obj).text(),$(obj).attr("data"));
		}
		$("#form_cities2").css("display", "none");
		cur = -1;
		sugSelectItem2 = 0;
		$.stationFor12306.setStationStyle();
		if (loadJsFlag) {
			$.stationFor12306.LoadJS($(obj).attr("data"));
		}
		if(confirmCallBack){
			confirmCallBack(curObj,curObjCode);
		}
	},
	//TODO 初始化
	init:function(params,setParams){
		if(typeof (setParams) != "undefined"){
			if(typeof (setParams['_init_input']) != "undefined"){
				_12306_top_show_value=setParams['_init_input'];
			}
			if(typeof (setParams['_top_4_initInput'])!= "undefined"){
				_12306_top_4_initInput=setParams['_top_4_initInput'];
			}
			if(typeof (setParams['confirmCallBack'])!= "undefined"){
				confirmCallBack=setParams['confirmCallBack'];
			}
			if(typeof (setParams['_selected_class'])!= "undefined"){
				_12306_selected_class=setParams['_selected_class'];
			}
			if(typeof (setParams['_unselected_class'])!= "undefined"){
				_12306_unselected_class=setParams['_unselected_class'];
			}
			if(typeof (setParams['_12306_openFavorite'])!= "undefined"){
				_12306_openFavorite=setParams['_12306_openFavorite'];
			}
			if(typeof (setParams['position'])!= "undefined"){
				setPosition=setParams['position'];
			}
		}
		if (typeof (station_names) != "undefined") {
			// 分拆城市信息
			var cities = station_names.split('@');
			for ( var i = 0; i < cities.length; i++) {
				var titem = cities[i];
				var raha = titem.toString().charAt(0);
				
				for(var k in city_name_character){
					if (raha == city_name_character[k]) {
						liarray_cities_array[k].push(titem.split('|'));
					}
				}
				
				if (titem.length > 0) {
					titem = titem.split('|');
					if (favcityID != "" && titem[2] == favcityID) {
						favcity = titem;
						array_cities.unshift(titem);
						// 当fav城市位于第一页时，避免重复显示
						if (i > 6) {
							array_cities.push(titem);
						}
					} else {
						array_cities.push(titem);
					}
				}
			}
			
			liarray_cities1 = liarray_cities_array[0].concat(liarray_cities_array[1]).concat(liarray_cities_array[2]).concat(liarray_cities_array[3]).concat(liarray_cities_array[4]);
			liarray_cities2 = liarray_cities_array[5].concat(liarray_cities_array[6]).concat(liarray_cities_array[7]).concat(liarray_cities_array[8]).concat(liarray_cities_array[9]);
			liarray_cities3 = liarray_cities_array[10].concat(liarray_cities_array[11]).concat(liarray_cities_array[12]).concat(liarray_cities_array[13]).concat(liarray_cities_array[14]);
			liarray_cities4 = liarray_cities_array[15].concat(liarray_cities_array[16]).concat(liarray_cities_array[17]).concat(liarray_cities_array[18]).concat(liarray_cities_array[19]);
			liarray_cities5 = liarray_cities_array[20].concat(liarray_cities_array[21]).concat(liarray_cities_array[22]).concat(liarray_cities_array[23]).concat(liarray_cities_array[24]).concat(liarray_cities_array[25]);
			
			list_stations[0] = [liarray_cities_array[0],liarray_cities_array[1],liarray_cities_array[2],liarray_cities_array[3],liarray_cities_array[4]];
			list_stations[1] = [liarray_cities_array[5],liarray_cities_array[6],liarray_cities_array[7],liarray_cities_array[8],liarray_cities_array[9]];
			list_stations[2] = [liarray_cities_array[10],liarray_cities_array[11],liarray_cities_array[12],liarray_cities_array[13],liarray_cities_array[14]];
			list_stations[3] = [liarray_cities_array[15],liarray_cities_array[16],liarray_cities_array[17],liarray_cities_array[18],liarray_cities_array[19]];
			list_stations[4] = [liarray_cities_array[20]/*,liarray_cities_array[21]*/,liarray_cities_array[22],liarray_cities_array[23],liarray_cities_array[24],liarray_cities_array[25]];
			
			for ( var i = 0; i < array_cities.length; i++) {
				array_cities[i].push(i);
			}
		}

		if (typeof (favorite_names) != "undefined") {
			// 分拆城市信息
			var favcities = favorite_names.split('@');
			for ( var i = 0; i < favcities.length; i++) {
				var titem = favcities[i];
				if (titem.length > 0) {
					titem = titem.split('|');
					fav_cities.push(titem);
				}
			}
			for ( var i = 0; i < fav_cities.length; i++) {
				fav_cities[i].push(i);
			}
		}
		
		array_cities_filter = $.stationFor12306.filterCity("");
		$.stationFor12306.city_showlist(0);
		$.stationFor12306.showAllCity();
		isClick = false;
		$.stationFor12306.fixDivBugInIE6($('#form_cities'));
		$.stationFor12306.fixDivBugInIE6($('#form_cities2'));
		
		if(params&&params.length>0){
			$.each(params,function(n,value) { 
				$.stationFor12306.bindEvent(value);
			});  
		}
		
		$('#form_cities').mousedown(function() {
			mousedownOnPanel = true;
		}).mouseup(function() {
			mousedownOnPanel = false;
		});

		$('#form_cities2').mousedown(function() {
			mousedownOnPanel2 = true;
		}).mouseup(function() {
			mousedownOnPanel2 = false;
		});
	}
   };
})(jQuery);
