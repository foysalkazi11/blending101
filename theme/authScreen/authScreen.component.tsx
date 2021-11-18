import React, { useState } from "react";
import styles from "./authScreen.module.scss";
import Image from "next/image";
import InputField from "../input/inputField.component";
import Link from "next/link";
import ButtonComponent from "../buttonA/button.component";

interface authScreen {
  type: "login" | "signup" | "password_reset" | "";
}

const AuthScreen = ({ type }: authScreen) => {
  type = type || "";


  // login screen
  if (type === "login") {
    return (
      <div className={styles.mainScreen}>
        <div className={styles.mainDiv}>
          <div
            className={styles.inputMainDiv}
            style={{ backgroundImage: `url("/images/login-bg.png")` }}
          >
            <div className={styles.inputContentDiv}>
              <div className={styles.logo}>
                <div>
                  <Image
                    src="/images/logo.png"
                    alt="logo will soon load"
                    layout={"fill"}
                    // height={400}
                    // width={400}
                    objectFit={"contain"}
                    className={styles.logoImage}
                    quality={100}
                  />
                </div>
              </div>
              <h2>Login</h2>
              <p>
                Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel
                scelerisque leo.
              </p>
              <form>
                <InputField
                  type="email"
                  style={{ marginBottom: "20px"}}
                  value={undefined}
                  placeholder={undefined}
                  fullWidth={true}
                />
                <InputField
                  type="password"
                  style={{}}
                  value={undefined}
                  placeholder={undefined}
                  fullWidth={true}
                />
                <div className={styles.forgetPassword}>
                  <Link href="/forget_password">
                    <a>Forget Password?</a>
                  </Link>
                </div>
                <div className={styles.buttonDiv}>
                  <ButtonComponent
                    type="primary"
                    style={{ height: "100%" }}
                    value="Login"
                    fullWidth={true}
                  />
                </div>
              </form>
              <div className={styles.seperatorLogin} />
              <ul className={styles.socialWrap}>
                <li className={styles.listElem}>
                  <Link href="">
                    <a>
                      <Image
                        src={"/images/google.png"}
                        alt="Icons will soon Load"
                        layout="fill"
                        objectFit="contain"
                      />
                    </a>
                  </Link>
                </li>
                <li className={styles.listElem}>
                  <Link href="">
                    <a>
                      <Image
                        src={"/images/fb.png"}
                        alt="Icons will soon Load"
                        layout="fill"
                        objectFit="contain"
                      />
                    </a>
                  </Link>
                </li>
                <li className={styles.listElem}>
                  <Link href="/login">
                    <a style={{}}>
                      <Image
                        src={"/images/twitter.png"}
                        alt="Icons will soon Load"
                        layout="fill"
                        objectFit="contain"
                      />
                    </a>
                  </Link>
                </li>
                <li className={styles.listElem}>
                  <Link href="">
                    <a>
                      <Image
                        src={"/images/apple.png"}
                        alt="Icons will soon Load"
                        layout="fill"
                        objectFit="contain"
                      />
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={styles.imgMainDiv}
            style={{ backgroundImage: `url("/images/new-user-bg.png")` }}
          >
            <div className={styles.imgContentDiv}>
              <div className={styles.contentCard}>
                <h2>New User</h2>
                <p>
                  afjhsfjkalkfjsf;kjfh;fhfsdhjfafgasf;afigasdkfgasdfag;fsfkjasfjahsjfhgjhagjhjafhjh
                </p>
                <div className={styles.buttonRightDiv}>
                  <Link href="/signup">
                    <a>
                      <ButtonComponent
                        type="text"
                        style={{ height: "100%" }}
                        value="Sign Up"
                        fullWidth={true}
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerDiv}>
          <p>Copywrite © 2021 Blending 101</p>
        </div>
      </div>
    );
  }


  // signup screen

  else if (type === "signup") {
    return (
      <div className={styles.mainScreen}>
        <div className={styles.mainDiv}>
          <div
            className={styles.imgMainDiv}
            style={{ backgroundImage: `url("/images/signup.png")` }}
          >
            <div className={styles.imgContentDiv +" "+styles.signupImgContentDiv}>
              <div className={styles.logo}>
                <div>
                  <Image
                    src="/images/logo.png"
                    alt="logo will soon load"
                    layout={"fill"}
                    // height={400}
                    // width={400}
                    objectFit={"contain"}
                    className={styles.logoImage}
                    quality={100}
                  />
                </div>
              </div>
              <div className={styles.contentCard +" "+styles.signupContentCard}>
                <h2>Already have an Account</h2>
                <p>
                  afjhsfjkalkfjsf;kjfh;fhfsdhjfafgasf;afigasdkfgasdfag;fsfkjasfjahsjfhgjhagjhjafhjh
                </p>
                <div className={styles.buttonRightDiv}>
                  <Link href="/login">
                    <a>
                      <ButtonComponent
                        type="text"
                        style={{ height: "100%" }}
                        value="Login"
                        fullWidth={true}
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Left Screen Up */}
          {/* Right Screen down */}

          <div
            className={styles.inputMainDiv}
            style={{
              backgroundImage: `url("/images/login-bg.png")`,
              backgroundColor: "#FAFBF9",
            }}
          >
            <div
              className={styles.inputContentDiv + " " + styles.signupContentDiv}
            >
              <h2>Sign Up</h2>
              <p>
                Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel
                scelerisque leo.
              </p>
              <form>
                <InputField
                  type="email"
                  style={{ marginBottom: "20px" }}
                  value={undefined}
                  placeholder={undefined}
                  fullWidth={true}
                />
                <InputField
                  type="password"
                  style={{}}
                  value={undefined}
                  placeholder={undefined}
                  fullWidth={true}
                />
                <InputField
                  type="password"
                  style={{ margin: "10px 0px" }}
                  value={undefined}
                  placeholder={"Confirm Password"}
                  fullWidth={true}
                />
                <div className={styles.signUpButtonDiv}>
                  <Link href="/login">
                    <a>
                      <ButtonComponent
                        type="primary"
                        style={{ height: "100%" }}
                        value="Sign Up"
                        fullWidth={true}
                      />
                    </a>
                  </Link>
                </div>
              </form>
              <div className={styles.seperatorLogin} />
              <ul className={styles.socialWrap}>
                <li className={styles.listElem}>
                  <Link href="">
                    <a>
                      <Image
                        src={"/images/google.png"}
                        alt="Icons will soon Load"
                        layout="fill"
                        objectFit="contain"
                      />
                    </a>
                  </Link>
                </li>
                <li className={styles.listElem}>
                  <Link href="">
                    <a>
                      <Image
                        src={"/images/fb.png"}
                        alt="Icons will soon Load"
                        layout="fill"
                        objectFit="contain"
                      />
                    </a>
                  </Link>
                </li>
                <li className={styles.listElem}>
                  <Link href="/login">
                    <a style={{}}>
                      <Image
                        src={"/images/twitter.png"}
                        alt="Icons will soon Load"
                        layout="fill"
                        objectFit="contain"
                      />
                    </a>
                  </Link>
                </li>
                <li className={styles.listElem}>
                  <Link href="">
                    <a>
                      <Image
                        src={"/images/apple.png"}
                        alt="Icons will soon Load"
                        layout="fill"
                        objectFit="contain"
                      />
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.footerDiv}>
          <p>Copywrite © 2021 Blending 101</p>
        </div>
      </div>
    );
  }

  // password reset Screen

  else if (type === "password_reset") {
    return (
      <div className={styles.mainScreen}>
        <div className={styles.mainDiv}>
          <div
            className={styles.inputMainDiv}
            style={{ backgroundImage: `url("/images/login-bg.png")` }}
          >
            <div className={styles.inputContentDiv}>
              <div className={styles.logo} style={{ marginTop: "60px" }}>
                <div>
                  <Image
                    src="/images/logo.png"
                    alt="logo will soon load"
                    layout={"fill"}
                    // height={400}
                    // width={400}
                    objectFit={"contain"}
                    className={styles.logoImage}
                    quality={100}
                  />
                </div>
              </div>
              <h2>Forgot Password</h2>
              <p>
                Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel
                scelerisque leo.
              </p>
              <form>
                <InputField
                  type="email"
                  style={{ marginBottom: "60px" }}
                  value={undefined}
                  placeholder={undefined}
                  fullWidth={true}
                />
                <div className={styles.buttonDiv}>
                  <ButtonComponent
                    type="primary"
                    style={{ height: "100%" }}
                    value="Send Link"
                    fullWidth={true}
                  />
                </div>
              </form>
            </div>
          </div>
          <div
            className={styles.imgMainDiv}
            style={{ backgroundImage: `url("/images/forget-bg.png")` }}
          >
            <div className={styles.imgContentDiv}>
              <div className={styles.contentCard}>
                <h2>Remember Password</h2>
                <p>
                  afjhsfjkalkfjsf;kjfh;fhfsdhjfafgasf;afigasdkfgasdfag;fsfkjasfjahsjfhgjhagjhjafhjh
                </p>
                <div className={styles.buttonRightDiv}>
                  <Link href="/login">
                    <a>
                      <ButtonComponent
                        type="text"
                        style={{ height: "100%" }}
                        value="Login"
                        fullWidth={true}
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerDiv}>
          <p>Copywrite © 2021 Blending 101</p>
        </div>
      </div>
    );
  } else {
    console.log("Enter Valid Auth Screen");
    return <div>{type}</div>;
  }
};

export default AuthScreen;
