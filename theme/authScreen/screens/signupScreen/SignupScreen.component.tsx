import Link from "next/link";
import React from "react";
import InputField from "../../../input/inputField.component";
import Image from "next/image";
import styles from "./SignupScreen.module.scss";
import ButtonComponent from "../../../buttonA/button.component";
import SocialTray from "../../authComponents/socialTray/socialTray.component";

const SignupScreen = () => {
  return (
    <>
      <div
        className={styles.imgMainDiv}
        style={{ backgroundImage: `url("/images/signup.png")` }}
      >
        <div className={styles.imgContentDiv}>
          <div className={styles.logo} style={{ margin: "0" }}>
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
          <div
            className={styles.contentCard}
            style={{ backgroundColor: "green", marginTop: "-20px" }}
          >
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
        <div className={styles.inputContentDiv + " " + styles.signupContentDiv}>
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
          <SocialTray />
        </div>
      </div>
    </>
  );
};

export default SignupScreen;
