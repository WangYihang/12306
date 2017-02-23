/**
 * 扩展combo，可以嵌入html 并且支持分页
 */

if (!window.dhtmlx)
	dhtmlx = {};

dhtmlx.Template = {
	_cache : {},
	empty : function() {
		return "";
	},
	setter : function(value) {
		return dhtmlx.Template.fromHTML(value);
	},
	obj_setter : function(value) {
		var f = dhtmlx.Template.setter(value);
		var obj = this;
		return function() {
			return f.apply(obj, arguments);
		};
	},
	fromHTML : function(str) {
		if (typeof str == "function")
			return str;
		if (this._cache[str])
			return this._cache[str];

		// supported idioms
		// {obj} => value
		// {obj.attr} => named attribute or value of sub-tag in case of xml
		// {obj.attr?some:other} conditional output
		// {-obj => sub-template
		str = (str || "").toString();
		str = str.replace(/[\r\n]+/g, "\\n");
		str = str.replace(/\{obj\.([^}?]+)\?([^:]*):([^}]*)\}/g, "\"+(obj.$1?\"$2\":\"$3\")+\"");
		str = str.replace(/\{common\.([^}\(]*)\}/g, "\"+common.$1+\"");
		str = str.replace(/\{common\.([^\}\(]*)\(\)\}/g, "\"+(common.$1?common.$1(obj):\"\")+\"");
		str = str.replace(/\{obj\.([^}]*)\}/g, "\"+obj.$1+\"");
		str = str.replace(/#([a-z0-9_]+)#/gi, "\"+obj.$1+\"");
		str = str.replace(/\{obj\}/g, "\"+obj+\"");
		str = str.replace(/\{-obj/g, "{obj");
		str = str.replace(/\{-common/g, "{common");
		str = "return \"" + str + "\";";
		return this._cache[str] = Function("obj", "common", str);
	}
};

/* 添加一种新的dhtmlXcombo html，支持标准的json以及多个字段过滤 */
dhtmlXCombo_htmlOption = function() {
	this.init();
}
dhtmlXCombo_htmlOption.prototype = new dhtmlXCombo_defaultOption;

dhtmlXCombo_htmlOption.prototype.setValue = function(attr) {
	this.value = attr.value || "";
	this.text = attr.text || "";
	this.css = attr.css || "";
	this.htmltemplate = attr.htmltemplate||"";
	this.inputTextTemplate = attr.inputTextTemplate||"";
}
dhtmlXCombo_htmlOption.prototype.render = function() {
	if (!this.content) {
		this.content = document.createElement("DIV");
		this.content._self = this;
		this.content.style.cssText = 'width:100%; overflow:hidden;white-space:nowrap; ' + this.css;
		var html = '';
		var _text = this.text;
		if (this.htmltemplate) {
			_text = dhtmlx.Template.obj_setter(this.htmltemplate).call(this.text, this.text);
		}
		html += '<div style="display:inline;vertical-align:middle;">' + _text + '</div>';
		this.content.innerHTML = html;
		if (this.inputTextTemplate) {
			this._ctext = dhtmlx.Template.obj_setter(this.inputTextTemplate).call(this.text, this.text);
		} else {
			this._ctext = (typeof this.content.textContent != "undefined") ? this.content.textContent
					: this.content.innerText;
		}
	}
	return this.content;
}
dhtmlXCombo.prototype.setHTMLTemplate = function(html) {
	this.htmltemplate = html;
}
dhtmlXCombo.prototype.setInputTextTemplate = function(html) {
	this.inputTextTemplate = html;
}
dhtmlXCombo.prototype._addOption = function(attr) {
	dOpt = new this._optionObject();
	this.optionsArr.push(dOpt);
	attr["htmltemplate"] = this.htmltemplate;
	attr["inputTextTemplate"] = this.inputTextTemplate;
	dOpt.setValue.apply(dOpt, [ attr ]);
	this.redrawOptions();
}

dhtmlXCombo.prototype.setFilterNames = function(names) {
	if (names && names.length) {
		this.filterNames = names;
	} else {
		alert(" dhtmlXCombo.dhtmlXCombo filtersName must be an array");
	}

}
dhtmlXCombo.prototype.getFilterNames = function() {
	return this.filterNames || [];
}
dhtmlXCombo_optionTypes['html'] = dhtmlXCombo_htmlOption;

dhtmlXCombo.prototype.filterSelf = function(mode) {
	var text = this.getComboText();
	if (this._xml) {
		this._lkmode = mode;
		this._fetchOptions(0, text);
	}
	var escapeExp = new RegExp("([" + this.filterEntities.join("\\") + "])", "g");
	text = text.replace(escapeExp, "\\$1");
	var filterExp = (this._anyPosition ? "" : "^") + text;
	var filter = new RegExp(filterExp, "i");
	this.filterAny = false;
	for ( var i = 0; i < this.optionsArr.length; i++) {
		var z = null;
		if (typeof this.optionsArr[0].text == "object" && this.filterNames) {
			z = false;
			for ( var j = 0; j < this.filterNames.length; j++) {
				z = filter.test(this.optionsArr[i].text[this.filterNames[j]]);
				if (z) {
					break;
				}
			}
		} else {
			z = filter.test(this.optionsArr[i].content ? this.optionsArr[i].data()[1] : this.optionsArr[i].text);
		}
		this.filterAny |= z;
		this.optionsArr[i].hide(!z);
	}
	if (!this.filterAny) {
		this.closeAll();
		this._activeMode = true;
	} else {
		if (this.DOMlist.style.display != "block")
			this.openSelect();
		if (_isIE)
			this._IEFix(true);
	}

//	if (!mode && !this._autoDisabled) {
//		this._correctSelection();
//	} else
		this.unSelectOption();
}
