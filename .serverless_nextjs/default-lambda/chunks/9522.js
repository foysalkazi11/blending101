exports.id = 9522;
exports.ids = [9522];
exports.modules = {

/***/ 300621:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _Goals_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2521);
/* harmony import */ var _Goals_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Goals_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(785893);





const Goals = ({
  list,
  title,
  fieldName,
  updateUserProfile,
  alredyExistGoals,
  headingStyle = {}
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: (_Goals_module_scss__WEBPACK_IMPORTED_MODULE_2___default().container),
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("h2", {
      style: headingStyle,
      children: title
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: (_Goals_module_scss__WEBPACK_IMPORTED_MODULE_2___default().container__goalsContainer),
      children: list === null || list === void 0 ? void 0 : list.map((item, index) => {
        const ckeckGoals = alredyExistGoals(item, "whyBlending");
        return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("span", {
          className: `${(_Goals_module_scss__WEBPACK_IMPORTED_MODULE_2___default().container__goalsContainer__label)} ${ckeckGoals ? (_Goals_module_scss__WEBPACK_IMPORTED_MODULE_2___default().selected) : ""}`,
          onClick: () => updateUserProfile(fieldName, item),
          children: item
        }, index);
      })
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Goals);

/***/ }),

/***/ 19144:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _SectionWithInput_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(984659);
/* harmony import */ var _SectionWithInput_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_SectionWithInput_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _theme_input_input_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(683044);
/* harmony import */ var _mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(44510);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(785893);







const SectionWithInput = ({
  title,
  value,
  setValue,
  fieldName,
  maxWidth,
  style = {},
  type = "text",
  placeholder = "Add you text here",
  textarea = false,
  fullWidth = false,
  removeInput,
  headingStyle = {}
}) => {
  const {
    0: inputValue,
    1: setInputValue
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");

  const handleSubmit = e => {
    e.preventDefault();
    setValue(fieldName, inputValue);
    setInputValue("");
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: (_SectionWithInput_module_scss__WEBPACK_IMPORTED_MODULE_3___default().sectionWithInputContainer),
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("h2", {
      style: headingStyle,
      children: title
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: (_SectionWithInput_module_scss__WEBPACK_IMPORTED_MODULE_3___default().inputContainer),
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("form", {
        onSubmit: handleSubmit,
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_theme_input_input_component__WEBPACK_IMPORTED_MODULE_1__/* .default */ .Z, {
          maxWidth: maxWidth,
          style: style,
          type: type,
          value: inputValue,
          setValue: setInputValue,
          placeholder: placeholder,
          textarea: textarea,
          fullWidth: fullWidth,
          fieldName: fieldName
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("div", {
        className: (_SectionWithInput_module_scss__WEBPACK_IMPORTED_MODULE_3___default().inputContainer__inputValueContainer),
        children: value === null || value === void 0 ? void 0 : value.map((item, index) => {
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
            className: (_SectionWithInput_module_scss__WEBPACK_IMPORTED_MODULE_3___default().inputContainer__inputValueContainer__inputValue),
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx("span", {
              className: (_SectionWithInput_module_scss__WEBPACK_IMPORTED_MODULE_3___default().inputContainer__inputValueContainer__inputValue__label),
              children: item
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx(_mui_icons_material_Cancel__WEBPACK_IMPORTED_MODULE_4__.default, {
              className: (_SectionWithInput_module_scss__WEBPACK_IMPORTED_MODULE_3___default().inputContainer__inputValueContainer__inputValue__closeIcon),
              onClick: () => removeInput(fieldName, item)
            })]
          }, index);
        })
      })]
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SectionWithInput);

/***/ }),

/***/ 417102:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//capitalize only the first letter of the string.
const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (capitalizeFirstLetter);

/***/ }),

/***/ 129753:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(591333);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);

const EDIT_CONFIGRATION_BY_ID = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
  mutation EditConfifuirationById($data: EditConfiguiration!) {
    editConfifuirationById(data: $data)
  }
`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EDIT_CONFIGRATION_BY_ID);

/***/ }),

/***/ 2521:
/***/ ((module) => {

// Exports
module.exports = {
	"container": "Goals_container__3Oqar",
	"container__goalsContainer": "Goals_container__goalsContainer__MRJjK",
	"container__goalsContainer__label": "Goals_container__goalsContainer__label__PA0DI",
	"selected": "Goals_selected__JHne5"
};


/***/ }),

/***/ 984659:
/***/ ((module) => {

// Exports
module.exports = {
	"sectionWithInputContainer": "SectionWithInput_sectionWithInputContainer__2AH8P",
	"inputContainer": "SectionWithInput_inputContainer__2wRq-",
	"inputContainer__inputValueContainer": "SectionWithInput_inputContainer__inputValueContainer__3Hi9X",
	"inputContainer__inputValueContainer__inputValue": "SectionWithInput_inputContainer__inputValueContainer__inputValue__3Jqyy",
	"inputContainer__inputValueContainer__inputValue__closeIcon": "SectionWithInput_inputContainer__inputValueContainer__inputValue__closeIcon__1nhae",
	"inputContainer__inputValueContainer__inputValue__label": "SectionWithInput_inputContainer__inputValueContainer__inputValue__label__3Zz72"
};


/***/ })

};
;