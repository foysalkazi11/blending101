exports.id = 2742;
exports.ids = [2742];
exports.modules = {

/***/ 72742:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ ButtonComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _button_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(546040);
/* harmony import */ var _button_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_button_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(785893);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function ButtonComponent({
  type,
  style,
  value,
  fullWidth,
  width,
  handleClick = () => {},
  submit = false
}) {
  // STEP 1: INITIALIZE PROPS TO AVOID UI FALL
  type = type || "text";
  style = style || {};
  if (fullWidth) style = _objectSpread(_objectSpread({}, style), {}, {
    width: "100%"
  });
  if (width) style = _objectSpread(_objectSpread({}, style), {}, {
    width: width
  });
  value = value || type; // CASE PRIMARY: IF TYPE IS PRIMARY RETURN PRIMARY BUTTON

  if (type === "primary") return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("button", {
    className: (_button_module_scss__WEBPACK_IMPORTED_MODULE_2___default().button) + " " + (_button_module_scss__WEBPACK_IMPORTED_MODULE_2___default().primary),
    style: style,
    onClick: handleClick,
    children: value
  }); // CASE TRANSPARENT: RETURN TRANSPARENT BUTTON

  if (type === "transparent") return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("button", {
    className: (_button_module_scss__WEBPACK_IMPORTED_MODULE_2___default().button) + " " + (_button_module_scss__WEBPACK_IMPORTED_MODULE_2___default().transparent),
    style: style,
    onClick: handleClick,
    type: submit ? "submit" : "button",
    children: value
  });
  if (type === "transparentHover") return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("button", {
    className: (_button_module_scss__WEBPACK_IMPORTED_MODULE_2___default().button) + " " + (_button_module_scss__WEBPACK_IMPORTED_MODULE_2___default().transparent__hover),
    style: style,
    onClick: handleClick,
    type: submit ? "submit" : "button",
    children: value
  });
  if (type === "border") return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("button", {
    className: (_button_module_scss__WEBPACK_IMPORTED_MODULE_2___default().border__button),
    style: style,
    onClick: handleClick,
    type: submit ? "submit" : "button",
    children: value
  }); // CASE DEFAULT: RETURN WHITE BUTTON

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("button", {
    className: (_button_module_scss__WEBPACK_IMPORTED_MODULE_2___default().button),
    style: style,
    onClick: handleClick,
    type: submit ? "submit" : "button",
    children: value
  });
}

/***/ }),

/***/ 546040:
/***/ ((module) => {

// Exports
module.exports = {
	"button": "button_button__Ac6Hi",
	"primary": "button_primary__2v3at",
	"transparent": "button_transparent__1ZAsL",
	"transparent__hover": "button_transparent__hover__1Em8f",
	"border__button": "button_border__button__2RFSW"
};


/***/ })

};
;