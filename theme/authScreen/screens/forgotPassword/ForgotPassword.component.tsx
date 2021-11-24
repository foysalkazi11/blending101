import Link from "next/link";
import React from "react";
import ButtonComponent from "../../../buttonA/button.component";
import InputField from "../../../input/inputField.component";
import styles from "./ForgotPassword.module.scss";
import Image from "next/image";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const ForgotPassword = () => {
  return (
    <>
      <div
        className={styles.inputMainDiv}
        style={{
          backgroundImage: `url("/images/login-bg.png")`,
        }}
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
          <h2>Forgot Password</h2>
          <p>Aliquam vestibulum nunc quis blandit rutrum. Curabitur v</p>
          <form>
            <InputField
              type="email"
              style={{ margin: "4px auto 15px auto" }}
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
        <br />
      </div>
      <div
        className={styles.imgMainDiv}
        style={{ backgroundImage: `url("/images/forget-bg.png")` }}
      >
        <div className={styles.imgContentDiv}>
          <div className={styles.contentCard}>
            <h2>Remember Password</h2>
            <p>
              afasf afiga sdkfgasdfa g;fsfkjas fjahsjfh gjhagj
              hjafhjhsdafaffafdasf
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
