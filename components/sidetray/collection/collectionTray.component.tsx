/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import TrayWrapper from "../TrayWrapper";
import CollectionComponent from "./content/collection.component";
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
import GridWidget from "../../../component/module/Widget/GridWidget.component";

import styles from "./collectionTray.module.scss";
import Widget from "../../../component/module/Widget/Widget.component";

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
            />

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
        {toggle === 1 && (
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
        )}

        {toggle === 1 ? (
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
