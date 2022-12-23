import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./content.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useMutation } from "@apollo/client";
import DELETE_COLLECTION from "../../../../gqlLib/collection/mutation/deleteCollection";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import { setCurrentCollectionInfo } from "../../../../redux/slices/collectionSlice";
import ADD_OR_REMOVE_RECIPE_FORM_COLLECTION from "../../../../gqlLib/collection/mutation/addOrRemoveRecipeFromCollection";
import SkeletonCollections from "../../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollections";
import useUpdateRecipeField from "../../../../customHooks/useUpdateRecipeFirld";
import useLocalStorage from "../../../../customHooks/useLocalStorage";
import { setCompareList } from "../../../../redux/slices/recipeSlice";
import updateRecipeFunc from "../../../utility/updateRecipeFunc";
import SingleCollection from "../../common/singleCollection/SingleCollection";

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
  } = useAppSelector((state) => state?.collections);
  const [showMenu, setShowMenu] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [collectionHasRecipe, setCollectionHasRecipe] = useState<string[]>([]);
  const { openCollectionsTary } = useAppSelector((state) => state?.sideTray);
  const [isCollectionUpdate, setIsCollectionUpdate] = useState(false);
  const isMounted = useRef(null);
  const updateRecipe = useUpdateRecipeField();
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage<any>(
    "compareList",
    [],
  );
  const { compareList } = useAppSelector((state) => state?.recipe);

  const updateCompareRecipe = (id: string, obj: object) => {
    dispatch(setCompareList(updateRecipeFunc(compareList, obj, id)));
    setcompareRecipeList((state) => updateRecipeFunc(state || [], obj, id));
  };

  const handleAddOrRemoveRecipeFormCollection = async () => {
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
      updateCompareRecipe(activeRecipeId, {
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
      dispatch(setCurrentCollectionInfo({ id: "", name: "All Recipes" }));
      updateRecipe(activeRecipeId, {
        collection: null,
      });

      reactToastifyNotification("info", "Collection delete successfully");
    } catch (error) {
      reactToastifyNotification("error", error?.message);
    }
  };

  const handleEditCollection = (id: string, name: string, slug: string) => {
    setInput((pre) => ({
      ...pre,
      name,
      slug,
    }));
    setIsEditCollection(true);
    setCollectionId(id);
    setOpenModal(true);
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
          handleAddOrRemoveRecipeFormCollection();
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
    <div>
      {changeRecipeWithinCollection ? null : (
        <>
          <SingleCollection name="All Recipes" slug="all-recipes" />
          <SingleCollection name="My Recipes" slug="my-recipes" />
        </>
      )}
      {collectionsLoading ? (
        <SkeletonCollections />
      ) : (
        collections?.map((collection: any, i: number) => {
          const { _id, image, name, slug, recipes } = collection;

          return (
            <SingleCollection
              key={collection?._id}
              name={name}
              slug={slug}
              id={_id}
              image={image || "/cards/food.png"}
              isRecipeWithinCollection={collectionHasRecipe?.includes(_id)}
              index={i}
              collectionItemLength={recipes?.length}
              changeItemWithinCollection={changeRecipeWithinCollection}
              handleClickCheckBox={handleChange}
              showMoreMenu={true}
              menuIndex={menuIndex}
              setMenuIndex={setMenuIndex}
              handleDeleteCollection={handleDeleteCollection}
              handleEditCollection={handleEditCollection}
            />
          );
        })
      )}
    </div>
  );
}
