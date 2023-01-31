import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import Share, {
  SharedUserInfoType,
} from "../../component/organisms/Share/Distribute.component";
import CREATE_COLLECTION_AND_SHARE from "../../gqlLib/share/mutation/createCollectionAndShare";
import formatDate from "../../helperFunc/date/formatDate";
import { useAppSelector } from "../../redux/hooks";
import { InputValueType } from "../sidetray/common/addCollectionModal/AddCollectionModal";
import notification from "../utility/reactToastifyNotification";
import slugStringGenerator from "../utility/slugStringGenerator";

interface Props {
  id?: string;
  title?: string;
  type?: string;
  image?: string;
  show?: boolean;
  setShow?: any;
  heading?: string;
  itemsIds?: string[];
}

const ShareItems = ({
  id = "",
  image = "",
  setShow = () => {},
  show = false,
  title = "",
  type = "recipe",
  heading = "",
  itemsIds = [],
}: Props) => {
  const [
    createRecipeCollectionAndShare,
    { data, loading: createRecipeCollectionAndShareLoading },
  ] = useMutation(CREATE_COLLECTION_AND_SHARE);
  const [hasCopied, setHasCopied] = useState(false);
  const [showMsgField, setShowMsgField] = useState(false);
  const [link, setLink] = useState("");
  const [emails, setEmails] = useState<SharedUserInfoType[]>([]);
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const [input, setInput] = useState<InputValueType>({
    image: null,
    name: "",
    slug: "",
    description: "",
  });

  const onCancel = () => {
    setShowMsgField(false);
    setEmails([]);
  };

  const generateShareLink = async (isGlobalShare: boolean = true) => {
    if (!isGlobalShare && !emails.length) {
      notification("warning", "Please enter email");
      return;
    }

    if (type === "recipe") {
      try {
        const { data } = await createRecipeCollectionAndShare({
          variables: {
            data: {
              newCollectionData: {
                description: input.description,
                image: input.image,
                name: input.name,
                recipes: itemsIds,
                slug: input.slug,
              },
              shareTo: isGlobalShare
                ? []
                : emails.map((info) => ({
                    shareToEmail: info.email,
                    canContribute: info.canCollaborate,
                    canShareWithOthers: info.canCollaborate,
                  })),
              sharedBy: userId,
            },
          },
        });
        const generatedLink = `${
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_HOSTING_DOMAIN
            : "http://localhost:3000"
        }/collection/recipeCollection/${input.slug}?${
          isGlobalShare
            ? "token=" + data.createCollectionAndShare
            : "collectionId=" + data.createCollectionAndShare
        }`;
        setLink(generatedLink);

        navigator.clipboard.writeText(generatedLink);
        notification("success", "Link has been copied in clipboard");
        setHasCopied(true);
      } catch (error) {
        notification("error", "Not able to share recipe");
      }
    }
  };

  useEffect(() => {
    const currentDate = formatDate(new Date());
    const currentDateFormate = `${currentDate.day} ${currentDate.month}, ${currentDate.year}`;
    const convertToSlug = slugStringGenerator(currentDateFormate);
    setInput((pre) => ({
      ...pre,
      name: currentDateFormate,
      slug: convertToSlug,
    }));
  }, []);

  return (
    <Share
      image={image}
      setShow={setShow}
      show={show}
      title={title}
      type={type}
      copyLinkHandler={generateShareLink}
      createLinkLoading={createRecipeCollectionAndShareLoading}
      emails={emails}
      generatedLink={link}
      generateShareLink={generateShareLink}
      hasCopied={hasCopied}
      heading={heading}
      onCancel={onCancel}
      setEmails={setEmails}
      setShowMsgField={setShowMsgField}
      showMsgField={showMsgField}
      createCollectionProps={{
        input,
        setInput,
        showCreateCollectionComponents: true,
      }}
    />
  );
};

export default ShareItems;
