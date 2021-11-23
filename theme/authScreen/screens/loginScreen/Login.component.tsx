import Link from "next/link";
import React from "react";
import ButtonComponent from "../../../buttonA/button.component";
import InputField from "../../../input/inputField.component";
import SocialTray from "../../authComponents/socialTray/socialTray.component";
import styles from "./Login.module.scss";
import Image from "next/image";

const LoginScreen = () => {
  return (
    <>
      <div className={styles.inputMainDiv} style={{}}>
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
                quality={100}
              />
            </div>
          </div>
          <h2>Login</h2>
          <div className={styles.quickLogin}>
            <span>Quick and easy social login</span>
            <SocialTray />
            <div className={styles.seperator} />
          </div>
          <p className={styles.loginPara}>
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
            <div className={styles.forgetPassword}>
              <div>
                <input type="checkbox" />
                <label>Keep me looged</label>
              </div>
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
          <div className={styles.lineSocialDiv}>
            <div className={styles.seperator} />
            <SocialTray />
          </div>
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
              Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel
              scelerisque leo.
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
    </>
  );
};

export default LoginScreen;
