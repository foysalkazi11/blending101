import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { faFacebook, faPinterest, faSquareTwitter, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLinkSimple, faShareNodes, faUserGroup, faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FacebookShareButton, PinterestShareButton, TwitterShareButton } from "react-share";
import Icon from "../../atoms/Icon/Icon.component";
import styles from "./Share.module.scss";
import CustomModal from "../../../theme/modal/customModal";
import InviteUserForm from "./InviteUserForm";
import CircularRotatingLoader from "../../../theme/loader/circularRotatingLoader.component";
import { InputValueType } from "../../../components/sidetray/common/addCollectionModal/AddCollectionModal";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomCheckbox from "../../../theme/checkbox/CustomCheckbox";
import Image from "next/image";
export interface SharedUserInfoType {
  email: string;
  canCollaborate?: boolean;
  active?: boolean;
}

interface ShareProps {
  title?: string;
  type: "recipe" | "collection";
  image?: string;
  show: boolean;
  setShow: any;
  heading?: string;
  generatedLink?: string;
  showMsgField?: boolean;
  setShowMsgField?: React.Dispatch<React.SetStateAction<boolean>>;
  emails?: SharedUserInfoType[];
  setEmails?: React.Dispatch<React.SetStateAction<SharedUserInfoType[]>>;
  copyLinkHandlerFunc?: (args?: boolean) => Promise<void>;
  onCancel?: () => void;
  generateShareLinkFunc?: (isGlobalShare?: boolean, copyLinkAtClipboard?: boolean) => void;
  createLinkLoading?: boolean;
  hasCopied?: boolean;
  submitBtnText?: string;
  isAdditionInfoNeedForPersonalShare?: boolean;
  createCollectionProps?: {
    input: InputValueType;
    setInput: Dispatch<SetStateAction<InputValueType>>;
    showCreateCollectionComponents: boolean;
  };
  message?: string;
  setMessage?: Dispatch<SetStateAction<string>>;
  sharedUserEmail?: string;
  isVersionSharable?: boolean;
  setIsVersionShareable?: Dispatch<SetStateAction<boolean>>;
  shareVersionsLength?: number;
  showVersionShareCheckbox?: boolean;
}

const Share = (props: ShareProps) => {
  const {
    title,
    image,
    type,
    show,
    setShow,
    heading = "Share Recipe",
    generatedLink = "",
    setShowMsgField = () => {},
    showMsgField = false,
    emails = [],
    setEmails = () => {},
    copyLinkHandlerFunc,
    createLinkLoading = false,
    generateShareLinkFunc,
    hasCopied = false,
    onCancel = () => {},
    submitBtnText = "Share",
    isAdditionInfoNeedForPersonalShare = false,
    createCollectionProps,
    message = "",
    setMessage = () => {},
    sharedUserEmail = "",
    isVersionSharable = false,
    setIsVersionShareable = () => {},
    shareVersionsLength = 0,
    showVersionShareCheckbox = true,
  } = props;

  useEffect(() => {
    setShowMsgField(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CustomModal open={show} setOpen={setShow}>
      <div className={styles.share}>
        <ShareItemInfo heading={heading} image={image} setOpenModal={setShow} title={title} />

        {showMsgField ? (
          <InviteUserForm
            emails={emails}
            setEmails={setEmails}
            handleCancel={onCancel}
            handleInvitation={() => copyLinkHandlerFunc(false)}
            submitBtnText={submitBtnText}
            loading={createLinkLoading}
            isAdditionInfoNeedForPersonalShare={isAdditionInfoNeedForPersonalShare}
            createCollectionProps={createCollectionProps}
            message={message}
            setMessage={setMessage}
            sharedUserEmail={sharedUserEmail}
          />
        ) : (
          <div className="d-flex">
            <button
              // disabled={hasCopied}
              className={styles.link_btn}
              onClick={() => setShowMsgField(true)}
            >
              <Icon fontName={faEnvelope} size="2rem" className="mr-10" />
              <p style={{ flexShrink: 0 }}>Email Link</p>
            </button>
            <SharePanel
              link={generatedLink}
              copyLinkHandler={copyLinkHandlerFunc}
              generateShareLink={generateShareLinkFunc}
              hasCopied={hasCopied}
              loading={createLinkLoading}
            />
          </div>
        )}
        {type === "recipe" && showVersionShareCheckbox && (
          <div className={styles.checkBoxContainer}>
            <CustomCheckbox
              checked={isVersionSharable}
              handleChange={(e) => setIsVersionShareable(e.target.checked)}
              id="shareOtherVersions"
              disable={shareVersionsLength ? false : true}
            />
            <label className={styles.label} htmlFor="shareOtherVersions">
              {`Share Other Versions ${shareVersionsLength ? `(${shareVersionsLength})` : ""}`}
            </label>
          </div>
        )}
      </div>
    </CustomModal>
  );
};

interface SharePanelProps {
  link?: string;
  copyLinkHandler?: (value?: boolean) => Promise<void> | void;
  generateShareLink?: (value?: boolean, copyLinkAtClipboard?: boolean) => any;
  hasCopied?: boolean;
  loading?: boolean;
}

export const SharePanel = (props: SharePanelProps) => {
  const { link, copyLinkHandler, generateShareLink, hasCopied, loading } = props;

  return (
    <div className={styles.social}>
      <button
        // disabled={hasCopied}
        className={styles.link_btn}
        onClick={() => copyLinkHandler(true)}
      >
        {loading ? (
          <CircularRotatingLoader color="primary" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
        ) : (
          <Icon fontName={faLinkSimple} size="2rem" className="mr-10" />
        )}
        <p style={{ flexShrink: 0 }}>{hasCopied ? "Copied Link" : "Copy Link"}</p>
      </button>
      <div className={styles.social_icons}>
        <FacebookShareButton
          url={link || "https://blending101.com"}
          quote={"This is quote"}
          hashtag="#Branding"
          // beforeOnClick={async () =>
          //   new Promise(async (resolve, reject) => {
          //     const newLink = await generateShareLink(true, false);
          //     console.log(newLink);
          //     resolve(newLink);
          //   })
          // }
          className={styles["social--facebook"]}
        >
          <Icon fontName={faFacebook} size="3.5rem" className="mr-10" />
        </FacebookShareButton>
        <TwitterShareButton
          url={link || "https://blending101.com"}
          title="Blending101"
          hashtags={["Branding"]}
          via={link}
          className={styles["social--twitter"]}
          // beforeOnClick={() => generateShareLink(true, false)}
        >
          <Icon fontName={faSquareTwitter} size="3.5rem" className="mr-10" />
        </TwitterShareButton>
        <PinterestShareButton
          media="https://blending101.com/Blend_Formula.png"
          url={link || "https://blending101.com"}
          description="Hello World"
          className={styles["social--pinterest"]}
          // beforeOnClick={() => generateShareLink(true, false)}
        >
          <Icon fontName={faPinterest} size="3.5rem" className="mr-10" />
        </PinterestShareButton>
      </div>
    </div>
  );
};

type ShareItemInfoProps = {
  setOpenModal?: (value: boolean) => void;
  heading?: string;
  title?: string;
  image?: string;
};

export const ShareItemInfo = ({
  heading = "Share",
  image = "",
  setOpenModal = () => {},
  title = "Item name",
}: ShareItemInfoProps) => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.leftSide}>
          <Icon fontName={faShareNodes} size="2.5rem" />
          <h3>{heading}</h3>
        </div>
        <IconWarper
          iconColor="iconColorWhite"
          defaultBg="secondary"
          hover="bgSecondary"
          style={{ width: "24px", height: "24px" }}
          handleClick={() => setOpenModal(false)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </IconWarper>
      </div>

      {!image && !title ? null : (
        <div className={styles.title}>
          {image && (
            <Image
              src={image}
              alt="img"
              width={50}
              height={50}
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          )}
          {title && <h3>{title}</h3>}
        </div>
      )}
    </>
  );
};

export default Share;
