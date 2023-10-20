import { useMutation } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import Share, { SharedUserInfoType } from "../../../../../component/organisms/Share/Distribute.component";
import { CREATE_SHARE_LINK } from "../../../../../modules/app/graphql/Share";
import { useAppSelector } from "../../../../../redux/hooks";
import notification from "../../../../utility/reactToastifyNotification";
import { useUser } from "../../../../../context/AuthProvider";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [createShareLink, { data, loading: createLinkLoading }] = useMutation(CREATE_SHARE_LINK);
  const [hasCopied, setHasCopied] = useState(false);
  const [showMsgField, setShowMsgField] = useState(false);
  const [link, setLink] = useState(`https://app.blending101.com/${router?.asPath}`);
  const [emails, setEmails] = useState<SharedUserInfoType[]>([]);
  const userId = useUser().id;
  const [isVersionSharable, setIsVersionShareable] = useState(false);

  const onCancel = () => {
    setShowMsgField(false);
    setEmails([]);
  };

  const copyLinkHandlerFunc = async (isGlobalShare: boolean = true) => {
    if (!isGlobalShare && !emails.length) {
      notification("warning", "Please enter email");
      return;
    }
    if (!isGlobalShare) {
      const nexLink = await generateShareLinkFunc(isGlobalShare);
      navigator.clipboard.writeText(nexLink);
      notification(
        "success",
        isGlobalShare
          ? "Link copied to your clipboard"
          : "Recipe shared successfully and link copied to your clipboard",
      );
      setHasCopied(true);
      setShowMsgField(false);
      setShow(false);
      return;
    }

    navigator.clipboard.writeText(link);
    notification(
      "success",
      isGlobalShare ? "Link copied to your clipboard" : "Recipe shared successfully and link copied to your clipboard",
    );
    setHasCopied(true);
    setShowMsgField(false);
    setShow(false);
  };

  const generateShareLinkFunc = useCallback(
    async (isGlobalShare: boolean = true) => {
      try {
        const { data } = await createShareLink({
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
          process.env.NEXT_PUBLIC_HOSTING_DOMAIN || "https://app.blending101.com"
        }/recipe/recipe_details/${id}?token=${data?.createShareLink}`;
        console.log(link);

        setLink(link);
        return link;
      } catch (error) {
        notification("error", "Not able to share recipe");
      }
    },
    [createShareLink, emails, id, turnedOnVersions, userId, versionId],
  );

  useEffect(() => {
    if (id && show) {
      generateShareLinkFunc();
    }
  }, [generateShareLinkFunc, id, show]);

  return (
    <Share
      image={image}
      setShow={setShow}
      show={show}
      title={title}
      type={type}
      copyLinkHandlerFunc={copyLinkHandlerFunc}
      generateShareLinkFunc={generateShareLinkFunc}
      createLinkLoading={createLinkLoading}
      emails={emails}
      generatedLink={link}
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
