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
import { INVITE_CHALLENGE } from "../../../graphql/Challenge";

interface ShareProps {
  id?: string;
  title?: string;
  show: boolean;
  setShow: any;
}

const Invite = (props: ShareProps) => {
  const { id, title, show, setShow } = props;
  const [inviteChallenge, { data }] = useMutation(INVITE_CHALLENGE);

  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const [link, setLink] = useState("");
  const [emails, setEmails] = useState([]);

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const hasEmails = emails.length > 0;

  const onInputFocus = () => {
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

  const handleInvitation = () => {
    inviteChallenge({
      variables: {
        shareWithOther: false,
        emails,
        user: userId,
        challengeId: id,
      },
    }).then(() => {
      setShow(false);
    });
  };

  return (
    <CustomModal open={show} setOpen={setShow}>
      <div className={styles.share}>
        <div className={styles.share__header}>
          <Icon fontName={faShareNodes} size="2.5rem" />
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
        <Textarea
          name="message"
          placeholder="Enter Message"
          className={styles.share__message}
        />
        <div className={styles.share__button_wraper}>
          <button
            className={`${styles.share__button} ${styles["share__button--save"]} mr-30`}
            onClick={handleInvitation}
          >
            Invite
          </button>
          <button
            className={`${styles.share__button} ${styles["share__button--cancel"]}`}
            onClick={() => setShow(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default Invite;
