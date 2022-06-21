import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import useLocalStorage from "../../../customHooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setOpenVersionTray } from "../../../redux/slices/versionTraySlice";
import TrayWrapper from "../Tray.wrapper";
import styles from "./VersionsTray.module.scss";
import { RecipeDetailsType } from "../../../type/recipeDetails";
import NoteHead from "../commentsTray/noteSection/noteHead/NoteHead";
import NoteBody from "../commentsTray/noteSection/noteBody/NoteBody";
import { useMutation } from "@apollo/client";
import ADD_VERSION from "../../../gqlLib/versions/mutation/addVersion";
import EDIT_A_VERSION_OF_RECIPE from "../../../gqlLib/versions/mutation/editAVersionOfRecipe";
import { useRouter } from "next/router";
import { VscVersions } from "react-icons/vsc";
import { setDetailsARecipe } from "../../../redux/slices/recipeSlice";
interface VersionTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

const VersionTray = ({ showPanle, showTagByDefaut }: VersionTrayProps) => {
  const [showForm, setShowForm] = useState(false);
  const [updateVersion, setUpdateVersion] = useState(false);
  const [formState, setFormState] = useState({ title: "", body: "" });
  const [updateVersionId, setUpdateVersionId] = useState("");
  const { openVersionTray } = useAppSelector((state) => state?.versionTray);
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const dispatch = useAppDispatch();

  const [addVersion, { data: newVersionData, loading: newVersionLoading }] =
    useMutation(ADD_VERSION);
  const [editVersion, { data: editVersionData, loading: editVersionLoading }] =
    useMutation(EDIT_A_VERSION_OF_RECIPE);
  const isMounted = useRef(false);
  const router = useRouter();

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
      const { data } = await addVersion({
        variables: {
          data: {
            recipeId: detailsARecipe?._id,
            postfixTitle: formState?.title,
            description: formState?.body,
          },
        },
      });
      console.log(data);
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

  useEffect(() => {
    if (isMounted.current) {
      if (!newVersionLoading && newVersionData?.addVersion) {
        dispatch(
          setDetailsARecipe({
            ...detailsARecipe,
            recipeVersion: newVersionData?.addVersion,
          }),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVersionData?.addVersion]);

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
          <h3>{detailsARecipe?.name}</h3>
        </div>
        <NoteHead
          showForm={showForm}
          toggleNoteForm={toggleForm}
          noteForm={formState}
          updateNoteForm={updateForm}
          createOrUpdateNote={createOrUpdateVarsion}
          handleButtonClick={handleButtonClick}
        />
        <NoteBody
          data={detailsARecipe?.recipeVersion || []}
          deleteItem={() => {}}
          updateItem={() => {}}
          varient="versions"
          loading={newVersionLoading}
        />
      </div>
    </TrayWrapper>
  );
};

export default VersionTray;
