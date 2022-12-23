/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import TrayWrapper from "../TrayWrapper";
import CollectionComponent from "./content/collection.component";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import CustomModal from "../../../theme/modal/customModal/CustomModal";
import AddCollectionModal from "./addCollectionModal/AddCollectionModal";
import GET_COLLECTIONS_AND_THEMES from "../../../gqlLib/collection/query/getCollectionsAndThemes";
import { useLazyQuery, useMutation } from "@apollo/client";
import { setOpenCollectionsTary } from "../../../redux/slices/sideTraySlice";
import { setChangeRecipeWithinCollection } from "../../../redux/slices/collectionSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TrayTag from "../TrayTag";
import { faRectangleHistory } from "@fortawesome/pro-regular-svg-icons";
import styles from "./collectionTray.module.scss";
import Widget from "../../../component/module/Widget/Widget.component";
import { faBookmark } from "@fortawesome/pro-solid-svg-icons";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import { faFerrisWheel } from "@fortawesome/pro-light-svg-icons";
import IconForAddComment from "../common/iconForAddComment/IconForAddComment";
import CREATE_NEW_COLLECTION from "../../../gqlLib/collection/mutation/createNewCollection";
import EDIT_COLLECTION from "../../../gqlLib/collection/mutation/editCollection";
import notification from "../../utility/reactToastifyNotification";

interface CollectionTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

export default function RecipeCollectionAndThemeTray({
  showTagByDefaut = true,
  showPanle = "left",
}: CollectionTrayProps) {
  const [toggle, setToggle] = useState(0);
  const [input, setInput] = useState<any>({
    image: null,
    name: "",
    slug: "",
  });
  const [isEditCollection, setIsEditCollection] = useState(false);
  const [collectionId, setCollectionId] = useState("");
  const { dbUser } = useAppSelector((state) => state?.user);
  const { changeRecipeWithinCollection } = useAppSelector(
    (state) => state?.collections,
  );
  const { openCollectionsTary } = useAppSelector((state) => state?.sideTray);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const [createNewCollection, { loading: addCollectionLoading }] = useMutation(
    CREATE_NEW_COLLECTION,
  );
  const [editCollection, { loading: editCollectionLoading }] =
    useMutation(EDIT_COLLECTION);

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

  const handleToggle = (no: number) => {
    if (!changeRecipeWithinCollection) {
      setToggle(no);
    }
  };

  const addNewCollection = () => {
    setIsEditCollection(false);
    setInput((pre) => ({ ...pre, name: "" }));
    setOpenModal(true);
  };

  const saveToDb = async () => {
    if (input?.name) {
      if (isEditCollection) {
        await editCollection({
          variables: {
            data: {
              userEmail: dbUser?.email,
              collectionId: collectionId,
              newName: input?.name,
            },
          },
        });
        getCollectionsAndThemes({ variables: { userId: dbUser?._id } });
        setOpenModal(false);
        setInput({ image: null, name: "" });
      } else {
        await createNewCollection({
          variables: {
            data: {
              userEmail: dbUser?.email,
              collection: { image: null, name: input?.name, recipes: [] },
            },
          },
        });
      }

      getCollectionsAndThemes({ variables: { userId: dbUser?._id } });
      setOpenModal(false);
      setInput({ image: null, name: "" });
      if (isEditCollection) {
        notification("info", "Collection edit successfully");
      } else {
        notification("info", "Collection add successfully");
      }
    } else {
      notification("info", "Please write collection name");
    }
  };

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
      <ToggleMenu
        setToggle={handleToggle}
        toggle={toggle}
        toggleMenuList={
          changeRecipeWithinCollection
            ? [
                <div key={"key0"} className={styles.menu}>
                  <FontAwesomeIcon
                    icon={faRectangleHistory}
                    className={styles.icon}
                  />

                  <p>Collections</p>
                </div>,
              ]
            : [
                <div key={"key0"} className={styles.menu}>
                  <FontAwesomeIcon
                    icon={faRectangleHistory}
                    className={styles.icon}
                  />

                  <p>Collections</p>
                </div>,
                <div key={"key1"} className={styles.menu}>
                  <FontAwesomeIcon
                    icon={faFerrisWheel}
                    className={styles.icon}
                  />
                  <p>Themes</p>
                </div>,
              ]
        }
        variant={"outlineSecondary"}
      />

      {toggle === 0 && (
        <IconForAddComment
          handleIconClick={addNewCollection}
          tooltipText="Add collection"
        />
      )}

      {toggle === 0 ? (
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
      ) : (
        <Widget
          slug="recipe-editor"
          elements={(item) => (
            <div key={item.slug} className={"col-4"}>
              <Link href={`/recipe-editor/${item.slug}`}>
                <a>
                  <div className={styles.theme__child}>
                    <div className={styles.theme__cover}>
                      <div
                        className={styles.theme__cover__abs}
                        style={{ backgroundImage: `url(${item.icon})` }}
                      />
                    </div>
                    <p>{item.displayName}</p>
                  </div>
                </a>
              </Link>
            </div>
          )}
        />
      )}

      <CustomModal open={openModal} setOpen={setOpenModal}>
        <AddCollectionModal
          input={input}
          setInput={setInput}
          setOpenModal={setOpenModal}
          handleToAddOrUpdateCollection={saveToDb}
          isAddOrUpdateCollectionLoading={
            addCollectionLoading || editCollectionLoading
          }
        />
      </CustomModal>
    </TrayWrapper>
  );
}
