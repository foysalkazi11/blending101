/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import ButtonComponent from "../../../button/buttonA/button.component";
import styles from "./EmailVarify.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import InputComponent from "../../../input/input.component";
import HeadTagInfo from "../../../headTagInfo";
import { useSession } from "../../../../context/AuthProvider";
import useToGetExistingUserInfo from "customHooks/user/useToGetExistingUserInfo";

const EmailVerify = () => {
  const [code, setCode] = useState("");
  const session = useSession();
  const { nonConfirmedUser } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();
  const history = useRouter();
  const handleToGetExistingUserInfo = useToGetExistingUserInfo();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code) {
      dispatch(setLoading(true));

      try {
        await Auth.confirmSignUp(nonConfirmedUser, code);
        const currentUser = await handleToGetExistingUserInfo(nonConfirmedUser, "email");

        // const { data } = await createNewUser({
        //   variables: {
        //     data: { email: nonConfirmedUser, provider: "email" },
        //   },
        // });
        // const user = await Auth.currentAuthenticatedUser();
        // await Auth.updateUserAttributes(user, {
        //   address: "105 Main St. New York, NY 10001",
        // });
        // console.log(currentUser);

        dispatch(setLoading(false));
        reactToastifyNotification("info", "Sign up successfully");
        // dispatch(setUser(nonConfirmedUser));
        // dispatch(setDbUser(data?.createNewUser));
        // dispatch(setProvider("email"));
        history.push("/user/profile");
      } catch (error) {
        dispatch(setLoading(false));
        reactToastifyNotification("error", error?.message || "Failed to verify email");
      }
    } else {
      reactToastifyNotification("warning", "Please enter code");
    }
  };

  const resendSignUp = async () => {
    dispatch(setLoading(true));
    try {
      const code = await Auth.resendSignUp(nonConfirmedUser);
      dispatch(setLoading(false));
      reactToastifyNotification("info", "A new verification code has been send to you email.");
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification("error", error?.message);
    }
  };

  return (
    <>
      <HeadTagInfo title={`Email verify`} description={`email verify`} />
      <div className={styles.mainDiv}>
        <div className={styles.varifyEmailContainer}>
          <img src="/images/logo.png" alt="logo will soon load" />

          <h2>Verify Email</h2>
          <p>A Verification code is sent to your mail. Please paste it below.</p>
          <form onSubmit={handleSubmit}>
            <InputComponent
              type="text"
              style={{ margin: "4px auto 15px auto", width: "100%" }}
              value={code}
              placeholder="Verify your account"
              onChange={(e) => setCode(e?.target?.value)}
            />

            <div className={styles.buttonContainer}>
              <ButtonComponent
                type="primary"
                style={{ height: "60px", fontSize: "18px" }}
                value="Verify"
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
