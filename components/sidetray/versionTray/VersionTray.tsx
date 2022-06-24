import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setOpenVersionTray } from "../../../redux/slices/versionTraySlice";
import TrayWrapper from "../Tray.wrapper";
import styles from "./VersionsTray.module.scss";
import NoteHead from "../commentsTray/noteSection/noteHead/NoteHead";
import NoteBody from "../commentsTray/noteSection/noteBody/NoteBody";
import { useLazyQuery, useMutation } from "@apollo/client";
import ADD_VERSION from "../../../gqlLib/versions/mutation/addVersion";
import EDIT_A_VERSION_OF_RECIPE from "../../../gqlLib/versions/mutation/editAVersionOfRecipe";
import { VscVersions } from "react-icons/vsc";
import { setDetailsARecipe } from "../../../redux/slices/recipeSlice";
import REMOVE_A_RECIPE_VERSION from "../../../gqlLib/versions/mutation/removeARecipeVersion";
import notification from "../../utility/reactToastifyNotification";
import GET_A_RECIPE_VERSION_ONLY from "../../../gqlLib/versions/query/getARecipeVersionOnly";
import useToGetARecipeVersion from "../../../customHooks/useToGetARecipeVersion";
import useToGetARecipe from "../../../customHooks/useToGetARecipe";
interface VersionTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

const VersionTray = ({ showPanle, showTagByDefaut }: VersionTrayProps) => {
  const [showForm, setShowForm] = useState(false);
  const [updateVersion, setUpdateVersion] = useState(false);
  const [formState, setFormState] = useState({ title: "", body: "" });
  const [updateVersionId, setUpdateVersionId] = useState("");
  const { openVersionTray, openVersionTrayFormWhichPage } = useAppSelector(
    (state) => state?.versionTray,
  );
  const { dbUser } = useAppSelector((state) => state?.user);
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const [addVersion, { loading: newVersionLoading }] = useMutation(ADD_VERSION);
  const [editVersion, { data: editVersionData, loading: editVersionLoading }] =
    useMutation(EDIT_A_VERSION_OF_RECIPE);
  const [removeVersion, { loading: removeVersionLoading }] = useMutation(
    REMOVE_A_RECIPE_VERSION,
  );
  const [
    getARecipeVersionOnly,
    { data: recipeVersionOnlyData, loading: recipeVersionOnlyLoading },
  ] = useLazyQuery(GET_A_RECIPE_VERSION_ONLY);
  const handleToGetARecipeVersion = useToGetARecipeVersion();

  const handleGetARecipe = useToGetARecipe();
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const handleToGetARecipeVersionOnly = () => {
    getARecipeVersionOnly({
      variables: { recipeId: detailsARecipe?._id, userId: dbUser?._id },
    });
  };

  const toggleForm = () => {
    setShowForm((pre) => !pre);
  };

  const updateForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e?.target;
    setFormState((pre) => ({ ...pre, [name]: value }));
  };

  const closeTray = () => {
    dispatch(setOpenVersionTray(false));
  };

  const createOrUpdateVarsion = async () => {
    toggleForm();
    try {
      if (updateVersion) {
        await editVersion({
          variables: {
            data: {
              editId: updateVersionId,
              editableObject: {
                postfixTitle: formState?.title,
                description: formState?.body,
              },
            },
          },
        });
      } else {
        const { data } = await addVersion({
          variables: {
            data: {
              recipeId: detailsARecipe?._id,
              postfixTitle: formState?.title,
              description: formState?.body,
            },
          },
        });
        dispatch(
          setDetailsARecipe({
            ...detailsARecipe,
            recipeVersion: data?.addVersion,
          }),
        );
      }
      notification(
        "success",
        `Recipe version ${updateVersion ? "updated" : "create"} successfully`,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecipeVersion = async (id: string) => {
    try {
      const { data } = await removeVersion({
        variables: {
          versionId: id,
        },
      });
      dispatch(
        setDetailsARecipe({
          ...detailsARecipe,
          recipeVersion: data?.removeARecipeVersion,
        }),
      );
      notification("success", "Recipe version remove successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    toggleForm();
    setUpdateVersion(false);
    setFormState((pre) => ({ ...pre, title: "", body: "" }));
  };

  const updateVersionValue = (val: any) => {
    const title = val?.postfixTitle;
    const id = val?._id;
    const body = val?.description;
    setUpdateVersion(true);
    setFormState((pre) => ({ ...pre, title, body }));
    setUpdateVersionId(id);
    toggleForm();
  };

  const isOrginalVersion = detailsARecipe?.recipeVersion?.find(
    (version) => version?.isOriginal,
  );
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TrayWrapper
      showTagByDefaut={showTagByDefaut}
      closeTray={closeTray}
      openTray={openVersionTray}
      showPanle={showPanle}
    >
      <div className={styles.versionContainer}>
        <div className={styles.header}>
          <VscVersions fontSize={24} color="#7cbc39" />

          <h3 className={styles.heading}>Version</h3>
        </div>
        <div className={styles.recipeName}>
          <img
            src={detailsARecipe?.image?.find((img) => img?.default)?.image}
            alt="recipe_img"
          />
          <h3 onClick={() => handleGetARecipe(detailsARecipe?._id)}>
            {isOrginalVersion?.postfixTitle}
          </h3>

          <span
            className={`${styles.star} ${
              isOrginalVersion?.isDefault ? styles.on : styles.off
            }`}
          >
            &#9733;
          </span>
        </div>
        <NoteHead
          showForm={showForm}
          toggleNoteForm={toggleForm}
          noteForm={formState}
          updateNoteForm={updateForm}
          createOrUpdateNote={createOrUpdateVarsion}
          handleButtonClick={handleButtonClick}
          isFromRecipePage={openVersionTrayFormWhichPage}
          varient="versions"
        />
        <NoteBody
          data={
            detailsARecipe?.recipeVersion?.filter(
              (version) => !version?.isOriginal,
            ) || []
          }
          deleteItem={deleteRecipeVersion}
          updateItem={(val) => updateVersionValue(val)}
          varient="versions"
          loading={newVersionLoading || removeVersionLoading}
          isFromRecipePage={openVersionTrayFormWhichPage}
          handleTitleClick={handleToGetARecipeVersion}
        />
      </div>
    </TrayWrapper>
  );
};

export default VersionTray;
