/*

 |       __ _____                     ________                              __
 |      / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /
 |  __ / // // // // // _  // _// // / / // _  // _//     // //  \/ // _ \/ /
 | /  / // // // // // ___// / / // / / // ___// / / / / // // /\  // // / /__
 | \___//____ \\___//____//_/ _\_  / /_//____//_/ /_/ /_//_//_/ /_/ \__\_\___/
 |           \/              /____/                              version 0.5.1
 http://terminal.jcubic.pl

 Licensed under GNU LGPL Version 3 license
 Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>

 Includes:

 Storage plugin Distributed under the MIT License
 Copyright (c) 2010 Dave Schindler

 jQuery Timers licenced with the WTFPL
 <http://jquery.offput.ca/every/>

 Cross-Browser Split 1.1.1
 Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 Available under the MIT License

 Date: Sun, 10 Mar 2013 21:45:17 +0000
*/
(function(j,J){function ba(c,g){var f;if(typeof c==="string"&&typeof g==="string"){localStorage[c]=g;return true}else if(typeof c==="object"&&typeof g==="undefined"){for(f in c)if(c.hasOwnProperty(f))localStorage[f]=c[f];return true}return false}function X(c,g){var f,h;f=new Date;f.setTime(f.getTime()+31536E6);f="; expires="+f.toGMTString();if(typeof c==="string"&&typeof g==="string"){document.cookie=c+"="+g+f+"; path=/";return true}else if(typeof c==="object"&&typeof g==="undefined"){for(h in c)if(c.hasOwnProperty(h))document.cookie=
h+"="+c[h]+f+"; path=/";return true}return false}function ca(c){return localStorage[c]}function da(c){var g,f,h;c+="=";g=document.cookie.split(";");for(f=0;f<g.length;f++){for(h=g[f];h.charAt(0)===" ";)h=h.substring(1,h.length);if(h.indexOf(c)===0)return h.substring(c.length,h.length)}return null}function ea(c){return delete localStorage[c]}function fa(c){return X(c,"",-1)}function U(c,g){var f=[],h=c.length;if(h<g)return[c];for(var i=0;i<h;i+=g)f.push(c.substring(i,i+g));return f}function Y(c){return j("<div>"+
j.terminal.strip(c)+"</div>").text().length}function Z(c){var g=c instanceof Array?c:c?[c]:[],f=0;j.extend(this,{left:function(){if(f===0)f=g.length-1;else--f;return g[f]},right:function(){if(f===g.length-1)f=0;else++f;return g[f]},current:function(){return g[f]},data:function(){return g},length:function(){return g.length},reset:function(){f=0},append:function(h){g.push(h);this.reset()}})}function ga(c){var g=c?[c]:[];j.extend(this,{size:function(){return g.length},pop:function(){if(g.length===0)return null;
else{var f=g[g.length-1];g=g.slice(0,g.length-1);return f}},push:function(f){g=g.concat([f]);return f},top:function(){return g.length>0?g[g.length-1]:null}})}function ha(c){var g=true;if(typeof c==="string"&&c!=="")c+="_";var f=j.Storage.get(c+"commands"),h=new Z(f?eval("("+f+")"):[""]);j.extend(this,{append:function(i){if(g){h.append(i);j.Storage.set(c+"commands",j.json_stringify(h.data()))}},data:function(){return h.data()},next:function(){return h.right()},last:function(){h.reset()},previous:function(){return h.left()},
clear:function(){h=new Z;j.Storage.remove(c+"commands")},enable:function(){g=true},disable:function(){g=false}})}j.omap=function(c,g){var f={};j.each(c,function(h,i){f[h]=g.call(c,h,i)});return f};var S=typeof window.localStorage!=="undefined";j.extend({Storage:{set:S?ba:X,get:S?ca:da,remove:S?ea:fa}});jQuery.fn.extend({everyTime:function(c,g,f,h,i){return this.each(function(){jQuery.timer.add(this,c,g,f,h,i)})},oneTime:function(c,g,f){return this.each(function(){jQuery.timer.add(this,c,g,f,1)})},
stopTime:function(c,g){return this.each(function(){jQuery.timer.remove(this,c,g)})}});jQuery.extend({timer:{guid:1,global:{},regex:/^([0-9]+)\s*(.*s)?$/,powers:{ms:1,cs:10,ds:100,s:1E3,das:1E4,hs:1E5,ks:1E6},timeParse:function(c){if(c===J||c===null)return null;var g=this.regex.exec(jQuery.trim(c.toString()));return g[2]?parseInt(g[1],10)*(this.powers[g[2]]||1):c},add:function(c,g,f,h,i,o){var u=0;if(jQuery.isFunction(f)){i||(i=h);h=f;f=g}g=jQuery.timer.timeParse(g);if(!(typeof g!=="number"||isNaN(g)||
g<=0)){if(i&&i.constructor!==Number){o=!!i;i=0}i=i||0;o=o||false;if(!c.$timers)c.$timers={};c.$timers[f]||(c.$timers[f]={});h.$timerID=h.$timerID||this.guid++;var l=function(){if(!(o&&l.inProgress)){l.inProgress=true;if(++u>i&&i!==0||h.call(c,u)===false)jQuery.timer.remove(c,f,h);l.inProgress=false}};l.$timerID=h.$timerID;c.$timers[f][h.$timerID]||(c.$timers[f][h.$timerID]=window.setInterval(l,g));this.global[f]||(this.global[f]=[]);this.global[f].push(c)}},remove:function(c,g,f){var h=c.$timers,
i;if(h){if(g){if(h[g]){if(f){if(f.$timerID){window.clearInterval(h[g][f.$timerID]);delete h[g][f.$timerID]}}else for(var o in h[g])if(h[g].hasOwnProperty(o)){window.clearInterval(h[g][o]);delete h[g][o]}for(i in h[g])if(h[g].hasOwnProperty(i))break;if(!i){i=null;delete h[g]}}}else for(var u in h)h.hasOwnProperty(u)&&this.remove(c,u,f);for(i in h)if(h.hasOwnProperty(i))break;if(!i)c.$timers=null}}}});if(jQuery.browser&&jQuery.browser.msie||/(msie) ([\w.]+)/.exec(navigator.userAgent.toLowerCase()))jQuery(window).one("unload",
function(){var c=jQuery.timer.global,g;for(g in c)if(c.hasOwnProperty(g))for(var f=c[g],h=f.length;--h;)jQuery.timer.remove(f[h],g)});(function(c){if(String.prototype.split.toString().match(/\[native/)){var g=String.prototype.split,f=/()??/.exec("")[1]===c,h;h=function(i,o,u){if(Object.prototype.toString.call(o)!=="[object RegExp]")return g.call(i,o,u);var l=[],w=(o.ignoreCase?"i":"")+(o.multiline?"m":"")+(o.extended?"x":"")+(o.sticky?"y":""),z=0,A,y,C;o=RegExp(o.source,w+"g");i+="";f||(A=RegExp("^"+
o.source+"$(?!\\s)",w));for(u=u===c?4294967295:u>>>0;y=o.exec(i);){w=y.index+y[0].length;if(w>z){l.push(i.slice(z,y.index));!f&&y.length>1&&y[0].replace(A,function(){for(var I=1;I<arguments.length-2;I++)if(arguments[I]===c)y[I]=c});y.length>1&&y.index<i.length&&Array.prototype.push.apply(l,y.slice(1));C=y[0].length;z=w;if(l.length>=u)break}o.lastIndex===y.index&&o.lastIndex++}if(z===i.length){if(C||!o.test(""))l.push("")}else l.push(i.slice(z));return l.length>u?l.slice(0,u):l};String.prototype.split=
function(i,o){return h(this,i,o)};return h}})();j.json_stringify=function(c,g){var f="",h;g=g===J?1:g;switch(typeof c){case "function":f+=c;break;case "boolean":f+=c?"true":"false";break;case "object":if(c===null)f+="null";else if(c instanceof Array){f+="[";var i=c.length;for(h=0;h<i-1;++h)f+=j.json_stringify(c[h],g+1);f+=j.json_stringify(c[i-1],g+1)+"]"}else{f+="{";for(i in c)if(c.hasOwnProperty(i))f+='"'+i+'":'+j.json_stringify(c[i],g+1);f+="}"}break;case "string":i=c;var o={"\\\\":"\\\\",'"':'\\"',
"/":"\\/","\\n":"\\n","\\r":"\\r","\\t":"\\t"};for(h in o)if(o.hasOwnProperty(h))i=i.replace(RegExp(h,"g"),o[h]);f+='"'+i+'"';break;case "number":f+=String(c)}f+=g>1?",":"";if(g===1)f=f.replace(/,([\]}])/g,"$1");return f.replace(/([\[{]),/g,"$1")};j.fn.cmd=function(c){function g(){F.toggleClass("inverted")}function f(){b="(reverse-i-search)`"+C+"': ";G()}function h(d){var r=L.data(),P=RegExp("^"+C),M=r.length;if(d&&I>0)M-=I;for(d=M;d--;)if(P.test(r[d])){I=r.length-d;p=0;l.set(r[d],true);D();break}}
function i(d){var r=d.substring(0,z-A);d=d.substring(z-A);return[r].concat(U(d,z))}function o(){w.focus();l.oneTime(1,function(){l.insert(w.val());w.blur().val("")})}function u(d){if(c.keydown){var r=c.keydown(d);if(r!==J)return r}if(K){if(y&&(d.which===35||d.which===36||d.which===37||d.which===38||d.which===39||d.which===40||d.which===66||d.which===13||d.which===27)){b=N;y=false;I=null;C="";G();if(d.which===27)q="";D();u.call(this,d)}else if(d.altKey){if(d.which===68){l.set(q.slice(0,p)+q.slice(p).replace(/[^ ]+ |[^ ]+$/,
""),true);return false}return true}else if(d.keyCode===13){if(L&&q&&(c.historyFilter&&c.historyFilter(q)||!c.historyFilter))L.data().slice(-1)[0]!==q&&L.append(q);L.last();d=q;l.set("");c.commands&&c.commands(d);typeof b==="function"&&G()}else if(d.which===32)if(y){C+=" ";f()}else l.insert(" ");else if(d.which===8)if(y){C=C.slice(0,-1);f()}else{if(q!==""&&p>0){q=q.slice(0,p-1)+q.slice(p,q.length);--p;D()}}else if(d.which===9&&!(d.ctrlKey||d.altKey))l.insert("\t");else if(d.which===46){if(q!==""&&
p<q.length){q=q.slice(0,p)+q.slice(p+1,q.length);D()}return true}else if(L&&d.which===38||d.which===80&&d.ctrlKey)l.set(L.previous());else if(L&&d.which===40||d.which===78&&d.ctrlKey)l.set(L.next());else if(d.which===37||d.which===66&&d.ctrlKey)if(d.ctrlKey&&d.which!==66){r=p-1;d=0;for(q[r]===" "&&--r;r>0;--r)if(q[r]===" "&&q[r+1]!==" "){d=r+1;break}else if(q[r]==="\n"&&q[r+1]!=="\n"){d=r;break}l.position(d)}else{if(p>0){--p;D()}}else if(d.which===82&&d.ctrlKey)if(y)h(true);else{N=b;f();n=q;q="";
D();y=true}else if(d.which==71&&d.ctrlKey){if(y){b=N;G();q=n;D();y=false}}else if(d.which===39||d.which===70&&d.ctrlKey)if(d.ctrlKey&&d.which!==70){q[p]===" "&&++p;d=q.slice(p).match(/\S[\n\s]{2,}|[\n\s]+\S?/);if(!d||d[0].match(/^\s+$/))p=q.length;else if(d[0][0]!==" ")p+=d.index+1;else{p+=d.index+d[0].length-1;d[0][d[0].length-1]!==" "&&--p}D()}else{if(p<q.length){++p;D()}}else if(d.which===123)return true;else if(d.which===36)l.position(0);else if(d.which===35)l.position(q.length);else if(d.shiftKey&&
d.which==45){o();return true}else if(d.ctrlKey||d.metaKey)if(d.shiftKey){if(d.which===84)return true}else if(d.which===65)l.position(0);else if(d.which===69)l.position(q.length);else if(d.which===88||d.which===67||d.which===87||d.which===84)return true;else if(d.which===86){o();return true}else if(d.which===75)if(p===0)l.set("");else p!==q.length&&l.set(q.slice(0,p));else if(d.which===85){l.set(q.slice(p,q.length));l.position(0)}else{if(d.which===17)return true}else return true;return false}}var l=
this;l.addClass("cmd");l.append('<span class="prompt"></span><span></span><span class="cursor">&nbsp;</span><span></span>');var w=j("<textarea/>").addClass("clipboard").appendTo(l);c.width&&l.width(c.width);var z,A,y=false,C="",I=null,N,E=c.mask||false,q="",p=0,b,K=c.enabled,R,L,F=l.find(".cursor"),D=function(d){function r(m,a){if(a===m.length){O.html(j.terminal.encode(m));F.html("&nbsp;");B.html("")}else if(a===0){O.html("");F.html(j.terminal.encode(m.slice(0,1)));B.html(j.terminal.encode(m.slice(1)))}else{var e=
j.terminal.encode(m.slice(0,a));O.html(e);e=m.slice(a,a+1);F.html(e===" "?"&nbsp;":j.terminal.encode(e));a===m.length-1?B.html(""):B.html(j.terminal.encode(m.slice(a+1)))}}function P(m){return"<div>"+j.terminal.encode(m)+"</div>"}function M(m){var a=B;j.each(m,function(e,k){a=j(P(k)).insertAfter(a).addClass("clear")})}function T(m){j.each(m,function(a,e){O.before(P(e))})}var O=F.prev(),B=F.next();return function(){var m=E?q.replace(/./g,"*"):q,a,e;d.find("div").remove();O.html("");if(m.length>z-A-
1||m.match(/\n/)){var k,t=m.match(/\t/g),s=t?t.length*3:0;if(t)m=m.replace(/\t/g,"\u0000\u0000\u0000\u0000");if(m.match(/\n/)){var v=m.split("\n");e=z-A-1;for(a=0;a<v.length-1;++a)v[a]+=" ";if(v[0].length>e){k=[v[0].substring(0,e)];k=k.concat(U(v[0].substring(e),z))}else k=[v[0]];for(a=1;a<v.length;++a)if(v[a].length>z)k=k.concat(U(v[a],z));else k.push(v[a])}else k=i(m);if(t)k=j.map(k,function(H){return H.replace(/\x00\x00\x00\x00/g,"\t")});e=k[0].length;if(p<e){r(k[0],p);M(k.slice(1))}else if(p===
e){O.before(P(k[0]));r(k[1],0);M(k.slice(2))}else{a=k.length;if(p<e){r(k[0],p);M(k.slice(1))}else if(p===e){O.before(P(k[0]));r(k[1],0);M(k.slice(2))}else{t=k.slice(-1)[0];v=m.length-p;var x=t.length;m=0;if(v<=x){T(k.slice(0,-1));r(t,(x===v?0:x-v)+s)}else if(a===3){O.before("<div>"+j.terminal.encode(k[0])+"</div>");r(k[1],p-e-1);B.after('<div class="clear">'+j.terminal.encode(k[2])+"</div>")}else{m=p;for(a=0;a<k.length;++a){e=k[a].length;if(m>e)m-=e;else break}e=k[a];s=a;if(m===e.length){m=0;e=k[++s]}r(e,
m);T(k.slice(0,s));M(k.slice(s+1))}}}}else if(m===""){O.html("");F.html("&nbsp;");B.html("")}else r(m,p)}}(l),n,G=function(){var d=l.find(".prompt");return function(){if(typeof b==="string"){A=Y(b);d.html(j.terminal.format(b))}else b(function(r){A=Y(r);d.html(j.terminal.format(r))})}}();j.extend(l,{name:function(d){if(d!==J){R=d;L=new ha(d)}else return R},history:function(){return L},set:function(d,r){if(d!==J){q=d;if(!r)p=q.length;D();if(typeof c.onCommandChange==="function")c.onCommandChange(q)}},
insert:function(d,r){if(p===q.length)q+=d;else q=p===0?d+q:q.slice(0,p)+d+q.slice(p);r||(p+=d.length);D();if(typeof c.onCommandChange==="function")c.onCommandChange(q)},get:function(){return q},commands:function(d){if(d)c.commands=d;else return d},destroy:function(){j(document.documentElement).unbind(".commandline");l.find(".prompt").remove()},prompt:function(d){if(d===J)return b;else{if(typeof d==="string"||typeof d==="function")b=d;else throw"prompt must be a function or string";G();D()}},position:function(d){if(typeof d===
"number"){p=d<0?0:d>q.length?q.length:d;D()}else return p},visible:function(){var d=l.visible;return function(){d.apply(l,[]);D();G()}}(),show:function(){var d=l.show;return function(){d.apply(l,[]);D();G()}}(),resize:function(d){if(d)z=d;else{d=l.width();var r=F.innerWidth();z=Math.floor(d/r)}D()},enable:function(){if(!K){F.addClass("inverted");l.everyTime(500,"blink",g);K=true}},isenabled:function(){return K},disable:function(){if(K){l.stopTime("blink",g);F.removeClass("inverted");K=false}},mask:function(d){if(typeof d===
"boolean"){E=d;D()}else return E}});l.name(c.name||"");b=c.prompt||"> ";G();if(c.enabled===J||c.enabled===true)l.enable();j(document.documentElement||window).keypress(function(d){var r;if(d.ctrlKey&&d.which===99)return true;if(!y&&c.keypress)r=c.keypress(d);if(r===J||r){if(K)if(j.inArray(d.which,[38,32,13,0,8])>-1&&d.keyCode!==123&&!(d.which===38&&d.shiftKey))return false;else if(!d.ctrlKey&&!(d.altKey&&d.which===100)){if(y){C+=String.fromCharCode(d.which);f();h()}else l.insert(String.fromCharCode(d.which));
return false}else if(d.altKey)if(y){C+=String.fromCharCode(d.which);f();h()}else l.insert(String.fromCharCode(d.which))}else return r}).keydown(u);return l};var ia=/(\[\[[gbius]*;[^;]*;[^\]]*\](?:[^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?)/,$=/\[\[([gbius]*);([^;]*);([^;\]]*;|[^\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g,aa=/#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})/,ja=/(https?:((?!&[^;]+;)[^\s:"'<)])+)/g,ka=/((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))/g;
j.terminal={split_equal:function(c,g){for(var f=c.split(/\n/g),h=/\[\[([gbius]*);([^;]*);([^;\]]*;|[^\]]*);?([^\]]*)\]([^\]]*\\\][^\]]*|[^\]]*|[^\[]*\[[^\]]*)\]?/g,i=/(\[\[[gbius]*;[^;]*;[^\]]*\])/,o=/\[\[[gbius]*;?[^;]*;?[^\]]*\]?$/,u=false,l=false,w="",z=[],A=0,y=f.length;A<y;++A){if(w!=="")if(f[A]===""){z.push(w+"]");continue}else{f[A]=w+f[A];w=""}else if(f[A]===""){z.push("");continue}for(var C=f[A],I=0,N=0,E=0,q=C.length;E<q;++E){if(C[E]==="["&&C[E+1]==="[")u=true;else if(u&&C[E]==="]")if(l)l=
u=false;else l=true;else if(u&&l||!u)if(C[E]==="]"&&C[E-1]==="\\")--N;else++N;if(N===g||E===q-1){var p=C.substring(I,E+1);if(w){p=w+p;if(p.match("]"))w=""}I=E+1;N=0;var b=p.match(h);if(b){b=b[b.length-1];if(b[b.length-1]!=="]"){w=b.match(i)[1];p+="]"}else if(p.match(o)){p=p.replace(o,"");w=b.match(i)[1]}}z.push(p)}}}return z},encode:function(c){return c.replace(/&(?!#[0-9]+;|[a-zA-Z]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br/>").replace(/ /g,"&nbsp;").replace(/\t/g,
"&nbsp;&nbsp;&nbsp;&nbsp;")},format:function(c){if(typeof c==="string"){c=j.terminal.encode(j.terminal.from_ansi(c));var g=c.split(ia);if(g&&g.length>1)c=j.map(g,function(f){return f===""?f:f.substring(0,1)==="["?f.replace($,function(h,i,o,u,l,w){if(w==="")return"<span>&nbsp;</span>";w=w.replace(/\\]/g,"]");h="";if(i.indexOf("b")!==-1)h+="font-weight:bold;";var z="text-decoration:";if(i.indexOf("u")!==-1)z+="underline ";if(i.indexOf("s")!==-1)z+="line-through";if(i.indexOf("s")!==-1||i.indexOf("u")!==
-1)h+=z+";";if(i.indexOf("i")!==-1)h+="font-style:italic;";if(o.match(aa)){h+="color:"+o+";";if(i.indexOf("g")!==-1)h+="text-shadow: 0 0 5px "+o+";"}if(u.match(aa))h+="background-color:"+u;return'<span style="'+h+'"'+(l!=""?' class="'+l+'"':"")+">"+w+"</span>"}):"<span>"+f+"</span>"}).join("");return c.replace(ja,function(f){var h=f.match(/\.$/);f=f.replace(/\.$/,"");return'<a target="_blank" href="'+f+'">'+f+"</a>"+(h?".":"")}).replace(ka,'<a href="mailto:$1">$1</a>').replace(/<span><br\/?><\/span>/g,
"<br/>")}else return""},strip:function(c){return c.replace($,"$5")},active:function(){return Q.front()},ansi_colors:{normal:{black:"#000",red:"#AA0000",green:"#008400",yellow:"#AA5500",blue:"#0000AA",magenta:"#AA00AA",cyan:"#00AAAA",white:"#fff"},bold:{white:"#fff",red:"#FF5555",green:"#44D544",yellow:"#FFFF55",blue:"#5555FF",magenta:"#FF55FF",cyan:"#55FFFF",black:"#000"}},from_ansi:function(){function c(h){var i=h.split(";"),o;h=[];var u="",l="",w;for(w in i){o=parseInt(i[w],10);o===1&&h.push("b");
o===4&&h.push("u");if(f[o])l=f[o];if(g[o])u=g[o]}o=i=j.terminal.ansi_colors.normal;for(w=h.length;w--;)if(h[w]=="b"){if(u=="")u="white";o=j.terminal.ansi_colors.bold;break}return"[["+[h.join(""),o[u],i[l]].join(";")+"]"}var g={30:"black",31:"red",32:"green",33:"yellow",34:"blue",35:"magenta",36:"cyan",37:"white"},f={40:"black",41:"red",42:"green",43:"yellow",44:"blue",45:"magenta",46:"cyan",47:"white"};return function(h){var i=h.split(/(\[[0-9;]*m)/g);if(i.length==1)return h;h=[];if(i.length>3&&i.slice(0,
3).join("")=="[0m")i=i.slice(3);for(var o=false,u=0;u<i.length;++u){var l=i[u].match(/^\[([0-9;]*)m$/);if(l){if(l[1]!="")if(o){h.push("]");if(l[1]=="0")o=false;else h.push(c(l[1]))}else{o=true;h.push(c(l[1]))}}else h.push(i[u])}o&&h.push("]");return h.join("")}}()};j.fn.visible=function(){return this.css("visibility","visible")};j.fn.hidden=function(){return this.css("visibility","hidden")};j.jrpc=function(c,g,f,h,i,o){g=j.json_stringify({jsonrpc:"2.0",method:f,params:h,id:g});return j.ajax({url:c,
data:g,success:i,error:o,contentType:"application/json",dataType:"json",async:true,cache:false,type:"POST"})};S=/ {13}$/;var la=[["jQuery Terminal","(c) 2011-2012 jcubic"],["jQuery Terminal Emulator v. 0.5.1","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>".replace(/ *<.*>/,"")],["jQuery Terminal Emulator version version 0.5.1","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"],["      _______                 ________                        __","     / / _  /_ ____________ _/__  ___/______________  _____  / /",
" __ / / // / // / _  / _/ // / / / _  / _/     / /  \\/ / _ \\/ /","/  / / // / // / ___/ // // / / / ___/ // / / / / /\\  / // / /__","\\___/____ \\\\__/____/_/ \\__ / /_/____/_//_/ /_/ /_/  \\/\\__\\_\\___/","         \\/          /____/                                   ".replace(S,"")+"version 0.5.1","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"],["      __ _____                     ________                              __","     / // _  /__ __ _____ ___ __ _/__  ___/__ ___ ______ __ __  __ ___  / /",
" __ / // // // // // _  // _// // / / // _  // _//     // //  \\/ // _ \\/ /","/  / // // // // // ___// / / // / / // ___// / / / / // // /\\  // // / /__","\\___//____ \\\\___//____//_/ _\\_  / /_//____//_/ /_/ /_//_//_/ /_/ \\__\\_\\___/","          \\/              /____/                                          ".replace(S,"")+"version 0.5.1","Copyright (c) 2011-2012 Jakub Jankiewicz <http://jcubic.pl>"]],V=[],Q=new function(c){var g=c?[c]:[],f=0;j.extend(this,{rotate:function(){if(g.length===
1)return g[0];else{if(f===g.length-1)f=0;else++f;return g[f]}},length:function(){return g.length},set:function(h){for(var i=g.length;i--;)if(g[i]===h){f=i;return}this.append(h)},front:function(){return g[f]},append:function(h){g.push(h)}})};j.fn.terminal=function(c,g){function f(){return b.get(0).scrollHeight>b.innerHeight()}function h(){var a=b.find(".cursor").width(),e=Math.floor(b.width()/a);if(f()){var k=b.innerWidth()-b.width();e-=Math.ceil((20-k/2)/(a-1))}return e}function i(a,e){if(n.displayExceptions){b.error("&#91;"+
e+"&#93;: "+(typeof a==="string"?a:typeof a.fileName==="string"?a.fileName+": "+a.message:a.message));if(typeof a.fileName==="string"){b.pause();j.get(a.fileName,function(k){b.resume();var t=a.lineNumber-1;(k=k.split("\n")[t])&&b.error("&#91;"+a.lineNumber+"&#93;: "+k)})}a.stack&&b.error(a.stack)}}function o(a,e){try{if(typeof e==="function")e(function(){});else if(typeof e!=="string")throw a+" must be string or function";}catch(k){i(k,a.toUpperCase());return false}return true}function u(){var a=
b.prop?b.prop("scrollHeight"):b.attr("scrollHeight");b.scrollTop(a)}function l(a){a=typeof a==="string"?a:String(a);var e,k;if(a.length>F){var t=j.terminal.split_equal(a,F);a=j("<div></div>");e=0;for(k=t.length;e<k;++e)t[e]===""||t[e]==="\r"?a.append("<div>&nbsp;</div>"):j("<div/>").html(j.terminal.format(t[e])).appendTo(a)}else a=j("<div/>").html("<div>"+j.terminal.format(a)+"</div>");R.append(a);a.width("100%");u();return a}function w(){if(g.greetings===J)b.echo(b.signature);else g.greetings&&b.echo(g.greetings)}
function z(a,e){var k=1,t=function(s,v){e.pause();j.jrpc(a,k++,s,v,function(x){if(x.error)e.error("&#91;RPC&#93; "+x.error.message);else if(typeof x.result==="string")e.echo(x.result);else if(x.result instanceof Array)e.echo(j.map(x.result,function(H){return j.json_stringify(H)}).join(" "));else typeof x.result==="object"&&e.echo(j.json_stringify(x.result));e.resume()},function(x,H){e.error("&#91;AJAX&#93; "+H+" - Server reponse is: \n"+x.responseText);e.resume()})};return function(s,v){if(s!==""){var x,
H;if(s.match(/[^ ]* /)){s=s.split(/ +/);x=s[0];H=s.slice(1)}else{x=s;H=[]}if(!n.login||x==="help")t(x,H);else{var W=v.token();W?t(x,[W].concat(H)):v.error("&#91;AUTH&#93; Access denied (no token)")}}}}function A(a){a=a.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;");var e=m.prompt();if(m.mask())a=a.replace(/./g,"*");typeof e==="function"?e(function(k){b.echo(k+a)}):b.echo(e+a)}function y(a,e){try{var k=B.top();if(a==="exit"&&n.exit)if(B.size()===1)if(n.login)I();else{e||A(a);b.echo("You can exit from main interpeter")}else b.pop("exit");
else{e||A(a);a==="clear"&&n.clear?b.clear():k.eval(a,b)}}catch(t){i(t,"USER");b.resume();throw t;}}function C(){var a=null;m.prompt("login: ");n.history&&m.history().disable();m.commands(function(e){try{A(e);if(a){m.mask(false);b.pause();if(typeof n.login!=="function")throw"Value of login property must be a function";n.login(a,e,function(t){if(t){var s=n.name;s=s?"_"+s:"";j.Storage.set("token"+s,t);j.Storage.set("login"+s,a);m.commands(y);E()}else{b.error("Wrong password try again");m.prompt("login: ");
a=null}b.resume();n.history&&m.history().enable()})}else{a=e;m.prompt("password: ");m.mask(true)}}catch(k){i(k,"LOGIN",b);throw k;}})}function I(){if(typeof n.onBeforelogout==="function")try{if(n.onBeforelogout(b)==false)return}catch(a){i(a,"onBeforelogout");throw a;}var e=n.name;e=e?"_"+e:"";j.Storage.remove("token"+e,null);j.Storage.remove("login"+e,null);n.history&&m.history().disable();C();if(typeof n.onAfterlogout==="function")try{n.onAfterlogout(b)}catch(k){i(k,"onAfterlogout");throw k;}}function N(){var a=
B.top(),e="";if(a.name!==J&&a.name!=="")e+=a.name+"_";e+=L;m.name(e);typeof a.prompt=="function"?m.prompt(function(k){a.prompt(k,b)}):m.prompt(a.prompt);n.history&&m.history().enable();m.set("");if(typeof a.onStart==="function")a.onStart(b)}function E(){N();w();if(typeof n.onInit==="function")try{n.onInit(b)}catch(a){i(a,"OnInit");throw a;}}function q(a){var e;b.oneTime(5,function(){r()});if(n.keydown){var k=n.keydown(a,b);if(k!==J)return k}if(b.paused()){if(a.which===68&&a.ctrlKey){for(e=V.length;e--;){a=
V[e];if(4!==a.readyState)try{a.abort()}catch(t){b.error("error in aborting ajax")}}b.resume();return false}}else{if(a.which!==9)P=0;if(a.which===68&&a.ctrlKey){if(m.get()==="")if(B.size()>1||n.login!==J)b.pop("");else{b.resume();b.echo("")}else b.set_command("");return false}else if(n.tabcompletion&&a.which===9){++P;var s=m.get().substring(0,m.position());a=s.split(" ");if(a.length==1)k=a[0];else{k=a[a.length-1];for(e=a.length-1;e>0;e--)if(a[e-1][a[e-1].length-1]=="\\")k=a[e-1]+" "+k;else break}var v=
RegExp("^"+k);B.top().completion(b,k,function(x){var H=[];for(e=x.length;e--;)v.test(x[e])&&H.push(x[e]);if(H.length===1)b.insert(H[0].replace(v,""));else if(H.length>1)if(P>=2){A(s);b.echo(H.join("\t"));P=0}});return false}else if(a.which===86&&a.ctrlKey)b.oneTime(1,function(){u()});else if(a.which===9&&a.ctrlKey){Q.length()>1&&b.focus(false);return false}else if(a.which===34)b.scroll(b.height());else a.which===33?b.scroll(-b.height()):b.attr({scrollTop:b.attr("scrollHeight")})}}function p(a){return function(e){if(e!==
""){e=e.split(/ +/);var k=e[0];e=e.slice(1);var t=a[k],s=j.type(t);if(s==="function")t.apply(b,e);else if(s==="object"||s==="string"){var v=[];if(s==="object"){for(var x in t)t.hasOwnProperty(x)&&v.push(x);t=p(t)}b.push(t,{prompt:k+"> ",name:k,completion:function(H,W,ma){ma(v)}})}else b.error("Command '"+k+"' Not Found")}}}var b=this,K=[],R,L=Q.length(),F,D=[],n=j.extend({name:"",prompt:"> ",history:true,exit:true,clear:true,enabled:true,displayExceptions:true,cancelableAjax:true,login:null,tabcompletion:null,
historyFilter:null,onInit:j.noop,onClear:j.noop,onBlur:j.noop,onFocus:j.noop,onTerminalChange:j.noop,onExit:j.noop,keypress:j.noop,keydown:j.noop},g||{});n.width&&b.width(n.width);n.height&&b.height(n.height);var G=!n.enabled;if(b.length===0)throw'Sorry, but terminal said that "'+b.selector+'" is not valid selector!';b.ajaxSend(function(a,e){V.push(e)});if(b.data("terminal"))return b.data("terminal");R=j("<div>").addClass("terminal-output").appendTo(b);b.addClass("terminal").append("<div/>");if("ontouchstart"in
window||window.DocumentTouch&&document instanceof DocumentTouch){b.click(function(){b.find("textarea").focus()});b.find("textarea").focus()}var d=[];j.extend(b,j.omap({clear:function(){R.html("");m.set("");K=[];try{n.onClear(b)}catch(a){i(a,"onClear");throw a;}b.attr({scrollTop:0});return b},exec:function(a,e){G?d.push([a,e]):y(a,e);return b},commands:function(){return B.top().eval},greetings:function(){w();return b},paused:function(){return G},pause:function(){if(m){G=true;b.disable();m.hidden()}return b},
resume:function(){if(m){b.enable();var a=d;for(d=[];a.length;){var e=a.shift();b.exec.apply(b,e)}m.visible();u()}return b},cols:function(){return F},rows:function(){return K.length},history:function(){return m.history()},next:function(){if(Q.length()===1)return b;else{var a=b.offset().top;b.height();b.scrollTop();var e=b,k=j(window).scrollTop(),t=k+j(window).height(),s=j(e).offset().top;if(s+j(e).height()>=k&&s<=t){Q.front().disable();a=Q.rotate().enable();e=a.offset().top-50;j("html,body").animate({scrollTop:e},
500);try{n.onTerminalChange(a)}catch(v){i(v,"onTerminalChange");throw v;}return a}else{b.enable();j("html,body").animate({scrollTop:a-50},500);return b}}},focus:function(a,e){b.oneTime(1,function(){if(Q.length()===1)if(a===false)try{!e&&n.onBlur(b)!==false&&b.disable()}catch(k){i(k,"onBlur");throw k;}else try{!e&&n.onFocus(b)!==false&&b.enable()}catch(t){i(t,"onFocus");throw t;}else if(a===false)b.next();else{var s=Q.front();if(s!=b){s.disable();if(!e)try{n.onTerminalChange(b)}catch(v){i(v,"onTerminalChange");
throw v;}}Q.set(b);b.enable()}});return b},enable:function(){F===J&&b.resize();if(G)if(m){m.enable();G=false}return b},disable:function(){if(m){G=true;m.disable()}return b},enabled:function(){return G},signature:function(){var a=b.cols();a=a<15?null:a<35?0:a<55?1:a<64?2:a<75?3:4;return a!==null?la[a].join("\n")+"\n":""},version:function(){return"0.5.1"},get_command:function(){return m.get()},insert:function(a){if(typeof a==="string"){m.insert(a);return b}else throw"insert function argument is not a string";
},set_prompt:function(a){if(o("prompt",a)){typeof a=="function"?m.prompt(function(e){a(e,b)}):m.prompt(a);B.top().prompt=a}return b},get_prompt:function(){return B.top().prompt},set_command:function(a){m.set(a);return b},set_mask:function(a){m.mask(a);return b},get_output:function(a){return a?K:j.map(K,function(e,k){return typeof k=="function"?k():k}).join("\n")},resize:function(a,e){if(a&&e){b.width(a);b.height(e)}F=h();m.resize(F);var k=R.detach();R.html("");j.each(K,function(t,s){l(s&&typeof s==
"function"?s():s)});b.prepend(k);u();return b},echo:function(a){K.push(a);l(typeof a==="function"?a():a);r();return b},error:function(a){return b.echo("[[;#f00;]"+a.replace(/\[/g,"&#91;").replace(/\]/g,"&#93;")+"]")},scroll:function(a){var e;a=Math.round(a);if(b.prop){a>b.prop("scrollTop")&&a>0&&b.prop("scrollTop",0);e=b.prop("scrollTop");b.prop("scrollTop",e+a)}else{a>b.attr("scrollTop")&&a>0&&b.attr("scrollTop",0);e=b.attr("scrollTop");b.attr("scrollTop",e+a)}return b},logout:n.login?function(){for(;B.size()>
1;)B.pop();I();return b}:function(){throw"You don't have login function";},token:n.login?function(){var a=n.name;return j.Storage.get("token"+(a?"_"+a:""))}:j.noop,login_name:n.login?function(){var a=n.name;return j.Storage.get("login"+(a?"_"+a:""))}:j.noop,name:function(){return n.name},push:function(a,e){if(e&&(!e.prompt||o("prompt",e.prompt))||!e){if(j.type(a)==="string")a=z(a,b);else if(j.type(a)==="object"){var k=[],t;for(t in a)k.push(t);a=p(a);e=e||{};e.completion=function(s,v,x){x(k)}}else if(j.type(a)!=
"function")throw"Invalid value as eval in push command";B.push(j.extend({eval:a},e));N()}return b},reset:function(){for(b.clear();B.size()>1;)B.pop();E()},pop:function(a){a!==J&&A(a);if(B.top().name===n.name){if(n.login){I();if(typeof n.onExit==="function")try{n.onExit(b)}catch(e){i(e,"onExit");throw e;}}}else{a=B.pop();N();if(typeof a.onExit==="function")try{a.onExit(b)}catch(k){i(k,"onExit");throw k;}}return b}},function(a,e){return function(){try{return e.apply(this,Array.prototype.slice.apply(arguments))}catch(k){i(k,
"TERMINAL")}}}));var r=function(){var a=f();return function(){if(a!==f()){b.resize();a=f()}}}(),P=0,M;if(n.login&&typeof n.onBeforeLogin==="function")try{n.onBeforeLogin(b)}catch(T){i(T,"onBeforeLogin");throw T;}if(typeof c=="string"){M=c;c=z(c,b)}else if(typeof c=="object"&&c.constructor===Array)throw"You can't use array as eval";else if(typeof c==="object"){for(var O in c)c.hasOwnProperty(O)&&D.push(O);c=p(c)}else if(typeof c!=="function")throw'Unknow object "'+String(c)+'" passed as eval';if(M&&
(typeof n.login==="string"||n.login))n.login=function(a){var e=1;return function(k,t,s){b.pause();j.jrpc(M,e++,a,[k,t],function(v){b.resume();!v.error&&v.result?s(v.result):s(null)},function(v,x){b.resume();b.error("&#91;AJAX&#92; Response: "+x+"\n"+v.responseText)})}}(typeof n.login==="boolean"?"login":n.login);if(o("prompt",n.prompt)){var B=new ga({name:n.name,eval:c,prompt:n.prompt,completion:n.completion?n.completion:function(a,e,k){k(D)},greetings:n.greetings}),m=b.find(".terminal-output").next().cmd({prompt:n.prompt,
history:n.history,historyFilter:n.historyFilter,width:"100%",keydown:q,keypress:n.keypress?function(a){return n.keypress(a,b)}:null,onCommandChange:function(a){if(typeof n.onCommandChange==="function")try{n.onCommandChange(a,b)}catch(e){i(e,"onCommandChange");throw e;}u()},commands:y});Q.append(b);n.enabled===true?b.focus(J,true):b.disable();j(window).resize(b.resize);b.click(function(){G&&Q.length()>1&&b===j.terminal.active()||b.focus()});g.login&&b.token&&!b.token()&&b.login_name&&!b.login_name()?
C():E();typeof j.fn.init.prototype.mousewheel==="function"&&b.mousewheel(function(a,e){e>0?b.scroll(-40):b.scroll(40);return false},true)}b.data("terminal",b);return b}})(jQuery);
