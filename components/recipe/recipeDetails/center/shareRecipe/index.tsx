import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Share, {
  SharedUserInfoType,
} from "../../../../../component/organisms/Share/Distribute.component";
import { CREATE_SHARE_LINK } from "../../../../../graphql/Share";
import { useAppSelector } from "../../../../../redux/hooks";
import notification from "../../../../utility/reactToastifyNotification";
import { useUser } from "../../../../../context/AuthProvider";

interface Props {
  id: string;
  versionId: string;
  title: string;
  type: "recipe" | "collection";
  image: string;
  show: boolean;
  setShow: any;
  heading: string;
  turnedOnVersions: string[];
}

const ShareRecipe = ({
  id = "",
  versionId = "",
  image = "",
  setShow = () => {},
  show = false,
  title = "",
  type = "recipe",
  heading = "",
  turnedOnVersions = [],
}: Props) => {
  const [createShareLink, { data, loading: createLinkLoading }] =
    useMutation(CREATE_SHARE_LINK);
  const [hasCopied, setHasCopied] = useState(false);
  const [showMsgField, setShowMsgField] = useState(false);
  const [link, setLink] = useState("");
  const [emails, setEmails] = useState<SharedUserInfoType[]>([]);
  const userId = useUser().id;
  const [isVersionSharable, setIsVersionShareable] = useState(false);

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
    notification(
      "success",
      isGlobalShare
        ? "Link copied to your clipboard"
        : "Recipe shared successfully and link copied to your clipboard",
    );
    setHasCopied(true);
    setShowMsgField(false);
    setShow(false);
  };

  const generateShareLink = async (isGlobalShare: boolean = true) => {
    try {
      const response = await createShareLink({
        variables: {
          data: {
            shareData: {
              recipeId: id,
              version: versionId,
              turnedOnVersions,
            },
            shareTo: isGlobalShare ? [] : emails?.map((info) => info?.email),
            sharedBy: userId,
          },
        },
      });
      let link = `${
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_HOSTING_DOMAIN
          : "http://localhost:4000"
      }/recipe/recipe_details/${id}?token=${response.data?.createShareLink}`;
      setLink(link);
      return link;
    } catch (error) {
      notification("error", "Not able to share recipe");
    }
  };

  return (
    <Share
      image={image}
      setShow={setShow}
      show={show}
      title={title}
      type={type}
      copyLinkHandler={copyLinkHandler}
      createLinkLoading={createLinkLoading}
      emails={emails}
      generatedLink={link}
      generateShareLink={generateShareLink}
      hasCopied={hasCopied}
      heading={heading}
      onCancel={onCancel}
      setEmails={setEmails}
      setShowMsgField={setShowMsgField}
      showMsgField={showMsgField}
      isVersionSharable={isVersionSharable}
      setIsVersionShareable={setIsVersionShareable}
      shareVersionsLength={turnedOnVersions?.length}
    />
  );
};

export default ShareRecipe;
