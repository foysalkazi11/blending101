import Link from "next/link";
import React from "react";
import InputField from "../../../input/inputField.component";
import Image from "next/image";
import styles from "./SignupScreen.module.scss";
import ButtonComponent from "../../../buttonA/button.component";
import SocialTray from "../../authComponents/socialTray/socialTray.component";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
const SignupScreen = () => {
  return (
    <>
      <div
        className={styles.imgMainDiv}
        style={{ backgroundImage: `url("/images/signup.png")` }}
      >
        <div className={styles.imgContentDiv}>
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
          <div className={styles.contentCard}>
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
        // style={{
        //   backgroundImage: `url("/images/login-bg.png")`,
        //   backgroundColor: "#FAFBF9",
        // }}
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
            <div className={styles.cross}>
              <HighlightOffOutlinedIcon />
            </div>
          </div>
          <h2>Sign Up</h2>
          <p className={styles.hookline}>Quick and easy social login</p>
          <p className={styles.inputPara}>
            Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel
            scelerisque leo.
          </p>
          <div className={styles.lineTrayA}>
            <SocialTray />
            <div className={styles.seperatorLogin} />
          </div>
          <form>
            <InputField
              type="email"
              style={{ marginBottom: "10px" }}
              value={undefined}
              placeholder={undefined}
              fullWidth={true}
            />
            <InputField
              type="password"
              style={{ margin: "10px 0px" }}
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
              <Link href="/signup">
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
          <div className={styles.lineTrayB}>
            <div className={styles.seperatorLogin} />
            <SocialTray />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupScreen;
