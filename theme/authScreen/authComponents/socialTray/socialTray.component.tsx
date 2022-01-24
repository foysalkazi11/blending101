/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./socialTray.module.scss";
import { Auth } from "aws-amplify";
import { useMutation } from "@apollo/client";
import CREATE_NEW_USER from "../../../../gqlLib/user/mutations/createNewUser";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setDbUser,
  setProvider,
  setUser,
} from "../../../../redux/slices/userSlice";
import { useRouter } from "next/router";
import { setAllRecipeWithinCollectionsId } from "../../../../redux/slices/collectionSlice";

const SocialTray = () => {
  const [createNewUser] = useMutation(CREATE_NEW_USER);
  const dispatch = useAppDispatch();
  const history = useRouter();
  const { user } = useAppSelector((state) => state?.user);

  const updateUser = async () => {
    try {
      const res = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });
      const {
        signInUserSession: {
          idToken: {
            payload: { email, given_name, identities },
          },
        },
      } = res;
      const { data } = await createNewUser({
        variables: {
          data: {
            email: email,
            provider: identities?.[0]?.providerName?.toLowerCase(),
          },
        },
      });

      // reactToastifyNotification("info", "Sign up successfully");

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
      dispatch(setProvider(identities?.[0]?.providerName?.toLowerCase()));
      history.push("/recipe_discovery");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      updateUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSocialSignup = async (provider) => {
    try {
      await Auth.federatedSignIn({ provider: provider });
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <>
      {/* <button onClick={hub}>get user</button> */}
      <ul className={styles.socialWrap}>
        <li className={styles.listElem}>
          <img
            src={"/images/google.png"}
            alt="Icons will soon Load"
            //@ts-ignore
            onClick={() => handleSocialSignup("Google")}
          />
        </li>
        <li className={styles.listElem}>
          <img
            src={"/images/fb.png"}
            alt="Icons will soon Load"
            onClick={() => handleSocialSignup("Facebook")}
          />
        </li>
        <li className={styles.listElem}>
          <img src={"/images/twitter.png"} alt="Icons will soon Load" />
        </li>
        <li className={styles.listElem}>
          <img src={"/images/apple.png"} alt="Icons will soon Load" />
        </li>
      </ul>
    </>
  );
};

export default SocialTray;
