(this["webpackJsonpdish-form"]=this["webpackJsonpdish-form"]||[]).push([[0],{150:function(e,t,a){var n={"./pizza.jpg":151,"./sandwich.jpg":152,"./soup.jpg":153,"./veg10.jpg":154,"./veg4.jpg":155,"./veg8.jpg":156};function c(e){var t=r(e);return a(t)}function r(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}c.keys=function(){return Object.keys(n)},c.resolve=r,e.exports=c,c.id=150},151:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/pizza.a8e2abcd.jpg"},152:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/sandwich.4c85b99e.jpg"},153:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/soup.eae9ab6c.jpg"},154:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/veg10.e9165112.jpg"},155:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/veg4.5db3e508.jpg"},156:function(e,t,a){"use strict";a.r(t),t.default=a.p+"static/media/veg8.d77e34bf.jpg"},157:function(e,t,a){"use strict";a.r(t);var n=a(2),c=a.n(n),r=a(39),s=a.n(r),i=(a(49),a(14)),o=a.n(i),l=a(40),u=a(42),d=a(6),p=a(3),m=a(43),b=a(44),j=a(1),f=["tagType","title","errorMsg","optionNames"],h=c.a.forwardRef((function(e,t){var a=e.tagType,c=e.title,r=e.errorMsg,s=e.optionNames,i=void 0===s?"":s,o=Object(b.a)(e,f),l=Object(n.useContext)(w).onState,u=l.preparation_time,d=l.type,h=l.no_of_slices,O=l.diameter,v=l.spiciness_scale,g=l.slices_of_bread,y=l.outputStyle,x=l.loading,_=l.validationFinished,N=o.name,k=Object(n.useMemo)((function(){return"select"===a?Object(m.a)(i).map((function(e,t){return"default"===e?Object(j.jsx)("option",{defaultValue:!0,hidden:!0,label:" ",children:"select an option"},t):Object(j.jsx)("option",{value:e,children:e},t)})):null}),[d]),L=Object(n.useMemo)((function(){return Object(j.jsxs)("div",{className:"input-block",children:[Object(j.jsx)("label",{htmlFor:N,children:c}),Object(j.jsx)("select",Object(p.a)(Object(p.a)({},o),{},{ref:t,children:k})),r&&Object(j.jsx)("span",{className:"invalid-feedback",children:r})]})}),[d,x,_]),C=Object(n.useMemo)((function(){return Object(j.jsxs)("div",{className:"input-block",children:[Object(j.jsx)("label",{htmlFor:N,children:c}),Object(j.jsx)("input",Object(p.a)(Object(p.a)({},o),{},{ref:t})),r&&Object(j.jsx)("span",{className:"invalid-feedback",children:r})]})}),[u,d.val,h,O,l.name,g,N]),R=Object(n.useMemo)((function(){return Object(j.jsxs)("div",{className:"input-block",children:[Object(j.jsx)("label",{htmlFor:N,children:c}),Object(j.jsx)("input",Object(p.a)(Object(p.a)({},o),{},{ref:t})),Object(j.jsx)("output",{className:"bubble",style:y,htmlFor:N,children:l[N].val}),r&&Object(j.jsx)("span",{className:"invalid-feedback",children:r})]})}),[d,v,y]);return Object(j.jsx)(j.Fragment,{children:"input"===a?C:"select"===a?L:R})})),O=c.a.memo(h),v=c.a.forwardRef((function(e,t){var a=e.onTypeVal,c=e.onSubmit,r=Object(n.useContext)(w),s=r.onState,i=r.onChanging,o=r.onAddToInputRef,l=Object(n.useRef)(),u=Object(n.useRef)(),d=Object(n.useRef)(),p=Object(n.useRef)(),m=Object(n.useRef)(),b=Object(n.useRef)(),f=s.name,h=s.preparation_time,v=s.type,g=s.no_of_slices,y=s.diameter,x=s.spiciness_scale,_=s.slices_of_bread;Object(n.useEffect)((function(){})),Object(n.useEffect)((function(){void 0!==l.current&&null!==l.current&&(l.current.classList.add("show-up"),l.current.classList.remove("hide-up")),void 0!==d.current&&null!==d.current&&(d.current.classList.add("show-right"),d.current.classList.remove("hide-right")),void 0!==u.current&&null!==u.current&&(u.current.classList.add("show-left"),u.current.classList.remove("hide-left")),void 0!==p.current&&null!==p.current&&setTimeout((function(){p.current.classList.add("show-left"),p.current.classList.remove("hide-left")}),750),void 0!==m.current&&null!==m.current&&setTimeout((function(){m.current.classList.add("show-right"),m.current.classList.remove("hide-right")}),1250),void 0!==b.current&&null!==b.current&&setTimeout((function(){b.current.classList.add("show-up"),b.current.classList.remove("hide-up")}),1750),void 0!==t.current&&null!==t.current&&setTimeout((function(){t.current.classList.add("show-down"),t.current.classList.remove("hide-down")}),2250)}),[v]);var N=Object(n.useMemo)((function(){return Object(j.jsx)("div",{className:"mrg-x-auto",children:Object(j.jsx)("div",{className:"input-cont",children:Object(j.jsxs)("div",{className:"flex hide-up",ref:l,children:[Object(j.jsx)("div",{className:"one-column",children:Object(j.jsx)(O,{tagType:"input",title:"No of slices",name:"no_of_slices",type:"number",id:"no_of_slices",className:"form-control",step:1,"aria-label":"no_of_slices",required:"pizza"===a,min:1,max:30,value:g.val,onChange:i,ref:o,errorMsg:g.check})}),Object(j.jsx)("div",{className:"one-column",children:Object(j.jsx)(O,{tagType:"input",title:"diameter",name:"diameter",type:"number",id:"diameter",className:"form-control",step:.1,"aria-label":"diameter",required:"pizza"===a,min:.1,max:50,value:y.val,onChange:i,ref:o,errorMsg:y.check})})]})})})}),[v,y,g]),k=Object(n.useMemo)((function(){return Object(j.jsx)("div",{className:"mrg-x-auto narrow",children:Object(j.jsx)("div",{className:"input-cont",children:Object(j.jsx)("div",{className:"range hide-left",ref:u,children:Object(j.jsx)(O,{tagType:"range",title:"Spiciness scale",name:"spiciness_scale",type:"range",id:"spiciness_scale",className:"form-control form-control-range",step:1,"aria-label":"spiciness_scale",required:"soup"===a,"data-sizing":"px",min:1,max:10,value:x.val,onChange:i,ref:o,errorMsg:x.check})})})})}),[v,x]),L=Object(n.useMemo)((function(){return Object(j.jsx)("div",{className:"mrg-x-auto narrow",children:Object(j.jsx)("div",{className:"input-cont",children:Object(j.jsx)("div",{className:"number-width hide-right",ref:d,children:Object(j.jsx)(O,{tagType:"input",title:"No of slices",name:"slices_of_bread",type:"number",id:"slices_of_bread",className:"form-control",step:1,"aria-label":"slices_of_bread",required:"sandwich"===a,min:1,value:_.val,onChange:i,ref:o,errorMsg:_.check})})})})}),[v,_]);return Object(j.jsxs)("form",{id:"dishes-form",children:[Object(j.jsxs)("div",{className:"row center",children:[Object(j.jsx)("div",{className:"input-cont",children:Object(j.jsx)("div",{className:"hide-left narrow-70 mrg-x-auto",ref:p,children:Object(j.jsx)(O,{tagType:"input",title:"Dish name",name:"name",type:"text",id:"name",className:"form-control",placeholder:"Type dish name","aria-label":"name",required:!0,value:f.val,onChange:i,ref:o,errorMsg:f.check})})}),Object(j.jsx)("div",{className:"input-cont",children:Object(j.jsx)("div",{className:"hide-right narrow-70 mrg-x-auto",ref:m,children:Object(j.jsx)(O,{tagType:"input",title:"Preparation time",name:"preparation_time",type:"time",id:"preparation_time",className:"form-control",step:1,"aria-label":"preparation_time",required:!0,min:"00:15:00",pattern:"[0-9]{2}:[0-9]{2}:[0-9]{2}",value:h.val,onChange:i,ref:o,errorMsg:h.check})})}),Object(j.jsx)("div",{className:"input-cont",children:Object(j.jsx)("div",{className:"hide-up narrow-70 mrg-x-auto",ref:b,children:Object(j.jsx)(O,{tagType:"select",title:"Type",name:"type",id:"type",className:"form-control form-control-lg",optionNames:["default","pizza","soup","sandwich"],"aria-label":"type",required:!0,value:v.val,onChange:i,ref:o,errorMsg:v.check})})}),"pizza"===a?N:"soup"===a?k:"sandwich"===a?L:""]}),Object(j.jsx)("div",{className:"row center",children:Object(j.jsx)("div",{className:"buttons col",children:Object(j.jsx)("button",{type:"submit",className:"btn btn-check hide-down",ref:t,onClick:c,children:"Submit"})})})]})})),g=c.a.memo(v),y=(a(52),a(53),a(15)),x=a.n(y),_=function(e){var t=Object(n.useRef)([]),a=Object(n.useRef)(),c=function(e){return a.current="",e.length<8&&(e+=":00"),e<"00:15:00"&&(a.current="We need at least 15 min to prepare the dish!"),{test:new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/).test(e),time:e}};return{onValidation:function(n,r){return t.current=[],new Promise((function(s,i){var o,l=0;for(var u in n){l++;var d=n[u].val.toString().split(" ").join("");if(d.length<=0||"NaN"===d)t.current.push(!1),e({type:"input_check",nameObj:"".concat(u),payload:"This field has to be filled in"}),s({arrayOfAllChecksVal:t.current,time:n.preparation_time.val});else if(d.length>30)t.current.push(!1),e({type:"input_check",nameObj:"".concat(u),payload:"Use max 30 characters"}),s({arrayOfAllChecksVal:t.current,time:n.preparation_time.val});else switch(n[u].sort){case"text":x.a.isAlpha(d)?(t.current.push(!0),e({type:"input_check",nameObj:"".concat(u),payload:""})):(t.current.push(!1),e({type:"input_check",nameObj:"".concat(u),payload:"Please use only letters"}));break;case"intNumber":case"floatNumber":if(x.a.isNumeric(d)){var p=void 0;p="intNumber"===u?parseInt(d):parseFloat(d);var m=void 0,b=void 0;null!==n[u].min&&void 0!==n[u].min&&(m=n[u].min),null!==n[u].max&&void 0!==n[u].max&&(b=n[u].max),p<m?(t.current.push(!1),e({type:"input_check",nameObj:"".concat(u),payload:"The number is too small"})):p>b?(t.current.push(!1),e({type:"input_check",nameObj:"".concat(u),payload:"The number is too big"})):(t.current.push(!0),e({type:"input_check",nameObj:"".concat(u),payload:""}))}else t.current.push(!1),e({type:"input_check",nameObj:"".concat(u),payload:"Please use only numbers"});break;case"time":var j=c(d),f=j.test;o=j.time,f?f&&""!==a.current?(t.current.push(!1),e({type:"input_check",nameObj:"".concat(u),payload:a.current})):(t.current.push(!0),e({type:"input_check",nameObj:"".concat(u),payload:""})):(t.current.push(!1),e({type:"input_check",nameObj:"".concat(u),payload:"Please use only numbers in time format"}))}l>=r&&s({arrayOfAllChecksVal:t.current,time:o})}}))}}},N=a(41),k=a.n(N),w=c.a.createContext(),L={name:{val:"",sort:"text",check:""},preparation_time:{val:"00:15:00",sort:"time",check:""},type:{val:"",sort:"text",check:""},no_of_slices:{val:1,sort:"intNumber",check:"",min:1,max:30},diameter:{val:.1,sort:"floatNumber",check:"",min:.1,max:50},spiciness_scale:{val:1,sort:"intNumber",check:"",min:1,max:10},slices_of_bread:{val:1,sort:"intNumber",check:"",min:1}},C=Object(p.a)(Object(p.a)({},L),{},{outputStyle:{left:"0"},sizeOfSubmittedObject:0,validationFinished:"not",finalResponse:"Hungry?",loading:!1}),R=function(e,t){switch(t.type){case"input":return Object(p.a)(Object(p.a)({},e),{},Object(d.a)({},t.nameObj,Object(p.a)(Object(p.a)({},e[t.nameObj]),{},{val:t.payload})));case"input_check":return Object(p.a)(Object(p.a)({},e),{},Object(d.a)({},t.nameObj,Object(p.a)(Object(p.a)({},e[t.nameObj]),{},{check:t.payload})));case"one_value":return Object(p.a)(Object(p.a)({},e),{},Object(d.a)({},t.nameObj,t.payload));case"outputStyle":return Object(p.a)(Object(p.a)({},e),{},{outputStyle:Object(p.a)(Object(p.a)({},e.outputStyle),{},{left:t.payload})});case"reset":return Object(p.a)(Object(p.a)(Object(p.a)({},e),L),{},{loading:!1});default:return e}};var T=function(){var e=Object(n.useReducer)(R,C),t=Object(u.a)(e,2),c=t[0],r=t[1],s=_(r).onValidation,i=Object(n.useRef)(),m=Object(n.useRef)([]),b=Object(n.useRef)([]),f=Object(n.useRef)({}),h=Object(n.useRef)(),O=Object(n.useRef)(),v=Object(n.useRef)(),y=c.name,x=c.preparation_time,N=c.type,L=c.no_of_slices,T=c.diameter,F=c.spiciness_scale,S=c.slices_of_bread,M=c.validationFinished,z=c.finalResponse,E=c.outputStyle,A=c.loading;Object(n.useEffect)((function(){})),Object(n.useEffect)((function(){i.current.classList.add("drop-fast"),i.current.classList.remove("hide-upper")}),[]),Object(n.useEffect)((function(){void 0!==m.current&&null!==m.current&&m.current.forEach((function(e){if("range"===e.getAttribute("type")){var t=e.getAttribute("value");P(t,e,"%")}}))}),[N]),Object(n.useEffect)((function(){if("ok"===M){f.current=JSON.stringify(f.current),m.current.forEach((function(e){e.classList.remove("inCorrect"),e.classList.add("correct")})),b.current.forEach((function(e){e.classList.add("afterValidation")}));var e={method:"POST",url:"https://jsonplaceholder.typicode.com/posts",headers:{"Content-type":"application/json"},data:f.current};h.current.classList.remove("bad"),h.current.classList.add("wait"),r({type:"one_value",nameObj:"loading",payload:!0}),v.current.disabled=!0,k()(e).then((function(e){console.log(e.data),f.current="",h.current.classList.remove("wait"),h.current.classList.add("fine"),r({type:"reset",payload:""}),r({type:"one_value",nameObj:"finalResponse",payload:"Your order has been sent successfully!"}),v.current.disabled=!1})).catch((function(e){console.log(e.message),f.current="",r({type:"one_value",nameObj:"loading",payload:!1}),h.current.classList.remove("wait"),h.current.classList.add("bad"),r({type:"one_value",nameObj:"finalResponse",payload:e.message}),v.current.disabled=!1}))}else"error"===M&&(h.current.classList.remove("fine"),h.current.classList.add("bad"),m.current.forEach((function(e){var t=e.getAttribute("name");""===c[t].check?(e.classList.remove("inCorrect"),e.classList.add("correct")):(e.classList.remove("correct"),e.classList.add("inCorrect"))})),r({type:"one_value",nameObj:"finalResponse",payload:"There is a mistake!"}))}),[M]);var P=Object(n.useCallback)((function(e,t,a){var n=getComputedStyle(t),c=parseFloat(n.paddingLeft)+parseFloat(n.paddingRight),s=t.clientWidth,i=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--bubble-width")),o=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--thumb-width")),l=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--thumb-border-width"));if(void 0!==t&&null!==t){var u=parseInt(t.getAttribute("min")),d=parseInt(t.getAttribute("max")),p=100*(parseInt(e)-u)/(d-u);return r({type:"outputStyle",payload:p+100*(c/2+1+(o+2*l)/2-i/2)/s-100*(c+(o+2*l))/s*p/100+a}),!1}}),[F,E]),V=function(e){return new Promise((function(t,a){var n={name:y,preparation_time:x,type:N};switch(e){case"pizza":t(Object(p.a)(Object(p.a)({},n),{},{no_of_slices:L,diameter:T}));break;case"soup":t(Object(p.a)(Object(p.a)({},n),{},{spiciness_scale:F}));break;case"sandwich":t(Object(p.a)(Object(p.a)({},n),{},{slices_of_bread:S}));break;default:t(Object(p.a)({},n))}}))},I=function(){var e=Object(l.a)(o.a.mark((function e(t){var a,n,c,i,l,u;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),r({type:"one_value",nameObj:"validationFinished",payload:"not"}),e.next=4,V(N.val);case 4:return a=e.sent,n=Object.keys(a).length,r({type:"one_value",nameObj:"sizeOfSubmittedObject",payload:n}),e.next=9,s(a,n);case 9:for(u in c=e.sent,i=c.arrayOfAllChecksVal,l=c.time,a)f.current="preparation_time"===u?Object(p.a)(Object(p.a)({},f.current),{},{preparation_time:l}):Object(p.a)(Object(p.a)({},f.current),{},Object(d.a)({},u,a[u].val));i.every((function(e){return!0===e}))?r({type:"one_value",nameObj:"validationFinished",payload:"ok"}):r({type:"one_value",nameObj:"validationFinished",payload:"error"});case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q=Object(n.useCallback)((function(e){e&&!b.current.includes(e)&&b.current.push(e)}),[]),D=Object(n.useCallback)((function(e){e&&!m.current.includes(e)&&m.current.push(e)}),[N]),J=Object(j.jsx)("img",{alt:N.val,className:"photo hanging",src:""!==N.val?a(150)("./".concat(N.val,".jpg")).default:""});return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)("div",{className:"container",children:[Object(j.jsx)("h2",{className:"title hide-upper",ref:i,children:"Let's have a delicious meal!"}),Object(j.jsxs)("div",{className:"dishes flex",ref:O,children:[Object(j.jsx)(w.Provider,{value:{onState:c,onDispatch:r,onChanging:function(e){"not"!==M&&(r({type:"one_value",nameObj:"finalResponse",payload:"Hungry?"}),r({type:"one_value",nameObj:"validationFinished",payload:"not"})),"range"===e.target.type&&P(e.target.value,e.target,"%");var t=e.target.name;"no_of_slices"===t||"spiciness_scale"===t||"slices_of_bread"===t?r({type:"input",nameObj:e.target.name,payload:parseInt(e.target.value)}):"diameter"===t?r({type:"input",nameObj:e.target.name,payload:parseFloat(e.target.value)}):"type"===t?(m.current=[],r({type:"input",nameObj:e.target.name,payload:e.target.value})):r({type:"input",nameObj:e.target.name,payload:e.target.value})},onAddToInputRef:D,onInputRef:m.current,onAddToFeedbackRef:q},children:Object(j.jsx)(g,{onTypeVal:N.val,onSubmit:I,ref:v})}),Object(j.jsx)("div",{className:"image",children:Object(j.jsx)("div",{className:"answer mrg-x-auto",ref:h,children:A?"Wait...":"not"===M&&""!==N.val?J:z})})]})]})})},F=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,158)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),n(e),c(e),r(e),s(e)}))};s.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(T,{})}),document.getElementById("root")),F()},49:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){}},[[157,1,2]]]);
//# sourceMappingURL=main.0a60d415.chunk.js.map