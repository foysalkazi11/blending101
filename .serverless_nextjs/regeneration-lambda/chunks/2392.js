"use strict";
exports.id = 2392;
exports.ids = [2392];
exports.modules = {

/***/ 436958:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "av": () => (/* binding */ setUser),
/* harmony export */   "LL": () => (/* binding */ setDbUser),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports userSlice, setNonConfirmedUser, setProvider */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(947389);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
  nonConfirmedUser: "",
  user: null,
  dbUser: {},
  provider: "email"
};
const userSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action === null || action === void 0 ? void 0 : action.payload;
    },
    setNonConfirmedUser: (state, action) => {
      state.nonConfirmedUser = action === null || action === void 0 ? void 0 : action.payload;
    },
    setDbUser: (state, action) => {
      state.dbUser = action === null || action === void 0 ? void 0 : action.payload;
    },
    setProvider: (state, action) => {
      state.provider = action === null || action === void 0 ? void 0 : action.payload;
    }
  }
});
const {
  setNonConfirmedUser,
  setUser,
  setDbUser,
  setProvider
} = userSlice === null || userSlice === void 0 ? void 0 : userSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userSlice === null || userSlice === void 0 ? void 0 : userSlice.reducer);

/***/ }),

/***/ 487425:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports utilitySlice, setLoading */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(947389);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
  loading: false
};
const utilitySlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
  name: "utility",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action === null || action === void 0 ? void 0 : action.payload;
    }
  }
});
const {
  setLoading
} = utilitySlice === null || utilitySlice === void 0 ? void 0 : utilitySlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (utilitySlice === null || utilitySlice === void 0 ? void 0 : utilitySlice.reducer);

/***/ })

};
;