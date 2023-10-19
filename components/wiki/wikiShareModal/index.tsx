import { useState } from "react";
import CircularRotatingLoader from "theme/loader/circularRotatingLoader.component";
import styles from "./WikiShareModal.module.scss";
import Icon from "component/atoms/Icon/Icon.component";
import { faLinkSimple } from "@fortawesome/pro-thin-svg-icons";
import { FacebookShareButton, PinterestShareButton, TwitterShareButton } from "react-share";
import { faFacebook, faPinterest, faSquareTwitter } from "@fortawesome/free-brands-svg-icons";
import CustomModal from "theme/modal/customModal";

export const WikiShareModal = (props) => {
  const { copyLinkHandler, generateShareLink, hasCopied, loading } = props;

  const [link, setLink] = useState("");
  return (
    <CustomModal>
      <div className={styles.share__social}>
        <button
          // disabled={hasCopied}
          className={styles.share__link_btn}
          onClick={() => copyLinkHandler(true)}
        >
          {loading ? (
            <CircularRotatingLoader color="primary" style={{ width: "20px", height: "20px", marginRight: "10px" }} />
          ) : (
            <Icon fontName={faLinkSimple} size="2rem" className="mr-10" />
          )}
          <p style={{ flexShrink: 0 }}>{hasCopied ? "Copied Link" : "Copy Link"}</p>
        </button>
        <div className={styles.share__social_icons}>
          <FacebookShareButton
            url={link || "http://blending101.com/"}
            quote={"This is quote"}
            hashtag="#Branding"
            beforeOnClick={async () => {
              const newLink = await generateShareLink(true, false);
              console.log(newLink);

              setLink(newLink);
            }}
            className={styles["share__social--facebook"]}
          >
            <Icon fontName={faFacebook} size="3.5rem" className="mr-10" />
          </FacebookShareButton>
          <TwitterShareButton
            url={link || "http://blending101.com/"}
            title="Blending101"
            hashtags={["Branding"]}
            via="http://blending101.com/"
            className={styles["share__social--twitter"]}
            beforeOnClick={() => generateShareLink(true, false)}
          >
            <Icon fontName={faSquareTwitter} size="3.5rem" className="mr-10" />
          </TwitterShareButton>
          <PinterestShareButton
            media="https://blending101.com/Blend_Formula.png"
            url={link || "http://blending101.com/"}
            description="Hello World"
            className={styles["share__social--pinterest"]}
            beforeOnClick={() => generateShareLink(true, false)}
          >
            <Icon fontName={faPinterest} size="3.5rem" className="mr-10" />
          </PinterestShareButton>
        </div>
      </div>
    </CustomModal>
  );
};

export default WikiShareModal;
