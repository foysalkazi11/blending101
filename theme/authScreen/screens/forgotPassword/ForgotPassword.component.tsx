import Link from "next/link";
import React from "react";
import ButtonComponent from "../../../buttonA/button.component";
import InputField from "../../../input/inputField.component";
import styles from "./forgot.module.scss";
import Image from "next/image";

const ForgotPassword = () => {
  return (
    <>
      <div
        className={styles.inputMainDiv}
        style={{
          backgroundImage: `url("/images/login-bg.png")`,
          height: "50vh",
        }}
      >
        <div className={styles.inputContentDiv}>
          <div className={styles.logo} style={{ marginTop: "10px" }}>
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
          <p className={styles.forgotPassPara}>
            Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel
            scelerisque leo.
          </p>
          <form>
            <InputField
              type="email"
              style={{ marginBottom: "20px", marginTop: "0px" }}
              value={undefined}
              placeholder={undefined}
              fullWidth={true}
            />
            <div className={styles.buttonDiv}>
              <ButtonComponent
                type="primary"
                style={{ height: "100%", fontSize: "18px" }}
                value="Send"
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
    </>
  );
};

export default ForgotPassword;
