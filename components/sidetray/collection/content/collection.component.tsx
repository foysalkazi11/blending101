import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useMutation } from "@apollo/client";
import reactToastifyNotification from "../../../../components/utility/reactToastifyNotification";
import ADD_OR_REMOVE_RECIPE_FORM_COLLECTION from "../../../../gqlLib/collection/mutation/addOrRemoveRecipeFromCollection";
import SkeletonCollections from "../../../../theme/skeletons/skeletonCollectionRecipe/SkeletonCollections";
import useUpdateRecipeField from "../../../../customHooks/useUpdateRecipeFirld";
import useLocalStorage from "../../../../customHooks/useLocalStorage";
import { setCompareList } from "../../../../redux/slices/recipeSlice";
import updateRecipeFunc from "../../../utility/updateRecipeFunc";
import SingleCollection from "../../common/singleCollection/SingleCollection";
import Invite from "../../../../component/organisms/Share/Invite.component";
import CREATE_SHARE_COLLECTION_LINK from "../../../../gqlLib/collection/mutation/createShareCollectionLink";
import notification from "../../../../components/utility/reactToastifyNotification";

interface CollectionComponentProps {
  collections: {}[];
  collectionsLoading: boolean;
  handleDeleteCollection?: (id: string) => void;
  handleEditCollection?: (
    id: string,
    name: string,
    slug: string,
    description: string,
  ) => void;
}

export default function CollectionComponent({
  collections,
  collectionsLoading,
  handleDeleteCollection = () => {},
  handleEditCollection = () => {},
}: CollectionComponentProps) {
  const dispatch = useAppDispatch();
  const [addOrRemoveRecipeFromCollection] = useMutation(
    ADD_OR_REMOVE_RECIPE_FORM_COLLECTION,
  );
  const { dbUser } = useAppSelector((state) => state?.user);
  const {
    changeRecipeWithinCollection,
    activeRecipeId,
    singleRecipeWithinCollections,
  } = useAppSelector((state) => state?.collections);
  const [emails, setEmails] = useState([]);
  const [collectionInfo, setCollectionInfo] = useState<any>({});
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);
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
  const { bulkRecipeIdsForAddedInCollection } = useAppSelector(
    (state) => state?.collections,
  );
  const [shareCollection, { loading: shareCollectionLoading }] = useMutation(
    CREATE_SHARE_COLLECTION_LINK,
  );

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const handleOpenShareModal = (id: string, title: string) => {
    setCollectionInfo({ id, title });
    setShowInviteModal(true);
    setEmails([]);
  };

  const handleInvitation = async () => {
    if (emails.length === 0) return;
    try {
      const { data } = await shareCollection({
        variables: {
          data: {
            shareToEmails: emails,
            sharedBy: userId,
            collectionId: collectionInfo?.id,
          },
        },
      });
      setShowInviteModal(false);
      navigator.clipboard.writeText(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PUBLIC_HOSTING_DOMAIN
            : "http://localhost:3000"
        }/discovery?token=${data.createShareCollectionLink}`,
      );
      notification("success", "Link has been copied in clipboard");
    } catch (error) {
      notification("error", "Not able to share collection");
    }
  };

  const resetModal = () => {
    setEmails([]);
    setShowInviteModal(false);
  };

  const updateCompareRecipe = (id: string, obj: object) => {
    dispatch(setCompareList(updateRecipeFunc(compareList, obj, id)));
    setcompareRecipeList((state) => updateRecipeFunc(state || [], obj, id));
  };

  const handleAddOrRemoveRecipeFormCollection = async () => {
    try {
      await addOrRemoveRecipeFromCollection({
        variables: {
          data: {
            userId: dbUser?._id,
            addToTheseCollections: collectionHasRecipe,
            recipes: activeRecipeId
              ? [activeRecipeId]
              : bulkRecipeIdsForAddedInCollection,
            isCollectionData: activeRecipeId ? false : true,
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
          <SingleCollection
            name="All Recipes"
            slug="all-recipes"
            collectionRoute="recipeCollection"
          />
          <SingleCollection
            name="My Recipes"
            slug="my-recipes"
            collectionRoute="recipeCollection"
          />
        </>
      )}
      {collectionsLoading ? (
        <SkeletonCollections />
      ) : (
        collections?.map((collection: any, i: number) => {
          const {
            _id,
            image,
            name,
            slug,
            recipes,
            description,
            isShared,
            sharedBy,
          } = collection;

          return (
            <SingleCollection
              key={collection?._id}
              name={name}
              slug={slug}
              id={_id}
              description={description}
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
              collectionRoute="recipeCollection"
              handleShareCollection={handleOpenShareModal}
              isShared={isShared}
              sharedBy={sharedBy}
            />
          );
        })
      )}

      <Invite
        show={showInviteModal}
        setShow={setShowInviteModal}
        {...collectionInfo}
        emails={emails}
        setEmails={setEmails}
        handleCancel={resetModal}
        handleInvitation={handleInvitation}
        loading={shareCollectionLoading}
        submitBtnText="Share"
      />
    </div>
  );
}
