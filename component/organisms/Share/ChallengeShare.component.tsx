import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
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
import { dataURLtoFile } from "../../../helpers/File";
import axios from "axios";

interface Props {
  id: string;
  name: string;
  show: boolean;
  setShow: any;
  element: HTMLDivElement;
}

const ChallengeShareModal = ({ id, name, show, setShow, element }: Props) => {
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

      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/challenge/shared?id=${id}&token=${res.data?.shareGlobalChallenge}`,
      );

      html2canvas(element).then((canvas) => {
        const data = canvas.toDataURL("image/jpg");
        const file = dataURLtoFile(data, "challenge.png");

        // STORING THE DIALER IMAGE
        const formdata = new FormData();
        formdata.append("image", file, `${id}.jpg`);

        axios.post(
          "https://om7h45qezg.execute-api.us-east-1.amazonaws.com/prod//file-processing/images/single",
          formdata,
        );

        const link = document.createElement("a");
        if (typeof link.download === "string") {
          link.href = data;
          link.download = "image.jpg";

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          window.open(data);
        }
      });
    });
  }, [element, id, shareChallenge, show, userId]);

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