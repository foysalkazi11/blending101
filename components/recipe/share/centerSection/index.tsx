/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./centerElements.module.scss";
import ScoreTray from "./scoreTray/scoreTray.component";
import Image from "next/image";
import HandleImageShow from "../handleImageShow/HandleImageShow";
import InputComponent from "../../../../theme/input/input.component";
import TextArea from "../../../../theme/textArea/TextArea";
import { useMutation } from "@apollo/client";
import DELETE_A_RECIPE from "../../../../gqlLib/recipes/mutations/deleteARecipe";
import { useRouter } from "next/router";
import notification from "../../../utility/reactToastifyNotification";
import ConfirmationModal from "../../../../theme/confirmationModal/ConfirmationModal";
import { GiGl } from "../../../../type/nutrationType";
import { useUser } from "../../../../context/AuthProvider";
import DropDown from "theme/dropDown/DropDown.component";
import { useFormContext } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/pro-regular-svg-icons";
import ShowSuggestion from "theme/showSuggestion";
import optionsForBlender from "../../../../data/blender.json";
import { faCaretDown } from "@fortawesome/pro-light-svg-icons";

type Option = {
  label: string;
  value: string;
  [key: string]: string;
};

let manufacturer = "";
const optionsListForBlender = JSON.parse(JSON.stringify(optionsForBlender)).map(
  (blenderName: { [key: string]: string }) => {
    if (blenderName?.["Manufacturer"]) {
      manufacturer = blenderName["Manufacturer"];
    }

    return {
      label: blenderName?.["Blender Name"],
      value: blenderName?.["Blender Name"]?.toLowerCase(),
      manufacturer,
    };
  },
);

type CenterElementsProps = {
  updateEditRecipe?: (key: string, value: any) => void;
  allBlendCategories?: [];
  existingImage?: string[];
  setExistingImage?: Dispatch<SetStateAction<string[]>>;
  setImages?: Dispatch<SetStateAction<any[]>>;
  images?: any[];
  giGl?: GiGl;
  recipeId?: string;
  selectedImage?: string;
  recipePrepareTime?: number | string;
  updateRecipePrepareTime?: (time: number) => void;
  componentUsedFrom?: "addRecipe" | "editRecipe";
};

const CenterSection = ({
  // copyDetailsRecipe = null,
  updateEditRecipe = () => {},
  allBlendCategories,
  images = [],
  setImages = () => {},
  existingImage = [],
  setExistingImage = () => {},
  giGl = {
    netCarbs: 0,
    totalGi: 0,
    totalGL: 0,
  },
  recipeId = "",
  selectedImage = "",
  recipePrepareTime = 1,
  updateRecipePrepareTime = () => {},
  componentUsedFrom = "addRecipe",
}: CenterElementsProps) => {
  const formContext = useFormContext();
  const [showBlenderSuggestionsBox, setShowBlenderSuggestionsBox] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  // const [openMenu, setOpenMenu] = useState(false);
  // const outsideClickRef = useRef<HTMLDivElement>(null);
  // useOnClickOutside(outsideClickRef, () => setOpenMenu(false));
  const user = useUser();
  const [deleteARecipe, { loading }] = useMutation(DELETE_A_RECIPE);
  const router = useRouter();
  let BlendtecItem = [
    { name: `Blentec`, value: `Blentec` },
    { value: `Blentec`, name: `Blentec` },
  ];
  let OzItem = [
    { name: "64oz", value: "64oz" },
    { value: "64oz", name: "64oz" },
  ];

  // delete one recipe
  const deleteOneRecipe = async () => {
    try {
      await deleteARecipe({
        variables: {
          userId: user.id,
          recipeId,
        },
      });
      setOpenModal(false);
      router?.push("/");
    } catch (error) {
      notification("error", "Unable to delete recipe");
    }
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.topSection}>
          <InputComponent
            border="borderSecondary"
            style={{ fontWeight: "bold", color: "#000000", fontSize: "16px" }}
            // value={copyDetailsRecipe?.tempVersionInfo?.version?.postfixTitle}
            // name={"postfixTitle"}
            // onChange={(e) =>
            //   updateEditRecipe(e?.target?.name, e?.target?.value)
            // }
            name="recipeTitle"
            validationObj={{ required: "Recipe title required" }}
          />
        </div>
        <div className={styles.addImagediv}>
          <HandleImageShow
            existingImage={existingImage}
            setExistingImage={setExistingImage}
            images={images}
            setImages={setImages}
            checkBoxProps={{
              showCheckBox: true,
              selectedImage: selectedImage,
              handleChange: (e) => updateEditRecipe("selectedImage", e?.target?.value),
            }}
          />
        </div>
        <div className={styles.scoreTraydiv}>
          <TextArea
            name="recipeDescription"
            borderSecondary={true}
            // value={copyDetailsRecipe?.tempVersionInfo?.version?.description}
            // onChange={(e) =>
            //   updateEditRecipe(e?.target?.name, e?.target?.value)
            // }
          />

          <ScoreTray giGl={giGl} />
          <div className={styles.blendingOptions}>
            <div className={styles.blendingOptions__left}>
              <ul className={styles.inputList}>
                <li className={styles.list}>
                  <DropDown
                    listElem={allBlendCategories}
                    name="blendType"
                    border="borderSecondary"
                    placeholder="Blend Type"
                    validationObj={{ required: "Select Blend Type" }}
                    // value={blendCategoryState}
                    // onChange={setBlendCategoryState}
                  />
                </li>
                {/* <li className={styles.list} style={{ position: "relative" }}>
                  <InputComponent
                    inputWithIcon={true}
                    type="text"
                    name="blenderName"
                    placeholder="Select blender"
                    icon={<FontAwesomeIcon icon={faCaretDown} size="sm" />}
                    onClick={() => {
                      setShowBlenderSuggestionsBox(!showBlenderSuggestionsBox);
                    }}
                    readOnly
                    border="borderSecondary"
                  />

                  <ShowSuggestion
                    list={optionsListForBlender}
                    handleClickList={(list: Option) => {
                      formContext?.reset({ blenderName: list.label });
                    }}
                    style={{ display: showBlenderSuggestionsBox ? "block" : "none" }}
                    placeholder="Search blender..."
                    closeSuggestionBox={() => setShowBlenderSuggestionsBox(false)}
                    border="borderSecondary"
                  />

                  <DropDown listElem={BlendtecItem} name="blenderName" border="borderSecondary" />
                </li> */}
                {/* <li>
                  <div className={styles.left__options}>
                    <DropDown listElem={OzItem} name="oz" border="borderSecondary" />
                  </div>
                </li> */}
              </ul>
            </div>
            <div className={styles.blendingOptions__right}>
              {componentUsedFrom === "addRecipe" ? (
                <InputComponent
                  type="number"
                  border="borderSecondary"
                  name="cookTime"
                  placeholder="Total time"
                  style={{ width: "100px", textAlign: "center" }}
                />
              ) : (
                <span className={styles.text}>{recipePrepareTime}</span>
              )}

              {/* <div className={styles.blendingOptions__right__options}>
                <span className={styles.text}>{recipePrepareTime}</span>
                <div className={styles.arrow}>
                  <div className={styles.arrow_div}>
                    <Image
                      onClick={() => updateRecipePrepareTime(recipePrepareTime + 1)}
                      src={"/icons/dropdown.svg"}
                      alt="icon"
                      width={17}
                      height={15}
                      className={styles.reverse_arrow}
                    />
                    <Image
                      onClick={() => updateRecipePrepareTime(recipePrepareTime - 1)}
                      src={"/icons/dropdown.svg"}
                      alt="icon"
                      width={17}
                      height={15}
                      className={styles.original_arrow}
                    />
                  </div>
                </div>
              </div> */}
              <span className={styles.timer_icon}>
                <Image src={"/icons/time-icon.svg"} alt="Picture will load soon" width={20} height={20} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        text="All the related entities will be removed along with this recipe !!!"
        cancleFunc={() => setOpenModal(false)}
        submitFunc={deleteOneRecipe}
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default CenterSection;
