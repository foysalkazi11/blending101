import { useEffect, useState } from "react";
import CustomModal from "theme/modal/customModal";
import { ShareItemInfo, SharePanel } from "component/organisms/Share/Distribute.component";
import notification from "components/utility/reactToastifyNotification";

let link = null;

type WikiShareModalProps = {
  openModal?: boolean;
  setOpenModal?: (value: boolean) => void;
  heading?: string;
  title?: string;
  image?: string;
};
export const WikiShareModal = ({
  heading = "Share Wiki",
  image = "",
  openModal = false,
  setOpenModal = () => {},
  title = "Item name",
}: WikiShareModalProps) => {
  // const { copyLinkHandler, generateShareLink, hasCopied, loading } = props;
  const [hasCopied, setHasCopied] = useState(false);
  if (window) {
    link = window.location.href;
  }
  let clearTimeoutFun = null;
  // const [link, setLink] = useState(window.location.href);
  const copyLinkHandlerFunc = () => {
    navigator.clipboard.writeText(link || window?.location?.href);
    notification("success", "Link has been copied in clipboard");
    setHasCopied(true);
    clearTimeoutFun = setTimeout(() => {
      setHasCopied(false);
    }, 1500);
  };

  useEffect(() => {
    return () => {
      clearTimeout(clearTimeoutFun);
    };
  });

  return (
    <CustomModal open={openModal} setOpen={setOpenModal} shouldCloseOnOverlayClick>
      <div style={{ padding: "2rem 3rem" }}>
        <ShareItemInfo heading={heading} image={image} setOpenModal={setOpenModal} title={title} />
        <SharePanel link={link || window?.location?.href} copyLinkHandler={copyLinkHandlerFunc} hasCopied={hasCopied} />
      </div>
    </CustomModal>
  );
};

export default WikiShareModal;
