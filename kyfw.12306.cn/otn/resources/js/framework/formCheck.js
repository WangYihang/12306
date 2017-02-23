//校验登录时用户名规则
jQuery.validator.addMethod("checkLoginUserName", function(value, element) {
	var check = false;
	var mobile=/^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])\d{8}$/;
	var tel = /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/;
	var tel_other = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
	if(tel.test(value) || tel_other.test(value) ||mobile.test(value)){
		check = true;
	}
	
	return this.optional(element) || check;
}, "wrong username.");

//校验登录用户名
jQuery.validator.addMethod("requiredUserName", function(value, element) {
	 if('用户名／邮箱／手机号' == value){
			return false;
	 }
	 if(value==null||""==value){
		 return false;
	 }
	 return true;
}, "wrong username.");

//校验学校名称
jQuery.validator.addMethod("requiredSchoolName", function(value, element) {
	 if('简码／汉字' == value){
			return false;
	 }
	 if(value==null||""==value){
		 return false;
	 }
	 return true;
}, "wrong schoolname.");

//校验验证码规则(必填)
jQuery.validator.addMethod("randCodeRequired", function(value, element) {
	$("#i-ok").css("display","none"); //清空验证码后边绿勾图标
	return value.length > 0;
}, "验证码错误!");

//校验验证码规则(只能由数字和字母组成)
jQuery.validator.addMethod("randCodeFormat", function(value, element) {
	$("#i-ok").css("display","none"); //清空验证码后边绿勾图标
	var tel = /^[a-zA-Z0-9]+$/;
	return this.optional(element) || tel.test(value);
}, "验证码错误!");

//校验验证码规则(只能为4位)
jQuery.validator.addMethod("randCodeLength", function(value, element) {
	$("#i-ok").css("display","none"); //清空验证码后边绿勾图标
	return value.length == 4;
}, "验证码错误!.");

//校验积分支付密码规则(只能是6位数字的密码)
jQuery.validator.addMethod("integrationCheck", function(value, element) {       
		var integration = /^\d{6}$/;
		return this.optional(element) || integration.test(value);
	}, "wrong integrationpassword"); 

jQuery.validator.addMethod("integrationPwdCheck", function(value, element,param) {
	if($('#'+param[0]).val()==$('#'+param[1]).val()){
		return true;
	}
	return false;
}, "两次输入密码不一致!.");

//校验验证码规则(只能为4位)
jQuery.validator.addMethod("checkRandCode", function(value, element,param) {
	var check = true;
	
	if(value && value.length == 4){
		$.ajax({
			url : ctx + "passcodeNew/checkRandCodeAnsyn",
			type : "post",
			data : {
				"randCode" : value,
				"rand":	param
			},
			async : false,
			success : function(response){
				if(response.data == "N"){
					check =  false;

					$("#i-ok").css("display","none"); //清空验证码后边绿勾图标
				 }else{
					check =  true;
					$("#i-ok").css("display","block"); //显示验证码后边绿勾图标
		
				 } 
			}
		});
	}else{
		check = false;
		$("#i-ok").css("display","none"); //清空验证码后边绿勾图标
	}
	return check;
}, "验证码错误!.");

//只能包括中文、英文、数字、"_"
jQuery.validator.addMethod("validateUsersName", function(value, element) {
	//return this.optional(element) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(value);
	return this.optional(element) || /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/.test(value);
}, "用户名只能由字母、数字或_组成");

jQuery.validator.addMethod("checkWriteSpace", function(value, element) {
	for(var i =0;i<value.length;i++){
		if(value.charCodeAt(i)== 32){
			return false;
		}
	}
	return true;
}, "contain writespace");

//验证码只能包括英文字母、数字
jQuery.validator.addMethod("validateRandCode", function(value, element) {
	return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
}, "验证码错误!.");

//密码验证，不包含'<>    
jQuery.validator.addMethod("checkPassward",
		function(value, element, param) {
			var validate=true;
			for ( var i = 0; i < value.length; i++) {
				if (value.charCodeAt(i) ==39 || value.charCodeAt(i) ==60 || value.charCodeAt(i) ==62) {
					validate=false;
				}
				if(!validate){
					break;
				}
			}
			return this.optional(element)
					|| validate;
		}, "Passward wrong");
function validateSecIdCard(value){
	var iSum = 0;
	var sId= value;
	var aCity = {
		11 : "北京",
		12 : "天津",
		13 : "河北",
		14 : "山西",
		15 : "内蒙",
		21 : "辽宁",
		22 : "吉林",
		23 : "黑龙",
		31 : "上海",
		32 : "江苏",
		33 : "浙江",
		34 : "安徽",
		35 : "福建",
		36 : "江西",
		37 : "山东",
		41 : "河南",
		42 : "湖北",
		43 : "湖南",
		44 : "广东",
		45 : "广西",
		46 : "海南",
		50 : "重庆",
		51 : "四川",
		52 : "贵州",
		53 : "云南",
		54 : "西藏",
		61 : "陕西",
		62 : "甘肃",
		63 : "青海",
		64 : "宁夏",
		65 : "新疆",
		71 : "台湾",
		81 : "香港",
		82 : "澳门",
		91 : "国外"
    };
	if (!/^\d{17}(\d|x)$/i.test(sId)) {
		return false;
	}
	sId = sId.replace(/x$/i, "a");
	//非法地区
	if (aCity[parseInt(sId.substr(0, 2))] == null) {
		return false;
	}
	var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2))
			+ "-" + Number(sId.substr(12, 2));
	var d = new Date(sBirthday.replace(/-/g, "/"));
	//非法生日
	if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d
			.getDate())) {
		return false;
	}
	for ( var i = 17; i >= 0; i--) {
		iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
	}
	if (iSum % 11 != 1) {
		return false;
	}
	return true;
}

function validateFirIdCard(value){
	var iSum = 0;
	var sId;
	var aCity = {
		11 : "北京",
		12 : "天津",
		13 : "河北",
		14 : "山西",
		15 : "内蒙",
		21 : "辽宁",
		22 : "吉林",
		23 : "黑龙",
		31 : "上海",
		32 : "江苏",
		33 : "浙江",
		34 : "安徽",
		35 : "福建",
		36 : "江西",
		37 : "山东",
		41 : "河南",
		42 : "湖北",
		43 : "湖南",
		44 : "广东",
		45 : "广西",
		46 : "海南",
		50 : "重庆",
		51 : "四川",
		52 : "贵州",
		53 : "云南",
		54 : "西藏",
		61 : "陕西",
		62 : "甘肃",
		63 : "青海",
		64 : "宁夏",
		65 : "新疆",
		71 : "台湾",
		81 : "香港",
		82 : "澳门",
		91 : "国外"
	};
	//如果输入的为15位数字,则先转换为18位身份证号
	if (value.length == 15)
		sId = idCardUpdate(value);
	else
		sId = value;
	if (!/^\d{17}(\d|x)$/i.test(sId)) {
		return false;
	}
	sId = sId.replace(/x$/i, "a");
	//非法地区
	if (aCity[parseInt(sId.substr(0, 2))] == null) {
		return false;
	}
	var sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2))
			+ "-" + Number(sId.substr(12, 2));
	var d = new Date(sBirthday.replace(/-/g, "/"));
	//非法生日
	if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d
			.getDate())) {
		return false;
	}
	for ( var i = 17; i >= 0; i--) {
		iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
	}
	if (iSum % 11 != 1) {
		return false;
	}
	return true;
}
function idCardUpdate(_str) {
	var idCard18;
	var regIDCard15 = /^(\d){15}$/;
	if (regIDCard15.test(_str)) {
		var nTemp = 0;
		var ArrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8,
				4, 2);
		var ArrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3',
				'2');
		_str = _str.substr(0, 6) + '1' + '9' + _str.substr(6, _str.length - 6);
		for ( var i = 0; i < _str.length; i++) {
			nTemp += parseInt(_str.substr(i, 1)) * ArrInt[i];
		}
		_str += ArrCh[nTemp % 11];
		idCard18 = _str;
	} else {
		idCard18 = "#";
	}
	return idCard18;
}
jQuery.validator.addMethod("checkBorth", function(value, element) {
	var date = value;
	if(date==''){
		return true;
	}else{
		var result = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	    if (result == null)
	       return false;
	    var d = new Date(result[1], result[3] - 1, result[4]);
	    return (d.getFullYear() == result[1] && (d.getMonth() + 1) == result[3] && d.getDate() == result[4]);
	}
}, "日期格式不合法");
//自定义方法，中文两个字节
jQuery.validator.addMethod("byteRangeLength",
	function(value, element, param) {
		var length = value.length;
		for ( var i = 0; i < value.length; i++) {
			if (value.charCodeAt(i) > 127) {
				length++;
			}
		}
		return this.optional(element)
				|| (length >= param[0] && length <= param[1]);
	}, "length wrong");
//姓名中文或者英文，除一代和二代身份证外可以有空格
jQuery.validator.addMethod("checkNameCharBlank", function(value, element, param) {
	var temp = param.split("@");
	if ($("#"+temp[1]).val() == '') {
		return true;
	} else {
		if ($("#"+temp[0]).val() == '1' || $("#"+temp[0]).val() == '2') {
			return this.optional(element) || /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(value);
		} else if($("#"+temp[0]).val() == 'B'){
			if(/^[-]+$/.test(value)){
				return false;
			}
			
			return this.optional(element) || /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(value);
		} else if($("#"+temp[0]).val() == 'H'){
			if(/^[-]+$/.test(value)){
				return false;
			}
			
			return this.optional(element) || /^[a-z A-Z·。.．\u3400-\u9FFF-]+$/.test(value);
		} else {
			return this.optional(element) || /^[a-z A-Z·.．\u3400-\u9FFF]+$/.test(value);
		}
	}
}, "wrong name.");
jQuery.validator.addMethod("checkIdValidStr", function(value, element) {
	var tel =  /^[a-zA-Z0-9\_\-\(\)]+$/;
	return this.optional(element) || (tel.test(value));
}, "wrong id");
jQuery.validator.addMethod("isSecIDCard", function(value, element, param) {
	if(!checkIfSecIdCard($(param).val())){
		return true;
	}
	return validateSecIdCard(value);
}, "wrong");
function checkIfSecIdCard(cardtype){
	if (cardtype== "1") {
		return true;
	}
	return false;
}
function checkIfFirIdCard(cardtype){
	if (cardtype== "2") {
		return true;
	}
	return false;
}

function checkCardForHKorTW(cardtype){
	if (cardtype == "C" || cardtype == "G") {
		return true;
	}
	return false;
}
jQuery.validator.addMethod("isFirIDCard", function(value, element, param) {
	if(!checkIfFirIdCard($(param).val())){
		return true;
	}
	return validateFirIdCard(value);
}, "wrong");
jQuery.validator.addMethod("checkHkongMacao", function(value, element,param) {
	if($(param).val()=="C"){ //11位，第1位字母H、M，后面全是数字
		var tel =  /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
		return this.optional(element) || (tel.test(value));
	} else {
		return true;
	}
}, "wrong format.");
jQuery.validator.addMethod("checkTaiw", function(value, element,param) {
	if($(param).val()=="G"){//台湾8或者10位数字
		var tel1 =  /^[0-9]{8}$/;
		var tel2 =  /^[0-9]{10}$/;
		return this.optional(element) || (tel1.test(value)) || (tel2.test(value));
	} else {
		return true;
	}
}, "wrong format.");
jQuery.validator.addMethod("checkPassport", function(value, element,param) {
	if($(param).val()=="B"){//护照规则，5-17位，由数字和字母组成，可以全是字母
		var tel2= /^[a-zA-Z]{5,17}$/;
//		if(tel2.test(value)){
//			return false;
//		}
		var tel =  /^[a-zA-Z0-9]{5,17}$/;
		return this.optional(element) || (tel.test(value)) || tel2.test(value);
	} else {
		return true;
	}
}, "wrong format.");


jQuery.validator.addMethod("checkWork", function(value, element,param) {
	if($(param).val()=="H"){//外国人居留证规则，前三位字母后12为数字
		var tel =  /^[a-zA-Z]{3}[0-9]{12}$/;
		return this.optional(element) || (tel.test(value));
	} else {
		return true;
	}
	
}, "wrong format.");


//手机号码验证
jQuery.validator.addMethod("isMobile", function(value, element) {
	var length = value.length;
	var mobile=/^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])\d{8}$/;
	return this.optional(element)
			|| (length == 11 && mobile.test(value));
}, "wrong mobile phone ");

//固定电话验证
jQuery.validator.addMethod("isTelePhone", function(value, element) {
	var tphone=/(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}#)/;
	return this.optional(element) || (tphone.test(value));
}, "wrong telePhone ");

//验证，不包含'"<>?    39 34 60 62 63
jQuery.validator.addMethod("illegalChar",
	function(value, element, param) {
		var validate=true;
		if(value.indexOf('\$')>=0){
			return false;
		}
		for ( var i = 0; i < value.length; i++) {
			if (value.charCodeAt(i) ==39 || value.charCodeAt(i) ==60 || value.charCodeAt(i) ==62 || value.charCodeAt(i) ==34 || value.charCodeAt(i) ==63) {
				validate=false;
			}
			if(!validate){
				break;
			}
		}
		return this.optional(element)
				|| validate;
}, "Illegal char wrong");
//邮政编码验证    
jQuery.validator.addMethod("isZipCode", function(value, element) {
	var tel = /^[0-9]{6}$/;
	return this.optional(element) || (tel.test(value));
}, "wrong zipcode");
jQuery.validator.addMethod("isEmail", function(value, element){
	var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return this.optional(element) ||  (reg.test(trim(value)));
},"wrong email");
//替换特殊字符
function replaceChar(str) {
	var v = str.value.replace(/['"<> ?]/g,"");
	str.value= v;
}

//验证只能包含中文、英文、数字
function checkNameChar1(str) {
	return /^[a-zA-Z0-9\u3400-\u9FFF]+$/.test(str);
}
//删除左右两端的空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
//删除左边的空格
function ltrim(str) {  
	return str.replace(/(^\s*)/g, "");
}
//删除右边的空格
function rtrim(str) {
	return str.replace(/(\s*$)/g, "");
}
//只能包括中文、英文、数字
jQuery.validator.addMethod("validateName", function(value, element) {
	return this.optional(element) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(value);
}, "wrong username.");
jQuery.validator.addMethod("studentRequired", function(value, element,param) {
	if($(param).val()=='3'){
		return value&&trim(value)!='';
	}
	return true;
}, "wrong studentRequired.");
jQuery.validator.addMethod("studentStationRequired", function(value, element,param) {
	if($(param).val()=='3'){
		return value&&trim(value)!='简拼/全拼/汉字'&&trim(value)!='';
	}
	return true;
}, "wrong studentStationRequired.");
//只能包括中文、英文、数字
jQuery.validator.addMethod("studentValidateName", function(value, element,param) {
	if($(param).val()=='3'){
		return this.optional(element) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(value);
	}
	return true;
}, "wrong username.");
jQuery.validator.addMethod("checkStudentName", function(value, element,param) {
	if($(param).val()=='3'){
		if( (!value || trim(value)=="" || trim(value)=="简码/汉字"))
			return false;
	}
	return true;
}, "wrong username.");
//校验密码提示问题
jQuery.validator.addMethod("isQuestionNull", function(value, element,param) {
	if(jQuery.trim(value)!=''){
		if(jQuery.trim($(param[0]).val())=='customQuestion'&&jQuery.trim($(param[1]).val())==''||jQuery.trim($(param[0]).val())==''){
			return false;
		}
	}
	return true;
}, "you should input the question");

//校验密码提示答案
jQuery.validator.addMethod("isAnswerNull", function(value, element,param) {
		if((jQuery.trim($(param[0]).val())=='customQuestion'&&jQuery.trim($(param[1]).val())!='')||(jQuery.trim($(param[0]).val())!='')){
			if(jQuery.trim(value)=='')
			return false;
	}
	return true;
}, "you should input the answer");

function checkSex(sexValue,cardTypeId,cardNoId){
	if(!checkSexByCardId(sexValue,cardTypeId,cardNoId)){
		if(!confirm("性别与身份证中的性别不符，是否继续?")){
			return false;
		}else{
			return true;
		}
	}else{
		return true;
	}
}
function checkSexByCardId(value,chardTypeId,cardNoId){
	function _checkSexByCardId(value,cardId){
		
		var sexMark = null;
		if(cardId.length == 15){
			sexMark = cardId.substring(14,15);
		}else if(cardId.length == 18){
			sexMark = cardId.substring(16,17);
		}else{
			return true;
		}
		if(sexMark == "x"||sexMark == "X"){
			sexMark = "10";
		}
		var sexMarkInt = parseInt(sexMark);
		var sexMarkOddEven = sexMarkInt%2;
		if(sexMarkOddEven ===0 && value==='F'){
			return true;
		}else if(sexMarkOddEven ===1 && value==='M'){
			return true;
		}else{
			return false;
		}
	}
	var cardId = $(cardNoId).val();
	if(checkIfSecIdCard($(chardTypeId).val())&&validateSecIdCard(cardId)){
		if(cardId !== ""){
			return _checkSexByCardId(value,cardId);
		}else{
			return true;
		}
	}else if(checkIfFirIdCard($(chardTypeId).val())&&validateFirIdCard(cardId)){
		if(cardId !== ""){
			return _checkSexByCardId(value,cardId);
		}else{
			return true;
		}
	}else{
		return true;
	}
}

function checkBirdDateByCardId(value,chardTypeId,cardNoId){
	var cardBirddate = null;
	var cardId = $(cardNoId).val();
	
	if(checkIfSecIdCard($(chardTypeId).val())&&cardId!==""&&validateSecIdCard(cardId)){
		cardBirddate =cardId.substring(6,14);
	}else if(checkIfFirIdCard($(chardTypeId).val())&&cardId!==""&&validateFirIdCard(cardId)){
		if(cardId.length == 15){
			cardBirddate ="19"+cardId.substring(6,12);
		}else if(cardId.length == 18){
			cardBirddate =cardId.substring(6,14);
		}
	}else{
		return true;
	}
	
	if(value !== ""){
		value = value.replace(/-/g, "");
		if(value != cardBirddate){
			return false;
		}else{
			return true;
		}
	}else{
		return true;
	}
}
function checkBirdate(birdDateValue,cardTypeId,cardNoId){
	if(!checkBirdDateByCardId(birdDateValue,cardTypeId,cardNoId)){
		if(!confirm("出生日期与身份证中的出生日期不符，是否继续?")){
			return false;
		}else{
			return true;
		}
	}else{
		return true;
	}
}
jQuery.validator.addMethod("checkPwdValidate", function(value, element) {
	return this.optional(element) || /(?![a-z]+$|[0-9]+$|_+$)^[a-zA-Z0-9_]{6,}$/.test(value);
}, "contain writespace");
jQuery.validator.addMethod("checkConfirmPassWard", function(value, element,param) {
	if($(param).val()!=null){
		return $(param).val()==value;
	}
	return true;
}, "contain writespace");
//校验验证码规则(只能由数字和字母组成)
jQuery.validator.addMethod("IVR_passwd_format", function(value, element) {
	var rule = /^[0-9]{6}$/;
	return this.optional(element) || rule.test(value);
}, "验证码错误!.");
jQuery.validator.addMethod("checkStation", function(value, element) {
	if( (!value || trim(value)=="" || trim(value)=="简拼/全拼/汉字"|| trim(value)=="简拼/全拼/汉字或↑↓"))
		return false;
	return true;
}, "wrong username.");
jQuery.validator.addMethod("checkAnsyUserName", function(value, element,param) {
	var _url = param[0];
	var vlue=$("#"+param[1]).val();
	var check = true;
	$.ajax({
		url :_url+'?user_name='+value,
		type :'get',
		async:false,
		success:function(data,textStatus){
			if(data['data']==true){
				check= false;
			}else{
				check= true;
			}
		} ,
		error:function(XMLHttpRequest, textStatus, errorThrown){
			check =false;
		}
	});
	return check;
}, "wrong cardNo");
//异步校验证件号是否重复
//jQuery.validator.addMethod("checkAnsyIDCard", function(value, element,param) {
//	var _url = param[0];
//	var cardType = $("#"+param[1]).val();
//	var check = true;
//	$.ajax({
//		url :_url+'?id_no='+value+'&id_type_code='+cardType,
//		type :'get',
//		async:false,
//		success:function(data,textStatus){
//			if(data['data']==true){			
//				check= false;
//			}else{
//				check= true;
//			}
//		} ,
//		error:function(XMLHttpRequest, textStatus, errorThrown){
//			check =false;
//		}
//	});
//	return check;
//}, "wrong cardNo");

function checkPwdRank(obj,divRank,spanRank){
	var $el=$(obj);
	var pwdtext=$el.val();
	if(pwdtext.length<=6||new RegExp("^[a-zA-Z]{6,}$").test(pwdtext)
			||new RegExp("^[0-9]{6,}$").test(pwdtext)
			||new RegExp("^[_]{6,}$").test(pwdtext)){
		$("#"+divRank).attr("title","危险");
		$("#"+spanRank).html("危险");
		$("#"+divRank).removeClass("rank-a");
		$("#"+divRank).removeClass("rank-b");
		$("#"+divRank).removeClass("rank-c");
		$("#"+divRank).addClass("rank-a");
	}else if(pwdtext.length>6&&
			new RegExp("[a-zA-Z]").test(pwdtext)
			&&new RegExp("[0-9]").test(pwdtext)
			&&new RegExp("[_]").test(pwdtext)){
		$("#"+divRank).attr("title","安全");
		$("#"+spanRank).html("安全");
		$("#"+divRank).removeClass("rank-a");
		$("#"+divRank).removeClass("rank-b");
		$("#"+divRank).removeClass("rank-c");
		$("#"+divRank).addClass("rank-c");
	}else{
		$("#"+divRank).attr("title","一般");
		$("#"+spanRank).html("一般");
		$("#"+divRank).removeClass("rank-a");
		$("#"+divRank).removeClass("rank-b");
		$("#"+divRank).removeClass("rank-c");
		$("#"+divRank).addClass("rank-b");
	}
}
Array.prototype.unique = function() {
    var temp = {}, len = this.length;
    for(var i=0; i < len; i++)  {
        if(typeof temp[this[i]] == "undefined") {
            temp[this[i]] = 1;
        }
    }
    this.length = 0;
    len = 0;
    for(var i in temp) {
        this[len++] = i;
    }
    return this;
};
function checkSearchPwdRank(obj,divRank,spanRank){
	var $el=$(obj);
	var pwdtext=$el.val();
	if(pwdtext.length<6){
		$("#"+divRank).attr("title","危险");
		$("#"+spanRank).html("危险");
		$("#"+divRank).removeClass("rank-a");
		$("#"+divRank).removeClass("rank-b");
		$("#"+divRank).removeClass("rank-c");
		$("#"+divRank).addClass("rank-a");
	}else{
		var datas=[];
		for(var k=0;k<6;k++){
			datas.push(pwdtext.charAt(k));
		}
		datas=datas.unique();
		var size=datas.length;
		if(size==1){
			$("#"+divRank).attr("title","危险");
			$("#"+spanRank).html("危险");
			$("#"+divRank).removeClass("rank-a");
			$("#"+divRank).removeClass("rank-b");
			$("#"+divRank).removeClass("rank-c");
			$("#"+divRank).addClass("rank-a");
		}else if(size>1&&size<5){
			$("#"+divRank).attr("title","一般");
			$("#"+spanRank).html("一般");
			$("#"+divRank).removeClass("rank-a");
			$("#"+divRank).removeClass("rank-b");
			$("#"+divRank).removeClass("rank-c");
			$("#"+divRank).addClass("rank-b");
		}else{
			$("#"+divRank).attr("title","安全");
			$("#"+spanRank).html("安全");
			$("#"+divRank).removeClass("rank-a");
			$("#"+divRank).removeClass("rank-b");
			$("#"+divRank).removeClass("rank-c");
			$("#"+divRank).addClass("rank-c");
		}
	}
}

//送票地址——详细地址校验规则
jQuery.validator.addMethod("checkDetailAddress", function(value, element) {
	return this.optional(element) || /^[0-9a-zA-Z\u3400-\u9FFF\#]+$/.test(value);
}, "wrong name.");

//送票地址——收货人姓名校验规则
jQuery.validator.addMethod("checkAddressName", function(value, element) {
	if(/^[-]+$/.test(value)){
		return false;
	}
	return this.optional(element) || /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(value) ||/^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(value);
}, "wrong name.");

//送票地址——省、市、县校验规则
jQuery.validator.addMethod("checkAddressSelect", function(value, element) {
	if(''==value){
		return false;
	}
	if(value){
		return true;
	}
	return this.optional(element);
}, "wrong name.");