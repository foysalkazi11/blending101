import { faCirclePlus } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { useAppSelector } from "../../../../redux/hooks";
import RecipeDiscoverButton from "../../../../theme/button/recipeDiscoverButton/RecipeDiscoverButton";
import Tooltip from "../../../../theme/toolTip/CustomToolTip";
import CommonSearchBar from "../../../searchBar/CommonSearchBar";
interface Props {
  input?: string;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  openFilterTray?: boolean;
  toggleFilterPanel?: () => void;
}

const DiscoveryPageSearchBar = ({
  handleOnChange = () => {},
  input = "",
  openFilterTray,
  toggleFilterPanel,
}: Props) => {
  const router = useRouter();
  const { dbUser } = useAppSelector((state) => state?.user);

  const handleSubmit = () => {
    //
  };
  return (
    <div className="flex ai-center">
      <CommonSearchBar
        input={input}
        handleOnChange={handleOnChange}
        handleSubmitFunc={handleSubmit}
        openFilterPanel={toggleFilterPanel}
        isFilterPanelOpen={openFilterTray}
        showFilterIcon={true}
      />
      <div
        style={{ marginLeft: "40px" }}
        // className={styles.buttonContainer}
      >
        <Tooltip content="Compare recipe" direction="bottom">
          <RecipeDiscoverButton
            icon={
              dbUser?.compareLength
                ? "/images/compare-fill-icon.svg"
                : "/icons/eclipse.svg"
            }
            text={`Compare(${
              dbUser?.compareLength ? dbUser?.compareLength : 0
            })`}
            disable={dbUser?.compareLength ? false : true}
            style={{
              backgroundColor: dbUser?.compareLength ? "#fff" : "#ececec",
            }}
            handleClick={() => router.push(`/recipe/compare`)}
          />
        </Tooltip>
      </div>
      <div
        style={{ marginLeft: "30px" }}
        // className={styles.buttonContainer}
      >
        <Tooltip content="Add recipe" direction="bottom">
          <RecipeDiscoverButton
            icon={
              <FontAwesomeIcon
                icon={faCirclePlus}
                color="#fe5d1f"
                fontSize={20}
                style={{ marginRight: "5px" }}
              />
            }
            text="Recipe"
            handleClick={() => router.push(`/recipe/add_recipe`)}
          />
        </Tooltip>
      </div>
      {/* <div
        style={{ marginLeft: "30px" }}
        // className={styles.buttonContainer}
      >
        <Tooltip content="My Collections" direction="bottom">
          <RecipeDiscoverButton
            icon={
              <FontAwesomeIcon
                icon={faBookmark}
                color="#fe5d1f"
                fontSize={20}
                style={{ marginRight: "5px" }}
              />
            }
            text="Collections"
            handleClick={() =>
              router.push(`/collection/recipeCollection/my_collections`)
            }
          />
        </Tooltip>
      </div> */}
    </div>
  );
};

export default DiscoveryPageSearchBar;
