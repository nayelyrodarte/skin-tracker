(()=>{"use strict";var e={441:(e,t,r)=>{r.d(t,{Z:()=>s});var o=r(645),n=r.n(o),a=r(667),i=r.n(a),c=r(278),d=n()((function(e){return e[1]})),l=i()(c.Z);d.push([e.id,'*{margin:0px;padding:0px;font-family:"Quicksand";text-align:center;font-size:20px}body{background-color:#fffffc}@font-face{font-family:"Misses";src:url('+l+')}header{display:grid;grid-auto-flow:column;width:fit-content;align-items:center;margin:auto;height:5em;gap:.25em}header h1{text-align:center;font-family:"Misses";font-size:50px;line-height:0em}header img{width:2.5rem}button{padding:10px 15px;border:none;border-radius:5px;background-color:#ebb3c1}button:hover{background-color:#c71c5f;color:#fff;border:none;cursor:grabbing}.calendar{margin:2em .5em;width:98vw;gap:.5em;display:grid;grid-template-columns:repeat(7, 1fr)}.calendar div{background-color:#fff;box-shadow:0px 12px 16px -4px rgba(16,24,40,.08),0px 4px 6px -2px rgba(16,24,40,.03);border-radius:20px}.calendar div .card{word-wrap:break-word;position:relative;background-color:#c71c5f;border-radius:10px;max-width:80%;height:fit-content;color:#fff;margin:.5em auto;box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)}.calendar div .card p:last-of-type{font-size:.8em}.calendar div .card i{font-size:.8em;position:absolute;margin:.3em;right:.5em;color:#ebb3c1;opacity:.3}.calendar .calendar__container{min-height:55vh;height:fit-content;align-items:start}.calendar .calendar__container h6{margin-top:.5em}form{position:fixed;display:none;z-index:11;left:0;right:0;margin-left:auto;margin-right:auto;top:10%;background-color:#fff;color:#000;width:15em;padding:1em;border-radius:20px;box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)}form button{width:fit-content;justify-self:center;margin:.5em}form .form__close-button{background-color:rgba(0,0,0,0);border:none;padding:0;right:5%;top:1%;position:absolute}form .form__close-button:focus{outline:0}form .form__close-button i{pointer-events:none}form input{border-radius:10px;border:solid 1.5px #000;width:90%;justify-self:center;margin:10px;padding:.15em}form input[type=checkbox]{margin:20px 0;width:20px;height:20px}form i{position:relative;justify-self:end;margin-bottom:.5em;color:#fff}form i:hover{color:#c71c5f}form .alert{background-color:#c71c5f;border-radius:15px;color:beige;margin:.5em}.modal{background-color:#fff;display:none;padding:2em;position:fixed;width:40%;z-index:11;left:0;right:0;margin-left:auto;margin-right:auto;top:15%;border-radius:20px;box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)}.active{display:block}.modal__overlay{display:none;position:fixed;top:0;left:0;right:0;bottom:0;height:100vh;width:100vw;background-color:rgba(0,0,0,.4);z-index:1}@media screen and (max-width: 1020px){.calendar{margin:auto;margin-top:2em;grid-template-columns:1fr;width:70vw;height:auto}.card{width:100%}.card i{left:88%}.modal{width:60%}}@media screen and (max-width: 425px){.header__add-button,.header__reset-button{display:block;margin:auto;margin-top:.5em}}',""]);const s=d},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var r=e(t);return t[2]?"@media ".concat(t[2]," {").concat(r,"}"):r})).join("")},t.i=function(e,r,o){"string"==typeof e&&(e=[[null,e,""]]);var n={};if(o)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(n[i]=!0)}for(var c=0;c<e.length;c++){var d=[].concat(e[c]);o&&n[d[0]]||(r&&(d[2]?d[2]="".concat(r," and ").concat(d[2]):d[2]=r),t.push(d))}},t}},667:e=>{e.exports=function(e,t){return t||(t={}),"string"!=typeof(e=e&&e.__esModule?e.default:e)?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e)}},278:(e,t,r)=>{r.d(t,{Z:()=>o});const o=r.p+"fonts/Misses.otf"},379:(e,t,r)=>{var o,n=function(){var e={};return function(t){if(void 0===e[t]){var r=document.querySelector(t);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}e[t]=r}return e[t]}}(),a=[];function i(e){for(var t=-1,r=0;r<a.length;r++)if(a[r].identifier===e){t=r;break}return t}function c(e,t){for(var r={},o=[],n=0;n<e.length;n++){var c=e[n],d=t.base?c[0]+t.base:c[0],l=r[d]||0,s="".concat(d," ").concat(l);r[d]=l+1;var u=i(s),p={css:c[1],media:c[2],sourceMap:c[3]};-1!==u?(a[u].references++,a[u].updater(p)):a.push({identifier:s,updater:h(p,t),references:1}),o.push(s)}return o}function d(e){var t=document.createElement("style"),o=e.attributes||{};if(void 0===o.nonce){var a=r.nc;a&&(o.nonce=a)}if(Object.keys(o).forEach((function(e){t.setAttribute(e,o[e])})),"function"==typeof e.insert)e.insert(t);else{var i=n(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(t)}return t}var l,s=(l=[],function(e,t){return l[e]=t,l.filter(Boolean).join("\n")});function u(e,t,r,o){var n=r?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(e.styleSheet)e.styleSheet.cssText=s(t,n);else{var a=document.createTextNode(n),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(a,i[t]):e.appendChild(a)}}function p(e,t,r){var o=r.css,n=r.media,a=r.sourceMap;if(n?e.setAttribute("media",n):e.removeAttribute("media"),a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var f=null,m=0;function h(e,t){var r,o,n;if(t.singleton){var a=m++;r=f||(f=d(t)),o=u.bind(null,r,a,!1),n=u.bind(null,r,a,!0)}else r=d(t),o=p.bind(null,r,t),n=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(r)};return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else n()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o));var r=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var o=0;o<r.length;o++){var n=i(r[o]);a[n].references--}for(var d=c(e,t),l=0;l<r.length;l++){var s=i(r[l]);0===a[s].references&&(a[s].updater(),a.splice(s,1))}r=d}}}}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var a=t[o]={id:o,exports:{}};return e[o](a,a.exports,r),a.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;r.g.importScripts&&(e=r.g.location+"");var t=r.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var o=t.getElementsByTagName("script");o.length&&(e=o[o.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),r.p=e})(),r.nc=void 0,(()=>{const e=function(e){fetch("/api/routine").then((e=>e.json())).then((t=>(console.log(t),e(t),t))).catch((e=>console.error("Error:",e)))},t=function(e){const t={method:"post",body:JSON.stringify(e),headers:{"Content-type":"application/json"}};fetch("/api/routine/",t).then((e=>(console.log("Success:",e),e.json()))).catch((e=>console.error("Error:",e)))},o=function(e){fetch(`/api/routine/${e}`,{method:"delete",headers:{"Content-type":"application/json"}}).then((e=>(console.log("Success:",e),e.json()))).catch((e=>console.error("Error:",e)))};var n=r(379),a=r.n(n),i=r(441);a()(i.Z,{insert:"head",singleton:!1}),i.Z.locals;const c=document.querySelector("body"),d=document.querySelector("form"),l=document.querySelector(".modal"),s=document.querySelector(".modal__overlay");c.addEventListener("click",(function(e){u(e.target,"header__add-button")?(d.classList.add("active"),s.style.display="block"):(u(e.target,"product-card__delete-button")||u(e.target,"header__reset-button"))&&(l.style.display="block",s.style.display="block")})),c.addEventListener("click",(function(e){u(e.target,"form__close-button")?(d.classList.remove("active"),s.style.display="none"):u(e.target,"modal__cancel-button")&&(l.style.display="none",s.style.display="none")})),c.addEventListener("click",(function(e){u(e.target,"form__submit-button")&&(""===d.product_name.value||""===d.product_type.value||""===d.exp_date.value?(e.preventDefault(),d.classList.add("active"),document.querySelector(".alert").textContent="Completa todos los campos"):function(e){const r={name:e.target.form.product_name.value,type:e.target.form.product_type.value,date:e.target.form.exp_date.value.toString(),days:[]},o=document.querySelectorAll('input[type="checkbox"]');for(let e of o)e.checked&&r.days.push(e.value);t(r)}(e))})),c.addEventListener("click",(async function(e){let t="",r=document.querySelector(".modal__delete-button");if(u(e.target,"product-card__delete-button")){let r=e.target.parentNode.id;t=document.querySelectorAll(`[id="${r}"]`)}else u(e.target,"header__reset-button")&&(t=document.querySelectorAll(".card"));t.length&&r.addEventListener("click",(()=>{t.forEach((e=>{e.remove(),o(e.id)})),l.style.display="none",s.style.display="none"}))})),e((function(e){const t=document.querySelectorAll(".calendar__container");e.map((e=>{e.days.map((r=>{t.forEach(((o,n)=>{if(r===o.classList[1]){const{name:r,type:o,date:a,_id:i}=e;let c=`<div class="card" id="${i}">\n          <i class="fa fa-times-circle product-card__delete-button"></i>\n          <p>${r}</p>\n          <p>${o}</p>\n          <p>Expira ${function(e){if(null!==e){let t=/(\d{1,4})-(\d{1,2})-(\d{1,2})/,r=e.match(t);return`${r[3]}/${r[2]}/${r[1]}`}}(a)}</p>\n          </div>`;t[n].innerHTML+=c}}))}))}))}));const u=(e,t)=>e.classList.contains(t)})()})();