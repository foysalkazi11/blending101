import React from "react";
import styles from "./resetPassword.module.scss";
import Image from "next/image";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Link from "next/link";
import InputField from "../../../input/inputField.component";
import ButtonComponent from "../../../button/buttonA/button.component";

const ResetPassword = () => {
  return (
    <>
      <div className={styles.inputMainDiv} style={{backgroundImage:`url("/images/login-bg.png")`}}>
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
            <div className={styles.cross}>
              <HighlightOffOutlinedIcon />
            </div>
          </div>
          <h2>Reset Password</h2>
          <p className={styles.loginPara}>
            Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel
            scelerisque leo.
          </p>
          <form>
            <InputField
              type="password"
              style={{ margin: "20px auto" }}
              value={undefined}
              placeholder={"New Password"}
              fullWidth={true}
            />
            <InputField
              type="password"
              style={{}}
              value={undefined}
              placeholder={"New Password"}
              fullWidth={true}
            />
            <div className={styles.buttonDiv}>
              <ButtonComponent
                type="primary"
                style={{ height: "100%" }}
                value="Reset Password"
                fullWidth={true}
              />
            </div>
          </form>
        </div>
      </div>
      <div
        className={styles.imgMainDiv}
        style={{ backgroundImage: `url("/images/reset-bg.png")` }}
      >
        <div className={styles.imgContentDiv}>
          <div className={styles.contentCard}>
            <h2>Remember Password</h2>
            <p>
              Aliquam vestibulum nunc quis blandit rutrum. Curabitur vel
              scelerisque leo.
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

export default ResetPassword;
