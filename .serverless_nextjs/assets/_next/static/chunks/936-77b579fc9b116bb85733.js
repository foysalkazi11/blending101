(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[936],{60057:function(e,t,r){"use strict";var s=r(95318);t.Z=void 0;var a=s(r(64938)),n=r(85893),i=(0,a.default)((0,n.jsx)("path",{d:"M14.59 8 12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"}),"HighlightOffOutlined");t.Z=i},22961:function(e,t,r){"use strict";var s=r(95318);t.Z=void 0;var a=s(r(64938)),n=r(85893),i=(0,a.default)((0,n.jsx)("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"}),"Visibility");t.Z=i},72450:function(e,t,r){"use strict";var s=r(95318);t.Z=void 0;var a=s(r(64938)),n=r(85893),i=(0,a.default)((0,n.jsx)("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"}),"VisibilityOff");t.Z=i},92167:function(e,t,r){"use strict";var s=r(53848);t.default=void 0;var a,n=(a=r(67294))&&a.__esModule?a:{default:a},i=r(21063),o=r(34651),l=r(7426);var u={};function c(e,t,r,s){if(e&&i.isLocalURL(t)){e.prefetch(t,r,s).catch((function(e){0}));var a=s&&"undefined"!==typeof s.locale?s.locale:e&&e.locale;u[t+"%"+r+(a?"%"+a:"")]=!0}}var f=function(e){var t,r=!1!==e.prefetch,a=o.useRouter(),f=n.default.useMemo((function(){var t=i.resolveHref(a,e.href,!0),r=s(t,2),n=r[0],o=r[1];return{href:n,as:e.as?i.resolveHref(a,e.as):o||n}}),[a,e.href,e.as]),d=f.href,g=f.as,y=e.children,m=e.replace,b=e.shallow,h=e.scroll,v=e.locale;"string"===typeof y&&(y=n.default.createElement("a",null,y));var p=(t=n.default.Children.only(y))&&"object"===typeof t&&t.ref,_=l.useIntersection({rootMargin:"200px"}),O=s(_,2),j=O[0],V=O[1],w=n.default.useCallback((function(e){j(e),p&&("function"===typeof p?p(e):"object"===typeof p&&(p.current=e))}),[p,j]);n.default.useEffect((function(){var e=V&&r&&i.isLocalURL(d),t="undefined"!==typeof v?v:a&&a.locale,s=u[d+"%"+g+(t?"%"+t:"")];e&&!s&&c(a,d,g,{locale:t})}),[g,d,V,v,r,a]);var A={ref:w,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,r,s,a,n,o,l){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&i.isLocalURL(r))&&(e.preventDefault(),null==o&&s.indexOf("#")>=0&&(o=!1),t[a?"replace":"push"](r,s,{shallow:n,locale:l,scroll:o}))}(e,a,d,g,m,b,h,v)},onMouseEnter:function(e){i.isLocalURL(d)&&(t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),c(a,d,g,{priority:!0}))}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var x="undefined"!==typeof v?v:a&&a.locale,F=a&&a.isLocaleDomain&&i.getDomainLocale(g,x,a&&a.locales,a&&a.domainLocales);A.href=F||i.addBasePath(i.addLocale(g,x,a&&a.defaultLocale))}return n.default.cloneElement(t,A)};t.default=f},7426:function(e,t,r){"use strict";var s=r(53848);Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootMargin,r=e.disabled||!i,l=a.useRef(),u=a.useState(!1),c=s(u,2),f=c[0],d=c[1],g=a.useCallback((function(e){l.current&&(l.current(),l.current=void 0),r||f||e&&e.tagName&&(l.current=function(e,t,r){var s=function(e){var t=e.rootMargin||"",r=o.get(t);if(r)return r;var s=new Map,a=new IntersectionObserver((function(e){e.forEach((function(e){var t=s.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)}))}),e);return o.set(t,r={id:t,observer:a,elements:s}),r}(r),a=s.id,n=s.observer,i=s.elements;return i.set(e,t),n.observe(e),function(){i.delete(e),n.unobserve(e),0===i.size&&(n.disconnect(),o.delete(a))}}(e,(function(e){return e&&d(e)}),{rootMargin:t}))}),[r,t,f]);return a.useEffect((function(){if(!i&&!f){var e=n.requestIdleCallback((function(){return d(!0)}));return function(){return n.cancelIdleCallback(e)}}}),[f]),[g,f]};var a=r(67294),n=r(73447),i="undefined"!==typeof IntersectionObserver;var o=new Map},41664:function(e,t,r){e.exports=r(92167)},87536:function(e,t,r){"use strict";r.d(t,{cI:function(){return je}});var s=r(67294),a=e=>"checkbox"===e.type,n=e=>e instanceof Date,i=e=>null==e;const o=e=>"object"===typeof e;var l=e=>!i(e)&&!Array.isArray(e)&&o(e)&&!n(e),u=e=>l(e)&&e.target?a(e.target)?e.target.checked:e.target.value:e,c=(e,t)=>[...e].some((e=>(e=>e.substring(0,e.search(/.\d/))||e)(t)===e)),f=e=>(e||[]).filter(Boolean),d=e=>void 0===e,g=(e,t,r)=>{if(l(e)&&t){const s=f(t.split(/[,[\].]+?/)).reduce(((e,t)=>i(e)?e:e[t]),e);return d(s)||s===e?d(e[t])?r:e[t]:s}};const y="blur",m="onBlur",b="onChange",h="onSubmit",v="onTouched",p="all",_="max",O="min",j="maxLength",V="minLength",w="pattern",A="required",x="validate";var F=(e,t)=>{const r=Object.assign({},e);return delete r[t],r};s.createContext(null);var k=(e,t,r,s=!0)=>{function a(a){return()=>{if(a in e)return t[a]!==p&&(t[a]=!s||p),r&&(r[a]=!0),e[a]}}const n={};for(const i in e)Object.defineProperty(n,i,{get:a(i)});return n},S=e=>l(e)&&!Object.keys(e).length,D=(e,t,r)=>{const s=F(e,"name");return S(s)||Object.keys(s).length>=Object.keys(t).length||Object.keys(s).find((e=>t[e]===(!r||p)))},C=e=>Array.isArray(e)?e:[e];function E(e){const t=s.useRef(e);t.current=e,s.useEffect((()=>{const r=!e.disabled&&t.current.subject.subscribe({next:t.current.callback});return()=>(e=>{e&&e.unsubscribe()})(r)}),[e.disabled])}var M=e=>"string"===typeof e,L=(e,t,r,s)=>{const a=Array.isArray(e);return M(e)?(s&&t.watch.add(e),g(r,e)):a?e.map((e=>(s&&t.watch.add(e),g(r,e)))):(s&&(t.watchAll=!0),r)},U=e=>"function"===typeof e,N=e=>{for(const t in e)if(U(e[t]))return!0;return!1};var T=(e,t,r,s,a)=>t?Object.assign(Object.assign({},r[e]),{types:Object.assign(Object.assign({},r[e]&&r[e].types?r[e].types:{}),{[s]:a||!0})}):{},B=e=>/^\w*$/.test(e),z=e=>f(e.replace(/["|']|\]/g,"").split(/\.|\[/));function I(e,t,r){let s=-1;const a=B(t)?[t]:z(t),n=a.length,i=n-1;for(;++s<n;){const t=a[s];let n=r;if(s!==i){const r=e[t];n=l(r)||Array.isArray(r)?r:isNaN(+a[s+1])?{}:[]}e[t]=n,e=e[t]}return e}const R=(e,t,r)=>{for(const s of r||Object.keys(e)){const r=g(e,s);if(r){const e=r._f,s=F(r,"_f");if(e&&t(e.name)){if(e.ref.focus&&d(e.ref.focus()))break;if(e.refs){e.refs[0].focus();break}}else l(s)&&R(s,t)}}};var q=(e,t,r)=>!r&&(t.watchAll||t.watch.has(e)||[...t.watch].some((t=>e.startsWith(t)&&/^\.\w+/.test(e.slice(t.length)))));function H(e){let t;const r=Array.isArray(e);if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set(e);else{if(!r&&!l(e))return e;t=r?[]:{};for(const r in e){if(U(e[r])){t=e;break}t[r]=H(e[r])}}return t}function Z(){let e=[];return{get observers(){return e},next:t=>{for(const r of e)r.next(t)},subscribe:t=>(e.push(t),{unsubscribe:()=>{e=e.filter((e=>e!==t))}}),unsubscribe:()=>{e=[]}}}var P=e=>i(e)||!o(e);function K(e,t){if(P(e)||P(t))return e===t;if(n(e)&&n(t))return e.getTime()===t.getTime();const r=Object.keys(e),s=Object.keys(t);if(r.length!==s.length)return!1;for(const a of r){const r=e[a];if(!s.includes(a))return!1;if("ref"!==a){const e=t[a];if(n(r)&&n(e)||l(r)&&l(e)||Array.isArray(r)&&Array.isArray(e)?!K(r,e):r!==e)return!1}}return!0}var $=e=>({isOnSubmit:!e||e===h,isOnBlur:e===m,isOnChange:e===b,isOnAll:e===p,isOnTouch:e===v}),W=e=>"boolean"===typeof e,G=e=>"file"===e.type,J=e=>e instanceof HTMLElement,Q=e=>"select-multiple"===e.type,X=e=>"radio"===e.type,Y="undefined"!==typeof window&&"undefined"!==typeof window.HTMLElement&&"undefined"!==typeof document,ee=e=>J(e)&&document.contains(e);function te(e,t){const r=B(t)?[t]:z(t),s=1==r.length?e:function(e,t){const r=t.slice(0,-1).length;let s=0;for(;s<r;)e=d(e)?s++:e[t[s++]];return e}(e,r),a=r[r.length-1];let n;s&&delete s[a];for(let i=0;i<r.slice(0,-1).length;i++){let t,s=-1;const a=r.slice(0,-(i+1)),o=a.length-1;for(i>0&&(n=e);++s<a.length;){const r=a[s];t=t?t[r]:e[r],o===s&&(l(t)&&S(t)||Array.isArray(t)&&!t.filter((e=>l(e)&&!S(e)||W(e))).length)&&(n?delete n[r]:delete e[r]),n=t}}return e}function re(e,t={}){const r=Array.isArray(e);if(l(e)||r)for(const s in e)Array.isArray(e[s])||l(e[s])&&!N(e[s])?(t[s]=Array.isArray(e[s])?[]:{},re(e[s],t[s])):i(e[s])||(t[s]=!0);return t}function se(e,t,r){const s=Array.isArray(e);if(l(e)||s)for(const a in e)Array.isArray(e[a])||l(e[a])&&!N(e[a])?d(t)||P(r[a])?r[a]=Array.isArray(e[a])?re(e[a],[]):Object.assign({},re(e[a])):se(e[a],i(t)?{}:t[a],r[a]):r[a]=!K(e[a],t[a]);return r}var ae=(e,t)=>se(e,t,re(t));const ne={value:!1,isValid:!1},ie={value:!0,isValid:!0};var oe=e=>{if(Array.isArray(e)){if(e.length>1){const t=e.filter((e=>e&&e.checked&&!e.disabled)).map((e=>e.value));return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!d(e[0].attributes.value)?d(e[0].value)||""===e[0].value?ie:{value:e[0].value,isValid:!0}:ie:ne}return ne},le=(e,{valueAsNumber:t,valueAsDate:r,setValueAs:s})=>d(e)?e:t?""===e?NaN:+e:r&&M(e)?new Date(e):s?s(e):e;const ue={isValid:!1,value:null};var ce=e=>Array.isArray(e)?e.reduce(((e,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:e),ue):ue;function fe(e){const t=e.ref;if(!(e.refs?e.refs.every((e=>e.disabled)):t.disabled))return G(t)?t.files:X(t)?ce(e.refs).value:Q(t)?[...t.selectedOptions].map((({value:e})=>e)):a(t)?oe(e.refs).value:le(d(t.value)?e.ref.value:t.value,e)}var de=e=>e instanceof RegExp,ge=e=>d(e)?void 0:de(e)?e.source:l(e)?de(e.value)?e.value.source:e.value:e;function ye(e,t,r){const s=g(e,r);if(s||B(r))return{error:s,name:r};const a=r.split(".");for(;a.length;){const s=a.join("."),n=g(t,s),i=g(e,s);if(n&&!Array.isArray(n)&&r!==s)return{name:r};if(i&&i.type)return{name:s,error:i};a.pop()}return{name:r}}var me=(e,t)=>!f(g(e,t)).length&&te(e,t),be=e=>M(e)||s.isValidElement(e);function he(e,t,r="validate"){if(be(e)||Array.isArray(e)&&e.every(be)||W(e)&&!e)return{type:r,message:be(e)?e:"",ref:t}}var ve=e=>l(e)&&!de(e)?e:{value:e,message:""},pe=async(e,t,r,s)=>{const{ref:n,refs:o,required:u,maxLength:c,minLength:f,min:d,max:g,pattern:y,validate:m,name:b,valueAsNumber:h,mount:v,disabled:p}=e._f;if(!v||p)return{};const F=o?o[0]:n,k=e=>{s&&F.reportValidity&&(F.setCustomValidity(W(e)?"":e||" "),F.reportValidity())},D={},C=X(n),E=a(n),L=C||E,N=(h||G(n))&&!n.value||""===t||Array.isArray(t)&&!t.length,B=T.bind(null,b,r,D),z=(e,t,r,s=j,a=V)=>{const i=e?t:r;D[b]=Object.assign({type:e?s:a,message:i,ref:n},B(e?s:a,i))};if(u&&(!L&&(N||i(t))||W(t)&&!t||E&&!oe(o).isValid||C&&!ce(o).isValid)){const{value:e,message:t}=be(u)?{value:!!u,message:u}:ve(u);if(e&&(D[b]=Object.assign({type:A,message:t,ref:F},B(A,t)),!r))return k(t),D}if(!N&&(!i(d)||!i(g))){let e,s;const a=ve(g),o=ve(d);if(isNaN(t)){const r=n.valueAsDate||new Date(t);M(a.value)&&(e=r>new Date(a.value)),M(o.value)&&(s=r<new Date(o.value))}else{const r=n.valueAsNumber||parseFloat(t);i(a.value)||(e=r>a.value),i(o.value)||(s=r<o.value)}if((e||s)&&(z(!!e,a.message,o.message,_,O),!r))return k(D[b].message),D}if((c||f)&&!N&&M(t)){const e=ve(c),s=ve(f),a=!i(e.value)&&t.length>e.value,n=!i(s.value)&&t.length<s.value;if((a||n)&&(z(a,e.message,s.message),!r))return k(D[b].message),D}if(y&&!N&&M(t)){const{value:e,message:s}=ve(y);if(de(e)&&!t.match(e)&&(D[b]=Object.assign({type:w,message:s,ref:n},B(w,s)),!r))return k(s),D}if(m)if(U(m)){const e=he(await m(t),F);if(e&&(D[b]=Object.assign(Object.assign({},e),B(x,e.message)),!r))return k(e.message),D}else if(l(m)){let e={};for(const s in m){if(!S(e)&&!r)break;const a=he(await m[s](t),F,s);a&&(e=Object.assign(Object.assign({},a),B(s,a.message)),k(a.message),r&&(D[b]=e))}if(!S(e)&&(D[b]=Object.assign({ref:F},e),!r))return D}return k(!0),D};const _e={mode:h,reValidateMode:b,shouldFocusError:!0};function Oe(e={}){let t,r=Object.assign(Object.assign({},_e),e),s={isDirty:!1,isValidating:!1,dirtyFields:{},isSubmitted:!1,submitCount:0,touchedFields:{},isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,errors:{}},o={},l=r.defaultValues||{},m=r.shouldUnregister?{}:H(l),b={action:!1,mount:!1,watch:!1},h={mount:new Set,unMount:new Set,array:new Set,watch:new Set},v=0,_={};const O={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},j={watch:Z(),array:Z(),state:Z()},V=$(r.mode),w=$(r.reValidateMode),A=r.criteriaMode===p,x=async e=>{let t=!1;return O.isValid&&(t=r.resolver?S((await T()).errors):await B(o,!0),e||t===s.isValid||(s.isValid=t,j.state.next({isValid:t}))),t},k=(e,t)=>(I(s.errors,e,t),j.state.next({errors:s.errors})),D=(e,t,r)=>{const s=g(o,e);if(s){const a=g(m,e,g(l,e));d(a)||r&&r.defaultChecked||t?I(m,e,t?a:fe(s._f)):se(e,a)}b.mount&&x()},E=(e,t,r,a=!0)=>{let n=!1;const i={name:e},o=g(s.touchedFields,e);if(O.isDirty){const e=s.isDirty;s.isDirty=i.isDirty=z(),n=e!==i.isDirty}if(O.dirtyFields&&!r){const r=g(s.dirtyFields,e);K(g(l,e),t)?te(s.dirtyFields,e):I(s.dirtyFields,e,!0),i.dirtyFields=s.dirtyFields,n=n||r!==g(s.dirtyFields,e)}return r&&!o&&(I(s.touchedFields,e,r),i.touchedFields=s.touchedFields,n=n||O.touchedFields&&o!==r),n&&a&&j.state.next(i),n?i:{}},N=async(r,a,n,i,o)=>{const l=g(s.errors,a),u=O.isValid&&s.isValid!==n;var c,f;if(e.delayError&&i?(t=t||(c=k,f=e.delayError,(...e)=>{clearTimeout(v),v=window.setTimeout((()=>c(...e)),f)}),t(a,i)):(clearTimeout(v),i?I(s.errors,a,i):te(s.errors,a)),((i?!K(l,i):l)||!S(o)||u)&&!r){const e=Object.assign(Object.assign(Object.assign({},o),u?{isValid:n}:{}),{errors:s.errors,name:a});s=Object.assign(Object.assign({},s),e),j.state.next(e)}_[a]--,O.isValidating&&!_[a]&&(j.state.next({isValidating:!1}),_={})},T=async e=>r.resolver?await r.resolver(Object.assign({},m),r.context,((e,t,r,s)=>{const a={};for(const n of e){const e=g(t,n);e&&I(a,n,e._f)}return{criteriaMode:r,names:[...e],fields:a,shouldUseNativeValidation:s}})(e||h.mount,o,r.criteriaMode,r.shouldUseNativeValidation)):{},B=async(e,t,a={valid:!0})=>{for(const n in e){const i=e[n];if(i){const e=i._f,n=F(i,"_f");if(e){const n=await pe(i,g(m,e.name),A,r.shouldUseNativeValidation);if(n[e.name]&&(a.valid=!1,t))break;t||(n[e.name]?I(s.errors,e.name,n[e.name]):te(s.errors,e.name))}n&&await B(n,t,a)}}return a.valid},z=(e,t)=>(e&&t&&I(m,e,t),!K(ce(),l)),re=(e,t,r)=>{const s=Object.assign({},b.mount?m:d(t)?l:M(e)?{[e]:t}:t);return L(e,h,s,r)},se=(e,t,r={})=>{const s=g(o,e);let n=t;if(s){const r=s._f;r&&(I(m,e,le(t,r)),n=Y&&J(r.ref)&&i(t)?"":t,Q(r.ref)?[...r.ref.options].forEach((e=>e.selected=n.includes(e.value))):r.refs?a(r.ref)?r.refs.length>1?r.refs.forEach((e=>e.checked=Array.isArray(n)?!!n.find((t=>t===e.value)):n===e.value)):r.refs[0].checked=!!n:r.refs.forEach((e=>e.checked=e.value===n)):G(r.ref)||(r.ref.value=n,r.ref.type||j.watch.next({name:e})))}(r.shouldDirty||r.shouldTouch)&&E(e,n,r.shouldTouch),r.shouldValidate&&ue(e)},ne=(e,t,r)=>{for(const s in t){const a=t[s],i=`${e}.${s}`,l=g(o,i);!h.array.has(e)&&P(a)&&(!l||l._f)||n(a)?se(i,a,r):ne(i,a,r)}},ie=(e,t,r={})=>{const a=g(o,e),n=h.array.has(e);I(m,e,t),n?(j.array.next({name:e,values:m}),(O.isDirty||O.dirtyFields)&&r.shouldDirty&&(s.dirtyFields=ae(l,m),j.state.next({name:e,dirtyFields:s.dirtyFields,isDirty:z(e,t)}))):!a||a._f||i(t)?se(e,t,r):ne(e,t,r),q(e,h)&&j.state.next({}),j.watch.next({name:e})},oe=async e=>{const t=e.target;let a=t.name;const n=g(o,a);if(n){let l,c;const f=t.type?fe(n._f):u(e),d=e.type===y,b=!((i=n._f).mount&&(i.required||i.min||i.max||i.maxLength||i.minLength||i.pattern||i.validate))&&!r.resolver&&!g(s.errors,a)&&!n._f.deps||((e,t,r,s,a)=>!a.isOnAll&&(!r&&a.isOnTouch?!(t||e):(r?s.isOnBlur:a.isOnBlur)?!e:!(r?s.isOnChange:a.isOnChange)||e))(d,g(s.touchedFields,a),s.isSubmitted,w,V),v=q(a,h,d);d?n._f.onBlur&&n._f.onBlur(e):n._f.onChange&&n._f.onChange(e),I(m,a,f);const p=E(a,f,d,!1),F=!S(p)||v;if(!d&&j.watch.next({name:a,type:e.type}),b)return F&&j.state.next(Object.assign({name:a},v?{}:p));if(!d&&v&&j.state.next({}),_[a]=(_[a],1),O.isValidating&&j.state.next({isValidating:!0}),r.resolver){const{errors:e}=await T([a]),t=ye(s.errors,o,a),r=ye(e,o,t.name||a);l=r.error,a=r.name,c=S(e)}else l=(await pe(n,g(m,a),A,r.shouldUseNativeValidation))[a],c=await x(!0);n._f.deps&&ue(n._f.deps),N(!1,a,c,l,p)}var i},ue=async(e,t={})=>{let a,n;const i=C(e);if(j.state.next({isValidating:!0}),r.resolver){const t=await(async e=>{const{errors:t}=await T();if(e)for(const r of e){const e=g(t,r);e?I(s.errors,r,e):te(s.errors,r)}else s.errors=t;return t})(d(e)?e:i);a=S(t),n=e?!i.some((e=>g(t,e))):a}else e?(n=(await Promise.all(i.map((async e=>{const t=g(o,e);return await B(t&&t._f?{[e]:t}:t)})))).every(Boolean),(n||s.isValid)&&x()):n=a=await B(o);return j.state.next(Object.assign(Object.assign(Object.assign({},!M(e)||O.isValid&&a!==s.isValid?{}:{name:e}),r.resolver?{isValid:a}:{}),{errors:s.errors,isValidating:!1})),t.shouldFocus&&!n&&R(o,(e=>g(s.errors,e)),e?i:h.mount),n},ce=e=>{const t=Object.assign(Object.assign({},l),b.mount?m:{});return d(e)?t:M(e)?g(t,e):e.map((e=>g(t,e)))},de=(e,t={})=>{for(const a of e?C(e):h.mount)h.mount.delete(a),h.array.delete(a),g(o,a)&&(t.keepValue||(te(o,a),te(m,a)),!t.keepError&&te(s.errors,a),!t.keepDirty&&te(s.dirtyFields,a),!t.keepTouched&&te(s.touchedFields,a),!r.shouldUnregister&&!t.keepDefaultValue&&te(l,a));j.watch.next({}),j.state.next(Object.assign(Object.assign({},s),t.keepDirty?{isDirty:z()}:{})),!t.keepIsValid&&x()},be=(e,t={})=>{let s=g(o,e);return I(o,e,{_f:Object.assign(Object.assign(Object.assign({},s&&s._f?s._f:{ref:{name:e}}),{name:e,mount:!0}),t)}),h.mount.add(e),!d(t.value)&&!t.disabled&&I(m,e,g(m,e,t.value)),s?W(t.disabled)&&I(m,e,t.disabled?void 0:g(m,e,fe(s._f))):D(e,!0),Object.assign(Object.assign(Object.assign({},W(t.disabled)?{disabled:t.disabled}:{}),r.shouldUseNativeValidation?{required:!!t.required,min:ge(t.min),max:ge(t.max),minLength:ge(t.minLength),maxLength:ge(t.maxLength),pattern:ge(t.pattern)}:{}),{name:e,onChange:oe,onBlur:oe,ref:n=>{if(n){be(e,t),s=g(o,e);const r=d(n.value)&&n.querySelectorAll&&n.querySelectorAll("input,select,textarea")[0]||n,i=(e=>X(e)||a(e))(r);if(r===s._f.ref||i&&f(s._f.refs).find((e=>e===r)))return;I(o,e,{_f:i?Object.assign(Object.assign({},s._f),{refs:[...f(s._f.refs).filter(ee),r],ref:{type:r.type,name:e}}):Object.assign(Object.assign({},s._f),{ref:r})}),!t.disabled&&D(e,!1,r)}else s=g(o,e,{}),s._f&&(s._f.mount=!1),(r.shouldUnregister||t.shouldUnregister)&&(!c(h.array,e)||!b.action)&&h.unMount.add(e)}})};return{control:{register:be,unregister:de,_executeSchema:T,_getWatch:re,_getDirty:z,_updateValid:x,_removeUnmounted:()=>{for(const e of h.unMount){const t=g(o,e);t&&(t._f.refs?t._f.refs.every((e=>!ee(e))):!ee(t._f.ref))&&de(e)}h.unMount=new Set},_updateFieldArray:(e,t,r,a=[],n=!0,i=!0)=>{if(b.action=!0,i&&g(o,e)){const s=t(g(o,e),r.argA,r.argB);n&&I(o,e,s)}if(Array.isArray(g(s.errors,e))){const a=t(g(s.errors,e),r.argA,r.argB);n&&I(s.errors,e,a),me(s.errors,e)}if(O.touchedFields&&g(s.touchedFields,e)){const a=t(g(s.touchedFields,e),r.argA,r.argB);n&&I(s.touchedFields,e,a),me(s.touchedFields,e)}(O.dirtyFields||O.isDirty)&&(s.dirtyFields=ae(l,m)),j.state.next({isDirty:z(e,a),dirtyFields:s.dirtyFields,errors:s.errors,isValid:s.isValid})},_getFieldArray:t=>f(g(b.mount?m:l,t,e.shouldUnregister?g(l,t,[]):[])),_subjects:j,_proxyFormState:O,get _fields(){return o},set _fields(e){o=e},get _formValues(){return m},set _formValues(e){m=e},get _stateFlags(){return b},set _stateFlags(e){b=e},get _defaultValues(){return l},set _defaultValues(e){l=e},get _names(){return h},set _names(e){h=e},get _formState(){return s},set _formState(e){s=e},get _options(){return r},set _options(e){r=Object.assign(Object.assign({},r),e)}},trigger:ue,register:be,handleSubmit:(e,t)=>async a=>{a&&(a.preventDefault&&a.preventDefault(),a.persist&&a.persist());let n=!0,i=r.shouldUnregister?H(m):Object.assign({},m);j.state.next({isSubmitting:!0});try{if(r.resolver){const{errors:e,values:t}=await T();s.errors=e,i=t}else await B(o);S(s.errors)&&Object.keys(s.errors).every((e=>g(i,e)))?(j.state.next({errors:{},isSubmitting:!0}),await e(i,a)):(t&&await t(s.errors,a),r.shouldFocusError&&R(o,(e=>g(s.errors,e)),h.mount))}catch(l){throw n=!1,l}finally{s.isSubmitted=!0,j.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:S(s.errors)&&n,submitCount:s.submitCount+1,errors:s.errors})}},watch:(e,t)=>U(e)?j.watch.subscribe({next:r=>e(re(void 0,t),r)}):re(e,t,!0),setValue:ie,getValues:ce,reset:(t,r={})=>{const a=t||l,n=H(a),i=t&&!S(t)?n:l;if(r.keepDefaultValues||(l=a),!r.keepValues){if(Y&&d(t))for(const e of h.mount){const t=g(o,e);if(t&&t._f){const e=Array.isArray(t._f.refs)?t._f.refs[0]:t._f.ref;try{J(e)&&e.closest("form").reset();break}catch(u){}}}m=e.shouldUnregister?r.keepDefaultValues?H(l):{}:n,o={},j.watch.next({values:i}),j.array.next({values:i})}h={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},b.mount=!O.isValid||!!r.keepIsValid,b.watch=!!e.shouldUnregister,j.state.next({submitCount:r.keepSubmitCount?s.submitCount:0,isDirty:r.keepDirty?s.isDirty:!!r.keepDefaultValues&&!K(t,l),isSubmitted:!!r.keepIsSubmitted&&s.isSubmitted,dirtyFields:r.keepDirty?s.dirtyFields:r.keepDefaultValues&&t?Object.entries(t).reduce(((e,[t,r])=>Object.assign(Object.assign({},e),{[t]:r!==g(l,t)})),{}):{},touchedFields:r.keepTouched?s.touchedFields:{},errors:r.keepErrors?s.errors:{},isSubmitting:!1,isSubmitSuccessful:!1})},resetField:(e,t={})=>{d(t.defaultValue)?ie(e,g(l,e)):(ie(e,t.defaultValue),I(l,e,t.defaultValue)),t.keepTouched||te(s.touchedFields,e),t.keepDirty||(te(s.dirtyFields,e),s.isDirty=t.defaultValue?z(e,g(l,e)):z()),t.keepError||(te(s.errors,e),O.isValid&&x()),j.state.next(Object.assign({},s))},clearErrors:e=>{e?C(e).forEach((e=>te(s.errors,e))):s.errors={},j.state.next({errors:s.errors,isValid:!0})},unregister:de,setError:(e,t,r)=>{const a=(g(o,e,{_f:{}})._f||{}).ref;I(s.errors,e,Object.assign(Object.assign({},t),{ref:a})),j.state.next({name:e,errors:s.errors,isValid:!1}),r&&r.shouldFocus&&a&&a.focus&&a.focus()},setFocus:e=>{const t=g(o,e)._f;(t.ref.focus?t.ref:t.refs[0]).focus()}}}function je(e={}){const t=s.useRef(),[r,a]=s.useState({isDirty:!1,isValidating:!1,dirtyFields:{},isSubmitted:!1,submitCount:0,touchedFields:{},isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,errors:{}});t.current?t.current.control._options=e:t.current=Object.assign(Object.assign({},Oe(e)),{formState:r});const n=t.current.control;return E({subject:n._subjects.state,callback:e=>{D(e,n._proxyFormState,!0)&&(n._formState=Object.assign(Object.assign({},n._formState),e),a(Object.assign({},n._formState)))}}),s.useEffect((()=>{n._stateFlags.mount||(n._proxyFormState.isValid&&n._updateValid(),n._stateFlags.mount=!0),n._stateFlags.watch&&(n._stateFlags.watch=!1,n._subjects.state.next({})),n._removeUnmounted()})),t.current.formState=k(r,n._proxyFormState),t.current}}}]);