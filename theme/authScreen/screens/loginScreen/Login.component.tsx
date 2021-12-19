import Link from "next/link";
import React, { useState } from "react";
import ButtonComponent from "../../../button/buttonA/button.component";
import InputField from "../../../input/inputField.component";
import SocialTray from "../../authComponents/socialTray/socialTray.component";
import styles from "./Login.module.scss";
import Image from "next/image";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Auth } from "aws-amplify";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import { useAppDispatch } from "../../../../redux/hooks";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import { setUser } from "../../../../redux/slices/userSlice";
import { useRouter } from "next/router";

const LoginScreen = () => {
  const [loginMail, setLoginMail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const histroy = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const {
        attributes: { email },
      } = await Auth.signIn(loginMail, loginPassword);
      dispatch(setLoading(false));
      reactToastifyNotification("info", "Login successfully");
      dispatch(setUser(email));
      // setTimeout(() => {
      //   histroy?.back();
      // }, 3000);
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification("error", error?.message);
    }
  };

  return (
    <>
      <div className={styles.inputMainDiv} style={{}}>
        <div className={styles.inputContentDiv}>
          <div className={styles.logo}>
            <Link href="/" passHref>
              <Image
                src="/images/logo.png"
                alt="logo will soon load"
                layout={"fill"}
                // height={400}
                // width={400}
                objectFit={"contain"}
                quality={100}
              />
            </Link>
            <div className={styles.cross}>
              <HighlightOffOutlinedIcon />
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

          <form onSubmit={handleSubmit}>
            <InputField
              type="email"
              style={{ marginBottom: "20px" }}
              value={loginMail}
              placeholder="email"
              fullWidth={true}
              setValue={setLoginMail}
            />
            <InputField
              type="password"
              style={{}}
              value={loginPassword}
              placeholder="password"
              fullWidth={true}
              setValue={setLoginPassword}
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
                submit={true}
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

// const {
//   signInUserSession: {
//     idToken: { payload },
//   },
// } = await Auth.signIn(loginMail, loginPassword);
