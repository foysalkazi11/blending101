exports.id = 2233;
exports.ids = [2233];
exports.modules = {

/***/ 437065:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ SmallcardComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _smallcard_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(270522);
/* harmony import */ var _smallcard_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_smallcard_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(463750);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(785893);
/* eslint-disable @next/next/no-img-element */






function SmallcardComponent({
  img,
  imgHeight,
  text,
  fnc,
  recipe,
  findCompareRecipe,
  fucUnCheck,
  conpareLength
}) {
  const style = {};
  if (imgHeight) style.height = imgHeight;
  text = text || "Chocolate Avocado Smoothie";
  img = img || "/cards/coriander.png";
  const findRecipe = findCompareRecipe && findCompareRecipe(recipe === null || recipe === void 0 ? void 0 : recipe.id);

  const handleClick = () => {
    fnc && fnc(recipe);
  };

  const handleUnCheck = () => {
    fucUnCheck && fucUnCheck(recipe);
  };

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
    className: (_smallcard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().smallCard),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: (_smallcard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().smallCard__innerContainer),
      children: [findRecipe ? null : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("button", {
        disabled: conpareLength === 4 ? true : false,
        className: `${(_smallcard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().compar)} ${conpareLength === 4 ? (_smallcard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().disable) : ""}`,
        onClick: handleClick,
        children: "compare"
      }), findRecipe ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
        className: `${(_smallcard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().tick)}`,
        onClick: handleUnCheck,
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(react_icons_bs__WEBPACK_IMPORTED_MODULE_3__/* .BsCheck */ .oFd, {
          className: (_smallcard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().tickimg)
        })
      }) : null, /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
        className: (_smallcard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().smallCard__top),
        style: style,
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("img", {
          src: img,
          alt: "coriander"
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
        className: (_smallcard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().smallCard__bottom),
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("p", {
          children: text
        })
      })]
    })
  });
}

/***/ }),

/***/ 894524:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _RecipeItem_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(193980);
/* harmony import */ var _RecipeItem_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_RecipeItem_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_icons_material_AddCircleOutline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(641687);
/* harmony import */ var _mui_icons_material_HighlightOff__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(653592);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(785893);
/* eslint-disable @next/next/no-img-element */







const RecipeItem = props => {
  const {
    item,
    plusIcon = true,
    dragIcon = true,
    deleteIcon = false,
    handleClick = () => {},
    handleDelete = () => {}
  } = props;
  const {
    0: items,
    1: setItems
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    /* @ts-ignore */
    if (item !== null && item !== void 0 && item.label) {
      setItems(item);
    }
  }, []);

  const handleClickk = e => {
    if (e.detail === 2) {
      console.log('doubke click');
    }
  };

  const handleDefault = e => {
    console.log('dragging');
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: (_RecipeItem_module_scss__WEBPACK_IMPORTED_MODULE_2___default().listContainer),
    onClick: handleClickk,
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("p", {
      children: items === null || items === void 0 ? void 0 : items.label
    }), dragIcon ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("button", {
      className: (_RecipeItem_module_scss__WEBPACK_IMPORTED_MODULE_2___default().listContainer__draggableBtn),
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("img", {
        src: "/icons/noun_drag_3124730.svg",
        alt: "dragIcon"
      })
    }) : null, plusIcon ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("button", {
      className: (_RecipeItem_module_scss__WEBPACK_IMPORTED_MODULE_2___default().listContainer__addBtn),
      onClick: () => handleClick ? handleClick(items) : null,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(_mui_icons_material_AddCircleOutline__WEBPACK_IMPORTED_MODULE_3__.default, {})
    }) : null, deleteIcon ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("button", {
      className: (_RecipeItem_module_scss__WEBPACK_IMPORTED_MODULE_2___default().listContainer__addBtn)
      /* @ts-ignore */
      ,
      onClick: () => handleDelete ? handleDelete(items === null || items === void 0 ? void 0 : items.id) : null,
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(_mui_icons_material_HighlightOff__WEBPACK_IMPORTED_MODULE_4__.default, {})
    }) : null]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecipeItem);

/***/ }),

/***/ 900516:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _SectionTitleWithIcon_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(281091);
/* harmony import */ var _SectionTitleWithIcon_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_SectionTitleWithIcon_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(785893);
/* eslint-disable @next/next/no-img-element */





const SectionTitleWithIcon = ({
  title,
  icon,
  style
}) => {
  style = style || {};
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    style: style,
    className: (_SectionTitleWithIcon_module_scss__WEBPACK_IMPORTED_MODULE_2___default().titleContainer),
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("span", {
      className: (_SectionTitleWithIcon_module_scss__WEBPACK_IMPORTED_MODULE_2___default().titleContainer__greenIconBox),
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("img", {
        src: icon,
        alt: "icon"
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("h5", {
      children: title
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SectionTitleWithIcon);

/***/ }),

/***/ 270522:
/***/ ((module) => {

// Exports
module.exports = {
	"smallCard": "smallcard_smallCard__Bkc9P",
	"smallCard__innerContainer": "smallcard_smallCard__innerContainer__38Gcq",
	"smallCard__top": "smallcard_smallCard__top__1C7Qz",
	"smallCard__bottom": "smallcard_smallCard__bottom__3MRQL",
	"comparContainer": "smallcard_comparContainer__3oP95",
	"compar": "smallcard_compar__1aKAg",
	"disable": "smallcard_disable__ERKsm",
	"drag": "smallcard_drag__2kkiI",
	"tick": "smallcard_tick__3pASj",
	"tickimg": "smallcard_tickimg__3sPhg"
};


/***/ }),

/***/ 193980:
/***/ ((module) => {

// Exports
module.exports = {
	"listContainer": "RecipeItem_listContainer__1mm6t",
	"listContainer__tooltiptext": "RecipeItem_listContainer__tooltiptext__ILl25",
	"listContainer__draggableBtn": "RecipeItem_listContainer__draggableBtn__3-2Ol",
	"listContainer__addBtn": "RecipeItem_listContainer__addBtn__98W6l"
};


/***/ }),

/***/ 281091:
/***/ ((module) => {

// Exports
module.exports = {
	"titleContainer": "SectionTitleWithIcon_titleContainer__-DK0z",
	"titleContainer__greenIconBox": "SectionTitleWithIcon_titleContainer__greenIconBox__TikSR"
};


/***/ })

};
;