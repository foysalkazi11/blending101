import React, { useRef, useState, useEffect } from "react";
import {
  faFacebook,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLinkSimple,
  faShareNodes,
  faUserGroup,
} from "@fortawesome/pro-regular-svg-icons";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from "react-share";
import Icon from "../../atoms/Icon/Icon.component";
import styles from "./Share.module.scss";
import CustomModal from "../../../theme/modal/customModal/CustomModal";
import { useMutation } from "@apollo/client";
import { CREATE_SHARE_LINK } from "../../../graphql/Share";
import { useAppSelector } from "../../../redux/hooks";
import notification from "../../../components/utility/reactToastifyNotification";
import InviteUserForm from "./InviteUserForm";
import CircularRotatingLoader from "../../../theme/loader/circularRotatingLoader.component";

interface ShareProps {
  id: string;
  title: string;
  type: "recipe";
  image: string;
  show: boolean;
  setShow: any;
  heading?: string;
}

const Share = (props: ShareProps) => {
  const {
    id,
    title,
    image,
    type,
    show,
    setShow,
    heading = "Share Recipe",
  } = props;
  const [createShareLink, { data, loading: createLinkLoading }] =
    useMutation(CREATE_SHARE_LINK);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasCopied, setHasCopied] = useState(false);
  const [showMsgField, setShowMsgField] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [link, setLink] = useState("");
  const [emails, setEmails] = useState([]);
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);

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

  const onCancel = () => {
    setShowMsgField(false);
    setEmails([]);
  };

  const copyLinkHandler = async (isGlobalShare: boolean = true) => {
    if (!isGlobalShare && !emails.length) {
      notification("warning", "Please enter email");
      return;
    }
    const link = await generateShareLink(isGlobalShare);
    navigator.clipboard.writeText(link);
    notification("success", "Link has been copied in clipboard");
    setHasCopied(true);
    // setShow(false);
  };

  const generateShareLink = async (isGlobalShare: boolean = true) => {
    try {
      const response = await createShareLink({
        variables: {
          data: {
            shareData: {
              recipeId: detailsARecipe._id,
              version: detailsARecipe.versionId,
            },
            shareTo: isGlobalShare ? [] : emails,
            sharedBy: userId,
          },
        },
      });
      let link = `https://duacpw47bhqi1.cloudfront.net/recipe_details/${id}?token=${response.data?.createShareLink}`;
      setLink(link);
      return link;
    } catch (error) {
      notification("error", "Not able to share recipe");
    }
  };

  useEffect(() => {
    setShowMsgField(false);
  }, []);

  return (
    <CustomModal open={show} setOpen={setShow}>
      <div className={styles.share}>
        <div className={styles.share__header}>
          <Icon fontName={faShareNodes} size="2.5rem" />
          <h3>{heading}</h3>
        </div>
        <div className={styles.share__title}>
          <img src={image || "/cards/coriander.png"} alt="" />
          <h3>{title}</h3>
        </div>
        {showMsgField ? (
          <InviteUserForm
            emails={emails}
            setEmails={setEmails}
            handleCancel={onCancel}
            handleInvitation={() => copyLinkHandler(false)}
            submitBtnText="Share"
            loading={createLinkLoading}
          />
        ) : (
          <div className="d-flex">
            <button
              // disabled={hasCopied}
              className={styles.share__link_btn}
              onClick={() => setShowMsgField(true)}
            >
              <Icon fontName={faUserGroup} size="2rem" className="mr-10" />
              <p style={{ flexShrink: 0 }}>Find users</p>
            </button>
            <SharePanel
              link={link}
              copyLinkHandler={copyLinkHandler}
              generateShareLink={generateShareLink}
              hasCopied={hasCopied}
              loading={createLinkLoading}
            />
          </div>
        )}
      </div>
    </CustomModal>
  );
};

const SharePanel = (props) => {
  const { link, copyLinkHandler, generateShareLink, hasCopied, loading } =
    props;
  return (
    <div className={styles.share__social}>
      <button
        // disabled={hasCopied}
        className={styles.share__link_btn}
        onClick={copyLinkHandler}
      >
        {loading ? (
          <CircularRotatingLoader
            color="primary"
            style={{ width: "20px", height: "20px", marginRight: "10px" }}
          />
        ) : (
          <Icon fontName={faLinkSimple} size="2rem" className="mr-10" />
        )}
        <p style={{ flexShrink: 0 }}>
          {hasCopied ? "Copied Link" : "Copy Link"}
        </p>
      </button>
      <div className={styles.share__social_icons}>
        <FacebookShareButton
          url={link}
          quote={"This is quote"}
          hashtag="#Branding"
          beforeOnClick={link ? () => {} : generateShareLink}
          className={styles["share__social--facebook"]}
        >
          <Icon fontName={faFacebook} size="3.5rem" className="mr-10" />
        </FacebookShareButton>
        <TwitterShareButton
          url={link}
          title="Blending101"
          hashtags={["Branding"]}
          via="http://blending101.com/"
          className={styles["share__social--twitter"]}
          beforeOnClick={link ? () => {} : generateShareLink}
        >
          <Icon fontName={faTwitter} size="3.5rem" className="mr-10" />
        </TwitterShareButton>
        <PinterestShareButton
          media="https://blending101.com/Blend_Formula.png"
          url={link}
          description="Hello World"
          className={styles["share__social--pinterest"]}
          beforeOnClick={link ? () => {} : generateShareLink}
        >
          <Icon fontName={faPinterest} size="3.5rem" className="mr-10" />
        </PinterestShareButton>
      </div>
    </div>
  );
};

export default Share;
