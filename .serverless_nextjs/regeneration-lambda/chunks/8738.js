exports.id = 8738;
exports.ids = [8738];
exports.modules = {

/***/ 188738:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ authScreen_component)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(667294);
// EXTERNAL MODULE: ./theme/authScreen/authScreen.module.scss
var authScreen_module = __webpack_require__(548731);
var authScreen_module_default = /*#__PURE__*/__webpack_require__.n(authScreen_module);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(741664);
// EXTERNAL MODULE: ./theme/button/buttonA/button.component.tsx
var button_component = __webpack_require__(72742);
// EXTERNAL MODULE: ./theme/input/inputField.component.tsx
var inputField_component = __webpack_require__(506252);
// EXTERNAL MODULE: ./theme/authScreen/authComponents/socialTray/socialTray.module.scss
var socialTray_module = __webpack_require__(866533);
var socialTray_module_default = /*#__PURE__*/__webpack_require__.n(socialTray_module);
// EXTERNAL MODULE: ./node_modules/aws-amplify/lib/index.js
var lib = __webpack_require__(131650);
// EXTERNAL MODULE: ./node_modules/@apollo/client/main.cjs
var main = __webpack_require__(591333);
// EXTERNAL MODULE: ./gqlLib/user/mutations/createNewUser.ts
var mutations_createNewUser = __webpack_require__(87094);
// EXTERNAL MODULE: ./redux/hooks.ts
var hooks = __webpack_require__(429927);
// EXTERNAL MODULE: ./redux/slices/userSlice.ts
var userSlice = __webpack_require__(436958);
// EXTERNAL MODULE: ./node_modules/next/router.js
var router = __webpack_require__(811163);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(785893);
;// CONCATENATED MODULE: ./theme/authScreen/authComponents/socialTray/socialTray.component.tsx
/* eslint-disable @next/next/no-img-element */












const SocialTray = () => {
  const [createNewUser] = (0,main.useMutation)(mutations_createNewUser/* default */.Z);
  const dispatch = (0,hooks/* useAppDispatch */.T)();
  const history = (0,router.useRouter)();
  const {
    user
  } = (0,hooks/* useAppSelector */.C)(state => state === null || state === void 0 ? void 0 : state.user);

  const updateUser = async () => {
    try {
      var _identities$, _identities$$provider, _identities$2, _identities$2$provide;

      const res = await lib.Auth.currentAuthenticatedUser({
        bypassCache: true
      });
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
      } = res;
      const {
        data
      } = await createNewUser({
        variables: {
          data: {
            email: email,
            provider: identities === null || identities === void 0 ? void 0 : (_identities$ = identities[0]) === null || _identities$ === void 0 ? void 0 : (_identities$$provider = _identities$.providerName) === null || _identities$$provider === void 0 ? void 0 : _identities$$provider.toLowerCase()
          }
        }
      }); // reactToastifyNotification("info", "Sign up successfully");

      dispatch((0,userSlice/* setUser */.av)(email));
      dispatch((0,userSlice/* setDbUser */.LL)(data === null || data === void 0 ? void 0 : data.createNewUser));
      dispatch((0,userSlice/* setProvider */.fc)(identities === null || identities === void 0 ? void 0 : (_identities$2 = identities[0]) === null || _identities$2 === void 0 ? void 0 : (_identities$2$provide = _identities$2.providerName) === null || _identities$2$provide === void 0 ? void 0 : _identities$2$provide.toLowerCase()));
      history.push("/recipe_discovery");
    } catch (error) {
      console.log(error);
    }
  };

  (0,react.useEffect)(() => {
    if (!user) {
      updateUser();
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  const handleSocialSignup = async provider => {
    try {
      await lib.Auth.federatedSignIn({
        provider: provider
      });
    } catch (error) {
      console.log(error === null || error === void 0 ? void 0 : error.message);
    }
  };

  return /*#__PURE__*/jsx_runtime.jsx(jsx_runtime.Fragment, {
    children: /*#__PURE__*/(0,jsx_runtime.jsxs)("ul", {
      className: (socialTray_module_default()).socialWrap,
      children: [/*#__PURE__*/jsx_runtime.jsx("li", {
        className: (socialTray_module_default()).listElem,
        children: /*#__PURE__*/jsx_runtime.jsx("img", {
          src: "/images/google.png",
          alt: "Icons will soon Load" //@ts-ignore
          ,
          onClick: () => handleSocialSignup("Google")
        })
      }), /*#__PURE__*/jsx_runtime.jsx("li", {
        className: (socialTray_module_default()).listElem,
        children: /*#__PURE__*/jsx_runtime.jsx("img", {
          src: "/images/fb.png",
          alt: "Icons will soon Load",
          onClick: () => handleSocialSignup("Facebook")
        })
      }), /*#__PURE__*/jsx_runtime.jsx("li", {
        className: (socialTray_module_default()).listElem,
        children: /*#__PURE__*/jsx_runtime.jsx("img", {
          src: "/images/twitter.png",
          alt: "Icons will soon Load"
        })
      }), /*#__PURE__*/jsx_runtime.jsx("li", {
        className: (socialTray_module_default()).listElem,
        children: /*#__PURE__*/jsx_runtime.jsx("img", {
          src: "/images/apple.png",
          alt: "Icons will soon Load"
        })
      })]
    })
  });
};

/* harmony default export */ const socialTray_component = (SocialTray);
// EXTERNAL MODULE: ./theme/authScreen/screens/loginScreen/Login.module.scss
var Login_module = __webpack_require__(344736);
var Login_module_default = /*#__PURE__*/__webpack_require__.n(Login_module);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(425675);
// EXTERNAL MODULE: ./public/icons/highlight_off_black_36dp.svg
var highlight_off_black_36dp = __webpack_require__(438861);
// EXTERNAL MODULE: ./redux/slices/utilitySlice.ts
var utilitySlice = __webpack_require__(487425);
// EXTERNAL MODULE: ./components/utility/reactToastifyNotification.js
var reactToastifyNotification = __webpack_require__(609849);
;// CONCATENATED MODULE: ./theme/authScreen/screens/loginScreen/Login.component.tsx




















const LoginScreen = () => {
  const {
    0: loginMail,
    1: setLoginMail
  } = (0,react.useState)("");
  const {
    0: loginPassword,
    1: setLoginPassword
  } = (0,react.useState)("");
  const dispatch = (0,hooks/* useAppDispatch */.T)();
  const histroy = (0,router.useRouter)();
  const [createNewUser] = (0,main.useMutation)(mutations_createNewUser/* default */.Z);

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch((0,utilitySlice/* setLoading */.K4)(true));

    try {
      const {
        attributes: {
          email
        }
      } = await lib.Auth.signIn(loginMail, loginPassword);
      const {
        data
      } = await createNewUser({
        variables: {
          data: {
            email: email,
            provider: "email"
          }
        }
      });
      dispatch((0,utilitySlice/* setLoading */.K4)(false));
      (0,reactToastifyNotification/* default */.Z)("info", "Login successfully");
      dispatch((0,userSlice/* setUser */.av)(email));
      dispatch((0,userSlice/* setDbUser */.LL)(data === null || data === void 0 ? void 0 : data.createNewUser));
      dispatch((0,userSlice/* setProvider */.fc)("email"));
      histroy.back();
    } catch (error) {
      dispatch((0,utilitySlice/* setLoading */.K4)(false));
      (0,reactToastifyNotification/* default */.Z)("error", error === null || error === void 0 ? void 0 : error.message);
    }
  };

  return /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [/*#__PURE__*/jsx_runtime.jsx("div", {
      className: (Login_module_default()).inputMainDiv,
      style: {},
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (Login_module_default()).inputContentDiv,
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (Login_module_default()).logo,
          children: [/*#__PURE__*/jsx_runtime.jsx(next_link.default, {
            href: "/",
            children: /*#__PURE__*/jsx_runtime.jsx("a", {
              href: "",
              children: /*#__PURE__*/jsx_runtime.jsx(next_image.default, {
                src: "/images/logo.png",
                alt: "logo will soon load",
                layout: "fill" // height={400}
                // width={400}
                ,
                objectFit: "contain",
                quality: 100
              })
            })
          }), /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (Login_module_default()).cross,
            children: /*#__PURE__*/jsx_runtime.jsx(highlight_off_black_36dp/* default */.Z, {})
          })]
        }), /*#__PURE__*/jsx_runtime.jsx("h2", {
          children: "Login"
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (Login_module_default()).quickLogin,
          children: [/*#__PURE__*/jsx_runtime.jsx("span", {
            children: "Quick and easy social login"
          }), /*#__PURE__*/jsx_runtime.jsx(socialTray_component, {}), /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (Login_module_default()).seperator
          })]
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          className: (Login_module_default()).loginPara,
          children: "Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel scelerisque leo."
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("form", {
          onSubmit: handleSubmit,
          children: [/*#__PURE__*/jsx_runtime.jsx(inputField_component/* default */.Z, {
            type: "email",
            style: {
              marginBottom: "20px"
            },
            value: loginMail,
            placeholder: "email",
            fullWidth: true,
            setValue: setLoginMail
          }), /*#__PURE__*/jsx_runtime.jsx(inputField_component/* default */.Z, {
            type: "password",
            style: {},
            value: loginPassword,
            placeholder: "password",
            fullWidth: true,
            setValue: setLoginPassword
          }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
            className: (Login_module_default()).forgetPassword,
            children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
              children: [/*#__PURE__*/jsx_runtime.jsx("input", {
                type: "checkbox"
              }), /*#__PURE__*/jsx_runtime.jsx("label", {
                children: "Keep me looged"
              })]
            }), /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
              href: "/forget_password",
              children: /*#__PURE__*/jsx_runtime.jsx("a", {
                children: "Forget Password?"
              })
            })]
          }), /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (Login_module_default()).buttonDiv,
            children: /*#__PURE__*/jsx_runtime.jsx(button_component/* default */.Z, {
              type: "primary",
              style: {
                height: "100%"
              },
              value: "Login",
              fullWidth: true,
              submit: true
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (Login_module_default()).lineSocialDiv,
          children: [/*#__PURE__*/jsx_runtime.jsx("div", {
            className: (Login_module_default()).seperator
          }), /*#__PURE__*/jsx_runtime.jsx(socialTray_component, {})]
        })]
      })
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (Login_module_default()).imgMainDiv,
      style: {
        backgroundImage: `url("/images/new-user-bg.png")`
      },
      children: /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (Login_module_default()).imgContentDiv,
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (Login_module_default()).contentCard,
          children: [/*#__PURE__*/jsx_runtime.jsx("h2", {
            children: "New User"
          }), /*#__PURE__*/jsx_runtime.jsx("p", {
            children: "Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel scelerisque leo."
          }), /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (Login_module_default()).buttonRightDiv,
            children: /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
              href: "/signup",
              children: /*#__PURE__*/jsx_runtime.jsx("a", {
                children: /*#__PURE__*/jsx_runtime.jsx(button_component/* default */.Z, {
                  type: "text",
                  style: {
                    height: "100%"
                  },
                  value: "Sign Up",
                  fullWidth: true
                })
              })
            })
          })]
        })
      })
    })]
  });
};

/* harmony default export */ const Login_component = (LoginScreen);
// EXTERNAL MODULE: ./theme/input/inputField.module.scss
var inputField_module = __webpack_require__(932798);
var inputField_module_default = /*#__PURE__*/__webpack_require__.n(inputField_module);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/VisibilityOff.js
var VisibilityOff = __webpack_require__(472450);
// EXTERNAL MODULE: ./node_modules/@mui/icons-material/Visibility.js
var Visibility = __webpack_require__(622961);
;// CONCATENATED MODULE: ./theme/input/registerInput/RegisterInput.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







function InputField({
  type = "text",
  placeholder = "Inter Input",
  style = {},
  fullWidth,
  width,
  name,
  register,
  required
}) {
  // STATE FOR INPUT FEILDS
  //STATE HANDLING FOR PASSWORD VISIBILITY
  const {
    0: passVisibility,
    1: visibilityState
  } = (0,react.useState)(false);

  const visiToggle = () => {
    visibilityState(!passVisibility);
  };

  type = type || "";
  placeholder = placeholder || `${type[0].toUpperCase()}${type.slice(1)}`;

  if (fullWidth) {
    style = _objectSpread(_objectSpread({}, style), {}, {
      width: "100%"
    });
  } else {
    if (width) style = _objectSpread(_objectSpread({}, style), {}, {
      width: width.toString()
    });
  }

  if (type === "text") {
    return /*#__PURE__*/jsx_runtime.jsx("input", _objectSpread({
      className: (inputField_module_default()).input,
      type: type,
      style: style,
      placeholder: placeholder
    }, register(name, _objectSpread({}, required))));
  }

  if (type === "password") {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (inputField_module_default()).passwordDiv,
      children: [/*#__PURE__*/jsx_runtime.jsx("input", _objectSpread({
        className: (inputField_module_default()).input,
        type: passVisibility ? "text" : type,
        style: style,
        placeholder: placeholder
      }, register(name, _objectSpread({}, required)))), /*#__PURE__*/jsx_runtime.jsx("span", {
        className: (inputField_module_default()).visiIconDiv,
        onClick: visiToggle,
        children: passVisibility ? /*#__PURE__*/jsx_runtime.jsx(VisibilityOff.default, {}) : /*#__PURE__*/jsx_runtime.jsx(Visibility.default, {})
      })]
    });
  } else {
    return /*#__PURE__*/jsx_runtime.jsx("input", _objectSpread({
      className: (inputField_module_default()).input,
      type: type,
      style: style,
      placeholder: placeholder
    }, register(name, _objectSpread({}, required))));
  }
}
// EXTERNAL MODULE: ./theme/authScreen/screens/signupScreen/SignupScreen.module.scss
var SignupScreen_module = __webpack_require__(66211);
var SignupScreen_module_default = /*#__PURE__*/__webpack_require__.n(SignupScreen_module);
// EXTERNAL MODULE: ./node_modules/react-hook-form/dist/index.esm.mjs
var index_esm = __webpack_require__(287536);
;// CONCATENATED MODULE: ./theme/authScreen/screens/signupScreen/SignupScreen.component.tsx


















const SignupScreen = () => {
  var _errors$email, _errors$password, _errors$comfirmPasswo;

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors
    }
  } = (0,index_esm/* useForm */.cI)();
  const history = (0,router.useRouter)();
  const dispatch = (0,hooks/* useAppDispatch */.T)();
  const password = watch("password");

  const onSubmit = async data => {
    dispatch((0,utilitySlice/* setLoading */.K4)(true));
    const {
      email,
      password
    } = data;

    try {
      const {
        user
      } = await (lib.Auth === null || lib.Auth === void 0 ? void 0 : lib.Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email
        }
      }));
      dispatch((0,utilitySlice/* setLoading */.K4)(false));
      (0,reactToastifyNotification/* default */.Z)("info", "A varification code has been sent to your eamil"); //@ts-ignore

      dispatch((0,userSlice/* setNonConfirmedUser */.GH)(user === null || user === void 0 ? void 0 : user.username));
      history === null || history === void 0 ? void 0 : history.push("/varify_email");
    } catch (error) {
      dispatch((0,utilitySlice/* setLoading */.K4)(false));
      (0,reactToastifyNotification/* default */.Z)("error", error === null || error === void 0 ? void 0 : error.message);
    }
  };

  return /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [/*#__PURE__*/jsx_runtime.jsx("div", {
      className: (SignupScreen_module_default()).imgMainDiv,
      style: {
        backgroundImage: `url("/images/signup.png")`
      },
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (SignupScreen_module_default()).imgContentDiv,
        children: [/*#__PURE__*/jsx_runtime.jsx("div", {
          className: (SignupScreen_module_default()).logo,
          children: /*#__PURE__*/jsx_runtime.jsx("div", {
            children: /*#__PURE__*/jsx_runtime.jsx(next_image.default, {
              src: "/images/logo.png",
              alt: "logo will soon load",
              layout: "fill" // height={400}
              // width={400}
              ,
              objectFit: "contain",
              className: (SignupScreen_module_default()).logoImage,
              quality: 100
            })
          })
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (SignupScreen_module_default()).contentCard,
          children: [/*#__PURE__*/jsx_runtime.jsx("h2", {
            children: "Already have an Account"
          }), /*#__PURE__*/jsx_runtime.jsx("p", {
            children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, sit a voluptas eligendi adribus placeat minus maiores amet earum."
          }), /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (SignupScreen_module_default()).buttonRightDiv,
            children: /*#__PURE__*/jsx_runtime.jsx(button_component/* default */.Z, {
              type: "text",
              style: {
                height: "100%"
              },
              value: "Login",
              fullWidth: true,
              handleClick: () => history === null || history === void 0 ? void 0 : history.push("/login")
            })
          })]
        })]
      })
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (SignupScreen_module_default()).inputMainDiv // style={{
      //   backgroundImage: `url("/images/login-bg.png")`,
      //   backgroundColor: "#FAFBF9",
      // }}
      ,
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (SignupScreen_module_default()).inputContentDiv,
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (SignupScreen_module_default()).logo,
          children: [/*#__PURE__*/jsx_runtime.jsx("div", {
            children: /*#__PURE__*/jsx_runtime.jsx(next_image.default, {
              src: "/images/logo.png",
              alt: "logo will soon load",
              layout: "fill" // height={400}
              // width={400}
              ,
              objectFit: "contain",
              className: (SignupScreen_module_default()).logoImage,
              quality: 100
            })
          }), /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (SignupScreen_module_default()).cross,
            children: /*#__PURE__*/jsx_runtime.jsx(highlight_off_black_36dp/* default */.Z, {})
          })]
        }), /*#__PURE__*/jsx_runtime.jsx("h2", {
          children: "Sign Up"
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          className: (SignupScreen_module_default()).hookline,
          children: "Quick and easy social login"
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          className: (SignupScreen_module_default()).inputPara,
          children: "Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel scelerisque leo."
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (SignupScreen_module_default()).lineTrayA,
          children: [/*#__PURE__*/jsx_runtime.jsx(socialTray_component, {}), /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (SignupScreen_module_default()).seperatorLogin
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("form", {
          onSubmit: handleSubmit(onSubmit),
          children: [/*#__PURE__*/jsx_runtime.jsx(InputField, {
            type: "email",
            style: {
              marginBottom: "10px"
            },
            placeholder: "Email",
            fullWidth: true,
            register: register,
            name: "email",
            required: {
              required: "Email requried",
              pattern: {
                value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                message: "Enter valid email"
              }
            }
          }), errors !== null && errors !== void 0 && errors.email ? /*#__PURE__*/jsx_runtime.jsx("p", {
            style: {
              color: "#ed4337",
              fontSize: "14px"
            },
            children: errors === null || errors === void 0 ? void 0 : (_errors$email = errors.email) === null || _errors$email === void 0 ? void 0 : _errors$email.message
          }) : null, /*#__PURE__*/jsx_runtime.jsx(InputField, {
            type: "password",
            style: {
              margin: "10px 0px"
            },
            placeholder: "Password",
            fullWidth: true,
            register: register,
            name: "password",
            required: {
              required: "password requried",
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                message: "Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character (#?!@$%^&*-)"
              }
            }
          }), errors !== null && errors !== void 0 && errors.password ? /*#__PURE__*/jsx_runtime.jsx("p", {
            style: {
              color: "#ed4337",
              fontSize: "14px"
            },
            children: errors === null || errors === void 0 ? void 0 : (_errors$password = errors.password) === null || _errors$password === void 0 ? void 0 : _errors$password.message
          }) : null, /*#__PURE__*/jsx_runtime.jsx(InputField, {
            type: "password",
            style: {
              margin: "10px 0px"
            },
            placeholder: "Confirm Password",
            fullWidth: true,
            register: register,
            name: "comfirmPassword",
            required: {
              required: "Comfirm password requried",
              validate: value => value === password || "Password doesn't match"
            }
          }), errors !== null && errors !== void 0 && errors.comfirmPassword ? /*#__PURE__*/jsx_runtime.jsx("p", {
            style: {
              color: "#ed4337",
              fontSize: "14px"
            },
            children: errors === null || errors === void 0 ? void 0 : (_errors$comfirmPasswo = errors.comfirmPassword) === null || _errors$comfirmPasswo === void 0 ? void 0 : _errors$comfirmPasswo.message
          }) : null, /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (SignupScreen_module_default()).signUpButtonDiv,
            children: /*#__PURE__*/jsx_runtime.jsx(button_component/* default */.Z, {
              type: "primary",
              style: {
                height: "100%"
              },
              value: "Sign Up",
              fullWidth: true,
              submit: true
            })
          })]
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (SignupScreen_module_default()).lineTrayB,
          children: [/*#__PURE__*/jsx_runtime.jsx("div", {
            className: (SignupScreen_module_default()).seperatorLogin
          }), /*#__PURE__*/jsx_runtime.jsx(socialTray_component, {})]
        })]
      })
    })]
  });
};

/* harmony default export */ const SignupScreen_component = (SignupScreen);
// EXTERNAL MODULE: ./theme/authScreen/screens/forgotPassword/ForgotPassword.module.scss
var ForgotPassword_module = __webpack_require__(699010);
var ForgotPassword_module_default = /*#__PURE__*/__webpack_require__.n(ForgotPassword_module);
;// CONCATENATED MODULE: ./theme/authScreen/screens/forgotPassword/ForgotPassword.component.tsx











const ForgotPassword = () => {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (ForgotPassword_module_default()).inputMainDiv,
      style: {
        backgroundImage: `url("/images/login-bg.png")`
      },
      children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (ForgotPassword_module_default()).inputContentDiv,
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (ForgotPassword_module_default()).logo,
          children: [/*#__PURE__*/jsx_runtime.jsx("div", {
            children: /*#__PURE__*/jsx_runtime.jsx(next_image.default, {
              src: "/images/logo.png",
              alt: "logo will soon load",
              layout: "fill" // height={400}
              // width={400}
              ,
              objectFit: "contain",
              className: (ForgotPassword_module_default()).logoImage,
              quality: 100
            })
          }), /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (ForgotPassword_module_default()).cross,
            children: /*#__PURE__*/jsx_runtime.jsx(highlight_off_black_36dp/* default */.Z, {})
          })]
        }), /*#__PURE__*/jsx_runtime.jsx("h2", {
          children: "Forgot Password"
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          children: "Aliquam vestibulum nunc quis blandit rutrum. Curabitur v"
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("form", {
          children: [/*#__PURE__*/jsx_runtime.jsx(inputField_component/* default */.Z, {
            type: "email",
            style: {
              margin: "4px auto 15px auto"
            },
            value: undefined,
            placeholder: undefined,
            fullWidth: true
          }), /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (ForgotPassword_module_default()).buttonDiv,
            children: /*#__PURE__*/jsx_runtime.jsx(button_component/* default */.Z, {
              type: "primary",
              style: {
                height: "100%",
                fontSize: "18px"
              },
              value: "Send",
              fullWidth: true
            })
          })]
        })]
      }), /*#__PURE__*/jsx_runtime.jsx("br", {})]
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (ForgotPassword_module_default()).imgMainDiv,
      style: {
        backgroundImage: `url("/images/forget-bg.png")`
      },
      children: /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (ForgotPassword_module_default()).imgContentDiv,
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (ForgotPassword_module_default()).contentCard,
          children: [/*#__PURE__*/jsx_runtime.jsx("h2", {
            children: "Remember Password"
          }), /*#__PURE__*/jsx_runtime.jsx("p", {
            children: "afasf afiga sdkfgasdfa g;fsfkjas fjahsjfh gjhagj hjafhjhsdafaffafdasf"
          }), /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (ForgotPassword_module_default()).buttonRightDiv,
            children: /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
              href: "/login",
              children: /*#__PURE__*/jsx_runtime.jsx("a", {
                children: /*#__PURE__*/jsx_runtime.jsx(button_component/* default */.Z, {
                  type: "text",
                  style: {
                    height: "100%"
                  },
                  value: "Login",
                  fullWidth: true
                })
              })
            })
          })]
        })
      })
    })]
  });
};

/* harmony default export */ const ForgotPassword_component = (ForgotPassword);
// EXTERNAL MODULE: ./theme/authScreen/authComponents/socialTray/footer/footer.module.scss
var footer_module = __webpack_require__(321052);
var footer_module_default = /*#__PURE__*/__webpack_require__.n(footer_module);
;// CONCATENATED MODULE: ./theme/authScreen/authComponents/socialTray/footer/footer.component.tsx




const Footer = () => {
  return /*#__PURE__*/jsx_runtime.jsx("div", {
    className: (footer_module_default()).footerDiv,
    children: /*#__PURE__*/jsx_runtime.jsx("p", {
      children: "Copywrite \xA9 2021 Blending 101"
    })
  });
};

/* harmony default export */ const footer_component = (Footer);
// EXTERNAL MODULE: ./theme/authScreen/screens/resetPassword/resetPassword.module.scss
var resetPassword_module = __webpack_require__(131326);
var resetPassword_module_default = /*#__PURE__*/__webpack_require__.n(resetPassword_module);
;// CONCATENATED MODULE: ./theme/authScreen/screens/resetPassword/resetPassword.component.tsx











const ResetPassword = () => {
  return /*#__PURE__*/(0,jsx_runtime.jsxs)(jsx_runtime.Fragment, {
    children: [/*#__PURE__*/jsx_runtime.jsx("div", {
      className: (resetPassword_module_default()).inputMainDiv,
      style: {
        backgroundImage: `url("/images/login-bg.png")`
      },
      children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
        className: (resetPassword_module_default()).inputContentDiv,
        children: [/*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (resetPassword_module_default()).logo,
          children: [/*#__PURE__*/jsx_runtime.jsx("div", {
            children: /*#__PURE__*/jsx_runtime.jsx(next_image.default, {
              src: "/images/logo.png",
              alt: "logo will soon load",
              layout: "fill" // height={400}
              // width={400}
              ,
              objectFit: "contain",
              quality: 100
            })
          }), /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (resetPassword_module_default()).cross,
            children: /*#__PURE__*/jsx_runtime.jsx(highlight_off_black_36dp/* default */.Z, {})
          })]
        }), /*#__PURE__*/jsx_runtime.jsx("h2", {
          children: "Reset Password"
        }), /*#__PURE__*/jsx_runtime.jsx("p", {
          className: (resetPassword_module_default()).loginPara,
          children: "Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel scelerisque leo."
        }), /*#__PURE__*/(0,jsx_runtime.jsxs)("form", {
          children: [/*#__PURE__*/jsx_runtime.jsx(inputField_component/* default */.Z, {
            type: "password",
            style: {
              margin: "20px auto"
            },
            value: undefined,
            placeholder: "New Password",
            fullWidth: true
          }), /*#__PURE__*/jsx_runtime.jsx(inputField_component/* default */.Z, {
            type: "password",
            style: {},
            value: undefined,
            placeholder: "New Password",
            fullWidth: true
          }), /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (resetPassword_module_default()).buttonDiv,
            children: /*#__PURE__*/jsx_runtime.jsx(button_component/* default */.Z, {
              type: "primary",
              style: {
                height: "100%"
              },
              value: "Reset Password",
              fullWidth: true
            })
          })]
        })]
      })
    }), /*#__PURE__*/jsx_runtime.jsx("div", {
      className: (resetPassword_module_default()).imgMainDiv,
      style: {
        backgroundImage: `url("/images/reset-bg.png")`
      },
      children: /*#__PURE__*/jsx_runtime.jsx("div", {
        className: (resetPassword_module_default()).imgContentDiv,
        children: /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
          className: (resetPassword_module_default()).contentCard,
          children: [/*#__PURE__*/jsx_runtime.jsx("h2", {
            children: "Remember Password"
          }), /*#__PURE__*/jsx_runtime.jsx("p", {
            children: "Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel scelerisque leo."
          }), /*#__PURE__*/jsx_runtime.jsx("div", {
            className: (resetPassword_module_default()).buttonRightDiv,
            children: /*#__PURE__*/jsx_runtime.jsx(next_link.default, {
              href: "/login",
              children: /*#__PURE__*/jsx_runtime.jsx("a", {
                children: /*#__PURE__*/jsx_runtime.jsx(button_component/* default */.Z, {
                  type: "text",
                  style: {
                    height: "100%"
                  },
                  value: "Login",
                  fullWidth: true
                })
              })
            })
          })]
        })
      })
    })]
  });
};

/* harmony default export */ const resetPassword_component = (ResetPassword);
;// CONCATENATED MODULE: ./theme/authScreen/authScreen.component.tsx










const AuthScreen = ({
  type
}) => {
  type = type || ""; // login screen

  if (type === "login") {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (authScreen_module_default()).mainScreen,
      children: [/*#__PURE__*/jsx_runtime.jsx("div", {
        className: (authScreen_module_default()).mainDiv,
        children: /*#__PURE__*/jsx_runtime.jsx(Login_component, {})
      }), /*#__PURE__*/jsx_runtime.jsx(footer_component, {})]
    });
  } // signup screen
  else if (type === "signup") {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (authScreen_module_default()).mainScreen,
      children: [/*#__PURE__*/jsx_runtime.jsx("div", {
        className: (authScreen_module_default()).mainDiv + " " + (authScreen_module_default()).mainDivSignup,
        style: {},
        children: /*#__PURE__*/jsx_runtime.jsx(SignupScreen_component, {})
      }), /*#__PURE__*/jsx_runtime.jsx(footer_component, {})]
    });
  } // forgot password Screen
  else if (type === "forget_password") {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (authScreen_module_default()).mainScreen,
      children: [/*#__PURE__*/jsx_runtime.jsx("div", {
        className: (authScreen_module_default()).mainDiv,
        children: /*#__PURE__*/jsx_runtime.jsx(ForgotPassword_component, {})
      }), /*#__PURE__*/jsx_runtime.jsx(footer_component, {})]
    });
  } else if (type === "password_reset") {
    return /*#__PURE__*/(0,jsx_runtime.jsxs)("div", {
      className: (authScreen_module_default()).mainScreen,
      children: [/*#__PURE__*/jsx_runtime.jsx("div", {
        className: (authScreen_module_default()).mainDiv,
        children: /*#__PURE__*/jsx_runtime.jsx(resetPassword_component, {})
      }), /*#__PURE__*/jsx_runtime.jsx(footer_component, {})]
    });
  } else {
    console.log("Enter Valid Auth Screen");
    return /*#__PURE__*/jsx_runtime.jsx("div", {
      children: type
    });
  }
};

/* harmony default export */ const authScreen_component = (AuthScreen);

/***/ }),

/***/ 321052:
/***/ ((module) => {

// Exports
module.exports = {
	"mainScreen": "footer_mainScreen__2CL8G",
	"mainDiv": "footer_mainDiv__1rFe8",
	"inputMainDiv": "footer_inputMainDiv__1Wx9k",
	"inputContentDiv": "footer_inputContentDiv__3NwKc",
	"quickLogin": "footer_quickLogin__3umqS",
	"forgetPassword": "footer_forgetPassword__1EAJv",
	"buttonDiv": "footer_buttonDiv__NPQiV",
	"seperatorLogin": "footer_seperatorLogin__yEJO1",
	"forgotPassPara": "footer_forgotPassPara__2NBa3",
	"logo": "footer_logo__wCb4R",
	"imgMainDiv": "footer_imgMainDiv__3fhQP",
	"imgContentDiv": "footer_imgContentDiv__euyFY",
	"contentCard": "footer_contentCard__pJQrL",
	"buttonRightDiv": "footer_buttonRightDiv__16lEr",
	"footerDiv": "footer_footerDiv__3a32b",
	"signupContentCard": "footer_signupContentCard__1ZbzS",
	"signupContentDiv": "footer_signupContentDiv__2x7m5",
	"signUpButtonDiv": "footer_signUpButtonDiv__3i0bX",
	"loginPara": "footer_loginPara__rTeMG",
	"lineSocialDiv": "footer_lineSocialDiv__24pZT"
};


/***/ }),

/***/ 866533:
/***/ ((module) => {

// Exports
module.exports = {
	"socialWrap": "socialTray_socialWrap__dspRT",
	"listElem": "socialTray_listElem__1OAFb"
};


/***/ }),

/***/ 548731:
/***/ ((module) => {

// Exports
module.exports = {
	"mainScreen": "authScreen_mainScreen__2gNvQ",
	"mainDiv": "authScreen_mainDiv__3KYco",
	"mainDivSignup": "authScreen_mainDivSignup__2C14k"
};


/***/ }),

/***/ 699010:
/***/ ((module) => {

// Exports
module.exports = {
	"inputMainDiv": "ForgotPassword_inputMainDiv__3URaP",
	"inputContentDiv": "ForgotPassword_inputContentDiv__1HvjE",
	"logo": "ForgotPassword_logo__2Xgtw",
	"cross": "ForgotPassword_cross__3Mixz",
	"buttonDiv": "ForgotPassword_buttonDiv__1jXuI",
	"imgMainDiv": "ForgotPassword_imgMainDiv__2RVhm",
	"imgContentDiv": "ForgotPassword_imgContentDiv__255EP",
	"contentCard": "ForgotPassword_contentCard__3fNVP",
	"buttonRightDiv": "ForgotPassword_buttonRightDiv__3nCMg"
};


/***/ }),

/***/ 344736:
/***/ ((module) => {

// Exports
module.exports = {
	"inputMainDiv": "Login_inputMainDiv__2EVHg",
	"inputContentDiv": "Login_inputContentDiv__3gd4y",
	"logo": "Login_logo__wO5U8",
	"cross": "Login_cross__30f15",
	"quickLogin": "Login_quickLogin__3-6a9",
	"forgetPassword": "Login_forgetPassword__2ooUE",
	"buttonDiv": "Login_buttonDiv__3OWMP",
	"lineSocialDiv": "Login_lineSocialDiv__2NHe3",
	"seperator": "Login_seperator__PxHIV",
	"imgMainDiv": "Login_imgMainDiv__1WTls",
	"imgContentDiv": "Login_imgContentDiv__3m_i9",
	"contentCard": "Login_contentCard__29O6g",
	"buttonRightDiv": "Login_buttonRightDiv__1aSQ8"
};


/***/ }),

/***/ 131326:
/***/ ((module) => {

// Exports
module.exports = {
	"inputMainDiv": "resetPassword_inputMainDiv__2aLSE",
	"inputContentDiv": "resetPassword_inputContentDiv__3F2Gy",
	"logo": "resetPassword_logo__1lY-t",
	"cross": "resetPassword_cross__1-S5Z",
	"quickLogin": "resetPassword_quickLogin__20K8S",
	"forgetPassword": "resetPassword_forgetPassword__3_vjF",
	"buttonDiv": "resetPassword_buttonDiv__3dRcU",
	"lineSocialDiv": "resetPassword_lineSocialDiv__33HHV",
	"seperator": "resetPassword_seperator__3Aa9N",
	"imgMainDiv": "resetPassword_imgMainDiv__14BgO",
	"imgContentDiv": "resetPassword_imgContentDiv__2BCNw",
	"contentCard": "resetPassword_contentCard__3klkG",
	"buttonRightDiv": "resetPassword_buttonRightDiv__3OY83"
};


/***/ }),

/***/ 66211:
/***/ ((module) => {

// Exports
module.exports = {
	"imgMainDiv": "SignupScreen_imgMainDiv__1OeAT",
	"imgContentDiv": "SignupScreen_imgContentDiv__27g2v",
	"logo": "SignupScreen_logo__2J4yo",
	"contentCard": "SignupScreen_contentCard__2nt6Z",
	"buttonRightDiv": "SignupScreen_buttonRightDiv__V6eKj",
	"inputMainDiv": "SignupScreen_inputMainDiv__3IXIO",
	"inputContentDiv": "SignupScreen_inputContentDiv__1RNvm",
	"hookline": "SignupScreen_hookline__j909u",
	"inputPara": "SignupScreen_inputPara__3AUtx",
	"signUpButtonDiv": "SignupScreen_signUpButtonDiv__2BhUI",
	"cross": "SignupScreen_cross__1Yrav",
	"seperatorLogin": "SignupScreen_seperatorLogin__1osJ-",
	"lineTrayA": "SignupScreen_lineTrayA__2kU6Y",
	"lineTrayB": "SignupScreen_lineTrayB__11u5C"
};


/***/ })

};
;