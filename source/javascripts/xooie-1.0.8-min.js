/*
*   Copyright 2013 Comcast
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*/

/*
* Copyright 2013 Comcast
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

define("xooie/helpers",["jquery"],function(e){var t={toArray:function(e){if(typeof e=="string")return e.split(/\s+/);if(e instanceof Array)return e},toInteger:function(e){return parseInt(e,10)},isArray:function(){return Array.isArray||function(e){return Array.prototype.toString(e)==="[object Array]"}}(),isObject:function(t){return e.isPlainObject(t)},isUndefined:function(e){return e===undefined},isDefined:function(e){return!this.isUndefined(e)},isFunction:function(e){return typeof e=="function"}};return t}),define("xooie/stylesheet",["jquery"],function(e){var t=function(t){this.element=e("style[id="+t+"]"),this.element.length<=0&&(this.element=e(['<style id="'+t+'">',"/* This is a dynamically generated stylesheet: "+t+" */","</style>"].join("")),this.element.appendTo(e("head"))),this._name=t};return t.prototype.get=function(){return this.element[0].sheet||this.element[0].styleSheet},t.prototype.getRule=function(e){var t,n;e=e.toLowerCase(),n=this.get().cssRules||this.get().rules;for(t=0;t<n.length;t+=1)if(n[t].selectorText.toLowerCase()===e)return n[t];return!1},t.prototype.addRule=function(e,t){var n=this.getRule(e),r,i,s="",o,u;if(!n){for(i in t)t.hasOwnProperty(i)&&(s+=i+": "+t[i]+";");if(this.get().insertRule)r=this.get().cssRules.length,this.get().insertRule(e+" {"+s+"}",r),n=this.get().cssRules[r];else{r=this.get().rules.length,o=e.split(",");for(u=0;u<o.length;u+=1)this.get().addRule(o[u],s,r+u);n=this.get().rules[r]}}return n},t.prototype.deleteRule=function(e){var t,n;e=e.toLowerCase(),n=this.get().cssRules||this.get().rules;for(t=0;t<n.length;t+=1)if(n[t].selectorText.toLowerCase()===e)return this.get().deleteRule?this.get().deleteRule(t):this.get().removeRule(t),!0;return!1},t}),define("xooie/polyfill",[],function(){Array.prototype.indexOf||(Array.prototype.indexOf=function(e,t){var n,r,i;r=t||0;if(!this)throw new TypeError;i=this.length;if(i===0||r>=i)return-1;r<0&&(r=i-Math.abs(r));for(n=r;n<i;n+=1)if(this[n]===e)return n;return-1}),Function.prototype.bind||(Function.prototype.bind=function(e){var t,n;return t=this,n=Array.prototype.slice.call(arguments,1),function(){return t.apply(e,n.concat(Array.prototype.slice.call(arguments)))}})});var $X,Xooie;$X=Xooie=function(e){function i(e,t){var n;for(n in t)t.hasOwnProperty(n)&&(e[n]=t[n])}function s(){Xooie.cleanup!==undefined&&Xooie.cleanup()}var t={widgets:{},addons:{}},n=function(){return!1},r=null;return n.config=function(e){var n;for(n in e)e.hasOwnProperty(n)&&(n==="widgets"||n==="addons"?i(t[n],e[n]):t[n]=e[n]);e.cleanupInterval!==undefined&&(r=clearInterval(r),t.cleanupInterval>0&&(r=setInterval(s,t.cleanupInterval)))},n._mapName=function(e,n){return t[n][e]===undefined?[t.root,"/",n,"/",e].join(""):t[n][e]},n.config({root:"xooie",cleanupInterval:0}),e&&n.config(e),n}(Xooie),define("xooie/xooie",["jquery","xooie/helpers","xooie/stylesheet","xooie/polyfill"],function(e,t,n){var r,i,s,o,u;return r=Xooie.config,i=Xooie._mapName,s="[data-widget-type]",o="widgetType",u="addons",$X=Xooie=function(n){var r,i,a,f,l,c,h;n=e(n),i=n.find(s),n.is(s)&&(i=i.add(n)),f=[];for(c=0;c<i.length;c+=1){r=e(i[c]),a=t.toArray(r.data(o));for(h=0;h<a.length;h+=1)l=$X._mapName(a[h],"widgets"),f.indexOf(l)===-1&&f.push(l);a=t.toArray(r.data(u))||[];for(h=0;h<a.length;h+=1)l=$X._mapName(a[h],"addons"),f.indexOf(l)===-1&&f.push(l)}require(f,function(){var n,s,a,l,p,d,v;d=[];for(c=0;c<i.length;c+=1){r=e(i[c]),n=t.toArray(r.data(o)),s=t.toArray(r.data(u))||[];for(h=0;h<n.length;h+=1){p=f.indexOf($X._mapName(n[h],"widgets")),l=arguments[p],a=[];for(v=0;v<s.length;v+=1)p=f.indexOf($X._mapName(s[v],"addons")),a.push(arguments[p]);d.push(new l(r,a))}}})},Xooie.config=r,Xooie._mapName=i,Xooie._stylesheet=new n("Xooie"),Xooie._styleRules={},Xooie._instanceCache=[],Xooie._instanceIndex=0,Xooie.cleanup=function(){var e,t;for(e=0;e<$X._instanceCache.length;e+=1)t=$X._instanceCache[e],t.root()&&t.root().parents("body").length===0&&(t.cleanup(),delete $X._instanceCache[e])},Xooie}),require(["jquery","xooie/xooie"],function(e,t){e(document).ready(function(){t(e(this))})}),define("xooie/shared",["jquery","xooie/helpers"],function(e,t){function r(e){return{getter:"_get_"+e,setter:"_set_"+e,processor:"_process_"+e,validator:"_validate_"+e,defaultValue:"_default_value_"+e,value:"_"+e}}function i(e,n){var i=r(e);t.isFunction(n[e])||(n._definedProps.push(e),n[e]=function(e){return t.isUndefined(e)?this[i.getter]():this[i.setter](e)})}var n;return n={defineReadOnly:function(e,n,s){var o=r(n);i(n,e.prototype),e.prototype[o.defaultValue]=s,t.isFunction(e.prototype[o.getter])||(e.prototype[o.getter]=function(){var e=t.isUndefined(this[o.value])?this[o.defaultValue]:this[o.value];return t.isFunction(this[o.processor])?this[o.processor](e):e})},defineWriteOnly:function(e,n){var s=r(n);i(n,e.prototype),t.isFunction(e.prototype[s.setter])||(e.prototype[s.setter]=function(e){if(!t.isFunction(this[s.validator])||this[s.validator](n))this[s.value]=e})},create:function(n,r,i){var s=function(){return function(){var n,r;for(n=0;n<s._constructors.length;n+=1){r=s._constructors[n].apply(this,arguments);if(!t.isUndefined(r))return r}for(n=0;n<s._postConstructors.length;n+=1)s._postConstructors[n].apply(this,arguments)}}();return t.isUndefined(i)||(e.extend(!0,s,i),e.extend(!0,s.prototype,i.prototype)),t.isUndefined(s._constructors)&&(s._constructors=[]),n&&s._constructors.push(n),t.isUndefined(s._postConstructors)&&(s._postConstructors=[]),r&&s._postConstructors.unshift(r),s},get:function(e,t){var n=r(t);return e[n.getter]()},set:function(e,n,i){var s=r(n);t.isFunction(e[s.setter])&&e[s.setter](i)},setData:function(e,n){var r,i;for(r=0;r<e._definedProps.length;r+=1)i=e._definedProps[r],t.isDefined(n[i])&&e.set(i,n[i])}},n}),define("xooie/widgets/base",["jquery","xooie/xooie","xooie/helpers","xooie/shared"],function(e,t,n,r){function s(e){return{processor:"_process_role_"+e,renderer:"_render_role_"+e,getter:"_get_role_"+e,pluralName:e+"s",selector:"[data-x-role="+e+"]"}}function o(e,t){var r=s(e);n.isUndefined(t[r.pluralName])&&(t._definedRoles.push(e),t[r.pluralName]=function(){return this[r.getter]()})}function u(e){if(!n.isUndefined(e)){var r=t._instanceIndex;return t._instanceIndex+=1,n.isUndefined(t._instanceCache[r])?(t._instanceCache[r]=e,r):u(e)}}var i;return e.event.special["xooie-init"]={add:function(t){var r,i;r=e(this).data("xooieInstance"),n.isUndefined(r)||(i=e.Event("xooie-init"),i.namespace=t.namespace,i.data=t.data,t.handler.call(this,i))}},i=r.create(function(i,s){var o,a=this;i=e(i),s=s||[],r.setData(this,i.data());if(i.data("xooieInstance")){if(!n.isUndefined(t._instanceCache[i.data("xooieInstance")]))return i.trigger(this.get("refreshEvent")),t._instanceCache[i.data("xooieInstance")];this.cleanup()}i.on(this.get("initEvent")+" "+this.get("refreshEvent"),function(){a._applyRoles()}),o=u(this),i.attr("data-xooie-instance",o),this.set("id",o),this.set("root",i),i.addClass(this.get("className")).addClass(this.get("instanceClass"))},function(t,r){var i,s=[];t=e(t);if(!n.isUndefined(r))for(i=0;i<r.length;i+=1)s.push(new r[i](this));this.root().trigger(this.get("initEvent"))}),i._renderMethods={micro_template:function(t,r){return n.isUndefined(t.micro_render)?!1:e(t.micro_render(r))},mustache:function(t,r){return!n.isUndefined(Mustache)&&!n.isUndefined(Mustache.render)?e(Mustache.render(t.html(),r)):!1},jsrender:function(t,r){return n.isUndefined(t.render)?!1:e(t.render(r))},underscore:function(t,r){return!n.isUndefined(_)&&!n.isUndefined(_.template)?e(_.template(t.html())(r).trim()):!1}},i.defineWriteOnly=function(e){r.defineWriteOnly(this,e)},i.defineReadOnly=function(e,t){r.defineReadOnly(this,e,t)},i.define=function(e,t){this.defineReadOnly(e,t),this.defineWriteOnly(e)},i.defineRole=function(e){var t=s(e);o(e,this.prototype),n.isFunction(this.prototype[t.getter])||(this.prototype[t.getter]=function(){return this.root().find(t.selector)})},i.extend=function(e,t){return r.create(e,t,this)},i.createStyleRule=function(e,r){return n.isUndefined(t._stylesheet.addRule)?!1:t._stylesheet.addRule(e,r)},i.getStyleRule=function(e){return t._styleRules.hasOwnProperty(e)?t._styleRules[e]:t._stylesheet.getRule(e)},i.prototype._definedProps=[],i.prototype._definedRoles=[],i.define("id"),i.define("root"),i.define("namespace",""),i.define("templateLanguage","micro_template"),i.defineReadOnly("addons"),i.defineReadOnly("refreshEvent","xooie-refresh"),i.defineReadOnly("initEvent","xooie-init"),i.defineReadOnly("className","is-instantiated"),i.defineReadOnly("instanceClass"),i.prototype.get=function(e){return r.get(this,e)},i.prototype.set=function(e,t){return r.set(this,e,t)},i.prototype.cleanup=function(){var e;for(e in this.addons())this.addons().hasOwnProperty(e)&&this.addons()[e].cleanup();this.root().removeClass(this.className()),this.root().removeClass(this.instanceClass()),this.root().attr("data-xooie-instance",!1)},i.prototype.render=function(t,n){var r=t.data("templateLanguage")||this.templateLanguage(),s=i._renderMethods[r](t,n);return s===!1?e("<span>Error rendering template</span>"):s},i.prototype._getRoleId=function(e,t){return"x-"+this.id()+"-"+e+"-"+t},i.prototype._applyRoles=function(){var t,r,i,o;for(t=0;t<this._definedRoles.length;t+=1){i=s(this._definedRoles[t]),o=this[i.getter](),o.length===0&&n.isFunction(this[i.renderer])&&(o=this[i.renderer]());if(n.isUndefined(o))return;for(r=0;r<o.length;r+=1)e(o[r]).attr("id",this._getRoleId(this._definedRoles[t],r));n.isFunction(this[i.processor])&&this[i.processor](o)}},i.prototype._process_addons=function(e){return n.isUndefined(e)&&(e=this._addons={}),e},i.prototype._process_refreshEvent=function(e){return this.namespace()===""?e:e+"."+this.namespace()},i.prototype._process_initEvent=function(e){return this.namespace()===""?e:e+"."+this.namespace()},i.prototype._process_className=function(e){return this.namespace()===""?e:e+"-"+this.namespace()},i.prototype._process_instanceClass=function(){return this.namespace()===""?"widget-"+this.id():this.namespace()+"-"+this.id()},i}),define("xooie/event_handler",["jquery","xooie/helpers"],function(e,t){function r(e,t){return t?e+"."+t:e}var n=function(e){this.namespace=e,this.handlers={},this._callbacks={}};return n.prototype.add=function(n,i){var s,o,u;s=this;if(t.isObject(n)&&t.isUndefined(i)){for(u in n)n.hasOwnProperty(u)&&t.isFunction(n[u])&&this.add(u,n[u]);return}o=r(n,this.namespace),t.isUndefined(this.handlers[o])&&(this.handlers[o]=function(){[].splice.call(arguments,0,0,this),s.fire.apply(s,arguments)}),t.isUndefined(this._callbacks[n])&&(this._callbacks[n]=e.Callbacks("unique")),this._callbacks[n].add(i)},n.prototype.clear=function(e){delete this.handlers[r(e,this.namespace)],t.isUndefined(this._callbacks[e])||this._callbacks[e].empty()},n.prototype.fire=function(e,n){var r;if(n.namespace&&n.namespace!==this.namespace)return;r=[].slice.call(arguments,1),t.isUndefined(this._callbacks[n.type])||this._callbacks[n.type].fireWith(e,r)},n}),define("xooie/widgets/carousel",["jquery","xooie/helpers","xooie/widgets/base","xooie/event_handler"],function(e,t,n,r){function o(e){e=e.toLowerCase();var t=e.match(/^control:(left|right|goto)\s(\d+)(?:st|nd|rd|th)?\s([\w\W]*?)$/);t===null&&(t=e.match(/^control:(left|right)()\s(continuous)$/));if(t!==null)return t.slice(1)}var i,s;return s={resize:null},e(window).on("resize",function(){s.resize!==null&&(clearTimeout(s.resize),s.resize=null),i._cache.length>0&&(s.resize=setTimeout(function(){i._cache.trigger(i.prototype.resizeEvent())},100))}),i=n.extend(function(){function s(e,t){clearInterval(n._timers.continuous),n._timers.continuous=setInterval(function(t){e.is(":disabled")&&(n._timers.continuous=clearInterval(n._timers.continuous)),n.scrollTo(n.wrappers().scrollLeft()+t*5)},0,[t==="right"?1:-1])}function u(){n._timers.scroll=clearTimeout(n._timers.scroll),n.updateLimits()}var n=this;this._timers={scroll:0,continuous:0},this._positioners={item:function(e,n){var r,i,s;r=this.items(),n=t.toInteger(n);if(isNaN(n))return;e==="goto"&&n>0&&n<=r.length?i=Math.round(r.eq(n-1).position().left)-this.contents().position().left:(s=this.currentItem(e==="right"),e=e==="left"?-1:1,s=Math.max(0,Math.min(r.length-1,s+e*n)),i=this.wrappers().scrollLeft()+Math.round(r.eq(s).position().left)),this.scrollTo(i)},items:function(){return this._positioners.item.apply(this,arguments)},pixel:function(e,n){var r;n=t.toInteger(n);if(isNaN(n))return;e==="goto"&&n>=0?r=n:(e=e==="left"?-1:1,r=this.wrappers().scrollLeft()+e*n),this.scrollTo(r)},pixels:function(){return this._positioners.pixel.apply(this,arguments)},px:function(){return this._positioners.pixel.apply(this,arguments)}},this._controlEvents=new r(this.namespace()),this._controlEvents.add({keydown:function(t){var n,r;[13,32].indexOf(t.which)!==-1&&(n=e(this),r=o(n.attr("data-x-role")),r[2]==="continuous"&&!n.is(":disabled")&&(s(n,r[0]),t.preventDefault()))},mousedown:function(t){var n,r;n=e(this),r=o(n.attr("data-x-role")),r[2]==="continuous"&&!n.is(":disabled")&&(s(n,r[0]),t.preventDefault())},keyup:function(r){n._timers.continuous=clearInterval(n._timers.continuous);if(e(this).is(":disabled"))return;if([13,32].indexOf(r.which)!==-1){var i=o(e(this).attr("data-x-role"));t.isFunction(n._positioners[i[2]])&&n._positioners[i[2]].apply(n,i),r.preventDefault()}},mouseup:function(r){n._timers.continuous=clearInterval(n._timers.continuous);if(e(this).is(":disabled"))return;var i=o(e(this).attr("data-x-role"));t.isFunction(n._positioners[i[2]])&&n._positioners[i[2]].apply(n,i),r.preventDefault()},mouseleave:function(){n._timers.continuous=clearInterval(n._timers.continuous)},blur:function(){n._timers.continuous=clearInterval(n._timers.continuous)}}),this._wrapperEvents=new r(this.namespace()),this._wrapperEvents.add("scroll",function(){n._timers.scroll?n._timers.scroll=clearTimeout(n._timers.scroll):(n.root().removeClass(n.leftClass()+" "+n.rightClass()),n.controls().prop("disabled",!1)),n._timers.scroll=setTimeout(u,250)}),this.cropStyle(i.createStyleRule("."+this.instanceClass()+" ."+this.cropClass()+", ."+this.instanceClass()+"."+this.cropClass(),{height:"auto"})),i._cache=i._cache.add(this.root()),this.root().on([this.get("initEvent"),this.get("refreshEvent"),this.get("resizeEvent")].join(" "),function(){n.updateDimensions()})}),i._cache=e(),i.define("namespace","carousel"),i.define("isScrolling",!1),i.define("visibleThreshold",.5),i.define("cropStyle"),i.defineReadOnly("resizeEvent","xooie-carousel-resize"),i.defineReadOnly("wrapperClass","xooie-carousel-wrapper"),i.defineReadOnly("cropClass","xooie-carousel-crop"),i.defineReadOnly("contentClass","xooie-carousel-content"),i.defineReadOnly("controlClass","xooie-carousel-control"),i.defineReadOnly("leftClass","is-left-limit"),i.defineReadOnly("rightClass","is-right-limit"),i.defineRole("wrapper"),i.defineRole("content"),i.defineRole("item"),i.defineRole("control"),i.createStyleRule("."+i.prototype.wrapperClass(),{position:"relative","overflow-x":"scroll","overflow-y":"hidden"}),i.createStyleRule("."+i.prototype.cropClass(),{"overflow-y":"hidden"}),i.createStyleRule("."+i.prototype.contentClass(),{display:"table-cell","white-space":"nowrap","font-size":"0px",transition:"left 0.5s"}),i.createStyleRule("ul."+i.prototype.contentClass(),{"list-style":"none",padding:0,margin:0}),i.createStyleRule("."+i.prototype.contentClass()+" > *",{display:"inline-block",zoom:"1","*display":"inline","font-size":"1em"}),i.createStyleRule("."+i.prototype.leftClass()+"."+i.prototype.rightClass()+' [data-x-role^="control:left"]'+", ."+i.prototype.leftClass()+"."+i.prototype.rightClass()+' [data-x-role^="control:right"]',{display:"none"}),i.prototype.currentItem=function(e){var t,n,r,i,s;t=this.contents(),n=this.items();if(e){r=t.outerWidth(!0)+t.position().left;for(s=n.length-1;s>0;s-=1){i=n.eq(s).outerWidth(!0),r-=i;if(s>0&&r<=this.visibleThreshold()*i)return s}return 0}r=t.position().left;for(s=0;s<n.length-1;s+=1){i=n.eq(s).outerWidth(!0);if(r+this.visibleThreshold()*i>=0)return s;r+=i}return n.length-1},i.prototype.isLeft=function(){return this.wrappers().scrollLeft()===0},i.prototype.isRight=function(){var e,n;try{e=this.items().filter(":visible:last"),n=e.position();if(n&&!t.isUndefined(n.left))return Math.floor(n.left)+e.outerWidth(!0)<=this.wrappers().innerWidth()}catch(r){return!1}return!1},i.prototype.updateDimensions=function(){var t=0;this.items().each(function(){t=Math.max(t,e(this).outerHeight(!0))}),this.cropStyle().style.height=t+"px",this.updateLimits()},i.prototype.updateLimits=function(){var e,t;e=this.isLeft(),t=this.isRight(),this.root().toggleClass(this.leftClass(),e),this.controls().filter('[data-x-role^="control:left"]').prop("disabled",e),this.root().toggleClass(this.rightClass(),t),this.controls().filter('[data-x-role^="control:right"]').prop("disabled",t)},i.prototype.scrollTo=function(e,n){var r=this;e=Math.floor(e),this.isScrolling&&this.wrappers().stop(!0,!0),this.isScrolling=!0,this.wrappers().animate({scrollLeft:e},200,function(){r.isScrolling=!1,t.isFunction(n)&&n()})},i.prototype._process_role_content=function(e){return e.addClass(this.contentClass()),e.is("ul,ol")||e.attr("role","list"),e},i.prototype._render_role_wrapper=function(){var t=e('<div data-x-role="wrapper" />');return this.contents().wrap(t),this.contents().parent()},i.prototype._process_role_wrapper=function(e){return e.addClass(this.wrapperClass()).on(this._wrapperEvents.handlers).parent().addClass(this.cropClass()),e},i.prototype._get_role_item=function(){return this.contents().children()},i.prototype._get_role_control=function(){return this.root().find('[data-x-role^="control"]')},i.prototype._process_role_control=function(e){return e.on(this._controlEvents.handlers),e.attr("aria-hidden",!0).addClass(this.controlClass()),e},i.prototype._process_resizeEvent=function(e){return this.namespace()===""?e:e+"."+this.namespace()},i}),define("xooie/widgets/dropdown",["jquery","xooie/widgets/base","xooie/helpers"],function(e,t,n){function r(e){return typeof e=="string"?(e=e.split(","),e.map(function(e){return parseInt(e,10)})):typeof e=="number"?[e]:e}var i=t.extend(function(){var t,r,i;t=this,r=t.getHandle(),i=t.getExpander(),this.handlers={off:function(r){var i=!1;n.isUndefined(r.data.not)||(i=e(r.data.not).is(e(this))||e(r.target).parents(r.data.not).length>0),n.isUndefined(r.data.which)||(i=i||r.data.which.indexOf(r.which)===-1),i=i||e(r.target).is(t.getExpander(r.data.index))||e(r.target).parents(t.dropdownExpanderSelector()).length>0,i=i&&!e(r.target).is(e(this));if(i)return!0;r.preventDefault(),t.collapse(r.data.index,r.data)},on:function(r){var i,s;i=r.data.index||parseInt(e(this).attr("data-dropdown-index"),10),n.isUndefined(r.data.not)||(s=e(r.data.not).is(e(this)),s=s||e(r.target).parents(r.data.not).length>0),s=s||!n.isUndefined(r.data.which)&&r.data.which.indexOf(r.which)===-1;if(s)return!0;r.preventDefault(),t.expand(i,r.data)}},this.timers={expand:[],collapse:[],throttle:[]},this.addHandlers("on"),this.root().on({dropdownExpand:function(n,r){t.removeHandlers("on",r),t.addHandlers("off",r),e(this).attr("aria-selected",!0),t.getExpander(r).attr("aria-hidden",!1),n.preventDefault()},dropdownCollapse:function(n,r){t.removeHandlers("off",r),t.addHandlers("on",r),e(this).attr("aria-selected",!1),t.getExpander(r).attr("aria-hidden",!0),n.preventDefault()}},this.dropdownHandleSelector()),this.root().on("xooie-init.dropdown xooie-refresh.dropdown",function(){r.each(function(t){var n,r;n=e(this),r=i.eq(t),n.attr({"data-dropdown-index":t,"aria-selected":!1}),r.attr({"data-dropdown-index":t,"aria-hidden":!0})})}),i.on("mouseover focus",function(){var n=parseInt(e(this).attr("data-dropdown-index"),10);t.timers.collapse[n]&&(t.timers.collapse[n]=clearTimeout(t.timers.collapse[n]),e(this).on("mouseleave blur",{index:n},function(n){t.collapse(n.data.index,0),e(this).unbind(n)}))})});return i.define("namespace","dropdown"),i.define("throttleDelay",300),i.define("triggers",{on:{focus:{delay:0}},off:{blur:{delay:0}}}),i.defineReadOnly("dropdownHandleSelector",'[data-role="dropdown-handle"]'),i.defineReadOnly("dropdownExpanderSelector",'[data-role="dropdown-content"]'),i.defineReadOnly("activeDropdownClass","is-dropdown-active"),i.prototype.getTriggerHandle=function(t,n){var r=this.getHandle(n);return t.selector?t.selector==="document"?e(document):e(t.selector):r},i.prototype.addHandlers=function(t,i){var s,o,u,a;u=this.triggers()[t];for(s in u)u.hasOwnProperty(s)&&(n.isUndefined(u[s].which)||(u[s].which=r(u[s].which)),a=[s,t,"count"].join("-"),o=this.getTriggerHandle(u[s],i),o.data(a,o.data(a)+1||1),o.on(s,e.extend({delay:0,index:i},u[s]),this.handlers[t]))},i.prototype.removeHandlers=function(e,t){var n,r,i,s,o;i=this.triggers()[e];for(n in i)i.hasOwnProperty(n)&&(r=this.getTriggerHandle(i[n],t),s=[n,e,"count"].join("-"),o=r.data(s)-1,o<=0?(r.unbind(n,this.handlers[e]),r.data(s,0)):r.data(s,o))},i.prototype.getHandle=function(e){var t=this.root().find(this.dropdownHandleSelector());return!n.isUndefined(e)&&e>=0?t.eq(e):t},i.prototype.getExpander=function(e){var t;return n.isUndefined(e)||isNaN(e)?t=this.dropdownExpanderSelector():t=this.dropdownExpanderSelector()+'[data-dropdown-index="'+e+'"]',this.root().find(t)},i.prototype.setState=function(e,t,r){if(n.isUndefined(e)||isNaN(e))return;var i,s,o;i=r?"expand":"collapse",s=r?"collapse":"expand",o=t.delay,this.timers[s][e]=clearTimeout(this.timers[s][e]);if(this.timers.throttle[e]||this.timers[i][e])return;this.timers[i][e]=setTimeout(function(e,t,n,r){var i,s,o;i=this.getExpander(e),s=this.getHandle(e),o=this,this.timers[t][e]=clearTimeout(this.timers[t][e]),i.toggleClass(this.activeDropdownClass(),n),this.getHandle(e).toggleClass(this.activeDropdownClass(),n),n?s.trigger("dropdownExpand",[e,r]):s.trigger("dropdownCollapse",[e,r]),this.throttleDelay()>0&&(this.timers.throttle[e]=setTimeout(function(){o.timers.throttle[e]=clearTimeout(o.timers.throttle[e])},this.throttleDelay()))}.bind(this,e,i,r,t),o)},i.prototype.expand=function(e,t){this.getHandle(e).hasClass(this.activeDropdownClass())||this.setState(e,t,!0)},i.prototype.collapse=function(e,t){this.getHandle(e).hasClass(this.activeDropdownClass())&&this.setState(e,t,!1)},i}),define("xooie/widgets/tab",["jquery","xooie/helpers","xooie/widgets/base","xooie/event_handler"],function(e,t,n,r){function i(t,n){var r=t.getActiveTabs();r.not(n).each(function(){t.deactivateTab(e(this))}),n.not(r).each(function(){t.activateTab(e(this))})}var s=n.extend(function(){var t=this;this._tabEvents=new r(this.namespace()),this._tabEvents.add({keyup:function(n){[13,32].indexOf(n.which)!==-1&&(i(t,t.selectTabs(e(this),n)),n.preventDefault())},mouseup:function(n){i(t,t.selectTabs(e(this),n))},click:function(e){e.preventDefault()}}),this.root().on(this.initEvent(),function(){t.activateTab(t.tabs().filter('[data-activate="true"]'))})});return s.define("namespace","tab"),s.define("tabSelector"),s.defineReadOnly("activeClass","is-tab-active"),s.defineRole("tabpanel"),s.defineRole("tab"),s.defineRole("tablist"),s.prototype.activateTab=function(t){t.addClass(this.activeClass()).attr("aria-selected",!0),e("#"+t.attr("aria-controls")).addClass(this.activeClass()).attr("aria-expanded",!0).focus();var n=e.Event("xooie-tab-active");n.tabId=t.attr("id"),this.root().trigger(n)},s.prototype.deactivateTab=function(t){t.removeClass(this.activeClass()).attr("aria-selected",!1),e("#"+t.attr("aria-controls")).removeClass(this.activeClass()).attr("aria-expanded",!1);var n=e.Event("xooie-tab-inactive");n.tabId=t.attr("id"),this.root().trigger(n)},s.prototype.selectTabs=function(e){return e},s.prototype.getActiveTabs=function(){return this.tabs().filter("."+this.activeClass())},s.prototype._process_role_tab=function(t){var n;return n=this.tabpanels(),t.attr("role","tab").attr("aria-selected",!1),t.each(function(t){var r,i;r=e(this),i=n.eq(t).attr("id"),r.attr("aria-controls",i),r.is("a")&&r.attr("href","#"+i)}),t.on(this._tabEvents.handlers),t},s.prototype._get_role_tab=function(){return t.isUndefined(this.tabSelector())?this.root().find('[data-x-role="tab"]'):e(this.tabSelector())},s.prototype._render_role_tab=function(){return!1},s.prototype._process_role_tablist=function(t){var n=this.tabs();return t.attr("role","tablist"),n.each(function(){var n,r;t.has(this).length===0&&(n=t.attr("aria-owns")||"",n=n.split(" "),r=e(this).attr("id"),n.indexOf(r)===-1&&n.push(r),t.attr("aria-owns",n.join(" ")))}),t},s.prototype._render_role_tablist=function(){return e('<ul data-x-role="tablist"></ul>')},s.prototype._process_role_tabpanel=function(e){return e.attr("role","tabpanel").attr("aria-expanded",!1),e},s}),define("xooie/widgets/accordion",["xooie/widgets/tab"],function(e){var t=e.extend();return t.define("namespace","accordion"),t.prototype._process_role_tablist=function(t){return e.prototype._process_role_tablist.apply(this,arguments),t.attr("aria-multiselectable",!0),t},t.prototype.selectTabs=function(e){var t=this.getActiveTabs();return t.is(e)?t.not(e):t.add(e)},t}),define("xooie/dialog",["xooie/base","xooie/helpers"],function(e,t){var n=new e("dialog",function(){var e=this;this.id=n._counter=n._counter+1,n._instances[this.id]=this,this.root.attr("data-dialog-id",this.id),this.root.find(this.options.containerSelector).attr("role","dialog"),this.root.addClass("xooie-dialog"),this.handlers={mouseup:function(){n.close(e.id)},keyup:function(t){[13,32].indexOf(t.which)!==-1&&n.close(e.id)}}});return n.setDefaultOptions({closeButtonSelector:'[data-role="closeButton"]',containerSelector:'[data-role="container"]',dialogActiveClass:"is-dialog-active"}),n.setCSSRules({".xooie-dialog":{position:"fixed",top:0,bottom:0,left:0,right:0}}),n.prototype.activate=function(){this.root.addClass(this.options.dialogActiveClass);if(n._active===this)return;n._active&&n._active.deactivate(),this.root.find(this.options.closeButtonSelector).on(this.handlers),n._active=this,this.root.trigger("dialogActive")},n.prototype.deactivate=function(){this.root.removeClass(this.options.dialogActiveClass);if(n._active!==this)return;this.root.find(this.options.closeButtonSelector).off(this.handlers),n._active=null,this.root.trigger("dialogInactive")},n._instances=[],n._counter=0,n._active=null,n._queue=[],n.open=function(e){var n=this._instances[e];if(t.isUndefined(n)||this._active===n)return;this._active&&this._queue.push(n),n.activate()},n.close=function(){if(!this._active)return;this._active.deactivate(),this._queue.length>0&&this._queue.pop().activate()},n}),define("xooie/widgets/dialog",function(){});