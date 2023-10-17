import Link from "next/link";
import React, { useState } from "react";
import ButtonComponent from "../../../button/buttonA/button.component";
import styles from "./EmailVarify.module.scss";
import { useAppSelector } from "../../../../redux/hooks";
import { Auth } from "aws-amplify";
import InputComponent from "../../../input/input.component";
import HeadTagInfo from "../../../headTagInfo";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const [code, setCode] = useState("");
  const { nonConfirmedUser } = useAppSelector((state) => state?.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const notification = toast.loading("Verifying the OTP code", {
      position: toast.POSITION.TOP_RIGHT,
    });

    if (code) {
      try {
        await Auth.confirmSignUp(nonConfirmedUser, code);
        toast.update(notification, {
          render: "Verification completed successfully",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (error) {
        toast.update(notification, {
          render: error?.message || "Failed to verify email",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    }
  };

  const resendSignUp = async () => {
    try {
      await Auth.resendSignUp(nonConfirmedUser);
      toast.info("A new verification code has been send to you email", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error(error?.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <HeadTagInfo title={`Email verify`} description={`email verify`} />
      <div className={styles.mainDiv}>
        <div className={styles.varifyEmailContainer}>
          <img src="/images/logo.png" alt="logo will soon load" />

          <h2>Verify Email</h2>
          <p>We&apos;ve sent a verification code to your email. Please enter it below.</p>
          <form onSubmit={handleSubmit}>
            <InputComponent
              type="text"
              required
              style={{ margin: "4px auto 15px auto", width: "100%" }}
              value={code}
              placeholder="Enter OTP code here"
              onChange={(e) => setCode(e?.target?.value)}
            />

            <div className={styles.buttonContainer}>
              <ButtonComponent
                type="primary"
                style={{ height: "60px", fontSize: "18px" }}
                value="Submit"
                fullWidth={false}
                submit={true}
              />
            </div>
            <div className={styles.link}>
              <p onClick={resendSignUp}>Resend code</p>
              <Link href="/signup" passHref>
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmailVerify;
