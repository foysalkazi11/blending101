/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState } from "react";
import ButtonComponent from "../../../button/buttonA/button.component";
import InputField from "../../../input/inputField.component";
import styles from "./EmailVarify.module.scss";
import Image from "next/image";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { Container } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setUser } from "../../../../redux/slices/userSlice";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";

const ForgotPassword = () => {
  const [code, setCode] = useState("");

  const { nonConfirmedUser } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();
  const history = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code) {
      dispatch(setLoading(true));

      try {
        const userStatus = await Auth.confirmSignUp(nonConfirmedUser, code);
        console.log(userStatus);
        dispatch(setLoading(false));
        if (userStatus === "SUCCESS") {
          reactToastifyNotification("info", "Sign up successfully");
          dispatch(setUser(nonConfirmedUser));
          history?.push("/login/profile");
        }
      } catch (error) {
        dispatch(setLoading(false));
        reactToastifyNotification("error", error?.message);
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
      reactToastifyNotification(
        "info",
        "A new varification code has been send to you email."
      );
    } catch (error) {
      dispatch(setLoading(false));
      reactToastifyNotification("error", error?.message);
    }
  };
  return (
    <Container maxWidth="md" className={styles.varifyEmailContainer}>
      <img src="/images/logo.png" alt="logo will soon load" />

      <h2>Varify Email</h2>
      <p>A Varification code is sent to your mail. Please paste it below.</p>
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          style={{ margin: "4px auto 15px auto" }}
          value={code}
          placeholder="Varify your account"
          fullWidth={true}
          setValue={setCode}
        />

        <div className={styles.buttonContainer}>
          <ButtonComponent
            type="primary"
            style={{ height: "60px", fontSize: "18px" }}
            value="Varify"
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
    </Container>
  );
};

export default ForgotPassword;
