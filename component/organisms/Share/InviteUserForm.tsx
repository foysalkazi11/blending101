import { useQuery } from "@apollo/client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  useState,
  useRef,
  useMemo,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { GET_ALL_USER_LIST } from "../../../graphql/User";
import CustomCheckbox from "../../../theme/checkbox/CustomCheckbox";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import CircularRotatingLoader from "../../../theme/loader/circularRotatingLoader.component";
import Textarea from "../Forms/Textarea.component";
import { SharedUserInfoType } from "./Distribute.component";
import styles from "./Share.module.scss";

interface Props {
  handleInvitation?: () => void;
  handleCancel?: () => void;
  emails?: SharedUserInfoType[];
  setEmails?: Dispatch<SetStateAction<SharedUserInfoType[]>>;
  submitBtnText?: string;
  loading?: boolean;
  isAdditionInfoNeedForPersonalShare?: boolean;
}

const InviteUserForm = ({
  emails = [],
  handleCancel = () => {},
  handleInvitation = () => {},
  setEmails = () => {},
  submitBtnText = "Invite",
  loading = false,
  isAdditionInfoNeedForPersonalShare = false,
}: Props) => {
  const { data } = useQuery(GET_ALL_USER_LIST);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [input, setInput] = useState("");
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
    // setShowSuggestion(false);
    if (inputRef.current) {
      const inputEl = inputRef.current;
      inputEl.style.borderColor = "#e5e5e5";
    }
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
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
      setEmails((prevEmails) => [
        ...prevEmails?.map((info) => ({ ...info, active: false })),
        { email, canCollaborate: false, canShareAgain: false, active: true },
      ]);
      setInput("");
    }
  };

  const suggestions = useMemo(() => {
    let users = [];
    if (data?.getAllusers && input !== "") {
      users =
        data?.getAllusers.filter(
          (user) =>
            !emails?.map((el) => el?.email).includes(user.email) &&
            (user.displayName as string)
              ?.toLowerCase()
              .startsWith(input.toLowerCase()),
        ) || [];
    }
    if (users.length !== 0) setShowSuggestion(true);
    else setShowSuggestion(false);
    return users;
  }, [data?.getAllusers, emails, input]);

  const activeEmailInfo = useMemo(() => {
    return emails.find((info) => info.active);
  }, [emails]);

  const handleFilterEmail = (emailProps: string) => {
    setEmails((emails) => emails.filter((email) => email.email !== emailProps));
  };

  const handleAddNewEmail = (info: SharedUserInfoType) => {
    setEmails((prevEmails) => [
      ...prevEmails?.map((info) => ({ ...info, active: false })),
      info,
    ]);
    setShowSuggestion(false);
    setInput("");
  };

  const toggleActiveEmail = (sharedPersonInfo: SharedUserInfoType) => {
    setEmails((prevEmails) => [
      ...prevEmails?.map((info) =>
        info?.email === sharedPersonInfo.email
          ? { ...info, ...sharedPersonInfo }
          : { ...info, active: false },
      ),
    ]);
  };

  useEffect(() => {
    setEmails([]);
    setInput;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        ref={inputRef}
        className={styles.email}
        style={hasEmails ? {} : { padding: 10 }}
        onClick={onInputFocus}
        onBlur={onInputBlur}
      >
        {emails.map((email) => (
          <span
            className={`${styles.email__address} ${
              isAdditionInfoNeedForPersonalShare && email?.active
                ? styles.activeEmail
                : ""
            } ${
              isAdditionInfoNeedForPersonalShare && email.canCollaborate
                ? styles.collaborationAccessEmail
                : ""
            }`}
            key={email?.email}
            onClick={() =>
              toggleActiveEmail({ ...email, active: !email?.active })
            }
          >
            {email?.email}
            <div className={styles.closeBtn}>
              <IconWarper
                defaultBg="primary"
                style={{
                  width: "16px",
                  height: "16px",
                }}
                iconColor="iconColorWhite"
                handleClick={() => handleFilterEmail(email?.email)}
              >
                <FontAwesomeIcon icon={faXmark} fontSize="10px" />
              </IconWarper>
            </div>
          </span>
        ))}
        <input
          type="email"
          value={input}
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
              {suggestions.slice(0, 3).map((user) => {
                return (
                  <li
                    key={user?.email}
                    onClick={() =>
                      handleAddNewEmail({
                        email: user?.email,
                        canCollaborate: false,
                        active: true,
                      })
                    }
                  >
                    <span>{user?.displayName?.charAt(0)}</span>
                    {user?.displayName}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <div
        className={`${styles.activeEmailInfoContainer} ${
          isAdditionInfoNeedForPersonalShare && activeEmailInfo?.active
            ? styles.showInfo
            : ""
        }`}
      >
        <div className={styles.checkBoxContainer}>
          <CustomCheckbox
            checked={activeEmailInfo?.canCollaborate}
            handleChange={(e) =>
              toggleActiveEmail({
                ...activeEmailInfo,
                canCollaborate: !activeEmailInfo?.canCollaborate,
              })
            }
            id="canCollaborate"
          />
          <label className={styles.label} htmlFor="canCollaborate">
            Collaborate
          </label>
        </div>
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
          {loading ? (
            <CircularRotatingLoader
              color="white"
              style={{ width: "20px", height: "20px", margin: "0 10px" }}
            />
          ) : (
            submitBtnText
          )}
        </button>
        <button
          className={`${styles.share__button} ${styles["share__button--cancel"]}`}
          onClick={() => {
            handleCancel();
            setInput("");
            setShowSuggestion(false);
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default InviteUserForm;
