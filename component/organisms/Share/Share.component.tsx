import React, { Fragment, useRef, useState, useEffect } from "react";
import {
  faFacebook,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faLinkSimple, faShareNodes } from "@fortawesome/pro-regular-svg-icons";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";

import Icon from "../../atoms/Icon/Icon.component";
import Textarea from "../Forms/Textarea.component";

import styles from "./Share.module.scss";
import CustomModal from "../../../theme/modal/customModal/CustomModal";

import { useMutation } from "@apollo/client";
import { CREATE_SHARE_LINK } from "../../../graphql/Share";
import { useAppSelector } from "../../../redux/hooks";

interface ShareProps {
  id: string;
  title: string;
  type: "recipe";
  image: string;
  show: boolean;
  setShow: any;
}

const Share = (props: ShareProps) => {
  const { id, title, image, type, show, setShow } = props;
  const [createShareLink, { data }] = useMutation(CREATE_SHARE_LINK);

  const inputRef = useRef<HTMLInputElement>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [showMsgField, setShowMsgField] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const [link, setLink] = useState("");
  const [emails, setEmails] = useState([]);

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const hasEmails = emails.length > 0;

  // useEffect(() => {
  //   return () => {
  //     setHasCopied(false);
  //   };
  // });

  const onInputFocus = () => {
    setShowMsgField(true);
    if (inputRef.current) {
      const inputEl = inputRef.current;
      inputEl.style.borderColor = "#7dbd3b";
      inputEl.style.cursor = "text";
      inputEl.querySelector("input").focus();
    }
  };

  const onInputBlur = () => {
    setShowSuggestion(false);
    if (inputRef.current) {
      const inputEl = inputRef.current;
      inputEl.style.borderColor = "#e5e5e5";
    }
  };

  const onInputChange = (event) => {
    const email = event.target.value;
    if (email !== "") setShowSuggestion(true);
    else setShowSuggestion(false);
  };

  const onAddEmail = (event) => {
    if (event.key === "Enter") {
      const email = event.target.value;
      if (
        !email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
      )
        return;
      event.target.value = "";
      setEmails([...emails, email]);
    }
  };

  const onCancel = () => {
    setShowMsgField(false);
    setEmails([]);
  };

  const copyLinkHandler = async () => {
    await generateShareLink();
    console.log(data, link);

    navigator.clipboard.writeText(link);
    setHasCopied(true);
  };

  const generateShareLink = async () => {
    const response = await createShareLink({
      variables: {
        data: {
          sharedBy: userId,
          shareTo: emails,
          shareData: [id],
          type,
        },
      },
    });
    let link = `https://duacpw47bhqi1.cloudfront.net/recipe_details/${id}?token=${response.data?.createShareLink}`;
    console.log(link);
    setLink(link);
  };

  return (
    <CustomModal
      open={show}
      setOpen={setShow}
      // closeClass={styles.share__modal_close}
    >
      <div className={styles.share}>
        <div className={styles.share__header}>
          <Icon fontName={faShareNodes} size="2.5rem" />
          <h3>Share Recipe</h3>
        </div>
        <div className={styles.share__title}>
          <img src={image || "/cards/coriander.png"} alt="" />
          <h3>{title}</h3>
        </div>
        <div
          ref={inputRef}
          className={styles.email}
          style={hasEmails ? {} : { padding: 10 }}
          onClick={onInputFocus}
          onBlur={onInputBlur}
        >
          {emails.map((email) => (
            <span className={styles.email__address} key={email}>
              {email}
            </span>
          ))}
          <input
            type="email"
            placeholder={!hasEmails ? "Enter Name or Email" : ""}
            className={styles.email__input}
            onFocus={onInputFocus}
            onChange={onInputChange}
            onKeyDown={onAddEmail}
          />
          {showSuggestion && (
            <div className={styles.email__suggestion}>
              <h6>Select a Person</h6>
              <ul>
                <li>
                  <span>B</span>
                  Badhon Khan
                </li>
                <li>
                  <span>G</span>
                  Gabriel Braun
                </li>
              </ul>
            </div>
          )}
        </div>
        {showMsgField ? (
          <Fragment>
            <Textarea
              name="message"
              placeholder="Enter Message"
              className={styles.share__message}
            />
            <div className={styles.share__button_wraper}>
              <button
                className={`${styles.share__button} ${styles["share__button--save"]} mr-30`}
              >
                Change
              </button>
              <button
                className={`${styles.share__button} ${styles["share__button--cancel"]}`}
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </Fragment>
        ) : (
          <SharePanel
            link={link}
            copyLinkHandler={copyLinkHandler}
            generateShareLink={generateShareLink}
            hasCopied={hasCopied}
          />
        )}
      </div>
    </CustomModal>
  );
};

const SharePanel = (props) => {
  const { link, copyLinkHandler, generateShareLink, hasCopied } = props;
  return (
    <div className={styles.share__social}>
      <button
        // disabled={hasCopied}
        className={styles.share__link_btn}
        onClick={copyLinkHandler}
      >
        <Icon fontName={faLinkSimple} size="2rem" className="mr-10" />
        {hasCopied ? "Copied Link" : "Copy Link"}
      </button>
      <div className={styles.share__social_icons}>
        <FacebookShareButton
          url={link}
          quote={"This is quote"}
          hashtag="#Branding"
          beforeOnClick={generateShareLink}
          className={styles["share__social--facebook"]}
        >
          <Icon fontName={faFacebook} size="3.5rem" className="mr-10" />
        </FacebookShareButton>
        <TwitterShareButton
          url="https://duacpw47bhqi1.cloudfront.net/recipe_details/621ccee8ede2edf391c431fe/"
          title="Blending101"
          hashtags={["Branding"]}
          via="http://blending101.com/"
          className={styles["share__social--twitter"]}
        >
          <Icon fontName={faTwitter} size="3.5rem" className="mr-10" />
        </TwitterShareButton>
        <PinterestShareButton
          media="https://blending101.com/Blend_Formula.png"
          url="https://duacpw47bhqi1.cloudfront.net/recipe_details/621ccee8ede2edf391c431fe/"
          description="Hello World"
          className={styles["share__social--pinterest"]}
        >
          <Icon fontName={faPinterest} size="3.5rem" className="mr-10" />
        </PinterestShareButton>
      </div>
    </div>
  );
};

export default Share;
