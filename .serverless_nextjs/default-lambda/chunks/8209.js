exports.id = 8209;
exports.ids = [8209];
exports.modules = {

/***/ 38209:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _mui_material_Accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(334282);
/* harmony import */ var _mui_material_Accordion__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_material_Accordion__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_material_AccordionSummary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(985570);
/* harmony import */ var _mui_material_AccordionSummary__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_material_AccordionSummary__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _mui_material_AccordionDetails__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(849282);
/* harmony import */ var _mui_material_AccordionDetails__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mui_material_AccordionDetails__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(686893);
/* harmony import */ var _accordion_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(361969);
/* harmony import */ var _accordion_module_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_accordion_module_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(785893);









const CustomAccordion = ({
  title,
  children
}) => {
  const {
    0: expanded,
    1: setExpanded
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)((_mui_material_Accordion__WEBPACK_IMPORTED_MODULE_2___default()), {
    expanded: expanded === true,
    onChange: () => setExpanded(!expanded),
    sx: {
      boxShadow: "none",
      "&.MuiAccordion-root:before": {
        height: "0px !important"
      },
      "& .MuiAccordionSummary-root.Mui-expanded": {
        minHeight: "0px !important"
      },
      "& .MuiAccordionSummary-content.Mui-expanded": {
        margin: "10px 0px !important"
      },
      "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(0deg)"
      },
      "& .MuiAccordionDetails-root": {
        padding: " 0px"
      },
      "& .MuiAccordionSummary-root": {
        padding: "0px !important"
      }
    },
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx((_mui_material_AccordionSummary__WEBPACK_IMPORTED_MODULE_3___default()), {
      sx: {
        flexDirection: "row-reverse"
      },
      expandIcon: expanded ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_4__/* .FiMinusSquare */ .jf0, {
        className: (_accordion_module_scss__WEBPACK_IMPORTED_MODULE_5___default().icon)
      }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_4__/* .FiPlusSquare */ .xVi, {
        className: (_accordion_module_scss__WEBPACK_IMPORTED_MODULE_5___default().icon)
      }),
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("h5", {
        className: (_accordion_module_scss__WEBPACK_IMPORTED_MODULE_5___default().title),
        children: title
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx((_mui_material_AccordionDetails__WEBPACK_IMPORTED_MODULE_6___default()), {
      children: children
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomAccordion);

/***/ }),

/***/ 361969:
/***/ ((module) => {

// Exports
module.exports = {
	"icon": "accordion_icon__20teC",
	"title": "accordion_title__1LtB-"
};


/***/ })

};
;