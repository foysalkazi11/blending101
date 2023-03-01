import React, { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setOpenVersionTray } from "../../../redux/slices/versionTraySlice";
import TrayWrapper from "../TrayWrapper";
import styles from "./VersionsTray.module.scss";
import NoteHead from "../commentsTray/noteSection/noteHead/NoteHead";
import NoteBody from "../commentsTray/noteSection/noteBody/NoteBody";
import { useMutation } from "@apollo/client";
import { VscVersions } from "react-icons/vsc";
import REMOVE_A_RECIPE_VERSION from "../../../gqlLib/versions/mutation/removeARecipeVersion";
import notification from "../../utility/reactToastifyNotification";
import useToGetARecipeVersion from "../../../customHooks/useToGetARecipeVersion";
import useToGetARecipe from "../../../customHooks/useToGetARecipe";
import useToChangeDefaultVersion from "../../../customHooks/useToChangeDefaultVersion";
import TrayTag from "../TrayTag";
import Tooltip from "../../../theme/toolTip/CustomToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleVerticalHistory } from "@fortawesome/pro-regular-svg-icons";
import { useRouter } from "next/router";
import Image from "next/image";
import { faStarSharp } from "@fortawesome/pro-solid-svg-icons";
import useTurnedOnOrOffVersion from "../../../customHooks/useTurnedOnOrOffVersion";
import useToAddARecipeVersion from "../../../customHooks/useToAddARecipeVersion";
import useToEditOfARecipeVersion from "../../../customHooks/useToEditOfARecipeVersion";

interface VersionTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

const VersionTray = ({ showPanle, showTagByDefaut }: VersionTrayProps) => {
  const [showForm, setShowForm] = useState(false);
  const [updateVersion, setUpdateVersion] = useState(false);
  const [formState, setFormState] = useState({ title: "", body: "" });
  const [updateVersionId, setUpdateVersionId] = useState("");
  const [isVersionSharable, setIsVersionSharable] = useState(false);
  const { openVersionTray, openVersionTrayFormWhichPage } = useAppSelector(
    (state) => state?.versionTray,
  );
  const { dbUser } = useAppSelector((state) => state?.user);
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const [removeVersion, { loading: removeVersionLoading }] = useMutation(
    REMOVE_A_RECIPE_VERSION,
  );
  const handleToGetARecipeVersion = useToGetARecipeVersion();
  const router = useRouter();
  const { handleToGetARecipe } = useToGetARecipe();
  const { handleToUpdateDefaultVersion } = useToChangeDefaultVersion();
  const { handleTurnOnOrOffVersion } = useTurnedOnOrOffVersion();
  const { handleToAddRecipeVersion, loading: addNewVersionLoading } =
    useToAddARecipeVersion();
  const { handleToEditARecipeVersion, loading: editOrCreateVersionLoading } =
    useToEditOfARecipeVersion();
  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const funToGetARecipe = () => {
    handleToGetARecipe(detailsARecipe?.recipeId._id, dbUser?._id);
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
        handleToEditARecipeVersion(
          dbUser?._id,
          detailsARecipe?.recipeId?._id,
          updateVersionId,
          isVersionSharable,
          {
            postfixTitle: formState?.title,
            description: formState?.body,
          },
        );
      } else {
        const obj = {
          description: formState?.body,
          postfixTitle: formState?.title,
        };
        handleToAddRecipeVersion(
          dbUser?._id,
          detailsARecipe?.recipeId?._id,
          obj,
        );
      }
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
      // dispatch(
      //   setDetailsARecipe({
      //     ...detailsARecipe,
      //     recipeVersion: data?.removeARecipeVersion,
      //   }),
      // );
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
    const isVersionSharable = val?.isVersionSharable;
    setIsVersionSharable(isVersionSharable);
    setUpdateVersion(true);
    setFormState((pre) => ({ ...pre, title, body }));
    setUpdateVersionId(id);
    toggleForm();
  };

  const allVersions = useMemo(() => {
    let versions = [];

    versions = [
      ...(detailsARecipe?.turnedOnVersions?.map((version) =>
        !detailsARecipe?.isMatch &&
        version?._id === detailsARecipe.defaultVersion._id
          ? {
              ...version,
              isVersionSharable: true,
              isDefault: true,
            }
          : {
              ...version,
              isVersionSharable: true,
              isDefault: false,
            },
      ) || []),
      ...(detailsARecipe?.turnedOffVersions?.map((version) => ({
        ...version,
        isVersionSharable: false,
      })) || []),
    ];
    return versions;
  }, [
    detailsARecipe.defaultVersion?._id,
    detailsARecipe?.isMatch,
    detailsARecipe?.turnedOffVersions,
    detailsARecipe?.turnedOnVersions,
  ]);

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
        {detailsARecipe?.versionsCount >= 2 ? (
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
                router.push(`/versionCompare/${detailsARecipe?.recipeId?._id}`)
              }
            >
              <Tooltip content="Compare versions" direction="left">
                <Image
                  src={"/images/compare-fill-icon.svg"}
                  alt="icon"
                  loading="lazy"
                  width={16}
                  height={16}
                />
                {/* <FontAwesomeIcon icon={faScaleBalanced} color="#7cbc39" /> */}
              </Tooltip>
            </div>
          </div>
        ) : null}

        <div className={styles.recipeName}>
          <div className={styles.leftSide}>
            <Image
              src={
                detailsARecipe?.recipeId?.image?.find((img) => img?.default)
                  ?.image
              }
              alt="recipe_img"
              width={45}
              height={45}
              objectFit="cover"
              loading="lazy"
              className={styles.image}
            />
            <h3
              className={`${styles.heading} 
             
              `}
              onClick={() =>
                detailsARecipe?.isMatch
                  ? funToGetARecipe()
                  : handleToGetARecipeVersion(
                      detailsARecipe?.recipeId?.originalVersion?._id,
                      true,
                      null,
                    )
              }
            >
              {detailsARecipe?.recipeId?.name}
            </h3>
          </div>

          <div className={styles.rightSide}>
            {/* <Tooltip
              content={`Share ${detailsARecipe?.isMatch ? "on" : "off"}`}
              direction="left"
            >
              <FontAwesomeIcon
                icon={faShareNodes}
                className={`${styles.star} ${
                  detailsARecipe?.isMatch ? styles.on : styles.off
                }`}
              />
            </Tooltip> */}
            <Tooltip
              content={`${
                detailsARecipe?.isMatch ? "Default" : "Make default"
              }`}
              direction="left"
            >
              <FontAwesomeIcon
                onClick={() =>
                  !detailsARecipe?.isMatch &&
                  openVersionTrayFormWhichPage === "edit" &&
                  handleToUpdateDefaultVersion(
                    dbUser?._id,
                    detailsARecipe?.recipeId?._id,
                    detailsARecipe?.recipeId?.originalVersion?._id,
                    true,
                  )
                }
                icon={faStarSharp}
                className={`${styles.star} ${
                  openVersionTrayFormWhichPage !== "edit" &&
                  styles.pointerEventNone
                } ${detailsARecipe?.isMatch ? styles.on : styles.off}`}
              />
            </Tooltip>
          </div>
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
          data={allVersions}
          deleteItem={deleteRecipeVersion}
          updateItem={updateVersionValue}
          varient="versions"
          loading={addNewVersionLoading || removeVersionLoading}
          isFromRecipePage={openVersionTrayFormWhichPage}
          handleToGetARecipeVersion={handleToGetARecipeVersion}
          handleToChangeDefaultVersion={(
            versionId,
            isOriginalVersion = false,
          ) =>
            handleToUpdateDefaultVersion(
              dbUser?._id,
              detailsARecipe?.recipeId?._id,
              versionId,
              isOriginalVersion,
            )
          }
          handleTurnOnOrOffVersion={(turnedOn, versionId) =>
            handleTurnOnOrOffVersion(
              turnedOn,
              dbUser?._id,
              detailsARecipe?.recipeId?._id,
              versionId,
            )
          }
        />
      </div>
    </TrayWrapper>
  );
};

export default VersionTray;
