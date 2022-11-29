import React, { useState, useEffect } from "react";
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  EmailShareButton,
} from "react-share";
import { MdClose, MdMail } from "react-icons/md";

import CustomModal from "../../../theme/modal/customModal/CustomModal";
import styles from "../../../theme/shareRecipeModal/ShareRecipeModal.module.scss";
import { useMutation } from "@apollo/client";
import { SHARE_CHALLENGE } from "../../../graphql/Challenge";
import { useAppSelector } from "../../../redux/hooks";

interface Props {
  id: string;
  name: string;
  show: boolean;
  setShow: any;
}

const ChallengeShareModal = ({ id, name, show, setShow }: Props) => {
  const [link, setLink] = useState("");
  const [shareChallenge] = useMutation(SHARE_CHALLENGE);

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  useEffect(() => {
    if (!show) return;
    shareChallenge({
      variables: {
        userId,
        challengeId: id,
      },
    }).then((res) => {
      setLink(
        `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/challenge?id=${id}&token=${res.data?.shareGlobalChallenge}`,
      );
    });
  }, [id, shareChallenge, show, userId]);

  console.log(link);

  return (
    <CustomModal open={show} setOpen={setShow}>
      <div className={styles.shareRecipeModalContainer}>
        <div className={styles.header}>
          <button onClick={() => setShow(false)} className="hvr-pop">
            <MdClose className={styles.closeIcon} />
          </button>
          <h5>Share - {name}</h5>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.socialIconGroup}>
            <EmailShareButton
              url={link}
              subject="Blending101"
              body="lorem20"
              className="mr-20"
            >
              <a className={styles.instaIcon} href="#">
                <MdMail />
              </a>
            </EmailShareButton>

            <FacebookShareButton
              url={link}
              quote={"This is quote"}
              hashtag="#Branding"
              className="mr-20"
            >
              <a className={styles.fbIcon} href="#">
                <FaFacebookF />
              </a>
            </FacebookShareButton>

            <PinterestShareButton
              media="https://blending101.com/Blend_Formula.png"
              url="https://duacpw47bhqi1.cloudfront.net/recipe_details/621ccee8ede2edf391c431fe/"
              description="Hello World"
              className="mr-20"
            >
              <a className={styles.pinterestIcon} href="#">
                <FaPinterestP />
              </a>
            </PinterestShareButton>

            <TwitterShareButton
              url="https://duacpw47bhqi1.cloudfront.net/recipe_details/621ccee8ede2edf391c431fe/"
              title="Blending101"
              hashtags={["Branding"]}
              via="http://blending101.com/"
            >
              <a className={styles.twitterIcon} href="#">
                <FaTwitter />
              </a>
            </TwitterShareButton>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ChallengeShareModal;
