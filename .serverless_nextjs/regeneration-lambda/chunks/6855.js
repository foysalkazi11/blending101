exports.id = 6855;
exports.ids = [6855];
exports.modules = {

/***/ 196855:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ TogglerComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _toggler_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(144853);
/* harmony import */ var _toggler_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_toggler_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(785893);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable @next/next/no-img-element */




function TogglerComponent({
  childs,
  value,
  setValue,
  style,
  lineCss,
  childColor,
  icons,
  tags,
  tagColor
}) {
  if (!childs) return null;
  style = style || {};
  const length = childs.length;
  const width = `${100 / length}%`;
  style = _objectSpread(_objectSpread({}, style), {}, {
    width: width
  });
  if (lineCss) style = _objectSpread(_objectSpread({}, style), {}, {
    borderRight: lineCss
  });
  if (childColor) style = _objectSpread(_objectSpread({}, style), {}, {
    color: childColor
  });

  const handleSelect = VALUE => {
    setValue && setValue(VALUE);
  };

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
    className: (_toggler_module_scss__WEBPACK_IMPORTED_MODULE_2___default().toggler),
    children: childs && childs.map((child, i) => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      style: style,
      onClick: () => handleSelect(child),
      className: value === child ? (_toggler_module_scss__WEBPACK_IMPORTED_MODULE_2___default().toggler__main) + ' ' + (_toggler_module_scss__WEBPACK_IMPORTED_MODULE_2___default().active) : (_toggler_module_scss__WEBPACK_IMPORTED_MODULE_2___default().toggler__main),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: (_toggler_module_scss__WEBPACK_IMPORTED_MODULE_2___default().children),
        children: [icons && icons[i] && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
          className: (_toggler_module_scss__WEBPACK_IMPORTED_MODULE_2___default().toggler__left),
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("img", {
            src: `${icons[i]}`,
            alt: icons[i]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: (_toggler_module_scss__WEBPACK_IMPORTED_MODULE_2___default().toggler__right),
          children: [tags && tags[i] && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("p", {
            children: tags[i]
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("p", {
            children: child
          })]
        })]
      })
    }, child + i))
  });
}

/***/ }),

/***/ 144853:
/***/ ((module) => {

// Exports
module.exports = {
	"toggler": "toggler_toggler__1M4pL",
	"toggler__main": "toggler_toggler__main__17Nnu",
	"children": "toggler_children__2LW23",
	"toggler__left": "toggler_toggler__left__2uMPj",
	"toggler__right": "toggler_toggler__right__1XI5c",
	"active": "toggler_active__U8FWe"
};


/***/ })

};
;