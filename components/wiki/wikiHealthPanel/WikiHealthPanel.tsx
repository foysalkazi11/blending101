import React, { useMemo, useState } from "react";
import s from "../wikiNutritionPanel/WikiNutritionPanel.module.scss";
import DropDown from "theme/dropDown/DropDown.component";
import InputComponent from "theme/input/input.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/pro-regular-svg-icons";
import NutritionListSkeleton from "theme/skeletons/nutritionListSkeleton/NutritionListSkeleton";
import CheckIcon from "theme/checkIcon/CheckIcon";
import diseases from "../../../data/diseases.json";

type DiseasesType = {
  Categories: string;
  "Diseases/Conditions": string;
};

type diseasesMapType = { categories: string[] };

let diseasesMap: diseasesMapType = {} as diseasesMapType;
Object.values(JSON.parse(JSON.stringify(diseases)))?.map((dis: DiseasesType) => {
  if (diseasesMap[dis?.Categories]) {
    diseasesMap[dis?.Categories].push(dis["Diseases/Conditions"]);
  } else {
    diseasesMap = { ...diseasesMap, [dis?.Categories]: [] };
  }
});

type WikiHealthPanelProps = {
  handleNutritionClick?: (item: any, exist: boolean, extraInfo?: any) => void;
  checkActiveNutrition?: (arg: any) => boolean;
  showHeader?: boolean;
  scrollAreaMaxHeight?: number;
};

const WikiHealthPanel = ({
  checkActiveNutrition = () => false,
  handleNutritionClick = () => {},
  scrollAreaMaxHeight,
  showHeader,
}: WikiHealthPanelProps) => {
  const [selectDiseases, setSelectDiseases] = useState("");
  const [searchDiseases, setSearchDiseases] = useState("");
  const [diseasesList, setDiseasesList] = useState<string[]>([]);

  const selectDiseasesList = useMemo(() => {
    if (selectDiseases === "") {
      const list = Object.values(diseasesMap)?.reduce((pre, cur) => {
        return pre.concat(cur);
      }, []);

      setDiseasesList(list);
      return list;
    } else {
      setDiseasesList(diseasesMap[selectDiseases]);
      return diseasesMap[selectDiseases];
    }
  }, [selectDiseases]);

  const handleSearchDiseases = (input: string) => {
    setSearchDiseases(input);
    if (input === "") {
      setDiseasesList(selectDiseasesList);
    } else {
      const filterSelectDiseasesList = selectDiseasesList?.filter((item) =>
        item?.toLowerCase()?.includes(input?.toLowerCase()),
      );
      setDiseasesList(filterSelectDiseasesList);
    }
  };

  return (
    <div className={s.wikiNutritionPanelContainer}>
      {showHeader && (
        <>
          <h3 className={s.title}>Nutrition List</h3>
          <div className={s.borderBottom}></div>
        </>
      )}

      <div className={s.dropdown}>
        <DropDown
          value={selectDiseases}
          listElem={Object.keys(diseasesMap)?.map((category) => ({ name: category, value: category }))}
          onChange={(e) => setSelectDiseases(e?.target?.value)}
          border="borderSecondary"
        />
      </div>
      {!selectDiseases && (
        <div className={s.dropdown}>
          <InputComponent
            border="borderSecondary"
            // style={{ padding: "10px", fontSize: "12px", borderRadius: "10px" }}
            inputWithIcon={true}
            icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
            placeholder="Search Nutrition"
            value={searchDiseases}
            onChange={(e) => handleSearchDiseases(e?.target?.value)}
          />
        </div>
      )}

      <div className={`${s.nutrientListWarper} y-scroll`} style={{ maxHeight: `${scrollAreaMaxHeight}px` }}>
        {false ? (
          <NutritionListSkeleton />
        ) : (
          diseasesList?.map((item, index) => {
            return (
              <p key={index} className={s.text} onClick={() => handleNutritionClick(item, checkActiveNutrition(item))}>
                {item}
                {checkActiveNutrition(item) && <CheckIcon style={{ position: "absolute", top: "0px", right: "5px" }} />}
              </p>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WikiHealthPanel;
