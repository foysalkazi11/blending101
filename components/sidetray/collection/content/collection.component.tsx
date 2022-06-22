import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./content.module.scss";
import { MdMoreVert, MdDeleteOutline } from "react-icons/md";
import { HiOutlineShare } from "react-icons/hi";
import { BiEditAlt } from "react-icons/bi";
import { setOpenCollectionsTary } from "../../../../redux/slices/sideTraySlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useMutation } from "@apollo/client";
import DELETE_COLLECTION from "../../../../gqlLib/collection/mutation/deleteCollection";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import CustomCheckbox from "../../../../theme/checkbox/CustomCheckbox";
import {
  setShowAllRecipes,
  setSingleCollectionInfo,
} from "../../../../redux/slices/collectionSlice";
import ADD_OR_REMOVE_RECIPE_FORM_COLLECTION from "../../../../gqlLib/collection/mutation/addOrRemoveRecipeFromCollection";
import SkeletonCollections from "../../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollections";
import useUpdateRecipeField from "../../../../customHooks/useUpdateRecipeFirld";

interface CollectionComponentProps {
  collections: {}[];
  setInput: any;
  setIsEditCollection: any;
  setCollectionId: any;
  collectionsLoading: boolean;
  getCollectionsAndThemes: (arg: any) => void;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
}

export default function CollectionComponent({
  collections,
  setInput,
  setIsEditCollection,
  setCollectionId,
  collectionsLoading,
  getCollectionsAndThemes = () => {},
  setOpenModal = () => {},
}: CollectionComponentProps) {
  const dispatch = useAppDispatch();
  const [deleteCollection] = useMutation(DELETE_COLLECTION);
  const [addOrRemoveRecipeFromCollection] = useMutation(
    ADD_OR_REMOVE_RECIPE_FORM_COLLECTION,
  );
  const { dbUser } = useAppSelector((state) => state?.user);
  const {
    changeRecipeWithinCollection,
    activeRecipeId,
    singleRecipeWithinCollections,
    singleCollectionInfo,
  } = useAppSelector((state) => state?.collections);
  const [showMenu, setShowMenu] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [collectionHasRecipe, setCollectionHasRecipe] = useState<string[]>([]);
  const { openCollectionsTary } = useAppSelector((state) => state?.sideTray);
  const [isCollectionUpdate, setIsCollectionUpdate] = useState(false);
  const isMounted = useRef(null);
  const updateRecipe = useUpdateRecipeField();

  const handleAddorRemoveRecipeFormCollection = async () => {
    try {
      await addOrRemoveRecipeFromCollection({
        variables: {
          data: {
            userEmail: dbUser?.email,
            addToTheseCollections: collectionHasRecipe,
            recipe: activeRecipeId,
          },
        },
      });
      updateRecipe(activeRecipeId, {
        userCollections: collectionHasRecipe?.length
          ? singleRecipeWithinCollections
          : null,
      });

      reactToastifyNotification("info", `Collection update successfully`);
      setIsCollectionUpdate(false);
    } catch (error) {
      reactToastifyNotification("error", error?.message);
      setIsCollectionUpdate(false);
    }
  };

  const handleChange = async (e, collectionId) => {
    setIsCollectionUpdate(true);
    if (e?.target?.checked) {
      setCollectionHasRecipe((pre) => [...pre, collectionId]);
    } else {
      setCollectionHasRecipe((pre) => [
        ...pre?.filter((id) => id !== collectionId),
      ]);
    }
  };

  const handleDeleteCollection = async (collectionId: string) => {
    try {
      await deleteCollection({
        variables: {
          data: {
            collectionId: collectionId,
            userEmail: dbUser?.email,
          },
        },
      });
      getCollectionsAndThemes({ variables: { userId: dbUser?._id } });
      if (singleCollectionInfo?.id) {
        dispatch(setSingleCollectionInfo({ id: "", name: "" }));
        dispatch(setShowAllRecipes(true));
      }
      updateRecipe(activeRecipeId, {
        collection: null,
      });

      reactToastifyNotification("info", "Collection delete successfully");
    } catch (error) {
      reactToastifyNotification("error", error?.message);
    }
  };

  const handleClick = (index: number) => {
    if (menuIndex === index) {
      setMenuIndex(index);
      setShowMenu((pre) => !pre);
    } else {
      setMenuIndex(index);
      setShowMenu(true);
    }
  };

  useEffect(() => {
    setCollectionHasRecipe(singleRecipeWithinCollections);
  }, [singleRecipeWithinCollections]);

  useEffect(() => {
    if (isMounted.current) {
      if (!openCollectionsTary) {
        if (isCollectionUpdate) {
          handleAddorRemoveRecipeFormCollection();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCollectionsTary]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className={styles.collection}>
      <div className={styles.collection__add}></div>
      <div className={styles.collection__collections}>
        {changeRecipeWithinCollection ? null : (
          <div className={styles.collection__child}>
            <div
              className={styles.leftSide}
              onClick={() => {
                dispatch(setShowAllRecipes(true));
                dispatch(
                  setSingleCollectionInfo({
                    id: "",
                    name: "",
                  }),
                );
                dispatch(setOpenCollectionsTary(false));
              }}
            >
              <div className={styles.img}>
                <div
                  className={styles.abs}
                  style={{
                    backgroundImage: `url(${
                      //@ts-ignore
                      "/cards/food.png"
                    })`,
                  }}
                ></div>
              </div>

              {/* @ts-ignore */}
              <p>All Recipies</p>
            </div>
          </div>
        )}
        {collectionsLoading ? (
          <SkeletonCollections />
        ) : (
          collections?.map((item, i) => {
            //@ts-ignore
            const defaultImage = item?.image;

            return (
              <div
                className={styles.collection__child}
                key={"collections__child" + i}
                onMouseOver={() => setHoverIndex(i + 1)}
                onMouseLeave={() => setHoverIndex(0)}
              >
                <div
                  className={styles.leftSide}
                  onClick={() => {
                    dispatch(setShowAllRecipes(false));
                    dispatch(
                      setSingleCollectionInfo({
                        //@ts-ignore
                        id: item?._id,
                        //@ts-ignore
                        name: item?.name,
                      }),
                    );
                    dispatch(setOpenCollectionsTary(false));
                  }}
                >
                  <div className={styles.img}>
                    <div
                      className={styles.abs}
                      style={{
                        backgroundImage: `url(${
                          //@ts-ignore
                          defaultImage || "/cards/food.png"
                        })`,
                      }}
                    ></div>
                  </div>

                  {/* @ts-ignore */}
                  <p>{item?.name}</p>
                </div>
                {changeRecipeWithinCollection ? (
                  <div className={styles.checkBox}>
                    <CustomCheckbox
                      checked={collectionHasRecipe?.includes(
                        //@ts-ignore
                        item?._id,
                      )}
                      // @ts-ignore
                      handleChange={(e) => handleChange(e, item?._id)}
                    />
                  </div>
                ) : hoverIndex === i + 1 ? (
                  /* @ts-ignore */
                  item?.name === "My Favourite" ? (
                    <p style={{ marginRight: "10px" }}>
                      {/* @ts-ignore */}
                      {item?.recipes?.length}
                    </p>
                  ) : (
                    <div className={styles.rightSide}>
                      <MdMoreVert
                        className={styles.moreIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClick(i);
                        }}
                      />

                      <div
                        className={`${styles.menu} ${
                          menuIndex === i && showMenu ? styles.showMenu : ""
                        }`}
                      >
                        <BiEditAlt
                          className={styles.icon}
                          onClick={() => {
                            /* @ts-ignore */
                            setInput((pre) => ({ ...pre, name: item?.name }));
                            setIsEditCollection(true);
                            /* @ts-ignore */
                            setCollectionId(item?._id);
                            setOpenModal(true);
                          }}
                        />
                        <MdDeleteOutline
                          className={styles.icon}
                          /* @ts-ignore  */
                          onClick={() => handleDeleteCollection(item?._id)}
                        />
                        <HiOutlineShare className={styles.icon} />
                      </div>
                    </div>
                  )
                ) : (
                  <p style={{ marginRight: "10px" }}>
                    {/* @ts-ignore */}
                    {item?.recipes?.length}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
