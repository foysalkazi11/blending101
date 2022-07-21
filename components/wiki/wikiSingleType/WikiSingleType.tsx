import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdOutlineStarOutline } from "react-icons/md";
import IconWarper from "../../../theme/iconWarper/IconWarper";
import SkeletonCollectionRecipe from "../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import { WikiListType } from "../../../type/wikiListType";
import WikiCard from "../wikiCard/WikiCard";
import styles from "./WikiSingleType.module.scss";

interface Props {
  type?: string;
  data?: WikiListType[];
  selectedWikiItem?: string[];
  setSelectedWikiItem?: Dispatch<SetStateAction<string[]>>;
  loading?: boolean;
}

const WikiSingleType = ({
  type = "",
  data = [],
  selectedWikiItem = [],
  setSelectedWikiItem = () => {},
  loading = false,
}: Props) => {
  const [wikiList, setWikiList] = useState<WikiListType[]>([]);
  const isMounted = useRef(null);

  useEffect(() => {
    setSelectedWikiItem([]);
    setWikiList(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (isMounted.current) {
      if (selectedWikiItem?.length) {
        setWikiList(
          data?.filter((item) => selectedWikiItem?.includes(item?._id)),
        );
      } else {
        setWikiList(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWikiItem]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  if (loading) {
    return (
      <div className={styles.showRecipeCollectionsContainer}>
        <SkeletonCollectionRecipe />
      </div>
    );
  }
  return (
    <div className={styles.showRecipeCollectionsContainer}>
      <div className={styles.showRecipeCollectionsHeader}>
        <div className={styles.heading}>
          <MdOutlineStarOutline className={styles.favoriteIcon} />
          <h2>{type}</h2>
        </div>

        <IconWarper
          defaultBg="secondary"
          hover="bgSecondary"
          style={{ width: "28px", height: "28px" }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </IconWarper>
      </div>
      <div className={styles.showRecipes}>
        {wikiList?.length
          ? wikiList?.map((wiki, index) => {
              const {
                _id,
                category,
                commentsCount,
                description,
                hasInCompare,
                image,
                isPublished,
                portions,
                publishedBy,
                status,
                type,
                wikiDescription,
                wikiTitle,
              } = wiki;
              return (
                <WikiCard
                  key={_id}
                  author={publishedBy}
                  comments={commentsCount}
                  description={wikiDescription}
                  image={image}
                  title={wikiTitle}
                  type={type}
                  portions={portions}
                  id={_id}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default WikiSingleType;
