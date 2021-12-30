exports.id = 7236;
exports.ids = [7236];
exports.modules = {

/***/ 477236:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ DatacardComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var _dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(880450);
/* harmony import */ var _dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(957976);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(785893);
/* eslint-disable @next/next/no-img-element */





function DatacardComponent({
  title,
  ingredients,
  category,
  ratings,
  noOfRatings,
  carbs,
  score,
  calorie,
  noOfComments,
  image
}) {
  title = title || "Triple Berry Smoothie";
  ingredients = ingredients || "Cocoa powder, almond milk, avocado, mango, banana, honey, vanilla extract";
  category = category || "Smoothie";
  noOfRatings = noOfRatings || 71;
  carbs = carbs || 23;
  calorie = calorie || 270;
  score = score || 701;
  noOfComments = noOfComments || 21;
  image = image || "/cards/juice.png";
  const menu = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();

  const handleEclipse = () => {// HANDLE ECLIPSE CLICK HERE
  };

  const handleCompare = () => {// HANDLE COMPARE CLICK HERE
  };

  const handleComment = () => {// HANDLE COMMENTS CLICK HERE
  };

  const handleClick = () => {
    const elem = menu.current;
    elem.classList.toggle("show__hidden");
  };

  const DataBody = () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().databody),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().databody__top),
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
        className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().databody__top__label),
        children: category
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().databody__top__info),
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("img", {
          src: "/icons/star.svg",
          alt: "star"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("span", {
          children: ratings
        }), "\xA0", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("span", {
          children: ["(", noOfRatings, ")"]
        })]
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().databody__bottom),
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("p", {
        children: ingredients
      })
    })]
  });

  const FloatingMenu = () => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
    className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().floating__menu),
    ref: menu,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("ul", {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("li", {
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("img", {
          src: "/icons/square.png",
          alt: "square"
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("li", {
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("img", {
          src: "/icons/share.png",
          alt: "square"
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("li", {
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("img", {
          src: "/icons/edit.png",
          alt: "square"
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("li", {
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("img", {
          src: "/icons/calender.png",
          alt: "square"
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("li", {
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("img", {
          src: "/icons/cart.png",
          alt: "square"
        })
      })]
    })
  });

  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
    className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard),
    children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard__inner),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard__body),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard__body__top),
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
            className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard__body__top__heading),
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("h2", {
              className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().title),
              children: title
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard__body__top__menu),
            children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(_mui_icons_material_MoreVert__WEBPACK_IMPORTED_MODULE_3__.default, {
              onClick: handleClick
            }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(FloatingMenu, {})]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard__body__middle),
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
            className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard__body__middle__left),
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
              className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().image),
              style: {
                backgroundImage: `url(${image})`
              }
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
            className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard__body__middle__right),
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(DataBody, {})
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard__body__belt),
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard__body__belt__child),
            children: ["Net Carbs ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("span", {
              children: carbs
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard__body__belt__child),
            children: ["Rx Score ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("span", {
              children: score
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
            className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard__body__belt__child),
            children: ["Calorie ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("span", {
              children: calorie
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
          className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard__body__bottom),
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
            className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard__body__bottom__left),
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("img", {
              src: "/icons/delish.png",
              alt: "brand"
            })
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
            className: (_dataCard_module_scss__WEBPACK_IMPORTED_MODULE_2___default().datacard__body__bottom__right),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("ul", {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("li", {
                children: [" ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("img", {
                  src: "/icons/eclipse.svg",
                  alt: "eclipse",
                  onClick: handleEclipse
                }), " "]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("li", {
                children: [" ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("img", {
                  src: "/icons/compare.svg",
                  alt: "compare",
                  onClick: handleCompare
                }), " "]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("li", {
                children: [" ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("img", {
                  src: "/icons/message.svg",
                  alt: "message",
                  onClick: handleComment
                }), " ", /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("span", {
                  children: noOfComments
                }), " "]
              })]
            })
          })]
        })]
      })
    })
  });
}

/***/ }),

/***/ 880450:
/***/ ((module) => {

// Exports
module.exports = {
	"datacard": "dataCard_datacard__1c99I",
	"datacard__body__top": "dataCard_datacard__body__top__1ng-s",
	"datacard__body__top__menu": "dataCard_datacard__body__top__menu__3-mmT",
	"datacard__body__middle": "dataCard_datacard__body__middle__qDIHf",
	"datacard__body__bottom": "dataCard_datacard__body__bottom__IfoSS",
	"datacard__body__bottom__left": "dataCard_datacard__body__bottom__left__1ZsQh",
	"datacard__body__bottom__right": "dataCard_datacard__body__bottom__right__28LiC",
	"floating__menu": "dataCard_floating__menu__1lfGC",
	"image": "dataCard_image__3NvJS",
	"datacard__body__middle__left": "dataCard_datacard__body__middle__left__12tBy",
	"datacard__body__middle__right": "dataCard_datacard__body__middle__right__GqKel",
	"databody__top": "dataCard_databody__top__3e9qa",
	"databody__top__info": "dataCard_databody__top__info__1I84c",
	"databody__top__label": "dataCard_databody__top__label__cIn_b",
	"databody__bottom": "dataCard_databody__bottom__1Waww",
	"datacard__body__belt": "dataCard_datacard__body__belt__3Lpx1",
	"datacard__body__belt__child": "dataCard_datacard__body__belt__child__31Cu6",
	"title": "dataCard_title__34WJL"
};


/***/ })

};
;