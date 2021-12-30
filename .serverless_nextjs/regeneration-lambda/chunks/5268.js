exports.id = 5268;
exports.ids = [5268];
exports.modules = {

/***/ 683044:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ InputComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _input_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(619988);
/* harmony import */ var _input_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_input_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(785893);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




function InputComponent({
  type,
  style,
  value,
  setValue,
  placeholder,
  textarea,
  fullWidth,
  maxWidth,
  fieldName
}) {
  const {
    0: text,
    1: setText
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(""); // STEP 1: INITIALIZE PROPS TO AVOID UI FALL

  type = type || "text";
  style = style || {};
  if (fullWidth) style = _objectSpread(_objectSpread({}, style), {}, {
    width: "100%"
  });
  if (maxWidth) style = _objectSpread(_objectSpread({}, style), {}, {
    maxWidth: maxWidth
  });
  value = value || text;
  placeholder = placeholder || "Add your text here"; // STEP 2: CHANGE VALUES AND RETURN IT

  const onChange = e => {
    const val = e.target.value;

    if (setValue) {
      setValue(val);
    } else {
      setText(val);
    }
  }; // CASE 1: IF TEXTAREA RETURN TEXTAREA COMPONENT


  if (textarea) return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("textarea", {
    className: (_input_module_scss__WEBPACK_IMPORTED_MODULE_2___default().textarea)
  }); // CASE: DEFAULT RETURN INPUT COMPONENT

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
    className: (_input_module_scss__WEBPACK_IMPORTED_MODULE_2___default().input),
    type: type,
    style: style,
    value: value,
    onChange: onChange,
    placeholder: placeholder
  });
}

/***/ }),

/***/ 232395:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "u": () => (/* binding */ ScaleComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _scale_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(395122);
/* harmony import */ var _scale_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scale_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(785893);




function ScaleComponent(props) {
  const {
    value,
    setValue,
    longLineDivider = 10,
    shortLineDivider = 0,
    fieldName,
    min = 0,
    max = 100
  } = props;
  const {
    0: line,
    1: setLine
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let array = [];

    for (let i = Number(min); i <= Number(max); i++) {
      array.push(i);
    }

    setLine(array);
  }, []);

  const YLine = ({
    value,
    index
  }) => {
    let longline = false;
    const style = {
      left: `calc(${index * (100 / (Number(max) - Number(min)))}%)`,
      height: `20px`
    };
    const number = value % longLineDivider;

    if (number === 0) {
      if (value === Number(min) || value === Number(max)) {
        style.height = "0px";
      } else {
        style.height = "40px";
        longline = value;
      }
    } else {
      if (shortLineDivider) {
        if (number % shortLineDivider !== 0) {
          style.height = "0px";
        }
      }
    }

    return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: (_scale_module_scss__WEBPACK_IMPORTED_MODULE_2___default().yLine),
      style: style,
      children: longline && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
        className: (_scale_module_scss__WEBPACK_IMPORTED_MODULE_2___default().longline),
        children: longline
      })
    });
  };

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
    className: (_scale_module_scss__WEBPACK_IMPORTED_MODULE_2___default().main),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: (_scale_module_scss__WEBPACK_IMPORTED_MODULE_2___default().scale),
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
        type: "range",
        step: 1,
        value: value,
        onChange: e => setValue(fieldName, e.target.value),
        min: min,
        max: max
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
        className: (_scale_module_scss__WEBPACK_IMPORTED_MODULE_2___default().line),
        children: line === null || line === void 0 ? void 0 : line.map((no, i) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(YLine, {
          value: no,
          index: i
        }, "linex" + i))
      })]
    })
  });
}

/***/ }),

/***/ 619988:
/***/ ((module) => {

// Exports
module.exports = {
	"input": "input_input__uNtSX"
};


/***/ }),

/***/ 395122:
/***/ ((module) => {

// Exports
module.exports = {
	"main": "scale_main__3AVL2",
	"scale": "scale_scale__1kEGc",
	"line": "scale_line__1uP2X",
	"yLine": "scale_yLine__2vNsv",
	"longline": "scale_longline__1eC7W"
};


/***/ })

};
;