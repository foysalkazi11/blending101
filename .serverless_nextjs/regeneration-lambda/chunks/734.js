"use strict";
exports.id = 734;
exports.ids = [734];
exports.modules = {

/***/ 609849:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(403966);
 // type notificationProps = {
//   type?: string;
//   content?: string;
//   position?: string;
//   autoClose?: number;
//   hideProgressBar?: boolean;
//   closeOnClick?: boolean;
//   pauseOnHover?: boolean;
//   draggable?: boolean;
//   progress?: boolean | undefined;
// };

const notification = (type = "", content = "", position = "top-right", autoClose = 5000, hideProgressBar = false, closeOnClick = true, pauseOnHover = true, draggable = true, progress = undefined) => {
  if (type === "success") {
    return react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.success(content, {
      //@ts-ignore
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress
    });
  }

  if (type === "error") {
    return react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.error(content, {
      //@ts-ignore
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress
    });
  }

  if (type === "info") {
    return react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.info(content, {
      //@ts-ignore
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress
    });
  }

  if (type === "warning") {
    return react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.warning(content, {
      //@ts-ignore
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress
    });
  }

  return react_toastify__WEBPACK_IMPORTED_MODULE_0__.toast.default(content, {
    //@ts-ignore
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (notification);

/***/ }),

/***/ 487425:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K4": () => (/* binding */ setLoading),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export utilitySlice */
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