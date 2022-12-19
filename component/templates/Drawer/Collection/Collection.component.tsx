import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useLazyQuery } from "@apollo/client";
import { faBookmark } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import AddCollectionModal from "../../../../components/sidetray/collection/addCollectionModal/AddCollectionModal";
import CollectionComponent from "../../../../components/sidetray/collection/content/collection.component";
import TrayTag from "../../../../components/sidetray/TrayTag";
import TrayWrapper from "../../../../components/sidetray/TrayWrapper";
import GET_COLLECTIONS_AND_THEMES from "../../../../gqlLib/collection/query/getCollectionsAndThemes";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { setChangeRecipeWithinCollection } from "../../../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../../../redux/slices/sideTraySlice";
import CustomModal from "../../../../theme/modal/customModal/CustomModal";
import Widget from "../../../module/Widget/Widget.component";

import styles from "./Collection.module.scss";

interface CollectionTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

function CollectionDrawer({
  showTagByDefaut = true,
  showPanle = "left",
}: CollectionTrayProps) {
  const [toggle, setToggle] = useState(1);
  const [input, setInput] = useState<any>({
    image: null,
    name: "",
  });
  const [isEditCollection, setIsEditCollection] = useState(false);
  const [collectionId, setCollectionId] = useState("");
  const { dbUser } = useAppSelector((state) => state?.user);
  const { changeRecipeWithinCollection } = useAppSelector(
    (state) => state?.collections,
  );
  const { openCollectionsTary } = useAppSelector((state) => state?.sideTray);
  const [openModal, setOpenModal] = useState(false);
  const reff = useRef<any>();
  const dispatch = useAppDispatch();

  const closeTray = () => {
    dispatch(setOpenCollectionsTary(!openCollectionsTary));
    dispatch(setChangeRecipeWithinCollection(false));
  };

  const [
    getCollectionsAndThemes,
    {
      data: collectionsData,
      loading: collectionsLoading,
      error: collectionsError,
    },
  ] = useLazyQuery(GET_COLLECTIONS_AND_THEMES, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (openCollectionsTary) {
      getCollectionsAndThemes({ variables: { userId: dbUser?._id } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCollectionsTary]);

  return (
    <TrayWrapper
      showTagByDefaut={showTagByDefaut}
      closeTray={closeTray}
      openTray={openCollectionsTary}
      showPanle={showPanle}
      panleTag={(hover) => (
        <TrayTag
          icon={<FontAwesomeIcon icon={faBookmark} />}
          placeMent="left"
          hover={hover}
        />
      )}
    >
      <div className={styles.main}>
        <CollectionComponent
          collections={
            collectionsData?.getUserCollectionsAndThemes?.collections || []
          }
          collectionsLoading={collectionsLoading}
          setInput={setInput}
          setIsEditCollection={setIsEditCollection}
          setCollectionId={setCollectionId}
          getCollectionsAndThemes={getCollectionsAndThemes}
          setOpenModal={setOpenModal}
        />
        <CustomModal open={openModal} setOpen={setOpenModal}>
          <AddCollectionModal
            input={input}
            setInput={setInput}
            isEditCollection={isEditCollection}
            collectionId={collectionId}
            getCollectionsAndThemes={getCollectionsAndThemes}
            setOpenModal={setOpenModal}
          />
        </CustomModal>
      </div>
    </TrayWrapper>
  );
}

export default CollectionDrawer;
