(function() {
	var combo;
	var _canSubmit=true;
	var timer=null;
	var _validateForm=null;
	var cc_result=[];
	var oldRandCodeValue=null;
	
	refreshImg = function(module,place,randCodeId) {
	    var imgCheckId="img-check";
		if ("undefined"==typeof(randCodeId)){
		   randCodeId="img_rand_code";
		}else{
		   imgCheckId="img-check2";
		}

		$("#"+randCodeId).attr("src", ctx + "passcodeNew/getPassCodeNew?module="+module+"&rand=" + place + '&' + Math.random());
		var html = $("#"+imgCheckId).html();
		$("#"+imgCheckId).html(html);
		try{
			$("#i-ok").hide();
			$("#i-ok").removeClass("i-ok");
			if($("#i-ok2")[0]){
				$("#i-ok2").hide();
			}
			$("#randCode").val("");
			$("#randCode").removeClass("error");
			if($("#randCode2")[0]){
				$("#randCode2").val("");
			}
		}catch(e){}
	};
	
	$(document).ready(function() {
		$("#img_rand_code").css('cursor', 'pointer');
		$("input[name='cxlx']").css('cursor', 'pointer');
		_initGuideShow(5);
		$("#radio_cxlx0").on("click",function(){

		});
		$("#radio_cxlx1").on("click",function(){

		});
		if('Y'==openRandCodeCheck){
			$("#randCodeLi").show();
			//验证码回车提交请求
			$("#randCode").on("keyup",function(aevent){
				aevent = aevent || window.event;
//				if (aevent.keyCode == 13) {
//					if(_canSubmit)
//					  $._to_search();
//				}
				if($("#randCode").val()!=''&&$("#randCode").val().length>=1)
					_validateForm.element($(this));
				else{
					//$("#i-ok").css("display","none");
					$("#randCode").removeClass("error");
				}
				if($("#randCode").val().length!=4){
					$("#randCode").addClass("error");
					$("#i-ok").removeClass("i-ok");
				}else if($("#randCode").val().length==4&&oldRandCodeValue!=$("#randCode").val()){
					$.ajax({
						url : ctx + "passcodeNew/checkRandCodeAnsyn",
						type : "post",
						data : {
							"randCode" : $("#randCode").val(),
							"rand":	'sjrand'
						},
						async : true,
						success : function(response){
							if(response.data.result != "1"){
								 $("#randCode").addClass("error");
								 $("#i-ok").removeClass("i-ok").hidden();
							 }else{
								 $("#randCode").removeClass("error"); 
								 $("#i-ok").addClass("i-ok").show();
							 }
						}
					});
				}
				oldRandCodeValue=$("#randCode").val();
			});
		}
		$('#cd_codeText').on("change",function(){
			if($('#cd_codeText').val()==''||$('#cd_codeText').val()==zwdch_messages['jianma_hanzi']||$('#cd_codeText').val()==zwdch_messages['jianpin_hanzi']){
				combo.clearAll();
			}	
		});
		$.stationFor12306.init(['cd_code'],{
			'_init_input':zwdch_messages['jianma_hanzi'],
			'_top_4_initInput':zwdch_messages['jianpin_hanzi'],
			'_selected_class':'color333',
			'_unselected_class':'color999',
			'confirmCallBack':function(){
				$("#train_combo_box_div .dhx_combo_box").css("border","");
				$("#label4cc").html("").hide();
				if($("#iLcear")[0]){
					$("#iLcear").hide();
				}
				if($('#cd_codeText').val()!=''&&$('#cd_codeText').val()!=zwdch_messages['jianma_hanzi']&&$('#cd_codeText').val()!=zwdch_messages['jianpin_hanzi']){
					_validateForm.element($('#cd_codeText'));
				}
				$.ajax({
					url : ctx + 'zwdch/queryCC',
					type : "POST",
					beforeSend: function (request){
						request.setRequestHeader("If-Modified-Since","0");
						request.setRequestHeader("Cache-Control","no-cache");
					},
					data:{
						train_station_code:$("#cd_code").val()
					},
					success : function(response) {
						$.initTrainOption(response.data);
					},
					error : function(e) {
						
					}
				});
			},
			'position':function(obj1,obj2){
				obj1.css("left", '0px');
				obj1.css("top", '30px');
				obj2.css("left", '0px');
				obj2.css("top", '30px');
			}
		});
		initPageTitle(3);
		$._init_form();
		$._init_cookies_req();
	});
	jQuery.extend({
		_init_cookies_req:function(){
			var cookies_fromstation=$.jc_getcookie("_jc_save_zwdch_fromStation");
			var _witch_checked=$.jc_getcookie("_jc_save_zwdch_cxlx");
			if(_witch_checked=='1'){
				$("#radio_cxlx0").removeAttr("checked");
				$("#radio_cxlx1").attr("checked", "checked"); 
			}
			if(cookies_fromstation){
				var cokievalues=cookies_fromstation.split(',');
				if(cokievalues&&cokievalues.length==2){
					$('#cd_codeText').val(cokievalues[0]);
					$('#cd_code').val(cokievalues[1]);
					$.ajax({
						url : ctx + 'zwdch/queryCC',
						type : "POST",
						beforeSend: function (request){
							request.setRequestHeader("If-Modified-Since","0");
							request.setRequestHeader("Cache-Control","no-cache");
						},
						data:{
							train_station_code:cokievalues[1]
						},
						success : function(response) {
							$.initTrainOption(response.data);
						},
						error : function(e) {
							 
						}
					});
				}
			}
		},
		_reset_cookies_values:function(){
			$.jc_setcookie("_jc_save_zwdch_fromStation",$("#cd_codeText").val()+','+$("#cd_code").val(),365*24*60*60);
			$.jc_setcookie("_jc_save_zwdch_cxlx",$("input[name='cxlx']:checked").val(),365*24*60*60);
		},
		_to_search:function(){
			if(!_canSubmit)
				return;
			 $("#_queryForm").submit();
		},
	    _init_form:function(){
	    	_validateForm= $("#_queryForm").validate({
				rules : {
					"cz" : {
						checkStation:true
					},
					"randCode" : {
						required : true,
						randCodeFormat:true
					}
				},
				messages : {
					"cz" : {
						checkStation: "请输入车站！"
					},
					"randCode" : {
						required : "请输入验证码！",
						randCodeFormat:"验证码只能由数字或字母组成!"
					}
				},
				errorPlacement: function(error, element) {
					if(element.attr("name") == "randCode"){
						//$("#i-ok").css("display","none");
						$("#i-ok").removeClass("i-ok");
						error.insertAfter(element.siblings("span:eq(2)"));
						error.css('margin-left',"25px");
					}else 
					if(element.attr("name") == "cc"){
						error.insertAfter(element);
					    element.next().css('margin-left',"40px");
					}else{
					    error.insertAfter(element);
					    element.next().css('margin-left',"40px");
					}
				},
				submitHandler:function(form){
					var ccInput=$("input[name=cc]").val();
					if(ccInput == ""){
						$("#label4cc").html("请选择车次").show();
						return false;
					}
					if(false){
						//$("#train_combo_box_div .dhx_combo_box").css("border","solid 1px red");
						//$("#label4cc").html("请选择车次").show();
						//return false;
					}else{
						//if(cc_result&&cc_result.length>0){
							var flag=true;
							for(var k=0;k<cc_result.length;k++){
								if(ccInput==cc_result[k]){
									flag=false;
									break;
								}
							}
							//if(flag){
							//	$("#train_combo_box_div .dhx_combo_box").css("border","solid 1px red");
							//	$("#label4cc").html("请选择合法车次").show();
							//	return false;	
							//}
						//}else{
						//	$("#train_combo_box_div .dhx_combo_box").css("border","solid 1px red");
						//	$("#label4cc").html("请选择合法车次").show();
						//	return false;
						//}
					}
					$._lock_btn();
					$._reset_cookies_values();
					var modalbox = dhtmlx.modalbox({
						targSrc:'<div><img src="'+ctx+'resources/images/loading.gif"></img></div>'
					});
					$.ajax({
						url : ctx + 'zwdch/query',
						type: "post",
						beforeSend: function (request){
							request.setRequestHeader("If-Modified-Since","0");
							request.setRequestHeader("Cache-Control","no-cache");
						},
						data :{
							cxlx:$("input[name='cxlx']:checked").val(),
							cz:$("#cd_codeText").val(),
							cc:$("input[name=cc]").val(),
							czEn:encodeURI($("#cd_codeText").val()).replace(/%/g,"-"),
							randCode:$("#randCode").val()
						},
						success : function(response) {
							dhtmlx.modalbox.hide(modalbox);
							if (response.status) {
								if(response.data['flag']){
									$('#result_div').html('<span class="colorA">'+response.data['data']+'</span>');
//									$('#result_div').html($("input[name=cc]").val()+'次列车，正点到达'+$("#cd_codeText").val()+'的时间为<span class="colorA">'+response.data['data']+'</span>，列车正点到达');
									dhtmlx.createWin({winId:"dialog_result",closeWinId:["dialog_result_close"],
									   okId:"dialog_result_ok",okCallBack:function(){
									   } 
									});
								}else{
									$.alertError(response.data['message']);
								}
								if('Y'==openRandCodeCheck){
									//$("#i-ok").css("display","none");
									$('#randCode').val('');
									refreshImg('other','sjrand');
								}
							}
						},
						error:function(){
							$("#randCode").removeClass("error");
//							$("#i-ok").css("display","none");
							dhtmlx.modalbox.hide(modalbox);
						}
					});
				}
			});	
	    },
		_lock_btn:function(){
			_canSubmit=false;
			$('#_a_search_btn').addClass('btn-disabled');
			timer = window.setTimeout(function(){
				_canSubmit=true;
				$('#_a_search_btn').removeClass('btn-disabled');
			},5000);
		} ,//弹出框（错误）
		alertError:function(text,obj){
			dhtmlx.alert({
				title : messages["message.error"],
				ok : messages["button.ok"],
				text : text,
				type : 'alert-error',
				callback : function() {
					if(obj){
					   obj.removeClass("error");
					   if(obj.val()==lcxxcx_messages['jianma_hanzi']||obj.val()==lcxxcx_messages['jianpin_hanzi']){
						 obj.val("");
					   }
					   obj.focus();
					}
				}
			});
		},
		
		
		initTrainOption:function(trains) {
			cc_result=trains;
			dhtmlXCombo_defaultOption.prototype._DrawHeaderButton = function(){};
			$("#train_combo_box").hide();
			var options = [];
			//所有同城车站
			var _trainOptions=[];
			if (!combo) {
				combo=new dhtmlXCombo("train_combo_box_div","cc",90);
			}else
				combo.setComboText('');
			//$('.dhx_combo_img').attr('src',ctx + "resources/js/rich/dhtmlxCombo/imgs/combo_select.gif").css('cursor', 'pointer');
			combo.clearAll();
			$(trains).each(function(){
				options.push([this,this]);
			});
	        combo.addOption(options);
		   	combo.enableFilteringMode(true);
		   	combo.attachEvent("onChange",function(){
		   		$("#train_combo_box_div .dhx_combo_box").css("border","");
				$("#label4cc").html("").hide();
		   		if(combo.getComboText()!=''){
		   			if($("#iLcear").is(":hidden")){
		   			   $("#iLcear").show();
		   			} 
				}
		   	});
		   	//设置css  
			$("#train_combo_box_div .dhx_combo_box").css("width","150px").css("height","28px").css("float","left");
		   	$("#train_combo_box_div .dhx_combo_input").addClass("inptxt").css("height","28px").css("width","150px"); 
		   	$(".dhx_combo_list").css("width","150px")
		   	$("#train_combo_box_div .dhx_combo_input").on("click",function(){
		   		if($(this).val()!='')
		   		  $(this).select();
		   	});
		   	if(!$("#iLcear")[0]){
		   		$("#train_combo_box_div .dhx_combo_box").append($('<span style="display: none;" class="i-clear dhx_combo_img_iClear" id="iLcear"></span>'));
		   	    //清除车站过滤条件
				$("#iLcear").on("click",function(){
					if(combo){
					   combo.setComboText('');
					   $(this).hide();
					}
				});
		   	}
		   	$("#train_combo_box_div .dhx_combo_input").on("keyup",function(){
		   		if($(this).val()=='')
		   			$("#iLcear").hide();
		   		else{
		   			if($("#iLcear").is(":hidden")){
		   			   $("#iLcear").show();
		   			} 
		   		}
		   	});
		}
	});
	
	
})();

