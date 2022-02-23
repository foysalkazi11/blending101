/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import LeftTrayWrapper from "../leftTray.wrapper";
import CollectionComponent from "./content/collection.component";
import ThemeComponent from "./content/theme.component";
import styles from "./trayleft.module.scss";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import CustomModal from "../../../theme/modal/customModal/CustomModal";
import AddCollectionModal from "./addCollectionModal/AddCollectionModal";
import { setToggleModal } from "../../../redux/slices/sideTraySlice";

export default function CollectionTray(props) {
  const [toggle, setToggle] = useState(1);
  const [input, setInput] = useState<any>({
    image: null,
    name: "",
  });
  const [isEditCollection, setIsEditCollection] = useState(false);
  const [collectionId, setCollectionId] = useState("");
  const { dbUser } = useAppSelector((state) => state?.user);
  const { changeRecipeWithinCollection } = useAppSelector(
    (state) => state?.collections
  );
  const { openSaveRecipeModal } = useAppSelector((state) => state?.sideTray);

  const dispatch = useAppDispatch();

  const reff = useRef<any>();

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
    <LeftTrayWrapper id="collection123">
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
              dispatch(setToggleModal(true));
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
              collections={dbUser?.collections}
              setInput={setInput}
              setIsEditCollection={setIsEditCollection}
              setCollectionId={setCollectionId}
            />
          </div>
        )}
        {openSaveRecipeModal ? null : (
          <CustomModal>
            <AddCollectionModal
              input={input}
              setInput={setInput}
              isEditCollection={isEditCollection}
              collectionId={collectionId}
            />
          </CustomModal>
        )}
      </div>
    </LeftTrayWrapper>
  );
}
