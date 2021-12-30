"use strict";
exports.id = 505;
exports.ids = [505];
exports.modules = {

/***/ 844768:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export useAuth */
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

const useAuth = () => useContext(AuthContext);

const mapStateToProps = state => ({
  activeUser: state.user.user
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_2__.connect)(mapStateToProps, {
  setActiveUser: _redux_users_user_action__WEBPACK_IMPORTED_MODULE_10__/* .setActiveUser */ .n
})(AuthProvider));

/***/ }),

/***/ 331024:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony exports sideTraySlice, setOpenFilterTray, setBlendTye, setIngredients, setCategoryTye */
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

/***/ })

};
;