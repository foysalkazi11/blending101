import Link from "next/link";
import React from "react";
import ButtonComponent from "../../../button/buttonA/button.component";
import InputField from "../../../input/registerInput/RegisterInput";
import SocialTray from "../../authComponents/socialTray/socialTray.component";
import styles from "./Login.module.scss";
import Image from "next/image";
import HighlightOffOutlinedIcon from "../../../../public/icons/highlight_off_black_36dp.svg";
import { Auth } from "aws-amplify";
import { setLoading } from "../../../../redux/slices/utilitySlice";
import { useAppDispatch } from "../../../../redux/hooks";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import {
  setDbUser,
  setProvider,
  setUser,
} from "../../../../redux/slices/userSlice";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import CREATE_NEW_USER from "../../../../gqlLib/user/mutations/createNewUser";
import { setAllRecipeWithinCollectionsId } from "../../../../redux/slices/collectionSlice";
import { useForm } from "react-hook-form";

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const histroy = useRouter();
  const [createNewUser] = useMutation(CREATE_NEW_USER);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (input) => {
    dispatch(setLoading(true));
    try {
      const {
        attributes: { email },
      } = await Auth.signIn(input?.email, input?.password);
      const { data } = await createNewUser({
        variables: {
          data: { email: email, provider: "email" },
        },
      });

      dispatch(setLoading(false));
      reactToastifyNotification("info", "Login successfully");
      let recipesId = [];
      data?.createNewUser?.collections?.forEach((col) => {
        const recipes = col?.recipes;
        recipes?.forEach((recipe) => {
          recipesId?.push(recipe?._id);
        });
      });
      dispatch(setAllRecipeWithinCollectionsId(recipesId));
      dispatch(setUser(email));
      dispatch(setDbUser(data?.createNewUser));
      dispatch(setProvider("email"));
      histroy.push("/");
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
            <Link href="/">
              <a href="">
                <Image
                  src="/images/logo.png"
                  alt="logo will soon load"
                  layout={"fill"}
                  objectFit={"contain"}
                  quality={100}
                />
              </a>
            </Link>
            <div className={styles.cross}>
              <HighlightOffOutlinedIcon />
            </div>
          </div>
          <h2>Login</h2>
          {/* <button onClick={logOut}>Log out</button> */}
          <div className={styles.quickLogin}>
            <span>Quick and easy social login</span>
            <SocialTray />
            <div className={styles.seperator} />
          </div>
          <p className={styles.loginPara}>Enter email and password</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              type="email"
              style={{ marginBottom: "20px" }}
              placeholder="Email"
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
              error={{
                isError: errors?.email ? true : false,
                message: errors?.email?.message,
              }}
            />

            <InputField
              type="password"
              placeholder="Password"
              register={register}
              name="password"
              required={{
                required: "password requried",
              }}
              error={{
                isError: errors?.password ? true : false,
                message: errors?.password?.message,
              }}
            />
            <div className={styles.forgetPassword}>
              <div>
                <input type="checkbox" />
                <label>Keep me looged</label>
              </div>
              {/* <Link href="/reset_password">
                <a style={{ marginRight: "16px" }}>Change Password?</a>
              </Link> */}
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
