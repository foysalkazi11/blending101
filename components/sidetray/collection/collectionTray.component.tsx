/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import TrayWrapper from "../TrayWrapper";
import CollectionComponent from "./content/collection.component";
import ThemeComponent from "./content/theme.component";
import styles from "./trayleft.module.scss";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import CustomModal from "../../../theme/modal/customModal/CustomModal";
import AddCollectionModal from "./addCollectionModal/AddCollectionModal";
import GET_COLLECTIONS_AND_THEMES from "../../../gqlLib/collection/query/getCollectionsAndThemes";
import { useLazyQuery } from "@apollo/client";
import { setOpenCollectionsTary } from "../../../redux/slices/sideTraySlice";
import { setChangeRecipeWithinCollection } from "../../../redux/slices/collectionSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TrayTag from "../TrayTag";
import { faChartTreeMap } from "@fortawesome/pro-regular-svg-icons";

interface CollectionTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

export default function CollectionTray({
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

  const handleToggle = (no: number) => {
    if (!changeRecipeWithinCollection) {
      if (no === 1) {
        reff.current.style.left = "0";
      } else {
        reff.current.style.left = "50%";
      }
      setToggle(no);
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
          icon={<FontAwesomeIcon icon={faChartTreeMap} />}
          placeMent="left"
          hover={hover}
        />
      )}
    >
      <div className={styles.main}>
        <div className={styles.main__top}>
          <div className={styles.main__top__menu}>
            <div
              className={styles.active}
              ref={reff}
              style={{ width: changeRecipeWithinCollection ? "100%" : null }}
            ></div>

            <div
              className={
                toggle === 2
                  ? styles.main__top__menu__child
                  : styles.main__top__menu__child + " " + styles.active__menu
              }
              onClick={() => handleToggle(1)}
              style={{ width: changeRecipeWithinCollection ? "100%" : null }}
            >
              <span></span> Collection
            </div>
            {changeRecipeWithinCollection ? null : (
              <div
                className={
                  toggle === 1
                    ? styles.main__top__menu__child
                    : styles.main__top__menu__child + " " + styles.active__menu
                }
                onClick={() => handleToggle(2)}
              >
                <span></span> Themes
              </div>
            )}
          </div>
        </div>
        <div className={styles.addCollectioContainer}>
          <p>Add to</p>
          <MdOutlineAddCircleOutline
            className={styles.addIcon}
            onClick={() => {
              setIsEditCollection(false);
              setInput((pre) => ({ ...pre, name: "" }));
              setOpenModal(true);
            }}
          />
        </div>

        {toggle === 2 && (
          <div>
            <ThemeComponent />
          </div>
        )}
        {toggle === 1 && (
          <div>
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
          </div>
        )}

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
