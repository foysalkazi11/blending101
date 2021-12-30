exports.id = 3036;
exports.ids = [3036,505];
exports.modules = {

/***/ 844768:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "a": () => (/* binding */ useAuth),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(811163);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(837424);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _redux_users_user_action__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(377049);
/* harmony import */ var _redux_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(429927);
/* harmony import */ var _theme_loader_Loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(131338);
/* harmony import */ var aws_amplify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(131650);
/* harmony import */ var aws_amplify__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(aws_amplify__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _redux_slices_userSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(436958);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(591333);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _gqlLib_user_mutations_createNewUser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(87094);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(785893);









 // INITIALIZE 1: CREATE AUTH CONTEXT


const AuthContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(); // CONTEXT WRAPPER: PROVIDES AUTH

function AuthProvider({
  children,
  activeUser
}) {
  // INITIALIZE 2: DEFINE STATES
  const {
    0: active,
    1: setActive
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    user
  } = (0,_redux_hooks__WEBPACK_IMPORTED_MODULE_3__/* .useAppSelector */ .C)(state => state === null || state === void 0 ? void 0 : state.user);
  const [createNewUser] = (0,_apollo_client__WEBPACK_IMPORTED_MODULE_8__.useMutation)(_gqlLib_user_mutations_createNewUser__WEBPACK_IMPORTED_MODULE_6__/* .default */ .Z);
  const dispatch = (0,_redux_hooks__WEBPACK_IMPORTED_MODULE_3__/* .useAppDispatch */ .T)();
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)(); // SETS USER WHEN ACTIVE USER IS DETECTED
  // EXTRACT PAGE

  const page = router.pathname;

  const isCurrentUser = async () => {
    try {
      let userEmail = "";
      let provider = "";
      const user = await aws_amplify__WEBPACK_IMPORTED_MODULE_9__.Auth.currentAuthenticatedUser();

      if (user !== null && user !== void 0 && user.attributes) {
        const {
          attributes: {
            email
          }
        } = user;
        userEmail = email;
        provider = "email";
      } else {
        var _identities$;

        const {
          signInUserSession: {
            idToken: {
              payload: {
                email,
                given_name,
                identities
              }
            }
          }
        } = user;
        userEmail = email;
        provider = identities === null || identities === void 0 ? void 0 : (_identities$ = identities[0]) === null || _identities$ === void 0 ? void 0 : _identities$.providerName;
      }

      const {
        data
      } = await createNewUser({
        variables: {
          data: {
            email: userEmail,
            provider
          }
        }
      });
      dispatch((0,_redux_slices_userSlice__WEBPACK_IMPORTED_MODULE_5__/* .setUser */ .av)(userEmail));
      dispatch((0,_redux_slices_userSlice__WEBPACK_IMPORTED_MODULE_5__/* .setDbUser */ .LL)(data === null || data === void 0 ? void 0 : data.createNewUser));
      setActive(true);
    } catch (error) {
      console.log(error === null || error === void 0 ? void 0 : error.message);
      if (!user && false && page !== "/login" && page !== "/signup" && page !== "/varify_email") router.push("/login");
    }
  };

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (user) {
      setActive(true);
    } else {
      isCurrentUser();
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [user]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (page === "/login" || page === "/signup" || page === "/varify_email") {
      setActive(true);
    }
  }, [page]); // IF NO USER REDIRECT TO LOGIN PAGE

  if (!active) return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(_theme_loader_Loader__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z, {
    active: true
  });
  return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx(AuthContext.Provider, {
    value: {
      user
    },
    children: children
  });
}

const useAuth = () => (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(AuthContext);

const mapStateToProps = state => ({
  activeUser: state.user.user
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_2__.connect)(mapStateToProps, {
  setActiveUser: _redux_users_user_action__WEBPACK_IMPORTED_MODULE_10__/* .setActiveUser */ .n
})(AuthProvider));

/***/ }),

/***/ 533036:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ AContainer)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./auth/auth.component.jsx
var auth_component = __webpack_require__(844768);
// EXTERNAL MODULE: ./components/header/header.module.scss
var header_module = __webpack_require__(889248);
var header_module_default = /*#__PURE__*/__webpack_require__.n(header_module);
// EXTERNAL MODULE: ./node_modules/@fortawesome/react-fontawesome/index.js
var react_fontawesome = __webpack_require__(621559);
// EXTERNAL MODULE: ./node_modules/@fortawesome/free-brands-svg-icons/index.js
var free_brands_svg_icons = __webpack_require__(80134);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(785893);
;// CONCATENATED MODULE: ./components/header/social/Social.component.tsx






function SocialComponent(props) {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: (header_module_default()).social,
    children: [/*#__PURE__*/jsx_runtime.jsx("div", {
      className: (header_module_default()).social__child,
      children: /*#__PURE__*/jsx_runtime.jsx(react_fontawesome.FontAwesomeIcon, {
        icon: free_brands_svg_icons.faFacebookF
      })
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (header_module_default()).social__child,
      children: /*#__PURE__*/jsx_runtime.jsx(react_fontawesome.FontAwesomeIcon, {
        icon: free_brands_svg_icons.faInstagram
      })
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (header_module_default()).social__child,
      children: /*#__PURE__*/jsx_runtime.jsx(react_fontawesome.FontAwesomeIcon, {
        icon: free_brands_svg_icons.faPinterestP
      })
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (header_module_default()).social__child,
      children: /*#__PURE__*/jsx_runtime.jsx(react_fontawesome.FontAwesomeIcon, {
        icon: free_brands_svg_icons.faYoutube
      })
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (header_module_default()).social__child,
      children: /*#__PURE__*/jsx_runtime.jsx(react_fontawesome.FontAwesomeIcon, {
        icon: free_brands_svg_icons.faTwitter
      })
    })]
  });
}
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/LocalMall.js
var LocalMall = __webpack_require__(924776);
// EXTERNAL MODULE: ./components/utility/reactToastifyNotification.js
var reactToastifyNotification = __webpack_require__(609849);
// EXTERNAL MODULE: ./node_modules/aws-amplify/lib/index.js
var lib = __webpack_require__(131650);
// EXTERNAL MODULE: ./redux/hooks.ts
var hooks = __webpack_require__(429927);
// EXTERNAL MODULE: ./redux/slices/utilitySlice.ts
var utilitySlice = __webpack_require__(487425);
// EXTERNAL MODULE: ./redux/slices/userSlice.ts
var userSlice = __webpack_require__(436958);
// EXTERNAL MODULE: ./node_modules/react-icons/bs/index.esm.js
var index_esm = __webpack_require__(463750);
// EXTERNAL MODULE: ./node_modules/react-icons/hi/index.esm.js
var hi_index_esm = __webpack_require__(853854);
// EXTERNAL MODULE: ./node_modules/react-icons/md/index.esm.js
var md_index_esm = __webpack_require__(405434);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(741664);
// EXTERNAL MODULE: ./node_modules/react-icons/fa/index.esm.js
var fa_index_esm = __webpack_require__(889583);
;// CONCATENATED MODULE: ./components/header/Header.component.tsx
/* eslint-disable @next/next/no-img-element */
















function HeaderComponent({
  logo = true,
  headerTitle = "Home",
  fullWidth
}) {
  const {
    0: openPopup,
    1: setOpenPopup
  } = (0,react.useState)(false);
  const dispatch = (0,hooks/* useAppDispatch */.T)();
  const {
    user,
    dbUser
  } = (0,hooks/* useAppSelector */.C)(state => state === null || state === void 0 ? void 0 : state.user);

  const userSingOut = async () => {
    dispatch((0,utilitySlice/* setLoading */.K4)(true));

    try {
      await lib.Auth.signOut();
      dispatch((0,utilitySlice/* setLoading */.K4)(false));
      (0,reactToastifyNotification/* default */.Z)("info", "Logout successfully");
      dispatch((0,userSlice/* setUser */.av)(""));
      dispatch((0,userSlice/* setNonConfirmedUser */.GH)(""));
      dispatch((0,userSlice/* setDbUser */.LL)({}));
    } catch (error) {
      dispatch((0,utilitySlice/* setLoading */.K4)(false));
      (0,reactToastifyNotification/* default */.Z)("error", error === null || error === void 0 ? void 0 : error.message);
    }
  };

  const style = fullWidth ? {
    width: "100%"
  } : {};
  return /*#__PURE__*/jsx_runtime.jsx("div", {
    className: (header_module_default()).wrapper,
    children: /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (header_module_default()).header,
      style: style,
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (header_module_default()).header__inner,
        children: [/*#__PURE__*/jsx_runtime.jsx(next_link.default, {
          href: "/",
          passHref: true,
          children: /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (header_module_default()).left + " " + (header_module_default()).logo,
            children: logo && /*#__PURE__*/jsx_runtime.jsx("img", {
              src: "/logo.png",
              alt: "logo"
            })
          })
        }), /*#__PURE__*/jsx_runtime.jsx("div", {
          className: (header_module_default()).center + " " + (header_module_default()).info,
          children: /*#__PURE__*/jsx_runtime.jsx("h3", {
            children: headerTitle
          })
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (header_module_default()).right + " " + (header_module_default()).logo,
          children: [/*#__PURE__*/jsx_runtime.jsx("div", {
            children: /*#__PURE__*/jsx_runtime.jsx(SocialComponent, {})
          }), /*#__PURE__*/jsx_runtime.jsx("div", {
            children: /*#__PURE__*/jsx_runtime.jsx(LocalMall.default, {
              className: (header_module_default()).cart__icon
            })
          }), /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (header_module_default()).profile,
            children: dbUser !== null && dbUser !== void 0 && dbUser.image ? /*#__PURE__*/jsx_runtime.jsx("img", {
              src: dbUser === null || dbUser === void 0 ? void 0 : dbUser.image,
              alt: "prfile.png",
              style: {
                objectFit: "contain"
              }
            }) : /*#__PURE__*/jsx_runtime.jsx(fa_index_esm/* FaRegUser */.BKo, {
              style: {
                fontSize: "24px",
                justifySelf: "flex-end"
              }
            })
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: (header_module_default()).userPopupMenu,
            children: [user ? /*#__PURE__*/jsx_runtime.jsx("p", {
              className: (header_module_default()).welcomeText,
              children: "Welcome"
            }) : null, /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
              className: (header_module_default()).arrowWithText,
              children: [user ? /*#__PURE__*/jsx_runtime.jsx("strong", {
                className: (header_module_default()).userName,
                children: (dbUser === null || dbUser === void 0 ? void 0 : dbUser.displayName) || (dbUser === null || dbUser === void 0 ? void 0 : dbUser.lastName) || (dbUser === null || dbUser === void 0 ? void 0 : dbUser.firstName) || (dbUser === null || dbUser === void 0 ? void 0 : dbUser.email)
              }) : null, openPopup ? /*#__PURE__*/jsx_runtime.jsx(index_esm/* BsCaretUp */.mdy, {
                className: (header_module_default()).downArrow,
                onClick: () => setOpenPopup(pre => !pre)
              }) : /*#__PURE__*/jsx_runtime.jsx(index_esm/* BsCaretDown */.Kv_, {
                className: (header_module_default()).downArrow,
                onClick: () => setOpenPopup(pre => !pre)
              })]
            }), openPopup ? /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
              className: `${(header_module_default()).popup}`,
              style: {
                top: user ? "50px" : "inherits",
                marginLeft: user ? "-100px" : "inherits"
              },
              children: [user ? /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
                href: "/user",
                passHref: true,
                children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
                  className: (header_module_default()).menu,
                  children: [/*#__PURE__*/jsx_runtime.jsx("p", {
                    children: "My Profile"
                  }), /*#__PURE__*/jsx_runtime.jsx(hi_index_esm/* HiOutlineUserCircle */.fbd, {
                    className: (header_module_default()).icon
                  })]
                })
              }) : null, /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
                className: (header_module_default()).menu,
                children: [/*#__PURE__*/jsx_runtime.jsx("p", {
                  children: "Admin"
                }), /*#__PURE__*/jsx_runtime.jsx(md_index_esm/* MdOutlineAdminPanelSettings */.Tbc, {
                  className: (header_module_default()).icon
                })]
              }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
                className: (header_module_default()).menu,
                children: [/*#__PURE__*/jsx_runtime.jsx("p", {
                  children: "Help"
                }), /*#__PURE__*/jsx_runtime.jsx(md_index_esm/* MdHelpOutline */.$x8, {
                  className: (header_module_default()).icon
                })]
              }), user ? /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
                className: (header_module_default()).menu,
                onClick: userSingOut,
                children: [/*#__PURE__*/jsx_runtime.jsx("p", {
                  children: "Logout"
                }), /*#__PURE__*/jsx_runtime.jsx(md_index_esm/* MdOutlineLogout */.LvP, {
                  className: (header_module_default()).icon
                })]
              }) : /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
                href: "/login",
                passHref: true,
                children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
                  className: (header_module_default()).menu,
                  children: [/*#__PURE__*/jsx_runtime.jsx("p", {
                    children: "Login"
                  }), /*#__PURE__*/jsx_runtime.jsx(md_index_esm/* MdOutlineLogin */.y6x, {
                    className: (header_module_default()).icon
                  })]
                })
              })]
            }) : null]
          })]
        })]
      })
    })
  });
}
// EXTERNAL MODULE: ./node_modules/next/router.js
var next_router = __webpack_require__(811163);
// EXTERNAL MODULE: ./components/sidebar/sidebar.module.scss
var sidebar_module = __webpack_require__(790383);
var sidebar_module_default = /*#__PURE__*/__webpack_require__.n(sidebar_module);
;// CONCATENATED MODULE: ./components/sidebar/Sidebar.component.tsx
/* eslint-disable @next/next/no-img-element */





function SidebarComponent(props) {
  const {
    0: active,
    1: setActive
  } = (0,react.useState)(0);
  const router = (0,next_router.useRouter)();
  const pages = [{
    logo: "/icons/home.svg",
    link: "/"
  }, {
    logo: "/icons/juicer.svg",
    link: "/"
  }, {
    logo: "/icons/books.svg",
    link: "/"
  }, {
    logo: "/icons/calender__sidebar.svg",
    link: "/"
  }, {
    logo: "/icons/book_light.svg",
    link: "/"
  }, {
    logo: "/icons/whistle.svg",
    link: "/"
  }, {
    logo: "/icons/store.svg",
    link: "/"
  }];

  const handleClick = (link, i) => {
    setActive(i);
  };

  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: (sidebar_module_default()).sidebar,
    children: [/*#__PURE__*/jsx_runtime.jsx("div", {
      className: (sidebar_module_default()).logo,
      children: /*#__PURE__*/jsx_runtime.jsx("img", {
        src: "/logo_small.svg",
        alt: "logo small"
      })
    }), /*#__PURE__*/jsx_runtime.jsx("ul", {
      className: (sidebar_module_default()).list,
      children: pages && pages.map((page, i) => /*#__PURE__*/jsx_runtime.jsx("li", {
        className: active === i ? (sidebar_module_default()).active : "null",
        onClick: () => handleClick(page.link, i),
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)("span", {
          children: [" ", /*#__PURE__*/jsx_runtime.jsx("img", {
            src: page.logo,
            alt: page.logo
          }), " "]
        })
      }, "sidebaritem" + i))
    })]
  });
}
// EXTERNAL MODULE: ./components/sidetray/sidetrayRight/grocery/grocery.module.scss
var grocery_module = __webpack_require__(812290);
var grocery_module_default = /*#__PURE__*/__webpack_require__.n(grocery_module);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/ArrowBack.js
var ArrowBack = __webpack_require__(521023);
;// CONCATENATED MODULE: ./components/sidetray/sidetrayRight/grocery/Grocery.component.tsx
/* eslint-disable @next/next/no-img-element */





function GroceryComponent(props) {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: (grocery_module_default()).grocery,
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (grocery_module_default()).grocery__head,
      children: [/*#__PURE__*/jsx_runtime.jsx(ArrowBack.default, {}), /*#__PURE__*/jsx_runtime.jsx("p", {
        children: "Ingredient"
      })]
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (grocery_module_default()).groceries,
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (grocery_module_default()).item,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (grocery_module_default()).image,
          children: /*#__PURE__*/jsx_runtime.jsx("img", {
            src: "/other/cabbage.png",
            alt: ""
          })
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: "kale"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (grocery_module_default()).item,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (grocery_module_default()).image,
          children: /*#__PURE__*/jsx_runtime.jsx("img", {
            src: "/other/cabbage.png",
            alt: ""
          })
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: "Kollard"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (grocery_module_default()).item,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (grocery_module_default()).image,
          children: /*#__PURE__*/jsx_runtime.jsx("img", {
            src: "/other/cabbage.png",
            alt: ""
          })
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: "Spinach"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (grocery_module_default()).item,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (grocery_module_default()).image,
          children: /*#__PURE__*/jsx_runtime.jsx("img", {
            src: "/other/cabbage.png",
            alt: ""
          })
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: "Dandelion"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (grocery_module_default()).item,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (grocery_module_default()).image,
          children: /*#__PURE__*/jsx_runtime.jsx("img", {
            src: "/other/cabbage.png",
            alt: ""
          })
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: "kale"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (grocery_module_default()).item,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (grocery_module_default()).image,
          children: /*#__PURE__*/jsx_runtime.jsx("img", {
            src: "/other/cabbage.png",
            alt: ""
          })
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: "Kollard"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (grocery_module_default()).item,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (grocery_module_default()).image,
          children: /*#__PURE__*/jsx_runtime.jsx("img", {
            src: "/other/cabbage.png",
            alt: ""
          })
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: "kale"
        })]
      })]
    })]
  });
}
// EXTERNAL MODULE: ./components/sidetray/sidetrayRight/trayRight.module.scss
var trayRight_module = __webpack_require__(197221);
var trayRight_module_default = /*#__PURE__*/__webpack_require__.n(trayRight_module);
;// CONCATENATED MODULE: ./components/sidetray/sidetrayRight/SidetrayRight.component.tsx
/* eslint-disable @next/next/no-img-element */





function SidetrayrightComponent(props) {
  const {
    0: open,
    1: setOpen
  } = (0,react.useState)(false);
  const {
    0: toggle,
    1: setToggle
  } = (0,react.useState)(1);
  const ref = (0,react.useRef)();
  const reff = (0,react.useRef)();
  (0,react.useEffect)(() => {
    const elem = ref.current;
    if (!elem) return;

    if (open) {
      elem.style.right = '0';
    } else {
      elem.style.right = '-293px';
    }
  }, [open]);

  const handleClick = () => {
    setOpen(() => !open);
  };

  const handleToggle = no => {
    if (no === 1) {
      reff.current.style.left = '0';
    } else {
      reff.current.style.left = '50%';
    }

    setToggle(no);
  };

  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: (trayRight_module_default()).tray,
    ref: ref,
    children: [open ? /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (trayRight_module_default()).image,
      onClick: handleClick,
      children: /*#__PURE__*/jsx_runtime.jsx("img", {
        src: "/icons/cart__sidebar__orange.png",
        alt: "drawer__orange"
      })
    }) : /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (trayRight_module_default()).image + ' ' + (trayRight_module_default()).image__white,
      onClick: handleClick,
      children: /*#__PURE__*/jsx_runtime.jsx("img", {
        src: "/icons/cart__sidebar.svg",
        alt: "drawer"
      })
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (trayRight_module_default()).main,
      children: [/*#__PURE__*/jsx_runtime.jsx("div", {
        className: (trayRight_module_default()).main__top,
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (trayRight_module_default()).main__top__menu,
          children: [/*#__PURE__*/jsx_runtime.jsx("div", {
            className: (trayRight_module_default()).active,
            ref: reff
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: toggle === 2 ? (trayRight_module_default()).main__top__menu__child : (trayRight_module_default()).main__top__menu__child + ' ' + (trayRight_module_default()).active__menu,
            onClick: () => handleToggle(1),
            children: [/*#__PURE__*/jsx_runtime.jsx("img", {
              src: "/icons/cart__tray.svg",
              alt: ""
            }), " Grocery"]
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: toggle === 1 ? (trayRight_module_default()).main__top__menu__child : (trayRight_module_default()).main__top__menu__child + ' ' + (trayRight_module_default()).active__menu,
            onClick: () => handleToggle(2),
            children: [/*#__PURE__*/jsx_runtime.jsx("span", {}), " Shopping"]
          })]
        })
      }), /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (trayRight_module_default()).grocery,
        children: /*#__PURE__*/jsx_runtime.jsx(GroceryComponent, {})
      })]
    })]
  });
}
// EXTERNAL MODULE: ./containers/container.module.scss
var container_module = __webpack_require__(354733);
var container_module_default = /*#__PURE__*/__webpack_require__.n(container_module);
// EXTERNAL MODULE: ./components/sidetray/tray.module.scss
var tray_module = __webpack_require__(177377);
var tray_module_default = /*#__PURE__*/__webpack_require__.n(tray_module);
;// CONCATENATED MODULE: ./components/sidetray/leftTray.wrapper.tsx
/* eslint-disable @next/next/no-img-element */




function LeftTrayWrapper({
  children,
  filter,
  id
}) {
  const {
    0: openFilterTray,
    1: setOpenFilterTrat
  } = (0,react.useState)(false);
  const ref = (0,react.useRef)();
  (0,react.useEffect)(() => {
    const elem = ref.current;
    if (!elem) return;

    if (openFilterTray) {
      elem.style.left = "0";
    } else {
      elem.style.left = "-293px";
    }
  }, [openFilterTray]);

  const handleClick = () => {
    setOpenFilterTrat(() => !openFilterTray);
  };

  return /*#__PURE__*/jsx_runtime.jsx("div", {
    className: (tray_module_default()).tray,
    ref: ref,
    id: id,
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (tray_module_default()).tray__inner,
      children: [openFilterTray ? /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (tray_module_default()).image,
        onClick: handleClick,
        children: /*#__PURE__*/jsx_runtime.jsx("img", {
          src: "/icons/left__drawer__orange.svg",
          alt: "drawer__orange"
        })
      }) : filter ? null : /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (tray_module_default()).image + " " + (tray_module_default()).image__white,
        onClick: handleClick,
        children: /*#__PURE__*/jsx_runtime.jsx("img", {
          src: "/icons/left__drawer.svg",
          alt: "drawer"
        })
      }), children]
    })
  });
}
// EXTERNAL MODULE: ./components/sidetray/collection/content/content.module.scss
var content_module = __webpack_require__(538637);
var content_module_default = /*#__PURE__*/__webpack_require__.n(content_module);
;// CONCATENATED MODULE: ./components/sidetray/collection/content/collection.component.tsx




function CollectionComponent(props) {
  const data = [{
    title: 'Desert Smoothies',
    img: '/cards/valentine.png'
  }, {
    title: 'Desert Smoothies',
    img: '/cards/children.png'
  }, {
    title: 'Desert Smoothies',
    img: '/cards/diabetes.png'
  }, {
    title: 'Desert Smoothies',
    img: '/cards/food.png'
  }];
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: (content_module_default()).collection,
    children: [/*#__PURE__*/jsx_runtime.jsx("div", {
      className: (content_module_default()).collection__add
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (content_module_default()).collection__collections,
      children: data && data.map((item, i) => /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (content_module_default()).collection__child,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (content_module_default()).collection__child__img,
          children: /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (content_module_default()).collection__child__img__abs,
            style: {
              backgroundImage: `url(${item.img})`
            }
          })
        }), /*#__PURE__*/jsx_runtime.jsx("div", {
          className: (content_module_default()).collection__child__name,
          children: /*#__PURE__*/jsx_runtime.jsx("p", {
            children: item.title
          })
        })]
      }, 'collections__child' + i))
    })]
  });
}
;// CONCATENATED MODULE: ./components/sidetray/collection/content/theme.component.tsx




function ThemeComponent(props) {
  const data = [{
    title: 'Valentine',
    img: '/cards/valentine.png'
  }, {
    title: 'Children',
    img: '/cards/children.png'
  }, {
    title: 'Diabetes',
    img: '/cards/diabetes.png'
  }, {
    title: 'Weight Loss',
    img: '/cards/food.png'
  }, {
    title: 'Children',
    img: '/cards/children.png'
  }, {
    title: 'Diabetes',
    img: '/cards/diabetes.png'
  }];
  return /*#__PURE__*/jsx_runtime.jsx("div", {
    className: (content_module_default()).theme,
    children: data && data.map((item, i) => /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (content_module_default()).theme__child,
      children: [/*#__PURE__*/jsx_runtime.jsx("div", {
        className: (content_module_default()).theme__cover,
        children: /*#__PURE__*/jsx_runtime.jsx("div", {
          className: (content_module_default()).theme__cover__abs,
          style: {
            backgroundImage: `url(${item.img})`
          }
        })
      }), /*#__PURE__*/jsx_runtime.jsx("p", {
        children: item.title
      })]
    }, 'theme__child' + i))
  });
}
// EXTERNAL MODULE: ./components/sidetray/collection/trayleft.module.scss
var trayleft_module = __webpack_require__(232886);
var trayleft_module_default = /*#__PURE__*/__webpack_require__.n(trayleft_module);
;// CONCATENATED MODULE: ./components/sidetray/collection/collectionTray.component.tsx
/* eslint-disable @next/next/no-img-element */







function CollectionTray(props) {
  const {
    0: toggle,
    1: setToggle
  } = (0,react.useState)(1);
  const reff = (0,react.useRef)();

  const handleToggle = no => {
    if (no === 1) {
      reff.current.style.left = '0';
    } else {
      reff.current.style.left = '50%';
    }

    setToggle(no);
  };

  return /*#__PURE__*/jsx_runtime.jsx(LeftTrayWrapper, {
    id: "collection123",
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (trayleft_module_default()).main,
      children: [/*#__PURE__*/jsx_runtime.jsx("div", {
        className: (trayleft_module_default()).main__top,
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (trayleft_module_default()).main__top__menu,
          children: [/*#__PURE__*/jsx_runtime.jsx("div", {
            className: (trayleft_module_default()).active,
            ref: reff
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: toggle === 2 ? (trayleft_module_default()).main__top__menu__child : (trayleft_module_default()).main__top__menu__child + ' ' + (trayleft_module_default()).active__menu,
            onClick: () => handleToggle(1),
            children: [/*#__PURE__*/jsx_runtime.jsx("span", {}), " Collection"]
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: toggle === 1 ? (trayleft_module_default()).main__top__menu__child : (trayleft_module_default()).main__top__menu__child + ' ' + (trayleft_module_default()).active__menu,
            onClick: () => handleToggle(2),
            children: [/*#__PURE__*/jsx_runtime.jsx("span", {}), " Themes"]
          })]
        })
      }), toggle === 2 && /*#__PURE__*/jsx_runtime.jsx("div", {
        children: /*#__PURE__*/jsx_runtime.jsx(ThemeComponent, {})
      }), toggle === 1 && /*#__PURE__*/jsx_runtime.jsx("div", {
        children: /*#__PURE__*/jsx_runtime.jsx(CollectionComponent, {})
      })]
    })
  });
}
// EXTERNAL MODULE: ./components/sidetray/wiki/nutritiontray.module.scss
var nutritiontray_module = __webpack_require__(266566);
var nutritiontray_module_default = /*#__PURE__*/__webpack_require__.n(nutritiontray_module);
;// CONCATENATED MODULE: ./components/sidetray/wiki/wikiTray.component.tsx
/* eslint-disable @next/next/no-img-element */





function WikiTray({
  title,
  children
}) {
  return /*#__PURE__*/jsx_runtime.jsx(LeftTrayWrapper, {
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (nutritiontray_module_default()).nutrition,
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (nutritiontray_module_default()).nutrition__top,
        children: [/*#__PURE__*/jsx_runtime.jsx("h3", {
          children: "Type"
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (nutritiontray_module_default()).nutrition__menu,
          children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: (nutritiontray_module_default()).nutrition__menu__item,
            children: [/*#__PURE__*/jsx_runtime.jsx("div", {
              className: (nutritiontray_module_default()).nutrition__menu__item__image,
              children: /*#__PURE__*/jsx_runtime.jsx("img", {
                src: "/other/nutrition.svg",
                alt: "ingr"
              })
            }), /*#__PURE__*/jsx_runtime.jsx("p", {
              children: "Ingredients"
            })]
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: (nutritiontray_module_default()).nutrition__menu__item,
            children: [/*#__PURE__*/jsx_runtime.jsx("div", {
              className: (nutritiontray_module_default()).nutrition__menu__item__image,
              children: /*#__PURE__*/jsx_runtime.jsx("img", {
                src: "/other/nutritio.svg",
                alt: "ingr"
              })
            }), /*#__PURE__*/jsx_runtime.jsx("p", {
              children: "Nutrition"
            })]
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: (nutritiontray_module_default()).nutrition__menu__item,
            children: [/*#__PURE__*/jsx_runtime.jsx("div", {
              className: (nutritiontray_module_default()).nutrition__menu__item__image,
              children: /*#__PURE__*/jsx_runtime.jsx("img", {
                src: "/other/heart.svg",
                alt: "ingr"
              })
            }), /*#__PURE__*/jsx_runtime.jsx("p", {
              children: "Health"
            })]
          })]
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (nutritiontray_module_default()).nutrition__top,
        style: {
          marginTop: '20px'
        },
        children: [/*#__PURE__*/jsx_runtime.jsx("h3", {
          children: title
        }), children]
      })]
    })
  });
}
// EXTERNAL MODULE: ./node_modules/react-dropdown/dist/index.js
var dist = __webpack_require__(493658);
// EXTERNAL MODULE: ./components/sidetray/wiki/nutrition/nutrition.module.scss
var nutrition_module = __webpack_require__(988292);
var nutrition_module_default = /*#__PURE__*/__webpack_require__.n(nutrition_module);
;// CONCATENATED MODULE: ./components/sidetray/wiki/nutrition/nutrition.component.tsx






function NutritionTrayComponent({
  title
}) {
  const options = ["one", "two", "three"];
  const defaultOption = options[0];

  const onChange = () => {};

  return /*#__PURE__*/jsx_runtime.jsx(WikiTray, {
    title: title,
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (nutrition_module_default()).nutrition,
      children: [/*#__PURE__*/jsx_runtime.jsx(dist/* default */.Z, {
        options: options,
        onChange: onChange,
        value: defaultOption,
        placeholder: "Select an option",
        controlClassName: (nutrition_module_default()).dropdown
      }), /*#__PURE__*/jsx_runtime.jsx("div", {
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)("ul", {
          children: [/*#__PURE__*/jsx_runtime.jsx("li", {
            children: "A - Retinol"
          }), /*#__PURE__*/jsx_runtime.jsx("li", {
            children: "B1 - Thiamine"
          }), /*#__PURE__*/jsx_runtime.jsx("li", {
            children: "B2 - Riboflavin"
          }), /*#__PURE__*/jsx_runtime.jsx("li", {
            children: "B3 - Niacin"
          }), /*#__PURE__*/jsx_runtime.jsx("li", {
            children: "B5 - Pnatothenic Acid"
          }), /*#__PURE__*/jsx_runtime.jsx("li", {
            children: "B6 - Pyridoxine"
          }), /*#__PURE__*/jsx_runtime.jsx("li", {
            children: "B7 - Biotin"
          })]
        })
      })]
    })
  });
}
// EXTERNAL MODULE: ./components/sidetray/wiki/health/health.module.scss
var health_module = __webpack_require__(965070);
var health_module_default = /*#__PURE__*/__webpack_require__.n(health_module);
;// CONCATENATED MODULE: ./components/sidetray/wiki/health/heath.component.tsx






function HealthTrayComponent({
  title
}) {
  const options = ['systems', 'two', 'three'];
  const systems = ['Circulatory', 'Cardiovascular', 'Digestive', 'Excretory', 'Endocrine', 'Integumentry', 'Exocrine', 'Immune', 'Lymphatic', 'Muscular'];
  const defaultOption = options[0];

  const onChange = () => {};

  return /*#__PURE__*/jsx_runtime.jsx(WikiTray, {
    title: title,
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (health_module_default()).nutrition,
      children: [/*#__PURE__*/jsx_runtime.jsx(dist/* default */.Z, {
        options: options,
        onChange: onChange,
        value: defaultOption,
        placeholder: "Select an option",
        controlClassName: (health_module_default()).dropdown
      }), /*#__PURE__*/jsx_runtime.jsx("div", {
        children: /*#__PURE__*/jsx_runtime.jsx("ul", {
          children: systems && systems.map((system, i) => /*#__PURE__*/jsx_runtime.jsx("li", {
            children: system
          }, system + i))
        })
      })]
    })
  });
}
// EXTERNAL MODULE: ./components/sidetray/wiki/ingredient/ingredient.module.scss
var ingredient_module = __webpack_require__(790675);
var ingredient_module_default = /*#__PURE__*/__webpack_require__.n(ingredient_module);
;// CONCATENATED MODULE: ./components/sidetray/wiki/ingredient/ingredient.component.tsx
/* eslint-disable @next/next/no-img-element */






function IngredientTrayComponent({
  title
}) {
  const options = ['All', 'two', 'three'];
  const {
    0: toggle,
    1: setToggle
  } = (0,react.useState)('one');
  const defaultOption = options[0];
  const categories = ['Leafy Green', 'Collard'];
  const defOption = categories[0];

  const onChange = () => {};

  const UiOne = () => /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: (ingredient_module_default()).uiOne,
    children: [/*#__PURE__*/jsx_runtime.jsx(dist/* default */.Z, {
      options: options,
      onChange: onChange,
      value: defaultOption,
      placeholder: "Select an option",
      controlClassName: (ingredient_module_default()).dropdown
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (ingredient_module_default()).nutrition__menu,
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (ingredient_module_default()).nutrition__menu__item,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (ingredient_module_default()).nutrition__menu__item__image,
          children: /*#__PURE__*/jsx_runtime.jsx("img", {
            src: "/food/chard.png",
            alt: "ingr"
          })
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: "Ingredients"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (ingredient_module_default()).nutrition__menu__item,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (ingredient_module_default()).nutrition__menu__item__image,
          children: /*#__PURE__*/jsx_runtime.jsx("img", {
            src: "/food/kale.png",
            alt: "ingr"
          })
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: "Nutrition"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (ingredient_module_default()).nutrition__menu__item,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (ingredient_module_default()).nutrition__menu__item__image,
          children: /*#__PURE__*/jsx_runtime.jsx("img", {
            src: "/food/Dandelion.png",
            alt: "ingr"
          })
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: "Health"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (ingredient_module_default()).nutrition__menu__item,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (ingredient_module_default()).nutrition__menu__item__image,
          children: /*#__PURE__*/jsx_runtime.jsx("img", {
            src: "/food/spinach.png",
            alt: "ingr"
          })
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: "Ingredients"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (ingredient_module_default()).nutrition__menu__item,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (ingredient_module_default()).nutrition__menu__item__image,
          children: /*#__PURE__*/jsx_runtime.jsx("img", {
            src: "/food/collard_greens.png",
            alt: "ingr"
          })
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: "Nutrition"
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (ingredient_module_default()).nutrition__menu__item,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (ingredient_module_default()).nutrition__menu__item__image,
          children: /*#__PURE__*/jsx_runtime.jsx("img", {
            src: "/food/spinach.png",
            alt: "ingr"
          })
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: "Health"
        })]
      })]
    })]
  });

  const UiTwo = () => /*#__PURE__*/jsx_runtime.jsx("div", {
    className: (ingredient_module_default()).uiOne,
    children: /*#__PURE__*/jsx_runtime.jsx(dist/* default */.Z, {
      options: options,
      onChange: onChange,
      value: defOption,
      placeholder: "Select an option",
      controlClassName: (ingredient_module_default()).dropdown
    })
  });

  return /*#__PURE__*/jsx_runtime.jsx(WikiTray, {
    title: title,
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (ingredient_module_default()).nutrition,
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (ingredient_module_default()).toggle,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: toggle === 'one' ? (ingredient_module_default()).toggle__child + ' ' + (ingredient_module_default()).active : (ingredient_module_default()).toggle__child,
          onClick: () => setToggle('one'),
          children: "Pictures"
        }), /*#__PURE__*/jsx_runtime.jsx("div", {
          className: toggle === 'two' ? (ingredient_module_default()).toggle__child + ' ' + (ingredient_module_default()).active : (ingredient_module_default()).toggle__child,
          onClick: () => setToggle('two'),
          children: "Rankings"
        })]
      }), /*#__PURE__*/jsx_runtime.jsx("div", {
        children: toggle === 'one' ? /*#__PURE__*/jsx_runtime.jsx(UiOne, {}) : /*#__PURE__*/jsx_runtime.jsx(UiTwo, {})
      })]
    })
  });
}
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/index.js
var icons_material = __webpack_require__(386878);
// EXTERNAL MODULE: ./redux/slices/sideTraySlice.ts
var sideTraySlice = __webpack_require__(331024);
;// CONCATENATED MODULE: ./components/sidetray/filter.wrapper.tsx
/* eslint-disable @next/next/no-img-element */






function FilterTrayWrapper({
  children,
  filter,
  id
}) {
  const {
    openFilterTray
  } = (0,hooks/* useAppSelector */.C)(state => state === null || state === void 0 ? void 0 : state.sideTray);
  const dispatch = (0,hooks/* useAppDispatch */.T)();
  console.log(filter, id);
  const ref = (0,react.useRef)();
  (0,react.useEffect)(() => {
    const elem = ref.current;
    if (!elem) return;

    if (openFilterTray) {
      elem.style.left = "0";
    } else {
      elem.style.left = "-293px";
    }
  }, [openFilterTray]);

  const handleClick = () => {
    dispatch((0,sideTraySlice/* setOpenFilterTray */.Js)(!openFilterTray));
  };

  return /*#__PURE__*/jsx_runtime.jsx("div", {
    className: (tray_module_default()).tray,
    ref: ref,
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (tray_module_default()).tray__inner,
      children: [openFilterTray ? /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (tray_module_default()).image,
        onClick: handleClick,
        children: /*#__PURE__*/jsx_runtime.jsx("img", {
          src: "/icons/filter-icon.svg",
          alt: "drawer__orange"
        })
      }) : null, children]
    })
  });
}
// EXTERNAL MODULE: ./components/sidetray/filter/filter.module.scss
var filter_module = __webpack_require__(382505);
var filter_module_default = /*#__PURE__*/__webpack_require__.n(filter_module);
// EXTERNAL MODULE: ./theme/calcium/calcium.component.tsx
var calcium_component = __webpack_require__(253226);
// EXTERNAL MODULE: ./theme/dropDown/dpd.module.scss
var dpd_module = __webpack_require__(205357);
var dpd_module_default = /*#__PURE__*/__webpack_require__.n(dpd_module);
;// CONCATENATED MODULE: ./theme/dropDown/dropdownTwo.component.tsx





function DropdownTwoComponent({
  value,
  setValue,
  height,
  list
}) {
  const ref = (0,react.useRef)();
  const {
    0: active,
    1: setActive
  } = (0,react.useState)(false);
  const style = height ? {
    height: `${height}px`
  } : {
    height: '40px'
  };

  const handleToggle = item => {
    setActive(() => !active);
    const style = ref.current.style.overflow;

    if (style === 'visible') {
      ref.current.style.overflow = 'hidden';
    } else {
      ref.current.style.overflow = 'visible';
    }

    setValue(item);
  };

  return /*#__PURE__*/jsx_runtime.jsx("div", {
    className: (dpd_module_default()).dpd,
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (dpd_module_default()).dropdown,
      ref: ref,
      style: style,
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (dpd_module_default()).dropdown__top,
        style: style,
        onClick: handleToggle,
        children: [value.title, /*#__PURE__*/jsx_runtime.jsx("div", {
          children: !active ? /*#__PURE__*/jsx_runtime.jsx(icons_material/* ArrowDropDown */.Dk4, {
            className: (dpd_module_default()).dropdown__top__icon
          }) : /*#__PURE__*/jsx_runtime.jsx(icons_material/* ArrowDropUp */.DWi, {
            className: (dpd_module_default()).dropdown__top__icon
          })
        })]
      }), /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (dpd_module_default()).dropdown__bottom,
        children: /*#__PURE__*/jsx_runtime.jsx("div", {
          className: (dpd_module_default()).menu,
          children: list && list.map((item, i) => /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (dpd_module_default()).dropdown__bottom__list,
            onClick: () => handleToggle(item),
            children: item.title
          }, 'item' + i))
        })
      })]
    })
  });
}
// EXTERNAL MODULE: ./theme/linearProgress/LinearProgress.component.tsx + 1 modules
var LinearProgress_component = __webpack_require__(751461);
// EXTERNAL MODULE: ./theme/switch/switchTwo.module.scss
var switchTwo_module = __webpack_require__(732577);
var switchTwo_module_default = /*#__PURE__*/__webpack_require__.n(switchTwo_module);
;// CONCATENATED MODULE: ./theme/switch/switchTwo.component.tsx




function SwitchTwoComponent({
  value,
  setValue,
  titleOne,
  titleTwo
}) {
  const ref = (0,react.useRef)();

  const handleToggle = VAL => {
    setValue(VAL);

    if (VAL === 1) {
      ref.current.style.left = '0';
    } else {
      ref.current.style.left = '50%';
    }
  };

  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: (switchTwo_module_default()).main__top__menu,
    children: [/*#__PURE__*/jsx_runtime.jsx("div", {
      className: (switchTwo_module_default()).active,
      ref: ref
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: value === 2 ? (switchTwo_module_default()).main__top__menu__child : (switchTwo_module_default()).main__top__menu__child + ' ' + (switchTwo_module_default()).active__menu,
      onClick: () => handleToggle(1),
      children: [/*#__PURE__*/jsx_runtime.jsx("span", {}), " ", titleOne]
    }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: value === 1 ? (switchTwo_module_default()).main__top__menu__child : (switchTwo_module_default()).main__top__menu__child + ' ' + (switchTwo_module_default()).active__menu,
      onClick: () => handleToggle(2),
      children: [/*#__PURE__*/jsx_runtime.jsx("span", {}), " ", titleTwo]
    })]
  });
}
;// CONCATENATED MODULE: ./components/sidetray/filter/filterRankingList.tsx
const filterRankingList = [{
  name: "Mustard Greens",
  percent: 103
}, {
  name: "Swish Chards",
  percent: 95
}, {
  name: "Arugula",
  percent: 90
}, {
  name: "Beet Greens",
  percent: 80
}, {
  name: "Kale",
  percent: 75
}];
const blendTypes = [{
  title: 'Smoothies',
  img: '/food/wholefood.png'
}, {
  title: 'Wholefood',
  img: '/food/soup.svg'
}, {
  title: 'Frozen',
  img: '/food/frozen.png'
}, {
  title: 'Drinks',
  img: '/food/fresh.png'
}, {
  title: 'Dessert',
  img: '/other/nutritio.svg'
}, {
  title: 'Teas',
  img: '/other/heart.svg'
}];
const ingredientLeafy = [{
  title: 'Kale',
  img: '/food/chard.png'
}, {
  title: 'Collard',
  img: '/food/dandelion.png'
}, {
  title: 'Brocli',
  img: '/food/chard.png'
}, {
  title: 'Peas',
  img: '/food/spinach.png'
}, {
  title: 'Onion',
  img: '/food/collard_greens.png'
}, {
  title: 'Cauliflower',
  img: '/food/fresh.png'
}];
;// CONCATENATED MODULE: ./components/sidetray/filter/filterBottom.component.tsx
/* eslint-disable @next/next/no-img-element */












function FilterbottomComponent(props) {
  const {
    0: toggle,
    1: setToggle
  } = (0,react.useState)(1);
  const {
    0: dpd,
    1: setDpd
  } = (0,react.useState)({
    title: "All",
    val: "all"
  });
  const ingredients = filterRankingList;
  const dispatch = (0,hooks/* useAppDispatch */.T)();
  const ingredientsList = (0,hooks/* useAppSelector */.C)(state => state.sideTray.ingredients);
  console.log("Ingredients", ingredientsList);

  const handleIngredientClick = ingredient => {
    let blendz = [];
    let present = false;
    ingredientsList.forEach(blen => {
      if (blen === ingredient) {
        present = true;
      }
    });

    if (!present) {
      blendz = [...ingredientsList, ingredient];
    } else {
      blendz = ingredientsList.filter(blen => {
        return blen !== ingredient;
      });
    }

    dispatch((0,sideTraySlice/* setIngredients */.zz)(blendz));
  };

  const categories = [{
    title: "All",
    val: "all"
  }, {
    title: "Leafy",
    val: "leafy"
  }, {
    title: "Fruity",
    val: "Fruity"
  }, {
    title: "Nutty",
    val: "nutty"
  }, {
    title: "Frozed",
    val: "frozed"
  }];

  const checkActive = ingredient => {
    let present = false;
    ingredientsList.forEach(blen => {
      //@ts-ignore
      if (blen.title === ingredient) {
        present = true;
      }
    });
    return present;
  };

  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: (filter_module_default()).filter__bottom,
    children: [/*#__PURE__*/jsx_runtime.jsx(SwitchTwoComponent, {
      value: toggle,
      setValue: setToggle,
      titleOne: "Pictures",
      titleTwo: "Rankings"
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (filter_module_default()).dropdown,
      children: /*#__PURE__*/jsx_runtime.jsx(DropdownTwoComponent, {
        value: dpd,
        list: categories,
        setValue: setDpd
      })
    }), toggle === 1 && /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (filter_module_default()).pictures,
      children: /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (filter_module_default()).filter__menu,
        children: ingredientLeafy && ingredientLeafy.map((item, i) => /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (filter_module_default()).filter__menu__item,
          onClick: () => handleIngredientClick(item),
          children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: (filter_module_default()).filter__menu__item__image,
            children: [/*#__PURE__*/jsx_runtime.jsx("img", {
              src: item.img,
              alt: item.title
            }), checkActive(item.title) && /*#__PURE__*/jsx_runtime.jsx("div", {
              className: (filter_module_default()).tick,
              children: /*#__PURE__*/jsx_runtime.jsx(icons_material/* CheckCircle */.fU8, {
                className: (filter_module_default()).ticked
              })
            })]
          }), /*#__PURE__*/jsx_runtime.jsx("p", {
            children: item.title
          })]
        }, item.title + i))
      })
    }), toggle === 2 && /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (filter_module_default()).rankings,
      children: [/*#__PURE__*/jsx_runtime.jsx(calcium_component/* default */.Z, {}), ingredients.map(({
        name,
        percent
      }, index) => {
        return /*#__PURE__*/jsx_runtime.jsx(LinearProgress_component/* default */.Z, {
          name: name,
          percent: percent,
          checkbox: true
        }, index);
      })]
    })]
  });
}
;// CONCATENATED MODULE: ./components/sidetray/filter/filterTray.component.tsx
/* eslint-disable @next/next/no-img-element */










function Filtertray({
  filter
}) {
  const dispatch = (0,hooks/* useAppDispatch */.T)();
  const blends = (0,hooks/* useAppSelector */.C)(state => state.sideTray.blends);
  console.log("blends", blends);

  const handleBlendClick = blend => {
    let blendz = [];
    let present = false;
    blends.forEach(blen => {
      if (blen === blend) {
        present = true;
      }
    });

    if (!present) {
      blendz = [...blends, blend];
    } else {
      blendz = blends.filter(blen => {
        return blen !== blend;
      });
    }

    dispatch((0,sideTraySlice/* setBlendTye */.oj)(blendz));
  };

  const checkActive = blend => {
    let present = false;
    blends.forEach(blen => {
      //@ts-ignore
      if (blen.title === blend) {
        present = true;
      }
    });
    return present;
  };

  return /*#__PURE__*/jsx_runtime.jsx(FilterTrayWrapper, {
    filter: filter,
    id: "filter123",
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (filter_module_default()).filter,
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (filter_module_default()).filter__top,
        children: [/*#__PURE__*/jsx_runtime.jsx("h3", {
          children: "Blend Type"
        }), /*#__PURE__*/jsx_runtime.jsx("div", {
          className: (filter_module_default()).filter__menu,
          children: blendTypes && blendTypes.map((blend, i) => /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: (filter_module_default()).filter__menu__item,
            onClick: () => handleBlendClick(blend),
            children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
              className: (filter_module_default()).filter__menu__item__image,
              children: [/*#__PURE__*/jsx_runtime.jsx("img", {
                src: blend.img,
                alt: blend.title
              }), checkActive(blend.title) && /*#__PURE__*/jsx_runtime.jsx("div", {
                className: (filter_module_default()).tick,
                children: /*#__PURE__*/jsx_runtime.jsx(icons_material/* CheckCircle */.fU8, {
                  className: (filter_module_default()).ticked
                })
              })]
            }), /*#__PURE__*/jsx_runtime.jsx("p", {
              children: blend.title
            })]
          }, blend.title + i))
        })]
      }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (filter_module_default()).filter__top,
        style: {
          marginTop: "15px"
        },
        children: [/*#__PURE__*/jsx_runtime.jsx("h3", {
          children: "Ingredients"
        }), /*#__PURE__*/jsx_runtime.jsx(FilterbottomComponent, {})]
      })]
    })
  });
}
;// CONCATENATED MODULE: ./containers/A.container.tsx













function AContainer(props) {
  const {
    user
  } = (0,auth_component/* useAuth */.a)();
  const {
    showHeader = true,
    showSidebar = true,
    showLeftTray = false,
    showRighTray = false,
    logo = true,
    headerTitle = "",
    nutritionTray = false,
    healthTray = false,
    ingredientTray = false,
    filterTray = false,
    headerFullWidth = false
  } = props;
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: (container_module_default()).containerA,
    children: [showSidebar ? /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (container_module_default()).sidebarA,
      children: /*#__PURE__*/jsx_runtime.jsx(SidebarComponent, {})
    }) : null, /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (container_module_default()).mainA,
      children: [showHeader ? /*#__PURE__*/jsx_runtime.jsx(HeaderComponent, {
        logo: logo,
        headerTitle: headerTitle,
        fullWidth: headerFullWidth
      }) : null, showLeftTray ? /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (container_module_default()).fixed__main__left,
        children: /*#__PURE__*/jsx_runtime.jsx(CollectionTray, {})
      }) : null, showRighTray ? /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (container_module_default()).fixed__main__right,
        children: /*#__PURE__*/jsx_runtime.jsx(SidetrayrightComponent, {})
      }) : null, nutritionTray && /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (container_module_default()).fixed__main__left,
        children: /*#__PURE__*/jsx_runtime.jsx(NutritionTrayComponent, {
          title: "Nutrition Lists"
        })
      }), healthTray && /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (container_module_default()).fixed__main__left,
        children: /*#__PURE__*/jsx_runtime.jsx(HealthTrayComponent, {
          title: "Health Lists"
        })
      }), ingredientTray && /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (container_module_default()).fixed__main__left,
        children: /*#__PURE__*/jsx_runtime.jsx(IngredientTrayComponent, {
          title: "Ingredient Lists"
        })
      }), filterTray && /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (container_module_default()).fixed__main__left,
        children: /*#__PURE__*/jsx_runtime.jsx(Filtertray, {
          filter: "true"
        })
      }), props.children]
    })]
  });
}

/***/ }),

/***/ 331024:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Js": () => (/* binding */ setOpenFilterTray),
/* harmony export */   "oj": () => (/* binding */ setBlendTye),
/* harmony export */   "zz": () => (/* binding */ setIngredients),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports sideTraySlice, setCategoryTye */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(947389);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
  openFilterTray: false,
  blends: [],
  category: null,
  ingredients: []
};
const sideTraySlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
  name: "sideTray",
  initialState,
  reducers: {
    setOpenFilterTray: (state, action) => {
      state.openFilterTray = action === null || action === void 0 ? void 0 : action.payload;
    },
    setBlendTye: (state, action) => {
      state.blends = action === null || action === void 0 ? void 0 : action.payload;
    },
    setCategoryTye: (state, action) => {
      state.category = action === null || action === void 0 ? void 0 : action.payload;
    },
    setIngredients: (state, action) => {
      state.ingredients = action === null || action === void 0 ? void 0 : action.payload;
    }
  }
});
const {
  setOpenFilterTray,
  setBlendTye,
  setIngredients,
  setCategoryTye
} = sideTraySlice === null || sideTraySlice === void 0 ? void 0 : sideTraySlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sideTraySlice === null || sideTraySlice === void 0 ? void 0 : sideTraySlice.reducer);

/***/ }),

/***/ 436958:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GH": () => (/* binding */ setNonConfirmedUser),
/* harmony export */   "av": () => (/* binding */ setUser),
/* harmony export */   "LL": () => (/* binding */ setDbUser),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports userSlice, setProvider */
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(947389);
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__);

const initialState = {
  nonConfirmedUser: "",
  user: null,
  dbUser: {},
  provider: "email"
};
const userSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action === null || action === void 0 ? void 0 : action.payload;
    },
    setNonConfirmedUser: (state, action) => {
      state.nonConfirmedUser = action === null || action === void 0 ? void 0 : action.payload;
    },
    setDbUser: (state, action) => {
      state.dbUser = action === null || action === void 0 ? void 0 : action.payload;
    },
    setProvider: (state, action) => {
      state.provider = action === null || action === void 0 ? void 0 : action.payload;
    }
  }
});
const {
  setNonConfirmedUser,
  setUser,
  setDbUser,
  setProvider
} = userSlice === null || userSlice === void 0 ? void 0 : userSlice.actions;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userSlice === null || userSlice === void 0 ? void 0 : userSlice.reducer);

/***/ }),

/***/ 253226:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(667294);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(889583);
/* harmony import */ var _calcium_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(157980);
/* harmony import */ var _calcium_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_calcium_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(785893);






const CalciumSearchElem = () => {
  const {
    0: sortState,
    1: curSortState
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);

  const SortingOrder = () => {
    curSortState(!sortState);
    return sortState;
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: (_calcium_module_scss__WEBPACK_IMPORTED_MODULE_2___default().calciumMg),
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: (_calcium_module_scss__WEBPACK_IMPORTED_MODULE_2___default().calciumText),
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("input", {
          type: "text",
          placeholder: "Calcium (mg)"
        })
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
      className: (_calcium_module_scss__WEBPACK_IMPORTED_MODULE_2___default().calciumIcon),
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("div", {
        children: sortState ? /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("span", {
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__/* .FaSortAmountDown */ .r_, {
            onClick: SortingOrder
          })
        }) : /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx("span", {
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__/* .FaSortAmountDownAlt */ ._Tc, {
            onClick: SortingOrder
          })
        })
      })
    })]
  });
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CalciumSearchElem);

/***/ }),

/***/ 751461:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ LinearProgress_component)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./theme/linearProgress/linearProgress.module.scss
var linearProgress_module = __webpack_require__(114977);
var linearProgress_module_default = /*#__PURE__*/__webpack_require__.n(linearProgress_module);
// EXTERNAL MODULE: ./theme/linearProgress/progress/progress.module.scss
var progress_module = __webpack_require__(921383);
var progress_module_default = /*#__PURE__*/__webpack_require__.n(progress_module);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(785893);
;// CONCATENATED MODULE: ./theme/linearProgress/progress/progress.component.tsx




const LinearIndicatorcomponent = ({
  percent
}) => {
  let width = percent.toString() + "%";
  console.log(width);
  let style = {
    width
  }; // console.log(style);

  return /*#__PURE__*/jsx_runtime.jsx("div", {
    className: (progress_module_default()).LinearIndicatorDiv,
    children: /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (progress_module_default()).progressBar,
      style: style,
      role: "progressbar",
      children: "."
    })
  });
};

/* harmony default export */ const progress_component = (LinearIndicatorcomponent);
;// CONCATENATED MODULE: ./theme/linearProgress/LinearProgress.component.tsx






const Linearcomponent = ({
  name,
  percent,
  checkbox
}) => {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
    className: (linearProgress_module_default()).mainDiv,
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (linearProgress_module_default()).cardHeadComponent,
      children: [checkbox === true ? /*#__PURE__*/(0,jsx_runtime.jsxs)("span", {
        className: (linearProgress_module_default()).container,
        children: [/*#__PURE__*/jsx_runtime.jsx("input", {
          className: (linearProgress_module_default()).checkbox,
          type: "checkbox"
        }), /*#__PURE__*/jsx_runtime.jsx("span", {
          className: (linearProgress_module_default()).mark
        })]
      }) : "", /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (linearProgress_module_default()).title,
        children: name
      }), /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (linearProgress_module_default()).score,
        children: percent
      })]
    }), /*#__PURE__*/jsx_runtime.jsx(progress_component, {
      percent: percent
    })]
  });
};

/* harmony default export */ const LinearProgress_component = (Linearcomponent);

/***/ }),

/***/ 889248:
/***/ ((module) => {

// Exports
module.exports = {
	"wrapper": "header_wrapper__3Ghzm",
	"header": "header_header__3hRD-",
	"header__inner": "header_header__inner__Q376o",
	"left": "header_left__1fvHf",
	"social": "header_social__2zzOK",
	"social__child": "header_social__child__2BzMC",
	"right": "header_right__1OBxp",
	"cart__icon": "header_cart__icon__3Z2a1",
	"profile": "header_profile__3t0_I",
	"center": "header_center__2q_Wp",
	"userPopupMenu": "header_userPopupMenu__HQlkq",
	"welcomeText": "header_welcomeText__YuFfP",
	"arrowWithText": "header_arrowWithText__ePG9V",
	"userName": "header_userName__3SWfu",
	"downArrow": "header_downArrow__NCwU2",
	"popup": "header_popup__3FJMC",
	"menu": "header_menu__1Lj2F",
	"icon": "header_icon__3N-6u"
};


/***/ }),

/***/ 790383:
/***/ ((module) => {

// Exports
module.exports = {
	"sidebar": "sidebar_sidebar__3cMvQ",
	"logo": "sidebar_logo__3BBbo",
	"list": "sidebar_list__17MBA",
	"active": "sidebar_active__RSvS9"
};


/***/ }),

/***/ 538637:
/***/ ((module) => {

// Exports
module.exports = {
	"theme": "content_theme__2_C_K",
	"theme__child": "content_theme__child__3qQAQ",
	"theme__cover": "content_theme__cover__39Keh",
	"theme__cover__abs": "content_theme__cover__abs__2bFGT",
	"collection": "content_collection__1MgIs",
	"collection__child": "content_collection__child__31JZU",
	"collection__child__img": "content_collection__child__img__2_Ukl",
	"collection__child__img__abs": "content_collection__child__img__abs__1ffMW"
};


/***/ }),

/***/ 232886:
/***/ ((module) => {

// Exports
module.exports = {
	"tray": "trayleft_tray__3lvD0",
	"image": "trayleft_image__3Hh0p",
	"image__white": "trayleft_image__white__2MBv_",
	"main__top__menu": "trayleft_main__top__menu__2KRjD",
	"main__top__menu__child": "trayleft_main__top__menu__child__RkHtR",
	"active": "trayleft_active__39LmU",
	"active__menu": "trayleft_active__menu__1x1qg"
};


/***/ }),

/***/ 382505:
/***/ ((module) => {

// Exports
module.exports = {
	"filter__top": "filter_filter__top__2ClIr",
	"filter__menu": "filter_filter__menu__3H6lR",
	"filter__menu__item": "filter_filter__menu__item__HdQte",
	"filter__menu__item__image": "filter_filter__menu__item__image__1MBo4",
	"filter__bottom": "filter_filter__bottom__2qUqA",
	"dropdown": "filter_dropdown__2BvM0",
	"tick": "filter_tick__Lks4y",
	"ticked": "filter_ticked__pbTT6"
};


/***/ }),

/***/ 812290:
/***/ ((module) => {

// Exports
module.exports = {
	"grocery": "grocery_grocery__33Z2t",
	"grocery__head": "grocery_grocery__head__39usb",
	"groceries": "grocery_groceries__1geUa",
	"item": "grocery_item__2fyWk",
	"image": "grocery_image__7HWTw"
};


/***/ }),

/***/ 197221:
/***/ ((module) => {

// Exports
module.exports = {
	"tray": "trayRight_tray__1UQ99",
	"image": "trayRight_image__3Jn4z",
	"image__white": "trayRight_image__white__20gXL",
	"main__top__menu": "trayRight_main__top__menu__1LgXD",
	"main__top__menu__child": "trayRight_main__top__menu__child__2-ApN",
	"active": "trayRight_active__2r2un",
	"active__menu": "trayRight_active__menu__2kBSV"
};


/***/ }),

/***/ 177377:
/***/ ((module) => {

// Exports
module.exports = {
	"tray": "tray_tray__3pVmH",
	"tray__inner": "tray_tray__inner__bkl5_",
	"image": "tray_image__1njqO",
	"active": "tray_active__3dMAj"
};


/***/ }),

/***/ 965070:
/***/ ((module) => {

// Exports
module.exports = {
	"nutrition": "health_nutrition__Bg5Sc",
	"dropdown": "health_dropdown__1J3KQ"
};


/***/ }),

/***/ 790675:
/***/ ((module) => {

// Exports
module.exports = {
	"nutrition": "ingredient_nutrition__2EVtE",
	"dropdown": "ingredient_dropdown__1arQo",
	"toggle": "ingredient_toggle__3bspP",
	"toggle__child": "ingredient_toggle__child__3awIb",
	"active": "ingredient_active__q6VoW",
	"nutrition__menu": "ingredient_nutrition__menu__3dxVM",
	"nutrition__menu__item": "ingredient_nutrition__menu__item__3Shbs",
	"nutrition__menu__item__image": "ingredient_nutrition__menu__item__image___Jpor"
};


/***/ }),

/***/ 988292:
/***/ ((module) => {

// Exports
module.exports = {
	"nutrition": "nutrition_nutrition__1j15k",
	"dropdown": "nutrition_dropdown__1KmP0"
};


/***/ }),

/***/ 266566:
/***/ ((module) => {

// Exports
module.exports = {
	"nutrition__top": "nutritiontray_nutrition__top__39jeI",
	"nutrition__menu": "nutritiontray_nutrition__menu__7PBTV",
	"nutrition__menu__item": "nutritiontray_nutrition__menu__item__1ppy4",
	"nutrition__menu__item__image": "nutritiontray_nutrition__menu__item__image__3ByV0"
};


/***/ }),

/***/ 354733:
/***/ ((module) => {

// Exports
module.exports = {
	"containerA": "container_containerA__CteTu",
	"sidebarA": "container_sidebarA__wjLE1",
	"mainA": "container_mainA__bXfyM",
	"fixed__main__left": "container_fixed__main__left__3bnbT",
	"fixed__main__right": "container_fixed__main__right__1PM8M"
};


/***/ }),

/***/ 157980:
/***/ ((module) => {

// Exports
module.exports = {
	"calciumText": "calcium_calciumText__3lQB3",
	"calciumMg": "calcium_calciumMg__1Gn8B",
	"calciumIcon": "calcium_calciumIcon__3XXvb"
};


/***/ }),

/***/ 205357:
/***/ ((module) => {

// Exports
module.exports = {
	"dropdown": "dpd_dropdown__Um0fW",
	"dropdown__top": "dpd_dropdown__top__2TGBY",
	"dropdown__top__icon": "dpd_dropdown__top__icon__1fIvu",
	"dropdown__bottom": "dpd_dropdown__bottom__1KNcm",
	"dropdown__bottom__list": "dpd_dropdown__bottom__list__391Cn"
};


/***/ }),

/***/ 114977:
/***/ ((module) => {

// Exports
module.exports = {
	"mainDiv": "linearProgress_mainDiv__3MAZ6",
	"cardHeadComponent": "linearProgress_cardHeadComponent__3G952",
	"container": "linearProgress_container__plp-7",
	"title": "linearProgress_title__2H0kt",
	"score": "linearProgress_score__3JbWk"
};


/***/ }),

/***/ 921383:
/***/ ((module) => {

// Exports
module.exports = {
	"LinearIndicatorDiv": "progress_LinearIndicatorDiv__3QjKI",
	"progressBar": "progress_progressBar__tBz5c"
};


/***/ }),

/***/ 732577:
/***/ ((module) => {

// Exports
module.exports = {
	"main__top__menu": "switchTwo_main__top__menu__1gbQ8",
	"main__top__menu__child": "switchTwo_main__top__menu__child__1LMsd",
	"active": "switchTwo_active__1lJjw",
	"active__menu": "switchTwo_active__menu__1yCNc"
};


/***/ })

};
;