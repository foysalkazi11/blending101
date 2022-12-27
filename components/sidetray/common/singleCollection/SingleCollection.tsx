import {
  faPencil,
  faShareNodes,
  faTrash,
} from "@fortawesome/pro-regular-svg-icons";
import { faEllipsisVertical } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import CustomCheckbox from "../../../../theme/checkbox/CustomCheckbox";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";
import useHover from "../../../utility/useHover";
import styles from "./SingleMenu.module.scss";

interface IndividualCollectionType {
  name?: string;
  image?: string;
  slug?: string;
  description?: string;
  showMoreMenu?: boolean;
  changeItemWithinCollection?: boolean;
  isRecipeWithinCollection?: boolean;
  id?: string;
  handleClickCheckBox?: (e: React.SyntheticEvent, id: string) => void;
  index?: number;
  collectionItemLength?: number;
  menuIndex?: number;
  setMenuIndex?: Dispatch<SetStateAction<number>>;
  handleDeleteCollection?: (id: string) => void;
  handleEditCollection?: (
    id: string,
    name: string,
    slug: string,
    description: string,
  ) => void;
  deleteCollectionLoading?: boolean;
}

const SingleCollection = ({
  name = "All Recipes",
  image = "/cards/food.png",
  slug = "",
  description = "",
  showMoreMenu = false,
  changeItemWithinCollection = false,
  isRecipeWithinCollection = false,
  id = "",
  handleClickCheckBox = () => {},
  index,
  collectionItemLength = 0,
  menuIndex = 0,
  setMenuIndex = () => {},
  handleDeleteCollection = () => {},
  handleEditCollection = () => {},
  deleteCollectionLoading = false,
}: IndividualCollectionType) => {
  const [hoverRef, isHovered] = useHover();
  const handleClick = (index: number) => {
    if (menuIndex === index) {
      setMenuIndex(index);
    } else {
      setMenuIndex(index);
    }
  };

  return (
    <>
      <div className={styles.collection__child} key={id} ref={hoverRef}>
        <Link href={`/collection/${slug}`} passHref>
          <div className={styles.leftSide}>
            <div className={styles.img}>
              <div
                className={styles.abs}
                style={{
                  backgroundImage: `url(${image})`,
                }}
              ></div>
            </div>
            <p>{name}</p>
          </div>
        </Link>
        {showMoreMenu ? (
          changeItemWithinCollection ? (
            <div className={styles.checkBox}>
              <CustomCheckbox
                checked={isRecipeWithinCollection}
                handleChange={(e) => handleClickCheckBox(e, id)}
              />
            </div>
          ) : isHovered ? (
            name === "My Favorite" ? (
              <p style={{ marginRight: "10px" }}>{collectionItemLength}</p>
            ) : (
              <div
                className={styles.rightSide}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(index);
                }}
              >
                {/* <MdMoreVert className={styles.moreIcon} /> */}
                <FontAwesomeIcon icon={faEllipsisVertical} />

                <div
                  className={`${styles.menu} ${
                    menuIndex === index ? styles.showMenu : ""
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faPencil}
                    className={styles.icon}
                    onClick={() =>
                      handleEditCollection(id, name, slug, description)
                    }
                  />
                  {deleteCollectionLoading ? (
                    <CircularRotatingLoader
                      color="primary"
                      style={{ fontSize: "16px" }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faTrash}
                      className={styles.icon}
                      onClick={() => handleDeleteCollection(id)}
                    />
                  )}

                  <FontAwesomeIcon
                    icon={faShareNodes}
                    className={styles.icon}
                  />
                </div>
              </div>
            )
          ) : (
            <p style={{ marginRight: "10px" }}>{collectionItemLength}</p>
          )
        ) : null}
      </div>
    </>
  );
};

export default SingleCollection;
