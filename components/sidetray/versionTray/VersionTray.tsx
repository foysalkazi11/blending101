import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setOpenVersionTray } from "../../../redux/slices/versionTraySlice";
import TrayWrapper from "../TrayWrapper";
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
import CHANGE_DEFAULT_VERSION from "../../../gqlLib/versions/mutation/changelDefaultVersion";
import TrayTag from "../TrayTag";
import Tooltip from "../../../theme/toolTip/CustomToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRectangleVerticalHistory,
  faScaleBalanced,
  faShareNodes,
} from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";
import { RecipeVersionType } from "../../../type/recipeVersionType";
import Image from "next/image";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarSharp } from "@fortawesome/pro-solid-svg-icons";

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
  const [editVersion] = useMutation(EDIT_A_VERSION_OF_RECIPE);
  const [removeVersion, { loading: removeVersionLoading }] = useMutation(
    REMOVE_A_RECIPE_VERSION,
  );
  const [getARecipeVersionOnly] = useLazyQuery(GET_A_RECIPE_VERSION_ONLY);
  const [changeDefaultVersion] = useMutation(CHANGE_DEFAULT_VERSION);
  const handleToGetARecipeVersion = useToGetARecipeVersion();
  const router = useRouter();
  const handleGetARecipe = useToGetARecipe();
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const funToGetARecipe = () => {
    handleGetARecipe(detailsARecipe?._id, dbUser?._id);
  };

  // find original version of recipe
  const isOriginalVersion = detailsARecipe?.recipeVersion?.find(
    (version) => version?.isOriginal,
  );

  // func for change default version
  const handleToChangeDefaultVersion = async (
    versionId: string,
    isDefault: boolean,
  ) => {
    try {
      const { data } = await changeDefaultVersion({
        variables: {
          recipeId: detailsARecipe?._id,
          versionId: isDefault ? isOriginalVersion?._id : versionId,
        },
      });

      const currentDefaultVersion = data?.changeDefaultVersion?.find(
        (version) => version?.isDefault,
      );

      if (currentDefaultVersion?.isOriginal) {
        const { _id, description }: RecipeVersionType =
          detailsARecipe?.originalVersion;
        dispatch(
          setDetailsARecipe({
            ...detailsARecipe,
            versionId: _id,
            versionDiscription: description,
            ingredients: detailsARecipe?.originalVersion?.ingredients,
            recipeVersion: data?.changeDefaultVersion,
            isVersionActive: true,
          }),
        );
      } else {
        //  const { _id, recipeId, description, ...rest }: RecipeVersionType =
        //    recipe?.defaultVersion;
        const obj = {
          versionId: currentDefaultVersion?._id,
          versionDiscription: currentDefaultVersion?.description,
          recipeVersion: data?.changeDefaultVersion,
          isVersionActive: true,
        };
        dispatch(
          setDetailsARecipe({
            ...detailsARecipe,
            ...obj,
          }),
        );
      }

      notification("info", "Default version change successfully");
    } catch (error) {
      notification("info", error?.message || "Something went wrong");
    }
  };

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

        dispatch(
          setDetailsARecipe({
            ...detailsARecipe,
            recipeVersion: detailsARecipe?.recipeVersion?.map((version) =>
              version?._id === updateVersionId
                ? {
                    ...version,
                    postfixTitle: formState?.title,
                    description: formState?.body,
                  }
                : version,
            ),
          }),
        );
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
      notification("success", "Recipe version removed successfully");
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

  // handle to get recipe version or original recipe

  const getARecipeVersion = (id: string) => {
    const isDefaultVersion = detailsARecipe?.recipeVersion?.find(
      (version) => version?.isDefault,
    );
    if (id === isDefaultVersion?._id) {
      funToGetARecipe();
    } else {
      handleToGetARecipeVersion(id);
    }
  };

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
      panleTag={(hover) => (
        <TrayTag icon={<VscVersions />} placeMent="left" hover={hover} />
      )}
    >
      <div className={styles.versionContainer}>
        {detailsARecipe?.recipeVersion?.length >= 2 ? (
          <div className={styles.header}>
            <div className={styles.headingLeft}>
              <FontAwesomeIcon
                icon={faRectangleVerticalHistory}
                color="#7cbc39"
              />
              <h3 className={styles.text}>Recipe versions</h3>
            </div>
            <div
              className={styles.headingRight}
              onClick={() =>
                router.push(
                  `/versionCompare/${
                    detailsARecipe?._id || isOriginalVersion?._id
                  }`,
                )
              }
            >
              <Tooltip content="Compare versions" direction="left">
                <FontAwesomeIcon icon={faScaleBalanced} color="#7cbc39" />
              </Tooltip>
            </div>
          </div>
        ) : null}

        <div className={styles.recipeName}>
          <div className={styles.leftSide}>
            <Image
              src={detailsARecipe?.image?.find((img) => img?.default)?.image}
              alt="recipe_img"
              width={45}
              height={45}
              objectFit="cover"
              loading="lazy"
            />
            <h3
              onClick={() =>
                isOriginalVersion?.isDefault
                  ? funToGetARecipe()
                  : handleToGetARecipeVersion(isOriginalVersion?._id)
              }
            >
              {detailsARecipe?.name}
            </h3>
          </div>
          {openVersionTrayFormWhichPage === "edit" ||
          isOriginalVersion?.isDefault ? (
            <div className={styles.rightSide}>
              <Tooltip content="Share off" direction="left">
                <FontAwesomeIcon
                  icon={faShareNodes}
                  className={`${styles.star} ${styles.off}`}
                />
              </Tooltip>
              <Tooltip content="Default" direction="left">
                <FontAwesomeIcon
                  onClick={() =>
                    !isOriginalVersion?.isDefault &&
                    openVersionTrayFormWhichPage === "edit" &&
                    handleToChangeDefaultVersion(
                      isOriginalVersion?._id,
                      isOriginalVersion?.isDefault,
                    )
                  }
                  icon={faStarSharp}
                  className={`${styles.star} ${
                    isOriginalVersion?.isDefault ? styles.on : styles.off
                  }`}
                />
                {/* <span
                  onClick={() =>
                    !isOriginalVersion?.isDefault &&
                    openVersionTrayFormWhichPage === "edit" &&
                    handleToChangeDefaultVersion(
                      isOriginalVersion?._id,
                      isOriginalVersion?.isDefault,
                    )
                  }
                  className={`${styles.star} ${
                    isOriginalVersion?.isDefault ? styles.on : styles.off
                  }`}
                >
                  &#9733;
                </span> */}
              </Tooltip>
            </div>
          ) : null}
        </div>
        <NoteHead
          showForm={showForm}
          toggleNoteForm={toggleForm}
          noteForm={formState}
          updateNoteForm={updateForm}
          createOrUpdateNote={createOrUpdateVarsion}
          handleButtonClick={handleButtonClick}
          isFromRecipePage={openVersionTrayFormWhichPage}
          variant="versions"
        />
        <NoteBody
          data={
            detailsARecipe?.recipeVersion?.filter(
              (version) => !version?.isOriginal,
            ) || []
          }
          deleteItem={deleteRecipeVersion}
          updateItem={updateVersionValue}
          varient="versions"
          loading={newVersionLoading || removeVersionLoading}
          isFromRecipePage={openVersionTrayFormWhichPage}
          handleToGetARecipeVersion={getARecipeVersion}
          handleToChangeDefaultVersion={handleToChangeDefaultVersion}
        />
      </div>
    </TrayWrapper>
  );
};

export default VersionTray;
