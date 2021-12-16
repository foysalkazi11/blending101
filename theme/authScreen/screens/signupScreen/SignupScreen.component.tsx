import Link from "next/link";
import React from "react";
import InputField from "../../../input/registerInput/RegisterInput";
import Image from "next/image";
import styles from "./SignupScreen.module.scss";
import ButtonComponent from "../../../button/buttonA/button.component";
import SocialTray from "../../authComponents/socialTray/socialTray.component";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { useForm } from "react-hook-form";

const SignupScreen = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const onSubmit = (data) => console.log(data);

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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              sit a voluptas eligendi adribus placeat minus maiores amet earum.
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="email"
              style={{ marginBottom: "10px" }}
              placeholder="Email"
              fullWidth={true}
              register={register}
              name="email"
              required={{
                required: "Email requried",
                pattern: {
                  value:
                    /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                  message: "Enter valid email",
                },
              }}
            />
            {errors?.email ? (
              <p style={{ color: "#ed4337", fontSize: "14px" }}>
                {errors?.email?.message}
              </p>
            ) : null}
            <InputField
              type="password"
              style={{ margin: "10px 0px" }}
              placeholder="Password"
              fullWidth={true}
              register={register}
              name="password"
              required={{
                required: "password requried",
                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                  message:
                    "Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character (#?!@$%^&*-)",
                },
              }}
            />
            {errors?.password ? (
              <p style={{ color: "#ed4337", fontSize: "14px" }}>
                {errors?.password?.message}
              </p>
            ) : null}
            <InputField
              type="password"
              style={{ margin: "10px 0px" }}
              placeholder={"Confirm Password"}
              fullWidth={true}
              register={register}
              name="comfirmPassword"
              required={{
                required: "Comfirm password requried",
                validate: (value) =>
                  value === password || "Password doesn't match",
              }}
            />
            {errors?.comfirmPassword ? (
              <p style={{ color: "#ed4337", fontSize: "14px" }}>
                {errors?.comfirmPassword?.message}
              </p>
            ) : null}
            <div className={styles.signUpButtonDiv}>
              <ButtonComponent
                type="primary"
                style={{ height: "100%" }}
                value="Sign Up"
                fullWidth={true}
                submit={true}
              />
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
