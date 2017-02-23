//v.3.6 build 130417

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
You allowed to use this component or parts of it under GPL terms
To use it on other terms or get Professional edition of the component please contact us at sales@dhtmlx.com
*/
dhtmlXCombo.prototype.enableOptionAutoPositioning=function(a){if(!this.ListAutoPosit)this.ListAutoPosit=1;this.attachEvent("onOpen",function(){this._setOptionAutoPositioning(a)});this.attachEvent("onXLE",function(){this._setOptionAutoPositioning(a)})};
dhtmlXCombo.prototype._setOptionAutoPositioning=function(a){if(typeof a!="undefined"&&!convertStringToBoolean(a))return this.ListPosition="Bottom",this.ListAutoPosit=0,!0;var b=this.getPosition(this.DOMelem),c=this._getClientHeight()-b[1]-this.DOMelem.offsetHeight,d=this.autoHeight?this.DOMlist.scrollHeight:parseInt(this.DOMlist.offsetHeight);this.ListPosition=c<d&&b[1]>d?"Top":"Bottom";this._positList();_isIE&&this._IEFix(!0)};
dhtmlXCombo.prototype._getClientHeight=function(){return document.compatMode=="CSS1Compat"&&!window.opera?document.documentElement.clientHeight:document.body.clientHeight};dhtmlXCombo.prototype.setOptionWidth=function(a){if(arguments.length>0&&(this.DOMlist.style.width=a+"px",this.DOMlistF))this.DOMlistF.style.width=a+"px"};
dhtmlXCombo.prototype.setOptionHeight=function(a){if(arguments.length>0){this.DOMlist.style.height=_isIE?this.DOMlistF.style.height=a+"px":a+"px";if(this.DOMlistF)this.DOMlistF.style.height=this.DOMlist.style.height;this._positList();_isIE&&this._IEFix(!0)}};
dhtmlXCombo.prototype.enableOptionAutoWidth=function(a){if(!this._listWidthConf)this._listWidthConf=this.DOMlist.offsetWidth;arguments.length==0&&(a=1);if(convertStringToBoolean(a))this.autoOptionWidth=1,this.awOnOpen=this.attachEvent("onOpen",function(){this._setOptionAutoWidth()}),this.awOnXLE=this.attachEvent("onXLE",function(){this._setOptionAutoWidth()});else if(typeof this.awOnOpen!="undefined")this.autoOptionWidth=0,this.detachEvent(this.awOnOpen),this.detachEvent(this.awOnXLE),this.setOptionWidth(this._listWidthConf)};
dhtmlXCombo.prototype._setOptionAutoWidth=function(){var a=!this.ahOnOpen&&this.DOMlist.scrollHeight>this.DOMlist.offsetHeight;this.setOptionWidth(1);for(var b=this.DOMlist.offsetWidth,c=0;c<this.optionsArr.length;c++){var d=_isFF?this.DOMlist.childNodes[c].scrollWidth-2:this.DOMlist.childNodes[c].scrollWidth;if(d>b)b=this.DOMlist.childNodes[c].scrollWidth}b+=a?18:0;this.setOptionWidth(this.DOMelem.offsetWidth>b?this.DOMelem.offsetWidth:b+2)};
dhtmlXCombo.prototype.enableOptionAutoHeight=function(a,b){if(!this._listHeightConf)this._listHeightConf=this.DOMlist.style.height==""?100:parseInt(this.DOMlist.style.height);arguments.length==0&&(a=1);this.autoHeight=convertStringToBoolean(a);var c=this;if(this.autoHeight){var d=function(){window.setTimeout(function(){c._setOptionAutoHeight(a,b)},1)};this.ahOnOpen=this.attachEvent("onOpen",d);if(!this.awOnOpen)this.ahOnXLE=this.attachEvent("onXLE",d);var e;this.ahOnKey=this.attachEvent("onKeyPressed",
function(){this._filter&&(e&&window.clearTimeout(e),window.setTimeout(function(){c.DOMlist.style.display=="block"&&c._setOptionAutoHeight(a,b)},50))})}else typeof this.ahOnOpen!="undefined"&&(this.detachEvent(this.ahOnOpen),this.ahOnXLE&&this.detachEvent(this.ahOnXLE),this.ahOnKey&&this.detachEvent(this.ahOnKey),this.setOptionHeight(this._listHeightConf))};
dhtmlXCombo.prototype._setOptionAutoHeight=function(a,b){if(convertStringToBoolean(a)){this.setOptionHeight(1);var c=0;this.optionsArr.length>0?(c=this.DOMlist.scrollHeight>this.DOMlist.offsetHeight?this.DOMlist.scrollHeight+2:this.DOMlist.offsetHeight,arguments.length>1&&b&&(b=parseInt(b),c=c>b?b:c),this.setOptionHeight(c)):this.DOMlist.style.display="none"}};

//v.3.6 build 130417

/*
Copyright DHTMLX LTD. http://www.dhtmlx.com
You allowed to use this component or parts of it under GPL terms
To use it on other terms or get Professional edition of the component please contact us at sales@dhtmlx.com
*/