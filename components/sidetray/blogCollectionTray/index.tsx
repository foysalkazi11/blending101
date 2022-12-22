import { faRectangleHistory } from "@fortawesome/pro-regular-svg-icons";
import { faBookmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setIsOpenBlogCollectionTray } from "../../../redux/slices/blogSlice";
import CustomModal from "../../../theme/modal/customModal/CustomModal";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import AddCollectionModal from "../collection/addCollectionModal/AddCollectionModal";
import IconForAddComment from "../common/iconForAddComment/IconForAddComment";
import TrayTag from "../TrayTag";
import TrayWrapper from "../TrayWrapper";
import styles from "./BlogCollectionTray.module.scss";

interface BlogCollectionTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}
const BlogCollectionTray = ({
  showPanle,
  showTagByDefaut,
}: BlogCollectionTrayProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState<any>({
    image: null,
    name: "",
  });
  const [isEditCollection, setIsEditCollection] = useState(false);
  const [collectionId, setCollectionId] = useState("");
  const { isOpenBlogCollectionTray } = useAppSelector((state) => state?.blog);
  const dispatch = useAppDispatch();

  // open collection modal
  const addNewCollection = () => {
    setIsEditCollection(false);
    setInput((pre) => ({ ...pre, name: "" }));
    setOpenModal(true);
  };
  return (
    <TrayWrapper
      showTagByDefaut={showTagByDefaut}
      closeTray={() =>
        dispatch(setIsOpenBlogCollectionTray(!isOpenBlogCollectionTray))
      }
      openTray={isOpenBlogCollectionTray}
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
        toggleMenuList={[
          <div key={"key0"} className={styles.menu}>
            <FontAwesomeIcon
              icon={faRectangleHistory}
              className={styles.icon}
            />

            <p>Collections</p>
          </div>,
        ]}
        variant={"outlineSecondary"}
      />
      <IconForAddComment
        handleIconClick={addNewCollection}
        tooltipText="Add collection"
      />
      <>BlogCollection</>
      <CustomModal open={openModal} setOpen={setOpenModal}>
        <AddCollectionModal
          input={input}
          setInput={setInput}
          //   getCollectionsAndThemes={getCollectionsAndThemes}
          setOpenModal={setOpenModal}
        />
      </CustomModal>
    </TrayWrapper>
  );
};

export default BlogCollectionTray;
