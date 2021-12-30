exports.id = 6252;
exports.ids = [6252];
exports.modules = {

/***/ 506252:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ InputField)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _inputField_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(932798);
/* harmony import */ var _inputField_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_inputField_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_icons_material_VisibilityOff__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(472450);
/* harmony import */ var _mui_icons_material_Visibility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(622961);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(785893);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







function InputField({
  type,
  value,
  setValue,
  placeholder,
  style,
  fullWidth,
  width
}) {
  // STATE FOR INPUT FEILDS
  const {
    0: text,
    1: setText
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""); //STATE HANDLING FOR PASSWORD VISIBILITY

  const {
    0: passVisibility,
    1: visibilityState
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  const visiToggle = () => {
    visibilityState(!passVisibility);
  };

  type = type || "";
  value = value || text;
  placeholder = placeholder || `${type[0].toUpperCase()}${type.slice(1)}`;

  if (fullWidth) {
    style = _objectSpread(_objectSpread({}, style), {}, {
      width: "100%"
    });
  } else {
    if (width) style = _objectSpread(_objectSpread({}, style), {}, {
      width: width.toString()
    });
    console.log(width);
  } // Change value and return it


  const onChange = e => {
    const val = e.target.value;

    if (setValue) {
      setValue(val);
    } else {
      setText(val);
    }
  }; //Type Of Feild Needed {text,password,email}


  if (type === "text") {
    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
      className: (_inputField_module_scss__WEBPACK_IMPORTED_MODULE_2___default().input),
      type: type,
      style: style,
      placeholder: placeholder,
      value: value,
      onChange: onChange
    });
  }

  if (type === "password") {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: (_inputField_module_scss__WEBPACK_IMPORTED_MODULE_2___default().passwordDiv),
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        className: (_inputField_module_scss__WEBPACK_IMPORTED_MODULE_2___default().input),
        type: passVisibility ? "text" : type,
        style: style,
        placeholder: placeholder,
        value: value,
        onChange: onChange
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("span", {
        className: (_inputField_module_scss__WEBPACK_IMPORTED_MODULE_2___default().visiIconDiv),
        onClick: visiToggle,
        children: passVisibility ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(_mui_icons_material_VisibilityOff__WEBPACK_IMPORTED_MODULE_3__.default, {}) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(_mui_icons_material_Visibility__WEBPACK_IMPORTED_MODULE_4__.default, {})
      })]
    });
  } else {
    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
      className: (_inputField_module_scss__WEBPACK_IMPORTED_MODULE_2___default().input),
      type: type,
      style: style,
      placeholder: placeholder,
      value: value,
      onChange: onChange
    });
  }
}

/***/ }),

/***/ 932798:
/***/ ((module) => {

// Exports
module.exports = {
	"input": "inputField_input__BskMO",
	"passwordDiv": "inputField_passwordDiv__3-DPK",
	"visiIconDiv": "inputField_visiIconDiv__225Pm"
};


/***/ })

};
;