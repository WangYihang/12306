/*!
 * 对jquery的ajax的封装，支持请求本地数据和请求远程http服务 该js必须放在jquery.js后面 同时还负责初始化各种js变量
 * ots_global.calendarLang 初始化calendar组件的国际化信息。
 */
var alertWarningMsg;
var alertWarningMsgByHeader;
var alertWarningMsgByTit_header;

(function() {
	
	var defaultWarningDhxWins = null;
	$(document).ready(function() {
		defaultWarningDhxWins = getDefaultWarningDhxWins();
	});

	var repeatSubmitToken = null;
	if (typeof globalRepeatSubmitToken != "undefined") {
		repeatSubmitToken  = globalRepeatSubmitToken;
	}
	var hiddenRequestAttribute = null;
	var _json_att = "_json_att";
	var hiddenFormId = "_es_hiddenform";
	var hiddenform = "<form  method='post' id='" + hiddenFormId + "'><input type='hidden' name='" + _json_att
			+ "'></input></form>";
	var jqueryAjax = $.ajax;
	ots_global = {};
	$.ajax = function(url, options) {
		if (typeof url == "object") {
			options = url;
			url = undefined;
		}
		options = options || {};
		var isAlert = options.isAlert || true;
		if (options.success) {
			var successOrginal = options.success;
			options.success = function(data, status, jqXHR) {
				if(data&&data.c_url){
					window[data.c_name]=data.c_url;
				}
				if (data && data.validateMessagesShowId) {
					var messages = data.messages;
					if (messages && messages.length > 0) {
						var messageString = "";
						for ( var i = 0; i < messages.length; i++) {
							messageString += messages[i] + "\n";
						}
						dhtmlx.alert({
							title : messages["message.info"],
							ok : messages["button.ok"],
							text : messageString,
							callback : function() {
								if (data.url) {
									window.location = ctx + data.url;
								}
							}
						});
					}

					var validateMessages = data.validateMessages;
					var messageString = "";
					for ( var key in validateMessages) {
						messageString += key + " :" + validateMessages[key] + "</br>";
					}
					if (data.attributes) {
						hiddenRequestAttribute = data.attributes;
					}
					if (data.repeatSubmitToken && data.repeatSubmitToken != "") {
						repeatSubmitToken = data.repeatSubmitToken;
					}
					if (messageString) {
						if (isAlert) {
							// alertWarningMsgByHeader(messageString);
							dhtmlx.alert({
								title : messages["message.info"],
								ok : messages["button.ok"],
								text : messageString,
								callback : function() {
									successOrginal.call(this, data, status, jqXHR);
								}
							});
						} else {
							$("#" + data.validateMessagesShowId).html(messageString).show();
							successOrginal.call(this, data, status, jqXHR);
						}
					} else {
						$("#" + data.validateMessagesShowId).html("").hide();
						successOrginal.call(this, data, status, jqXHR);
					}

				}else{
					successOrginal.call(this, data, status, jqXHR);
				}
			};
		}
		var data = options.data || {};
		//请求时是否携带隐藏的参数，默认是true，只有明确指定为false时才不携带
		var isTakeParam = true;
		if (options.isTakeParam == false) {
			isTakeParam = false;
		}
		if (isTakeParam) {
			if (hiddenRequestAttribute) {
				data[_json_att] = hiddenRequestAttribute;
			} else {
				data[_json_att] = $("input[name=_json_att]").val();
			}
		}
		if ("undefined"!=typeof(repeatSubmitToken)&&repeatSubmitToken != null) {
			data["REPEAT_SUBMIT_TOKEN"] = repeatSubmitToken;
		}

		options.data = data;
		jqueryAjax.call(this, url, options);
	};
	if (typeof otsRedirect == "undefined") {
		otsRedirect = function(method, url, data, target) {
			data = data || {};
			if (method && method == "post") {
				if ($("#" + hiddenFormId).length == 0) {
					$(document.body).append(hiddenform);
				}
				if (hiddenRequestAttribute) {
					$("#" + hiddenFormId + " input[name='" + _json_att + "']").val(hiddenRequestAttribute);
				}
				$("#" + hiddenFormId + " input[name='" + _json_att + "'] ~ input").remove();
				if (repeatSubmitToken != null) {
                    $("#" + hiddenFormId).append("<input type='hidden' name='REPEAT_SUBMIT_TOKEN'></input>");
                    $("#" + hiddenFormId + " input[name='REPEAT_SUBMIT_TOKEN']").val(repeatSubmitToken);
                }
				if (data) {
					for ( var name in data) {
						var input = "<input type='hidden' name='" + name + "'></input>";
						$("#" + hiddenFormId).append(input);
						$("#" + hiddenFormId + " input[name='" + name + "']").val(data[name]);
					}
					;
				}
				if (target != null) {
					$("#" + hiddenFormId).attr("target", target);
				}else{
					$("#" + hiddenFormId).removeAttr("target");
				}
				$("#" + hiddenFormId).attr("action", url);
				$("#" + hiddenFormId).submit();
			} else {
				if (hiddenRequestAttribute) {
					if (url.indexOf("?") > 0) {
						url += "&" + _json_att + "=" + hiddenRequestAttribute;
					} else {
						url += "?" + _json_att + "=" + hiddenRequestAttribute;
					}
				}
				if (data) {
					for ( var name in data) {
						if (url.indexOf("?") > 0) {
							url += "&" + name + "=" + data[name];
						} else {
							url += "?" + name + "=" + data[name];
						}
					}
				}
				switch (target) {
				case "_blank":
					window.open(url);
					break;
				default:
					window.location.href = url;
				}
			}
		};
	}
	;

	// 初始化日历控件的中文信息
	(function() {
		var langData = {
			// date format
			dateformat : '%Y-%m-%d',
			// full names of months
			monthesFNames : [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ],
			// shortened names of months
			monthesSNames : [ "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月" ],
			// full names of days
			daysFNames : [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ],
			// shortened names of days
			daysSNames : [ "日", "一", "二", "三", "四", "五", "六" ],
			// starting day of a week. Number from 1(Monday) to 7(Sunday)
			weekstart : 1
		};
		ots_global.calendarLang = ots_global.calendarLang || {};
		ots_global.calendarLang["zh_CN"] = langData;
	})();
	function getDefaultWarningDhxWins() {
		var dhxWins = new dhtmlXWindows();
		dhxWins.enableAutoViewport(true);
		dhxWins.setSkin("dhx_terrace");// 设置窗体的css样式
		dhxWins.setImagePath(ctx + "resources/js/rich/windows/imgs/");

		return dhxWins;
	}
	// 1，引入baseInit.js
	// 2，只传递错误信息即可，使用方式：alertWarningMsgByHeader("name is null");
	alertWarningMsgByHeader = function(header) {
		alertWarningMsg(messages["message.info"], header, "", messages["button.ok"]);
	};
	// 1，引入baseInit.js
	// 可传递错误信息和校验标题，如“下单”校验则：alertWarningMsgByTit_header("下单"，"下单失败！");
	alertWarningMsgByTit_header = function(title, header) {
		alertWarningMsg(title, header, "", messages["button.ok"]);
	};
	// 1，引入baseInit.js
	// 可传递错误信息、校验标题、失败的详细信息，如“下单”校验则：alertWarningMsg("下单"，"下单失败！"，"您有未完成订单，订单号：12345666");
	alertWarningMsg = function(title, header, body) {
		setDefaultWarningHtml(title, header, body, messages["button.ok"]);
		$("#qd_closeDefaultWarningWindowDialog_id").click(function() {
			closeDefaultWarningWindowDialog();
		});
		$("#gb_closeDefaultWarningWindowDialog_id").click(function() {
			closeDefaultWarningWindowDialog();
		});
		var contentId = "defaultwarningAlert_id";
		var winDialog = createDefaultWarningWindowDialog(contentId);
		var x = $(window).width() / 2 - 300;
		var y = getScrollTop() + ($(window).height() / 2 - 200);
		winDialog.setDimension($("#content_" + contentId).width(), $("#content_" + contentId).height() + 10);
		$(".dhtmlx_window_active").height($("#content_" + contentId).height());
		$(".dhtmlx_window_active").css({
			"left" : x + "px",
			"top" : y + "px"
		});
	};
	function getScrollTop() {
		if ('pageYOffset' in window) {
			return window.pageYOffset;
		} else if (document.compatMode == 'BackCompat') {
			return document.body.scrollTop;
		} else {
			return document.documentElement.scrollTop;
		}
	}
	function setDefaultWarningHtml(title, header, body, buttonOk) {
		var alertWaringAlerHtml = "<div id=\"defaultwarningAlert_id\" style=\"display:none;\" >"
				+ "<div class=\"mark\"></div>"
				+ "<div class=\"up-box w600\" id=\"content_defaultwarningAlert_id\">"
				+ "<div class=\"up-box-hd\" ><span id=\"content_defaultwarningAlert_title\">"
				+ title
				+ "</span><a href=\"#nogo\"id=\"gb_closeDefaultWarningWindowDialog_id\">关闭</a></div>"
				+ "<div class=\"up-box-bd\">"
				+ "<div class=\"up-con clearfix\">"
				+ "<span class=\"icon i-warn\"></span>"
				+ " <div class=\"r-txt\">"
				+ "<div class=\"tit\" id=\"content_defaultwarningAlert_hearder\" >"
				+ header
				+ "</div>"
				+ "<P  id=\"content_defaultwarningAlert_body\">"
				+ body
				+ "</P>"
				+ "</div>"
				+ "</div>"
				+ " <div class=\"lay-btn\"><a href=\"#nogo\" id=\"qd_closeDefaultWarningWindowDialog_id\" class=\"btn92s\">"
				+ buttonOk + "</a></div>" + "</div>" + "</div>" + "</div>";
		$("body").append(alertWaringAlerHtml);
	}
	function createDefaultWarningWindowDialog(contentId) {
		var winDialog = defaultWarningDhxWins.createWindow(contentId + "_", 50, 10, 660, 100);
		winDialog.attachObject(contentId);
		winDialog.clearIcon();// 清除窗口图标
		winDialog.denyResize();// 不允许窗口调整大小
		winDialog.setModal(true);// 设置模态窗口
		winDialog.center();// 居中
		winDialog.button("park").hide();
		winDialog.button("minmax1").hide();
		winDialog.hideHeader();
		return winDialog;
	}
	function closeDefaultWarningWindowDialog() {
		var contentId = "defaultwarningAlert_id";
		if (defaultWarningDhxWins.isWindow(contentId + "_")) {
			defaultWarningDhxWins.window(contentId + "_").close();
		}
	}
})();