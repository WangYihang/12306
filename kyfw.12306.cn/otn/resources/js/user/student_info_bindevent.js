// 处理学生身份信息，添加事件处理。
// 加载查询数据结束
$(function() {
	var _JMHZ="简码/汉字";
	//异步请求学校名称
	$.ajax({
		url : ctx + 'userCommon/schoolNames',
		type : "POST",
		data:{provinceCode : $("#province_code").val()},
		success : function(response) {
			$("#schoolNameText").schoolSuggest(response.data, {
				hot_list : response.data,
				dataContainer : '#schoolCode',
				attachObject : '#schoolNameSuggest',
				resultsClass:'ac_results_school'
			});
		},
		error : function(e) {
		}
	});

	$("#schoolNameText").click(function() {
		if($("#schoolNameText").val()==_JMHZ){
			$("#schoolNameText").val('');
			$("#schoolCode").val('');	
		}
	});
	
	$("#province_code").change(function() {
		$("#schoolNameText").val('简码/汉字');
		$("#schoolCode").val('');
		//异步请求站名
		$.ajax( {
			url : ctx + 'userCommon/schoolNames',
			type : "POST",
			data:{provinceCode : $("#province_code").val()},
			success : function(response) {
				$("#schoolNameText").schoolSuggest(response.data, {
					hot_list : response.data,
					dataContainer : '#schoolCode',
					attachObject : '#schoolNameSuggest',
					resultsClass:'ac_results_school'
				});
			},
			error : function(e) {
			}
		});
	});

	//异步请求优惠发站城市名称
	$.ajax({
		url : ctx + 'userCommon/allCitys',
		type : "POST",
		data:{station_name:''},
		success : function(response) {
			$("#preference_from_station_name").cityNameSuggest(response.data, {
				hot_list : response.data,
				dataContainer : '#preferenceFromStationCode',
				attachObject : '#preferenceFromStationNameSuggest',
				resultsClass:'ac_results',
				isMustInput:true
			});
		},
		error : function(e) {
		}
	});

	//出发地下拉效果开始
	$("#preference_from_station_name").click(function() {
		if($("#preference_from_station_name").val()==_JMHZ){
			$("#preference_from_station_name").val('');
			$("#preferenceFromStationCode").val('');
		}
	});
	$("#preference_from_station_name").on("blur",function(){
		if ($("#preference_from_station_name").val() == '') {
			$("#preference_from_station_name").val(_JMHZ);
			$("#preferenceFromStationCode").val('');
		}
	});
	//出发地下拉效果开始
	$("#preference_to_station_name").click(function() {
		if($("#preference_to_station_name").val()==_JMHZ){
			$("#preference_to_station_name").val('');
			$("#preferenceToStationCode").val('');
		}
	});
	$("#preference_to_station_name").on("blur",function(){
		if ($("#preference_to_station_name").val() == '') {
			$("#preference_to_station_name").val(_JMHZ);
			$("#preferenceToStationCode").val('');
		}
	});
	//异步请求优惠到站城市名称
	$.ajax({
		url : ctx + 'userCommon/allCitys',
		type : "POST",
		data:{station_name:''},
		success : function(response) {
			$("#preference_to_station_name").cityNameSuggest(response.data, {
				hot_list : response.data,
				dataContainer : '#preferenceToStationCode',
				attachObject : '#preferenceToStationNameSuggest',
				resultsClass:'ac_results',
				isMustInput:true
			});
		},
		error : function(e) {
		}
	});
	// 设置简码/汉字
	if ($("#schoolNameText").val() == '') {
		$("#schoolNameText").val(_JMHZ);
	}
	$("#schoolNameText").on("blur",function(){
		if ($("#schoolNameText").val() == '') {
			$("#schoolNameText").val(_JMHZ);
		}
	});
	if ($("#preference_from_station_name").val() == '') {
		$("#preference_from_station_name").val(_JMHZ);
	}
	if ($("#preference_to_station_name").val() == '') {
		$("#preference_to_station_name").val(_JMHZ);
	}
});