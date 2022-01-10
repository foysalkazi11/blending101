exports.id = 6335;
exports.ids = [6335];
exports.modules = {

/***/ 87094:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(591333);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);

const CREATE_NEW_USER = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
  mutation Mutation($data: NewUserInput!) {
    createNewUser(data: $data) {
      _id
      bio
      yourBlender
      provider
      displayName
      firstName
      orderHistoty
      lastName
      email
      location
      myCart
      recentViewedProducts
      image
      createdAt
      configuration {
        _id
        gender
        weight
        age
        height
        activity
        dieteryLifeStyle
        allergies
        preExistingMedicalConditions
        meditcation
        whyBlending
      }
    }
  }
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CREATE_NEW_USER);

/***/ }),

/***/ 836931:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: ./node_modules/redux/lib/redux.js
var redux = __webpack_require__(535281);
// EXTERNAL MODULE: ./redux/slices/sideTraySlice.ts
var sideTraySlice = __webpack_require__(331024);
// EXTERNAL MODULE: ./redux/slices/userSlice.ts
var userSlice = __webpack_require__(436958);
// EXTERNAL MODULE: ./redux/slices/utilitySlice.ts
var utilitySlice = __webpack_require__(487425);
// EXTERNAL MODULE: ./redux/edit_recipe/quantity.ts
var quantity = __webpack_require__(936617);
;// CONCATENATED MODULE: ./redux/rootReducer.ts
 // import userReducer from "./users/user.reducer";





const rootReducer = (0,redux.combineReducers)({
  user: userSlice/* default */.ZP,
  sideTray: sideTraySlice/* default */.ZP,
  utility: utilitySlice/* default */.ZP,
  quantityAdjuster: quantity/* default */.ZP
}); // export type RootState = ReturnType<typeof rootReducer>;

/* harmony default export */ const redux_rootReducer = (rootReducer);
// EXTERNAL MODULE: ./node_modules/@reduxjs/toolkit/dist/redux-toolkit.cjs.production.min.js
var redux_toolkit_cjs_production_min = __webpack_require__(947389);
;// CONCATENATED MODULE: ./redux/store.ts


const store = (0,redux_toolkit_cjs_production_min.configureStore)({
  reducer: redux_rootReducer // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([thunk,promiseMiddleware]),

}); // Infer the `RootState` and `AppDispatch` types from the store itself
// EXTERNAL MODULE: ./node_modules/react-redux/lib/index.js
var lib = __webpack_require__(837424);
// EXTERNAL MODULE: ./auth/auth.component.jsx
var auth_component = __webpack_require__(844768);
// EXTERNAL MODULE: ./node_modules/aws-amplify/lib/index.js
var aws_amplify_lib = __webpack_require__(131650);
var aws_amplify_lib_default = /*#__PURE__*/__webpack_require__.n(aws_amplify_lib);
;// CONCATENATED MODULE: ./configs/aws.ts
const awsConfig = {
  aws_project_region: "us-east-1",
  // REGION
  aws_cognito_region: "us-east-1",
  // REGION
  aws_user_pools_id: "us-east-1_4715wq6ef",
  // ENTER YOUR USER POOL ID
  aws_user_pools_web_client_id: "1qef45v3tsmqlt0v7kmarj9dii",
  // ENTER YOUR CLIENT ID
  oauth: {
    domain: "blending-test-pool.auth.us-east-1.amazoncognito.com",
    // ENTER COGNITO DOMAIN LIKE: eru-test-pool.auth.eu-west-1.amazoncognito.com
    scope: ["phone", "email", "openid", "profile"],
    redirectSignIn: "https://duacpw47bhqi1.cloudfront.net/login",
    // ENTER YOUR SITE (enter http://localhost:8000 if testing frontend locally)
    redirectSignOut: "https://duacpw47bhqi1.cloudfront.net/login",
    // ENTER YOUR SITE (enter http://localhost:8000 if testing frontend locally)
    responseType: "token"
  },
  federationTarget: "COGNITO_USER_POOLS"
};
/* harmony default export */ const aws = (awsConfig);
// EXTERNAL MODULE: ./theme/loader/Loader.tsx
var Loader = __webpack_require__(131338);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/index.js
var dist = __webpack_require__(403966);
// EXTERNAL MODULE: ./node_modules/react-toastify/dist/ReactToastify.css
var ReactToastify = __webpack_require__(588819);
// EXTERNAL MODULE: ./node_modules/@apollo/client/main.cjs
var main = __webpack_require__(591333);
;// CONCATENATED MODULE: ./gqlLib/client.ts

const client = new main.ApolloClient({
  uri: "https://blendinguser.herokuapp.com/graphql",
  cache: new main.InMemoryCache()
});
/* harmony default export */ const gqlLib_client = (client);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(785893);
;// CONCATENATED MODULE: ./pages/_app.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





 // import "../styles/globalStyle.scss";












aws_amplify_lib_default().configure(aws);

function MyApp({
  Component,
  pageProps
}) {
  return /*#__PURE__*/jsx_runtime.jsx(jsx_runtime.Fragment, {
    children: /*#__PURE__*/jsx_runtime.jsx(main.ApolloProvider, {
      client: gqlLib_client,
      children: /*#__PURE__*/jsx_runtime.jsx(lib.Provider, {
        store: store,
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)(auth_component/* default */.Z, {
          children: [/*#__PURE__*/jsx_runtime.jsx(Loader/* default */.Z, {}), /*#__PURE__*/jsx_runtime.jsx(dist.ToastContainer, {}), /*#__PURE__*/jsx_runtime.jsx(Component, _objectSpread({}, pageProps))]
        })
      })
    })
  });
}

/* harmony default export */ const _app = (MyApp);

/***/ }),

/***/ 429927:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "T": () => (/* binding */ useAppDispatch),
/* harmony export */   "C": () => (/* binding */ useAppSelector)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(837424);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useAppDispatch = () => (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useDispatch)();
const useAppSelector = react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector;

/***/ }),

/***/ 377049:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "n": () => (/* binding */ setActiveUser)
/* harmony export */ });
const setActiveUser = value => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      payload: value
    });
  };
};

/***/ }),

/***/ 131338:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _Loader_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(317061);
/* harmony import */ var _Loader_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Loader_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _redux_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(429927);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(785893);







const Loader = props => {
  const {
    loading
  } = (0,_redux_hooks__WEBPACK_IMPORTED_MODULE_1__/* .useAppSelector */ .C)(state => state === null || state === void 0 ? void 0 : state.utility);
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: loading || props !== null && props !== void 0 && props.active ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
      className: (_Loader_module_scss__WEBPACK_IMPORTED_MODULE_3___default().preloader),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("svg", {
        width: "200",
        height: "200",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid",
        className: "lds-ripple" // style="background:0 0"
        ,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("circle", {
          cx: "50",
          cy: "50",
          r: "4.719",
          fill: "none",
          stroke: "#1d3f72",
          strokeWidth: "2",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("animate", {
            attributeName: "r",
            calcMode: "spline",
            values: "0;40",
            keyTimes: "0;1",
            dur: "3",
            keySplines: "0 0.2 0.8 1",
            begin: "-1.5s",
            repeatCount: "indefinite"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("animate", {
            attributeName: "opacity",
            calcMode: "spline",
            values: "1;0",
            keyTimes: "0;1",
            dur: "3",
            keySplines: "0.2 0 0.8 1",
            begin: "-1.5s",
            repeatCount: "indefinite"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("circle", {
          cx: "50",
          cy: "50",
          r: "27.591",
          fill: "none",
          stroke: "#5699d2",
          strokeWidth: "2",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("animate", {
            attributeName: "r",
            calcMode: "spline",
            values: "0;40",
            keyTimes: "0;1",
            dur: "3",
            keySplines: "0 0.2 0.8 1",
            begin: "0s",
            repeatCount: "indefinite"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("animate", {
            attributeName: "opacity",
            calcMode: "spline",
            values: "1;0",
            keyTimes: "0;1",
            dur: "3",
            keySplines: "0.2 0 0.8 1",
            begin: "0s",
            repeatCount: "indefinite"
          })]
        })]
      })
    }) : null
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);

/***/ }),

/***/ 317061:
/***/ ((module) => {

// Exports
module.exports = {
	"preloader": "Loader_preloader__jTUKa",
	"page-content": "Loader_page-content__5IZJg"
};


/***/ }),

/***/ 659521:
/***/ ((module) => {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 659521;
module.exports = webpackEmptyContext;

/***/ }),

/***/ 472431:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 297020:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"polyfillFiles":["static/chunks/polyfills-a40ef1678bae11e696dba45124eadd70.js"],"devFiles":[],"ampDevFiles":[],"lowPriorityFiles":["static/25TFxk67A3F1jgp-NKPrF/_buildManifest.js","static/25TFxk67A3F1jgp-NKPrF/_ssgManifest.js"],"pages":{"/":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/0c428ae2-e1d15d1b6d0674340f46.js","static/chunks/252f366e-8c1b4529592df62e7e0c.js","static/chunks/1bfc9850-a883187b1d2417e7cb6a.js","static/chunks/a9a7754c-4de56c1e23c0e5721802.js","static/chunks/d64684d8-54e53822c8f48f58dfa5.js","static/chunks/d7eeaac4-9ff2aa7f11e7ddd89f4f.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/340-73f454b58cc963f0360c.js","static/chunks/5675-22e936f3a6d544327413.js","static/chunks/6893-a32a387bb446cc8e80d9.js","static/chunks/5127-02391cb0e1c38c849960.js","static/chunks/293-c36d7670b107801b07fa.js","static/css/5d9da097caec397ef268.css","static/chunks/2157-571631c1de880656f48e.js","static/chunks/597-a9609ac8aa44a32a6e70.js","static/css/75c9f4ebef3755a21660.css","static/chunks/4101-193e1688be84ccc42cad.js","static/chunks/pages/index-a39225b97fcec3067226.js"],"/_app":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/css/b10057a6a357697a8f82.css","static/chunks/pages/_app-41d3a1afb5846a7940ab.js"],"/_error":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/pages/_error-cd3a4dcc303cc09fa80f.js"],"/component":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/0c428ae2-e1d15d1b6d0674340f46.js","static/chunks/bee240a3-2329e88ec3d570b57c8e.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/6893-a32a387bb446cc8e80d9.js","static/chunks/5127-02391cb0e1c38c849960.js","static/chunks/1243-4aba86e9f89bcd2b9c26.js","static/chunks/977-785348f896f082051da6.js","static/chunks/7704-8f1ff738d322ce8147ef.js","static/css/3286796a4f8aa29338c3.css","static/chunks/pages/component-635270e1530b045612b1.js"],"/edit_recipe":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/0c428ae2-e1d15d1b6d0674340f46.js","static/chunks/252f366e-8c1b4529592df62e7e0c.js","static/chunks/1bfc9850-a883187b1d2417e7cb6a.js","static/chunks/a9a7754c-4de56c1e23c0e5721802.js","static/chunks/d64684d8-54e53822c8f48f58dfa5.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/340-73f454b58cc963f0360c.js","static/chunks/5675-22e936f3a6d544327413.js","static/chunks/6893-a32a387bb446cc8e80d9.js","static/chunks/1243-4aba86e9f89bcd2b9c26.js","static/chunks/977-785348f896f082051da6.js","static/css/5d9da097caec397ef268.css","static/chunks/2157-571631c1de880656f48e.js","static/css/ee57f26d7a5f81940682.css","static/chunks/pages/edit_recipe-28aec07c4dd64fffecfa.js"],"/forget_password":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/5675-22e936f3a6d544327413.js","static/chunks/1936-c7e78f486aa9094f9d7a.js","static/css/390c8de755afbad2cd98.css","static/chunks/8738-c3415eeac827e82be3a9.js","static/chunks/pages/forget_password-f2b050132b51370960bb.js"],"/front-page":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/5675-22e936f3a6d544327413.js","static/css/d69185482d0e05ce3e68.css","static/chunks/pages/front-page-1c95b9f5df803d235c2a.js"],"/help":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/0c428ae2-e1d15d1b6d0674340f46.js","static/chunks/252f366e-8c1b4529592df62e7e0c.js","static/chunks/1bfc9850-a883187b1d2417e7cb6a.js","static/chunks/a9a7754c-4de56c1e23c0e5721802.js","static/chunks/d64684d8-54e53822c8f48f58dfa5.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/340-73f454b58cc963f0360c.js","static/css/5d9da097caec397ef268.css","static/chunks/2157-571631c1de880656f48e.js","static/css/3bb51b9d1cf439ce9741.css","static/chunks/pages/help-3300f1b9f7b2bdeadf8b.js"],"/login":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/5675-22e936f3a6d544327413.js","static/chunks/1936-c7e78f486aa9094f9d7a.js","static/css/390c8de755afbad2cd98.css","static/chunks/8738-c3415eeac827e82be3a9.js","static/chunks/pages/login-2a25cb8f3e52c1d5f974.js"],"/membership":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/5675-22e936f3a6d544327413.js","static/css/90d080a8273e5a84c345.css","static/chunks/pages/membership-408e227456885dcaa957.js"],"/parts":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/0c428ae2-e1d15d1b6d0674340f46.js","static/chunks/252f366e-8c1b4529592df62e7e0c.js","static/chunks/1bfc9850-a883187b1d2417e7cb6a.js","static/chunks/a9a7754c-4de56c1e23c0e5721802.js","static/chunks/d64684d8-54e53822c8f48f58dfa5.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/340-73f454b58cc963f0360c.js","static/css/5d9da097caec397ef268.css","static/chunks/2157-571631c1de880656f48e.js","static/chunks/pages/parts-9e319c2888a0be37c956.js"],"/recipe":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/pages/recipe-76de7dc8179d18f95745.js"],"/recipe/compare":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/0c428ae2-e1d15d1b6d0674340f46.js","static/chunks/252f366e-8c1b4529592df62e7e0c.js","static/chunks/1bfc9850-a883187b1d2417e7cb6a.js","static/chunks/a9a7754c-4de56c1e23c0e5721802.js","static/chunks/d64684d8-54e53822c8f48f58dfa5.js","static/chunks/bee240a3-2329e88ec3d570b57c8e.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/340-73f454b58cc963f0360c.js","static/chunks/6893-a32a387bb446cc8e80d9.js","static/chunks/5127-02391cb0e1c38c849960.js","static/chunks/1243-4aba86e9f89bcd2b9c26.js","static/css/5d9da097caec397ef268.css","static/chunks/2157-571631c1de880656f48e.js","static/chunks/7704-8f1ff738d322ce8147ef.js","static/chunks/8931-3ae3503d2eb81405ee49.js","static/css/918a510299a02cad8529.css","static/chunks/pages/recipe/compare-0efdff154c24af40a048.js"],"/recipe/formulate":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/0c428ae2-e1d15d1b6d0674340f46.js","static/chunks/252f366e-8c1b4529592df62e7e0c.js","static/chunks/1bfc9850-a883187b1d2417e7cb6a.js","static/chunks/a9a7754c-4de56c1e23c0e5721802.js","static/chunks/d64684d8-54e53822c8f48f58dfa5.js","static/chunks/bee240a3-2329e88ec3d570b57c8e.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/340-73f454b58cc963f0360c.js","static/chunks/6893-a32a387bb446cc8e80d9.js","static/chunks/5127-02391cb0e1c38c849960.js","static/chunks/1243-4aba86e9f89bcd2b9c26.js","static/chunks/3760-b1dc5b48db32b68c6a24.js","static/css/5d9da097caec397ef268.css","static/chunks/2157-571631c1de880656f48e.js","static/chunks/7704-8f1ff738d322ce8147ef.js","static/chunks/8931-3ae3503d2eb81405ee49.js","static/css/663d6f3189931588432e.css","static/chunks/pages/recipe/formulate-1fdd574d307f9edeab08.js"],"/recipe_details":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/0c428ae2-e1d15d1b6d0674340f46.js","static/chunks/252f366e-8c1b4529592df62e7e0c.js","static/chunks/1bfc9850-a883187b1d2417e7cb6a.js","static/chunks/a9a7754c-4de56c1e23c0e5721802.js","static/chunks/d64684d8-54e53822c8f48f58dfa5.js","static/chunks/1a48c3c1-c2ffcd8d3390663c7be2.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/340-73f454b58cc963f0360c.js","static/chunks/6893-a32a387bb446cc8e80d9.js","static/chunks/5127-02391cb0e1c38c849960.js","static/chunks/1243-4aba86e9f89bcd2b9c26.js","static/chunks/3760-b1dc5b48db32b68c6a24.js","static/css/5d9da097caec397ef268.css","static/chunks/2157-571631c1de880656f48e.js","static/css/d1c72d82bffcc940ef85.css","static/chunks/pages/recipe_details-9fcd93b3281c2c00d3fe.js"],"/recipe_discovery":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/0c428ae2-e1d15d1b6d0674340f46.js","static/chunks/252f366e-8c1b4529592df62e7e0c.js","static/chunks/1bfc9850-a883187b1d2417e7cb6a.js","static/chunks/a9a7754c-4de56c1e23c0e5721802.js","static/chunks/d64684d8-54e53822c8f48f58dfa5.js","static/chunks/d7eeaac4-9ff2aa7f11e7ddd89f4f.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/340-73f454b58cc963f0360c.js","static/chunks/5675-22e936f3a6d544327413.js","static/chunks/6893-a32a387bb446cc8e80d9.js","static/chunks/5127-02391cb0e1c38c849960.js","static/chunks/293-c36d7670b107801b07fa.js","static/css/5d9da097caec397ef268.css","static/chunks/2157-571631c1de880656f48e.js","static/chunks/597-a9609ac8aa44a32a6e70.js","static/css/75c9f4ebef3755a21660.css","static/chunks/4101-193e1688be84ccc42cad.js","static/chunks/pages/recipe_discovery-3d98fd430d1c60e8e126.js"],"/reset_password":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/5675-22e936f3a6d544327413.js","static/chunks/1936-c7e78f486aa9094f9d7a.js","static/css/390c8de755afbad2cd98.css","static/chunks/8738-c3415eeac827e82be3a9.js","static/chunks/pages/reset_password-a3c44bdc8dd2cc98e24b.js"],"/search-filters":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/0c428ae2-e1d15d1b6d0674340f46.js","static/chunks/252f366e-8c1b4529592df62e7e0c.js","static/chunks/1bfc9850-a883187b1d2417e7cb6a.js","static/chunks/a9a7754c-4de56c1e23c0e5721802.js","static/chunks/d64684d8-54e53822c8f48f58dfa5.js","static/chunks/d7eeaac4-9ff2aa7f11e7ddd89f4f.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/340-73f454b58cc963f0360c.js","static/chunks/5675-22e936f3a6d544327413.js","static/chunks/6893-a32a387bb446cc8e80d9.js","static/chunks/293-c36d7670b107801b07fa.js","static/css/5d9da097caec397ef268.css","static/chunks/2157-571631c1de880656f48e.js","static/chunks/597-a9609ac8aa44a32a6e70.js","static/css/6a6abc369da2f2c2557f.css","static/chunks/pages/search-filters-b64274116a482b8daf72.js"],"/signup":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/5675-22e936f3a6d544327413.js","static/chunks/1936-c7e78f486aa9094f9d7a.js","static/css/390c8de755afbad2cd98.css","static/chunks/8738-c3415eeac827e82be3a9.js","static/chunks/pages/signup-bf8cc8a440a0aa4fb68b.js"],"/theme":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/0c428ae2-e1d15d1b6d0674340f46.js","static/chunks/252f366e-8c1b4529592df62e7e0c.js","static/chunks/1bfc9850-a883187b1d2417e7cb6a.js","static/chunks/a9a7754c-4de56c1e23c0e5721802.js","static/chunks/d64684d8-54e53822c8f48f58dfa5.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/340-73f454b58cc963f0360c.js","static/css/5d9da097caec397ef268.css","static/chunks/2157-571631c1de880656f48e.js","static/css/06e40e13ca1f24261e00.css","static/chunks/pages/theme-efd64cd571f287c03ff3.js"],"/user":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/0c428ae2-e1d15d1b6d0674340f46.js","static/chunks/252f366e-8c1b4529592df62e7e0c.js","static/chunks/1bfc9850-a883187b1d2417e7cb6a.js","static/chunks/a9a7754c-4de56c1e23c0e5721802.js","static/chunks/d64684d8-54e53822c8f48f58dfa5.js","static/chunks/d7eeaac4-9ff2aa7f11e7ddd89f4f.js","static/chunks/1a48c3c1-c2ffcd8d3390663c7be2.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/340-73f454b58cc963f0360c.js","static/chunks/6893-a32a387bb446cc8e80d9.js","static/chunks/3760-b1dc5b48db32b68c6a24.js","static/chunks/3483-c3ba5d8ece58a88836d3.js","static/css/5d9da097caec397ef268.css","static/chunks/2157-571631c1de880656f48e.js","static/css/a3503fec4e6f8dd28fdd.css","static/chunks/pages/user-839c8d85d7f9a79e9e35.js"],"/user/profile":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/0c428ae2-e1d15d1b6d0674340f46.js","static/chunks/252f366e-8c1b4529592df62e7e0c.js","static/chunks/1bfc9850-a883187b1d2417e7cb6a.js","static/chunks/a9a7754c-4de56c1e23c0e5721802.js","static/chunks/d64684d8-54e53822c8f48f58dfa5.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/340-73f454b58cc963f0360c.js","static/chunks/3760-b1dc5b48db32b68c6a24.js","static/css/5d9da097caec397ef268.css","static/chunks/2157-571631c1de880656f48e.js","static/css/3b35f59d7593b0fcfc28.css","static/chunks/pages/user/profile-cd80e4266a295d8f82a0.js"],"/varify_email":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/css/bae560ca17b0d4e4817f.css","static/chunks/pages/varify_email-578965cf93710090ee72.js"],"/wiki":["static/chunks/webpack-f01b3c98a5f9e81a3719.js","static/chunks/framework-106d25c2ed81dc45938c.js","static/chunks/main-fec77811ed7acce600a4.js","static/chunks/0c428ae2-e1d15d1b6d0674340f46.js","static/chunks/252f366e-8c1b4529592df62e7e0c.js","static/chunks/1bfc9850-a883187b1d2417e7cb6a.js","static/chunks/a9a7754c-4de56c1e23c0e5721802.js","static/chunks/d64684d8-54e53822c8f48f58dfa5.js","static/chunks/5772-cc374004f771fc0e30e7.js","static/chunks/340-73f454b58cc963f0360c.js","static/chunks/5675-22e936f3a6d544327413.js","static/css/5d9da097caec397ef268.css","static/chunks/2157-571631c1de880656f48e.js","static/css/a43f696e58d8ddb38a71.css","static/chunks/pages/wiki-8d14e40e1eab24f84e4b.js"]},"ampFirstPages":[]}');

/***/ }),

/***/ 973978:
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ 659450:
/***/ ((module) => {

"use strict";
module.exports = {"Dg":[]};

/***/ })

};
;