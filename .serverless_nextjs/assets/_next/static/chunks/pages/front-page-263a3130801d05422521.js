(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[413],{21596:function(e,t,n){"use strict";var o=n(95318);t.Z=void 0;var r=o(n(64938)),i=n(85893),a=(0,r.default)((0,i.jsx)("path",{d:"m10 17 5-5-5-5v10z"}),"ArrowRight");t.Z=a},92167:function(e,t,n){"use strict";var o=n(53848);t.default=void 0;var r,i=(r=n(67294))&&r.__esModule?r:{default:r},a=n(21063),s=n(34651),l=n(7426);var c={};function d(e,t,n,o){if(e&&a.isLocalURL(t)){e.prefetch(t,n,o).catch((function(e){0}));var r=o&&"undefined"!==typeof o.locale?o.locale:e&&e.locale;c[t+"%"+n+(r?"%"+r:"")]=!0}}var _=function(e){var t,n=!1!==e.prefetch,r=s.useRouter(),_=i.default.useMemo((function(){var t=a.resolveHref(r,e.href,!0),n=o(t,2),i=n[0],s=n[1];return{href:i,as:e.as?a.resolveHref(r,e.as):s||i}}),[r,e.href,e.as]),u=_.href,g=_.as,h=e.children,f=e.replace,p=e.shallow,m=e.scroll,x=e.locale;"string"===typeof h&&(h=i.default.createElement("a",null,h));var v=(t=i.default.Children.only(h))&&"object"===typeof t&&t.ref,j=l.useIntersection({rootMargin:"200px"}),b=o(j,2),y=b[0],w=b[1],T=i.default.useCallback((function(e){y(e),v&&("function"===typeof v?v(e):"object"===typeof v&&(v.current=e))}),[v,y]);i.default.useEffect((function(){var e=w&&n&&a.isLocalURL(u),t="undefined"!==typeof x?x:r&&r.locale,o=c[u+"%"+g+(t?"%"+t:"")];e&&!o&&d(r,u,g,{locale:t})}),[g,u,w,x,n,r]);var N={ref:T,onClick:function(e){t.props&&"function"===typeof t.props.onClick&&t.props.onClick(e),e.defaultPrevented||function(e,t,n,o,r,i,s,l){("A"!==e.currentTarget.nodeName||!function(e){var t=e.currentTarget.target;return t&&"_self"!==t||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&a.isLocalURL(n))&&(e.preventDefault(),null==s&&o.indexOf("#")>=0&&(s=!1),t[r?"replace":"push"](n,o,{shallow:i,locale:l,scroll:s}))}(e,r,u,g,f,p,m,x)},onMouseEnter:function(e){a.isLocalURL(u)&&(t.props&&"function"===typeof t.props.onMouseEnter&&t.props.onMouseEnter(e),d(r,u,g,{priority:!0}))}};if(e.passHref||"a"===t.type&&!("href"in t.props)){var C="undefined"!==typeof x?x:r&&r.locale,O=r&&r.isLocaleDomain&&a.getDomainLocale(g,C,r&&r.locales,r&&r.domainLocales);N.href=O||a.addBasePath(a.addLocale(g,C,r&&r.defaultLocale))}return i.default.cloneElement(t,N)};t.default=_},7426:function(e,t,n){"use strict";var o=n(53848);Object.defineProperty(t,"__esModule",{value:!0}),t.useIntersection=function(e){var t=e.rootMargin,n=e.disabled||!a,l=r.useRef(),c=r.useState(!1),d=o(c,2),_=d[0],u=d[1],g=r.useCallback((function(e){l.current&&(l.current(),l.current=void 0),n||_||e&&e.tagName&&(l.current=function(e,t,n){var o=function(e){var t=e.rootMargin||"",n=s.get(t);if(n)return n;var o=new Map,r=new IntersectionObserver((function(e){e.forEach((function(e){var t=o.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)}))}),e);return s.set(t,n={id:t,observer:r,elements:o}),n}(n),r=o.id,i=o.observer,a=o.elements;return a.set(e,t),i.observe(e),function(){a.delete(e),i.unobserve(e),0===a.size&&(i.disconnect(),s.delete(r))}}(e,(function(e){return e&&u(e)}),{rootMargin:t}))}),[n,t,_]);return r.useEffect((function(){if(!a&&!_){var e=i.requestIdleCallback((function(){return u(!0)}));return function(){return i.cancelIdleCallback(e)}}}),[_]),[g,_]};var r=n(67294),i=n(73447),a="undefined"!==typeof IntersectionObserver;var s=new Map},75820:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return H}});var o=n(67294),r=n(76507),i=n.n(r),a=n(25675),s=n(41664),l=n(85893),c=function(){return(0,l.jsxs)("div",{className:i().footer,children:[(0,l.jsxs)("div",{className:i().footer__download,children:[(0,l.jsxs)("div",{className:i().footer__download__left,children:[(0,l.jsx)("div",{className:i().footer__download__left__logo,children:(0,l.jsx)(a.default,{src:"/images/logo.png",alt:"Picture will load soon",height:"45px",width:"180px"})}),(0,l.jsx)("div",{className:i().footer__download__left__socialtray,children:(0,l.jsxs)("ul",{children:[(0,l.jsx)("li",{children:(0,l.jsx)(a.default,{src:"/icons/fire.svg",alt:"",height:"20px",width:"20px"})}),(0,l.jsx)("li",{children:(0,l.jsx)(a.default,{src:"/icons/fire.svg",alt:"",height:"20px",width:"20px"})}),(0,l.jsx)("li",{children:(0,l.jsx)(a.default,{src:"/icons/fire.svg",alt:"",height:"20px",width:"20px"})}),(0,l.jsx)("li",{children:(0,l.jsx)(a.default,{src:"/icons/fire.svg",alt:"",height:"20px",width:"20px"})}),(0,l.jsx)("li",{children:(0,l.jsx)(a.default,{src:"/icons/fire.svg",alt:"",height:"20px",width:"20px"})})]})})]}),(0,l.jsx)("div",{className:i().footer__download__center,children:(0,l.jsxs)("div",{className:i().footer__download__center__card,children:[(0,l.jsx)("h2",{children:"Download our App now!"}),(0,l.jsxs)("div",{className:i().footer__download__center__buttons,children:[(0,l.jsx)("div",{className:i().footer__download__center__buttons__left,children:(0,l.jsx)("span",{children:(0,l.jsx)("div",{className:i().btn,children:(0,l.jsx)(s.default,{href:"#",children:(0,l.jsx)("a",{children:(0,l.jsx)(a.default,{src:"/images/app-store@2x.png",alt:"banner Icon",height:"66px",width:"178px"})})})})})}),(0,l.jsx)("div",{className:i().footer__download__center__buttons__right,children:(0,l.jsx)("span",{children:(0,l.jsx)("div",{className:i().btn,children:(0,l.jsx)(s.default,{href:"#",children:(0,l.jsx)("a",{children:(0,l.jsx)(a.default,{src:"/images/app-store@2x.png",alt:"banner Icon",height:"66px",width:"178px"})})})})})})]})]})}),(0,l.jsx)("div",{className:i().footer__download__right,children:(0,l.jsxs)("ul",{children:[(0,l.jsx)("li",{children:"About Us"}),(0,l.jsx)("li",{children:"FAQ"}),(0,l.jsx)("li",{children:"Contact Us"}),(0,l.jsx)("li",{children:"Terms & Conditions"}),(0,l.jsx)("li",{children:"Privacy Policy"})]})})]}),(0,l.jsx)("div",{className:i().footer__bottom,children:(0,l.jsx)("p",{children:"Copywrite \xa9 2021 Blending 101"})})]})},d=n(96855),_=n(55720),u=n.n(_),g=n(72742),h=[{HeadingTop:"The Art and Science of the Blending101 way",TopHeadingImagePath:"/images/tab-image1.png",TopAltImageText:"",TopHeadingContent:"What if a pharmacist only used plant food to formulate prescriptions? What if a chef only used only blended plan food to create recipes? Now imagine if the chef an pharmacist collaborated equally vested in your culinar experience and health outcome.",TopElementList:[],HeadingBottom:"Simply maximize the quantity, variety and quality of plant foods in your diet",BottomHeadingImagePath:"/images/tab-image2.png",BottomAltImageText:"",BottomHeadingContent:"The Blending 101 way is not diet, it is a practice of overwhelming your body with nutritionally dense plant foods on a daily basis. Those that adopt the how, the why and the will of the Blending101 way are called Blendas",BottomElementList:["Overhaul your body from inside out addressing disease, conditions and weight loss","Dietary lifestyle agnostic. Welcome Vegan, Vegetarian, Keto, Paleo, Food Pyramid, etc.","Simplify your journey to next level health and taste experiences"]},{HeadingTop:"Fail proof Formula optimizes color, texture taste and temperature",TopHeadingImagePath:"/images/tab-image3.png",TopAltImageText:"",TopHeadingContent:"The blending formula guides you through 6 blend types and 12 ingredient category for exceptional CulinaryRX outcomes without reliance on recipes.",TopElementList:[],HeadingBottom:"Voice and Visual Discovery with AI powered recommendations",BottomHeadingImagePath:"/images/tab-image-4.png",BottomAltImageText:"",BottomHeadingContent:"Say it, See it, Type it. Discover over 20k recipes or create your own or curate from the web. One of a kind comparison capabilities. AI (Artificial Intelligence) personalizes recipes just for you.",BottomElementList:["Patent pending 3D recipe discovery with interactive visual search results","Compare recipes side by side formulating new recipes by dragging and dropping ingredients","Compare recipes side by side formulating new recipes by dragging and dropping ingredients"]},{HeadingTop:"Fail proof Formula optimizes color, texture taste and temperature",TopHeadingImagePath:"/images/tab-image5.png",TopAltImageText:"",TopHeadingContent:'You got questions? The Wiki got answers about blending plant ingredients, their nutrition and how disease, conditions and body systems are impacted. Answers also beautifully clarify the "Why" with data visualizations.',TopElementList:[],HeadingBottom:"Voice and Visual Discovery with AI powered recommendations",BottomHeadingImagePath:"/images/tab-image6.png",BottomAltImageText:"",BottomHeadingContent:"Say it, See it, Type it. Discover over 20k recipes or create your own or curate from the web. One of a kind comparison capabilities. AI (Artificial Intelligence) personalizes recipes just for you.",BottomElementList:["Personalized RDA (Recommend Daily Allowances) percentages based weight, sex and age","Rank ingredients by nutrient to make informed choices in formulating recipes","Driven by Intelligent algorithm and research back data"]},{HeadingTop:"Becoming a Habitual Blenda",TopHeadingImagePath:"/images/tab-image7.png",TopAltImageText:"",TopHeadingContent:"Blending 101 makes adopting the practice of blending much easier with coaching and planning tools",TopElementList:["30 Day Blending Challenge helps you visually track your consistency","Rank ingredients by nutrient to make informed choices in formulating recipes"],HeadingBottom:"Voice and Visual Discovery with AI powered recommendations",BottomHeadingImagePath:"/images/tab-image8.png",BottomAltImageText:"",BottomHeadingContent:"Say it, See it, Type it. Discover over 20k recipes or create your own or curate from the web. One of a kind comparison capabilities. AI (Artificial Intelligence) personalizes recipes just for you.",BottomElementList:["Bot provides recommendations and advice based on your personalization responses","Join topical webinars ranging from Blending for diabetes to blending valentines treats","Share and learn with other Blendas in social and onsite communities"]}],f=function(){var e=(0,o.useState)("The Way"),t=e[0],n=e[1],r=["The Way","The How","The Why","The Will"],i=h,s=function(){for(var e=0;e<r.length;e++){if(t===r[e])return i[e]}};return(0,l.jsxs)("div",{className:u().mainContainer,children:[(0,l.jsxs)("div",{className:u().toggler,children:[(0,l.jsx)("h2",{children:"What is Blending101 CulinaryRX?"}),(0,l.jsx)(d.Z,{childs:r,childColor:"#fff",tags:["Part 1","Part 2","Part 3","Part 4"],tagColor:"#fff",icons:["/icons/tab1.svg","/icons/tab2.svg","/icons/tab3.svg","/icons/tab4.svg"],value:t,setValue:n,style:void 0,lineCss:void 0})]}),(0,l.jsx)("div",{className:u().The__page,children:(0,l.jsxs)("div",{className:u().card,children:[(0,l.jsxs)("div",{className:u().card__top,children:[(0,l.jsx)("div",{className:u().Image,children:(0,l.jsx)(a.default,{src:s().TopHeadingImagePath,alt:s().TopAltImageText,layout:"fill",objectFit:"contain",quality:100,objectPosition:"top center"})}),(0,l.jsx)("div",{className:u().TextCard,children:(0,l.jsxs)("div",{className:u().container,children:[(0,l.jsx)("h2",{children:s().HeadingTop}),(0,l.jsx)("p",{children:s().TopHeadingContent}),(0,l.jsx)("ul",{className:u().list__with__ticks__top,children:s().TopElementList.map((function(e,t){return(0,l.jsx)("li",{children:e},t)}))}),(0,l.jsx)("div",{className:u().buttonDiv,children:(0,l.jsx)(g.Z,{type:"primary",fullWidth:!0,value:"Learn More",style:{height:"100%"}})})]})})]}),(0,l.jsxs)("div",{className:u().card__below,children:[(0,l.jsx)("div",{className:u().TextCard,children:(0,l.jsxs)("div",{className:u().container,children:[(0,l.jsx)("h2",{children:s().HeadingBottom}),(0,l.jsx)("p",{children:s().BottomHeadingContent}),(0,l.jsx)("ul",{className:u().list__with__ticks__below,children:s().BottomElementList.map((function(e,t){return(0,l.jsx)("li",{children:e},t)}))}),(0,l.jsx)("div",{className:u().buttonDiv,children:(0,l.jsx)(g.Z,{type:"primary",fullWidth:!0,value:"Learn More",style:{height:"100%"}})})]})}),(0,l.jsx)("div",{className:u().Image,children:(0,l.jsx)(a.default,{src:s().BottomHeadingImagePath,alt:s().BottomAltImageText,layout:"fill",objectFit:"contain",quality:100})})]})]})})]})},p=n(38543),m=n.n(p),x=n(21596),v=function(){return(0,l.jsx)("div",{className:m().mainDiv,children:(0,l.jsxs)("div",{className:m().content,children:[(0,l.jsx)("h2",{children:"Cras sed augue a quam pretium molestie"}),(0,l.jsx)("p",{children:"Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel scelerisque leo. Cras sed augue a quam pretium molestie."}),(0,l.jsxs)("li",{children:[(0,l.jsx)("span",{children:(0,l.jsx)(x.Z,{})})," ","Watch our Story"]})]})})},j=function(){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(f,{}),(0,l.jsx)(v,{}),(0,l.jsx)(c,{})]})},b=n(72166),y=n.n(b),w=function(){return(0,l.jsx)("div",{className:y().headerMain,children:(0,l.jsxs)("div",{className:y().headerContent,children:[(0,l.jsx)("div",{className:y().logo,children:(0,l.jsx)(a.default,{src:"/images/logo.png",alt:"logo",height:"52px",width:"180px",objectFit:"contain",layout:"responsive"})}),(0,l.jsx)("div",{className:y().rightOptionTray,children:(0,l.jsxs)("ul",{children:[(0,l.jsx)("li",{children:(0,l.jsxs)("div",{className:y().features,children:[(0,l.jsx)(s.default,{href:"#",children:(0,l.jsx)("a",{children:"Features"})}),(0,l.jsx)("div",{className:y().dropDown,children:(0,l.jsx)(a.default,{src:"/icons/dropdown.png",alt:"logo",objectFit:"contain",layout:"fill"})})]})}),(0,l.jsx)("li",{children:(0,l.jsx)("div",{className:y().login,children:(0,l.jsx)(s.default,{href:"/login",children:(0,l.jsx)("a",{children:(0,l.jsx)(g.Z,{type:"primary",style:{height:"100%"},fullWidth:!0,value:"Login"})})})})}),(0,l.jsx)("li",{children:(0,l.jsx)("div",{className:y().signUp,children:(0,l.jsx)(s.default,{href:"/signup",children:(0,l.jsx)("a",{children:(0,l.jsx)(g.Z,{type:"transparent",style:{border:"none"},fullWidth:!0,value:"Sign up"})})})})})]})})]})})},T=n(28716),N=n.n(T);var C=function(){return(0,l.jsx)("div",{className:N().mainDiv,children:(0,l.jsxs)("div",{className:N().contentCard,children:[(0,l.jsx)("h2",{children:"Your taste buds and health will never be the same!"}),(0,l.jsx)("p",{children:"Our blending formula and tools will empower you to combine plant based foods like chef and pharmacist. Blending CulinaryRX ensures exceptional culinary and health outcomes."}),(0,l.jsx)("div",{children:(0,l.jsx)(s.default,{href:"/login",children:(0,l.jsx)("a",{children:(0,l.jsx)(g.Z,{type:"primary",value:"Get Started",style:{height:"100%"},fullWidth:!0})})})})]})})},O=n(431),P=n.n(O),k=function(e){var t=e.children;return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:P().mainContainer,children:[(0,l.jsx)(w,{}),(0,l.jsx)(C,{})]}),(0,l.jsx)("div",{className:P().contentDiv,children:t})]})};var H=function(){return(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(k,{children:(0,l.jsx)(j,{})})})}},72742:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var o=n(92809),r=(n(67294),n(14384)),i=n.n(r),a=n(85893);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){(0,o.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e){var t=e.type,n=e.style,o=e.value,r=e.fullWidth,s=e.width,c=e.handleClick,d=void 0===c?function(){}:c,_=e.submit,u=void 0!==_&&_;return t=t||"text",n=n||{},r&&(n=l(l({},n),{},{width:"100%"})),s&&(n=l(l({},n),{},{width:s})),o=o||t,"primary"===t?(0,a.jsx)("button",{className:i().button+" "+i().primary,style:n,onClick:d,children:o}):"transparent"===t?(0,a.jsx)("button",{className:i().button+" "+i().transparent,style:n,onClick:d,type:u?"submit":"button",children:o}):"transparentHover"===t?(0,a.jsx)("button",{className:i().button+" "+i().transparent__hover,style:n,onClick:d,type:u?"submit":"button",children:o}):"border"===t?(0,a.jsx)("button",{className:i().border__button,style:n,onClick:d,type:u?"submit":"button",children:o}):(0,a.jsx)("button",{className:i().button,style:n,onClick:d,type:u?"submit":"button",children:o})}},96855:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var o=n(92809),r=(n(67294),n(36155)),i=n.n(r),a=n(85893);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){(0,o.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e){var t=e.childs,n=e.value,o=e.setValue,r=e.style,s=e.lineCss,c=e.childColor,d=e.icons,_=e.tags;e.tagColor;if(!t)return null;r=r||{};var u=t.length,g="".concat(100/u,"%");r=l(l({},r),{},{width:g}),s&&(r=l(l({},r),{},{borderRight:s})),c&&(r=l(l({},r),{},{color:c}));return(0,a.jsx)("div",{className:i().toggler,children:t&&t.map((function(e,t){return(0,a.jsx)("div",{style:r,onClick:function(){return t=e,void(o&&o(t));var t},className:n===e?i().toggler__main+" "+i().active:i().toggler__main,children:(0,a.jsxs)("div",{className:i().children,children:[d&&d[t]&&(0,a.jsx)("div",{className:i().toggler__left,children:(0,a.jsx)("img",{src:"".concat(d[t]),alt:d[t]})}),(0,a.jsxs)("div",{className:i().toggler__right,children:[_&&_[t]&&(0,a.jsx)("p",{children:_[t]}),(0,a.jsx)("p",{children:e})]})]})},e+t)}))})}},7855:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/front-page",function(){return n(75820)}])},76507:function(e){e.exports={footer:"landingFooter_footer__mYfom",footer__download:"landingFooter_footer__download__1mW5y",footer__download__left:"landingFooter_footer__download__left__3rifY",footer__download__left__logo:"landingFooter_footer__download__left__logo__FBr22",footer__download__left__socialtray:"landingFooter_footer__download__left__socialtray__1OakT",footer__download__center:"landingFooter_footer__download__center__1ggxf",footer__download__center__card:"landingFooter_footer__download__center__card__1QGnG",footer__download__center__buttons:"landingFooter_footer__download__center__buttons__VlMJv",footer__download__center__buttons__left:"landingFooter_footer__download__center__buttons__left__1Dk2D",footer__download__center__buttons__right:"landingFooter_footer__download__center__buttons__right__lwp8a",footer__download__right:"landingFooter_footer__download__right__2O9e2",footer__bottom:"landingFooter_footer__bottom__1pHk-"}},38543:function(e){e.exports={mainDiv:"toStoryCard_mainDiv__3ObYg",content:"toStoryCard_content__2zChJ"}},55720:function(e){e.exports={mainContainer:"toggleScreens_mainContainer__1DvYD",toggler:"toggleScreens_toggler__1tRpa",The__page:"toggleScreens_The__page__dT4EG",card:"toggleScreens_card__3NGk6",card__top:"toggleScreens_card__top__xAcQy",Image:"toggleScreens_Image__1zcgj",TextCard:"toggleScreens_TextCard__KMSFo",container:"toggleScreens_container__1rN3s",buttonDiv:"toggleScreens_buttonDiv__2NSDF",card__below:"toggleScreens_card__below__3OUCu",list__with__ticks__top:"toggleScreens_list__with__ticks__top__1M7BL",list__with__ticks__below:"toggleScreens_list__with__ticks__below__3fzTZ"}},72166:function(e){e.exports={headerMain:"FrontPageHeader_headerMain__11vBW",headerContent:"FrontPageHeader_headerContent__20g2V",logo:"FrontPageHeader_logo__1wjHi",rightOptionTray:"FrontPageHeader_rightOptionTray__3UokX",features:"FrontPageHeader_features__3ni6o",dropDown:"FrontPageHeader_dropDown__knCdT",login:"FrontPageHeader_login__1g-QS",signUp:"FrontPageHeader_signUp__3rJrT"}},431:function(e){e.exports={mainContainer:"Front_mainContainer__2_QbS",contentDiv:"Front_contentDiv__3olhU"}},28716:function(e){e.exports={mainDiv:"frontbanner_mainDiv__lcVhN",contentCard:"frontbanner_contentCard__2iV8_"}},14384:function(e){e.exports={button:"button_button__Ac6Hi",primary:"button_primary__2v3at",transparent:"button_transparent__1ZAsL",transparent__hover:"button_transparent__hover__1Em8f",border__button:"button_border__button__2RFSW"}},36155:function(e){e.exports={toggler:"toggler_toggler__1M4pL",toggler__main:"toggler_toggler__main__17Nnu",children:"toggler_children__2LW23",toggler__left:"toggler_toggler__left__2uMPj",toggler__right:"toggler_toggler__right__1XI5c",active:"toggler_active__U8FWe"}},41664:function(e,t,n){e.exports=n(92167)}},function(e){e.O(0,[772,675,774,888,179],(function(){return t=7855,e(e.s=t);var t}));var t=e.O();_N_E=t}]);