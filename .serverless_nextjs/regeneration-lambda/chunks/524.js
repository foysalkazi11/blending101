exports.id = 524;
exports.ids = [524];
exports.modules = {

/***/ 920524:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ recipeDiscovery_component)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./containers/A.container.tsx + 19 modules
var A_container = __webpack_require__(533036);
// EXTERNAL MODULE: ./theme/recipeDiscovery/recipeDiscovery.module.scss
var recipeDiscovery_module = __webpack_require__(35513);
var recipeDiscovery_module_default = /*#__PURE__*/__webpack_require__.n(recipeDiscovery_module);
// EXTERNAL MODULE: ./theme/recipeDiscovery/AppdownLoadCard/AppdownLoad.module.scss
var AppdownLoad_module = __webpack_require__(651267);
var AppdownLoad_module_default = /*#__PURE__*/__webpack_require__.n(AppdownLoad_module);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(425675);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(741664);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(785893);
;// CONCATENATED MODULE: ./theme/recipeDiscovery/AppdownLoadCard/AppdownLoadCard.component.tsx







const AppdownLoadCard = () => {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: (AppdownLoad_module_default()).orange__card,
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (AppdownLoad_module_default()).orange__card__left,
      children: [/*#__PURE__*/jsx_runtime.jsx("h2", {
        children: "DOWNLOAD THE APP NOW!"
      }), /*#__PURE__*/jsx_runtime.jsx("p", {
        children: "EXPLORE INGREDIENTS, NUTRITION AND HEALTH CATEGORIES WITH THE ALL-NEW BLENDING APP."
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (AppdownLoad_module_default()).orange__card__left__Buttons,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (AppdownLoad_module_default()).btn,
          children: /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
            href: "#",
            children: /*#__PURE__*/jsx_runtime.jsx("a", {
              children: /*#__PURE__*/jsx_runtime.jsx(next_image.default, {
                src: "/images/app-store@2x.png",
                alt: "banner Icon",
                layout: "fill",
                objectFit: "contain"
              })
            })
          })
        }), /*#__PURE__*/jsx_runtime.jsx("div", {
          className: (AppdownLoad_module_default()).btn,
          children: /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
            href: "#",
            children: /*#__PURE__*/jsx_runtime.jsx("a", {
              children: /*#__PURE__*/jsx_runtime.jsx(next_image.default, {
                src: "/images/google-play@2x.png",
                alt: "banner Icon",
                layout: "fill",
                objectFit: "contain"
              })
            })
          })
        })]
      })]
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (AppdownLoad_module_default()).orange__card__right,
      children: /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (AppdownLoad_module_default()).orange__card__right__icon,
        children: /*#__PURE__*/jsx_runtime.jsx(next_image.default, {
          src: "/images/banner-right-item.png",
          alt: "banner Icon",
          layout: "fill",
          objectFit: "contain"
        })
      })
    })]
  });
};

/* harmony default export */ const AppdownLoadCard_component = (AppdownLoadCard);
// EXTERNAL MODULE: ./theme/recipeDiscovery/ContentTray/ContentTray.module.scss
var ContentTray_module = __webpack_require__(472233);
var ContentTray_module_default = /*#__PURE__*/__webpack_require__.n(ContentTray_module);
// EXTERNAL MODULE: ./theme/carousel/carousel.component.tsx
var carousel_component = __webpack_require__(792601);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/ChevronRight.js
var ChevronRight = __webpack_require__(126215);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/ChevronLeft.js
var ChevronLeft = __webpack_require__(819572);
;// CONCATENATED MODULE: ./theme/recipeDiscovery/ContentTray/ContentTray.component.tsx





 // interface carouselTray {
//   heading: string;
// }




const ContentTray = props => {
  //uses react slick caorousel so previous buttin and next button are custom buttons made for slider
  const PreviousButton = prop => {
    const {
      className,
      onClick
    } = prop;
    return /*#__PURE__*/jsx_runtime.jsx("div", {
      className: className + " " + (ContentTray_module_default()).customArrowLeft,
      onClick: onClick,
      children: /*#__PURE__*/jsx_runtime.jsx(ChevronLeft.default, {})
    });
  };

  const NextButton = prop => {
    const {
      className,
      onClick
    } = prop; // console.log("+++++++++++++++" + className);

    return /*#__PURE__*/jsx_runtime.jsx("div", {
      className: className + " " + (ContentTray_module_default()).customArrowRight,
      onClick: onClick,
      children: /*#__PURE__*/jsx_runtime.jsx(ChevronRight.default, {})
    });
  };

  const responsiveSetting = {
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: /*#__PURE__*/jsx_runtime.jsx(NextButton, {}),
    prevArrow: /*#__PURE__*/jsx_runtime.jsx(PreviousButton, {}),
    responsive: [{
      breakpoint: 1450,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 1250,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 980,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  };
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: (ContentTray_module_default()).main__slider,
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("h3", {
      children: [/*#__PURE__*/jsx_runtime.jsx("span", {
        children: /*#__PURE__*/jsx_runtime.jsx(next_image.default, {
          src: props.image,
          alt: "Icon",
          layout: "fill",
          objectFit: "contain",
          quality: 100
        })
      }), props.heading, /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (ContentTray_module_default()).viewAll,
        children: "View All"
      })]
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (ContentTray_module_default()).sliderMainDiv,
      children: /*#__PURE__*/jsx_runtime.jsx(carousel_component/* default */.Z, {
        moreSetting: responsiveSetting,
        children: props.children
      })
    })]
  });
};

/* harmony default export */ const ContentTray_component = (ContentTray);
;// CONCATENATED MODULE: ./theme/recipeDiscovery/data.tsx
const recommendedList = [{
  title: "Chocolate Avacado Mango Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Triple Berry Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Mango Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Triple Berry Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Mango Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Triple Berry Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Mango Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Triple Berry Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}];
const recentList = [{
  title: "Chocolate Avacado Mango Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Triple Berry Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Mango Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Triple Berry Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Mango Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Triple Berry Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Mango Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Triple Berry Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}];
const popularList = [{
  title: "Chocolate Avacado Mango Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Triple Berry Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Mango Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Triple Berry Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Mango Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Triple Berry Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Mango Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Triple Berry Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}, {
  title: "Chocolate Avacado Smoothie",
  ingredients: "",
  category: "",
  ratings: 0,
  noOfRatings: 0,
  carbs: 0,
  score: 0,
  calorie: 0,
  noOfComments: 0,
  image: ""
}];
// EXTERNAL MODULE: ./theme/cards/dataCard/dataCard.component.tsx
var dataCard_component = __webpack_require__(477236);
// EXTERNAL MODULE: ./theme/recipeDiscovery/searchBar/SearchBar.module.scss
var SearchBar_module = __webpack_require__(339158);
var SearchBar_module_default = /*#__PURE__*/__webpack_require__.n(SearchBar_module);
// EXTERNAL MODULE: ./node_modules/react-icons/fi/index.esm.js
var index_esm = __webpack_require__(686893);
// EXTERNAL MODULE: ./node_modules/react-icons/bs/index.esm.js
var bs_index_esm = __webpack_require__(463750);
// EXTERNAL MODULE: ./node_modules/react-icons/ai/index.esm.js
var ai_index_esm = __webpack_require__(708193);
// EXTERNAL MODULE: ./theme/button/recipeDiscoverButton/RecipeDiscoverButton.module.scss
var RecipeDiscoverButton_module = __webpack_require__(39715);
var RecipeDiscoverButton_module_default = /*#__PURE__*/__webpack_require__.n(RecipeDiscoverButton_module);
;// CONCATENATED MODULE: ./theme/button/recipeDiscoverButton/RecipeDiscoverButton.tsx
/* eslint-disable @next/next/no-img-element */





const RecipeDiscoverButton = ({
  handleClick = () => {},
  Icon,
  image = "",
  text = "Recipe"
}) => {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("button", {
    className: (RecipeDiscoverButton_module_default()).button,
    onClick: handleClick,
    children: [image ? /*#__PURE__*/jsx_runtime.jsx("img", {
      src: image,
      alt: "img",
      className: (RecipeDiscoverButton_module_default()).img
    }) : null, Icon ? /*#__PURE__*/jsx_runtime.jsx(Icon, {
      className: (RecipeDiscoverButton_module_default()).icon
    }) : null, text]
  });
};

/* harmony default export */ const recipeDiscoverButton_RecipeDiscoverButton = (RecipeDiscoverButton);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/AddCircleOutline.js
var AddCircleOutline = __webpack_require__(641687);
// EXTERNAL MODULE: ./redux/hooks.ts
var hooks = __webpack_require__(429927);
// EXTERNAL MODULE: ./redux/slices/sideTraySlice.ts
var sideTraySlice = __webpack_require__(331024);
;// CONCATENATED MODULE: ./theme/recipeDiscovery/searchBar/SearchBar.component.tsx












const SearchBar = () => {
  const {
    0: isInputFocus,
    1: setIsInputFocus
  } = (0,react.useState)(false);
  const {
    0: isSubmit,
    1: setIsSubmit
  } = (0,react.useState)(false);
  const {
    0: input,
    1: setInput
  } = (0,react.useState)("");
  const {
    0: isMicOn,
    1: setIsMicOn
  } = (0,react.useState)(false);
  const inputRef = (0,react.useRef)(null);
  const {
    openFilterTray
  } = (0,hooks/* useAppSelector */.C)(state => state === null || state === void 0 ? void 0 : state.sideTray);
  const dispatch = (0,hooks/* useAppDispatch */.T)();

  const handleSubmit = e => {
    e.preventDefault();

    if (input) {
      setIsSubmit(true);
    }
  };

  const handleClean = () => {
    setInput("");
    setIsSubmit(false);
    setIsInputFocus(false); // inputRef?.current?.focus();
  };

  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: (SearchBar_module_default()).searchBarContainer,
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (SearchBar_module_default()).inputContainer,
      children: [/*#__PURE__*/jsx_runtime.jsx("div", {
        className: (SearchBar_module_default()).filterIconContainer,
        children: /*#__PURE__*/jsx_runtime.jsx(index_esm/* FiFilter */.Ihx, {
          className: `${(SearchBar_module_default()).filterIcon}${openFilterTray ? (SearchBar_module_default()).active : ""}`,
          onClick: () => dispatch((0,sideTraySlice/* setOpenFilterTray */.Js)(!openFilterTray))
        })
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (SearchBar_module_default()).inputBox,
        children: [isInputFocus ? null : isMicOn ? /*#__PURE__*/jsx_runtime.jsx(bs_index_esm/* BsSoundwave */.rD$, {
          className: (SearchBar_module_default()).waveIcon
        }) : /*#__PURE__*/jsx_runtime.jsx(bs_index_esm/* BsSearch */.dVI, {
          className: (SearchBar_module_default()).seachIcon
        }), /*#__PURE__*/jsx_runtime.jsx("form", {
          onSubmit: handleSubmit,
          children: /*#__PURE__*/jsx_runtime.jsx("input", {
            disabled: isMicOn,
            ref: inputRef,
            placeholder: isMicOn ? "Speak" : "Search",
            value: input,
            onChange: e => {
              var _e$target;

              return setInput(e === null || e === void 0 ? void 0 : (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value);
            },
            onFocus: () => setIsInputFocus(true) // onBlur={(e) => handleBlur(e)}

          })
        }), isSubmit ? /*#__PURE__*/jsx_runtime.jsx(ai_index_esm/* AiOutlineClose */.oHP, {
          className: (SearchBar_module_default()).seachIconActive,
          onClick: handleClean
        }) : isInputFocus ? /*#__PURE__*/jsx_runtime.jsx(bs_index_esm/* BsSearch */.dVI, {
          className: `${(SearchBar_module_default()).seachIconActive}`,
          onClick: e => {
            e.stopPropagation();

            if (input) {
              setIsSubmit(true);
            }
          }
        }) : /*#__PURE__*/jsx_runtime.jsx(bs_index_esm/* BsMic */.Ln0, {
          className: `${(SearchBar_module_default()).mic} ${isMicOn ? (SearchBar_module_default()).active : ""}`,
          onClick: () => setIsMicOn(!isMicOn)
        })]
      })]
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      style: {
        marginLeft: "40px"
      },
      children: /*#__PURE__*/jsx_runtime.jsx(recipeDiscoverButton_RecipeDiscoverButton, {
        image: "/images/compare-fill-icon.svg",
        text: "Compare(6)"
      })
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      style: {
        marginLeft: "30px"
      },
      children: /*#__PURE__*/jsx_runtime.jsx(recipeDiscoverButton_RecipeDiscoverButton, {
        Icon: AddCircleOutline.default,
        text: "Recipe"
      })
    })]
  });
};

/* harmony default export */ const SearchBar_component = (SearchBar);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/index.js
var icons_material = __webpack_require__(386878);
// EXTERNAL MODULE: ./components/searchtags/searchtag.module.scss
var searchtag_module = __webpack_require__(447350);
var searchtag_module_default = /*#__PURE__*/__webpack_require__.n(searchtag_module);
;// CONCATENATED MODULE: ./services/trayClick.service.js
const handleFilterClick = (arr, obj) => {
  let blendz = [];
  let present = false;
  arr.forEach(blen => {
    if (blen === obj) {
      present = true;
    }
  });

  if (!present) {
    blendz = [obj, ...arr];
  } else {
    blendz = arr.filter(blen => {
      return blen !== obj;
    });
  }

  return blendz;
};
;// CONCATENATED MODULE: ./components/searchtags/searchtags.component.tsx
/* eslint-disable @next/next/no-img-element */








function SearchtagsComponent(props) {
  const ingredients = (0,hooks/* useAppSelector */.C)(state => state.sideTray.ingredients);
  const blends = (0,hooks/* useAppSelector */.C)(state => state.sideTray.blends);
  const category = (0,hooks/* useAppSelector */.C)(state => state.sideTray.category);
  const dispatch = (0,hooks/* useAppDispatch */.T)();

  const handleIngredientClick = item => {
    const blendz = handleFilterClick(ingredients, item);
    dispatch((0,sideTraySlice/* setIngredients */.zz)(blendz));
  };

  const handleBlendClick = item => {
    const blendz = handleFilterClick(blends, item);
    dispatch((0,sideTraySlice/* setBlendTye */.oj)(blendz));
  };

  if ((ingredients === null || ingredients === void 0 ? void 0 : ingredients.length) < 1 && (blends === null || blends === void 0 ? void 0 : blends.length) < 1 && category === null) return null;
  return /*#__PURE__*/jsx_runtime.jsx("div", {
    className: (searchtag_module_default()).searchtab,
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (searchtag_module_default()).container,
      children: [blends && blends.map((blend, i) => /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (searchtag_module_default()).item,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (searchtag_module_default()).cross,
          onClick: () => handleBlendClick(blend),
          children: /*#__PURE__*/jsx_runtime.jsx(icons_material/* Cancel */.$jj, {
            className: (searchtag_module_default()).cancel
          })
        }), /*#__PURE__*/jsx_runtime.jsx("div", {
          className: (searchtag_module_default()).image,
          children: /*#__PURE__*/jsx_runtime.jsx("img", {
            src: blend === null || blend === void 0 ? void 0 : blend.img,
            alt: "img"
          })
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: blend === null || blend === void 0 ? void 0 : blend.title
        })]
      }, "searchtags" + i)), ingredients && ingredients.map((blend, i) => /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (searchtag_module_default()).item,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (searchtag_module_default()).cross,
          onClick: () => handleIngredientClick(blend),
          children: /*#__PURE__*/jsx_runtime.jsx(icons_material/* Cancel */.$jj, {
            className: (searchtag_module_default()).cancel
          })
        }), /*#__PURE__*/jsx_runtime.jsx("div", {
          className: (searchtag_module_default()).image,
          children: /*#__PURE__*/jsx_runtime.jsx("img", {
            src: blend === null || blend === void 0 ? void 0 : blend.img,
            alt: "img"
          })
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: blend === null || blend === void 0 ? void 0 : blend.title
        })]
      }, "searchtags" + i))]
    })
  });
}
;// CONCATENATED MODULE: ./theme/recipeDiscovery/recipeDiscovery.component.tsx












const RecipeDetails = () => {
  return /*#__PURE__*/jsx_runtime.jsx(A_container/* default */.Z, {
    showLeftTray: true,
    filterTray: true,
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (recipeDiscovery_module_default()).main__div,
      children: [/*#__PURE__*/jsx_runtime.jsx(SearchBar_component, {}), /*#__PURE__*/jsx_runtime.jsx(SearchtagsComponent, {}), /*#__PURE__*/jsx_runtime.jsx(AppdownLoadCard_component, {}), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (recipeDiscovery_module_default()).main__tray,
        children: [/*#__PURE__*/jsx_runtime.jsx(ContentTray_component, {
          heading: "Recommended",
          image: "/images/thumbs-up.svg",
          children: recommendedList.map((cardData, index) => {
            {
              return /*#__PURE__*/jsx_runtime.jsx("div", {
                className: (recipeDiscovery_module_default()).slider__card,
                children: /*#__PURE__*/jsx_runtime.jsx(dataCard_component/* default */.Z, {
                  title: cardData.title,
                  ingredients: cardData.ingredients,
                  category: cardData.category,
                  ratings: cardData.ratings,
                  noOfRatings: cardData.noOfRatings,
                  carbs: cardData.carbs,
                  score: cardData.score,
                  calorie: cardData.calorie,
                  noOfComments: cardData.noOfComments,
                  image: cardData.image
                })
              }, index);
            }
          })
        }), /*#__PURE__*/jsx_runtime.jsx(ContentTray_component, {
          heading: "Recent",
          image: "/images/clock-light.svg",
          children: recentList.map((cardData, index) => {
            {
              return /*#__PURE__*/jsx_runtime.jsx("div", {
                className: (recipeDiscovery_module_default()).slider__card,
                children: /*#__PURE__*/jsx_runtime.jsx(dataCard_component/* default */.Z, {
                  title: cardData.title,
                  ingredients: cardData.ingredients,
                  category: cardData.category,
                  ratings: cardData.ratings,
                  noOfRatings: cardData.noOfRatings,
                  carbs: cardData.carbs,
                  score: cardData.score,
                  calorie: cardData.calorie,
                  noOfComments: cardData.noOfComments,
                  image: cardData.image
                })
              }, index);
            }
          })
        }), /*#__PURE__*/jsx_runtime.jsx(ContentTray_component, {
          heading: "Popular",
          image: "/images/fire-alt-light.svg",
          children: popularList.map((cardData, index) => {
            {
              return /*#__PURE__*/jsx_runtime.jsx("div", {
                className: (recipeDiscovery_module_default()).slider__card,
                children: /*#__PURE__*/jsx_runtime.jsx(dataCard_component/* default */.Z, {
                  title: cardData.title,
                  ingredients: cardData.ingredients,
                  category: cardData.category,
                  ratings: cardData.ratings,
                  noOfRatings: cardData.noOfRatings,
                  carbs: cardData.carbs,
                  score: cardData.score,
                  calorie: cardData.calorie,
                  noOfComments: cardData.noOfComments,
                  image: cardData.image
                })
              }, index);
            }
          })
        })]
      })]
    })
  });
};

/* harmony default export */ const recipeDiscovery_component = (RecipeDetails);

/***/ }),

/***/ 447350:
/***/ ((module) => {

// Exports
module.exports = {
	"searchtab": "searchtag_searchtab__1cpoO",
	"item": "searchtag_item__v0xNr",
	"image": "searchtag_image__2cwdP",
	"container": "searchtag_container__qpqdp",
	"cross": "searchtag_cross__2cTm9",
	"cancel": "searchtag_cancel__2pkJS"
};


/***/ }),

/***/ 39715:
/***/ ((module) => {

// Exports
module.exports = {
	"button": "RecipeDiscoverButton_button__ufINu",
	"icon": "RecipeDiscoverButton_icon__1TP8B",
	"img": "RecipeDiscoverButton_img__s8W1q"
};


/***/ }),

/***/ 651267:
/***/ ((module) => {

// Exports
module.exports = {
	"orange__card": "AppdownLoad_orange__card__BAaMz",
	"orange__card__left": "AppdownLoad_orange__card__left___nMRO",
	"orange__card__left__Buttons": "AppdownLoad_orange__card__left__Buttons__ESuJr",
	"btn": "AppdownLoad_btn__1HG0J",
	"orange__card__right": "AppdownLoad_orange__card__right__1M1vJ",
	"orange__card__right__icon": "AppdownLoad_orange__card__right__icon__2U-ZX"
};


/***/ }),

/***/ 472233:
/***/ ((module) => {

// Exports
module.exports = {
	"main__slider": "ContentTray_main__slider__1CWdD",
	"viewAll": "ContentTray_viewAll__vAXzf",
	"sliderMainDiv": "ContentTray_sliderMainDiv__2nOfl",
	"customArrowLeft": "ContentTray_customArrowLeft__270Oz",
	"customArrowRight": "ContentTray_customArrowRight__2REsn"
};


/***/ }),

/***/ 35513:
/***/ ((module) => {

// Exports
module.exports = {
	"main__div": "recipeDiscovery_main__div__1c3EJ",
	"main__tray": "recipeDiscovery_main__tray__TOhyo",
	"slider__card": "recipeDiscovery_slider__card__3ojFv"
};


/***/ }),

/***/ 339158:
/***/ ((module) => {

// Exports
module.exports = {
	"searchBarContainer": "SearchBar_searchBarContainer__3ZNv0",
	"inputContainer": "SearchBar_inputContainer__Dgl6q",
	"filterIconContainer": "SearchBar_filterIconContainer__3JjRa",
	"filterIcon": "SearchBar_filterIcon__QpN40",
	"active": "SearchBar_active__b6GBc",
	"inputBox": "SearchBar_inputBox__163t-",
	"seachIcon": "SearchBar_seachIcon__3vOMh",
	"mic": "SearchBar_mic__2vufA",
	"seachIconActive": "SearchBar_seachIconActive__BDMhx",
	"waveIcon": "SearchBar_waveIcon__3kI48",
	"activeColor": "SearchBar_activeColor__f3X5i"
};


/***/ })

};
;