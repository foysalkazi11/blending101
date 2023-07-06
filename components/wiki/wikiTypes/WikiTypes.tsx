import React, { Dispatch, SetStateAction } from "react";
import CheckIcon from "../../../theme/checkIcon/CheckIcon";
import { WikiType as Type } from "../../../type/wikiListType";
import s from "./WikiType.module.scss";

const typeList: { icon: string; title: Type }[] = [
  { icon: "/images/wiki_ingredient.png", title: "Ingredient" },
  { icon: "/icons/Nurtition.svg", title: "Nutrient" },
  { icon: "/icons/Heart_rate.svg", title: "Health" },
];

interface Props {
  type: Type;
  setType: Dispatch<SetStateAction<Type>>;
  showHeader?: boolean;
}

const WikiTypes = ({
  type = "Ingredient",
  setType = () => {},
  showHeader = true,
}: Props) => {
  const changeWikiType = (title: Type) => {
    if (title !== type) {
      setType(title);
    } else {
      setType("");
    }
  };

  return (
    <div className={s.wikiTypeContainer}>
      {showHeader && (
        <>
          <h3 className={s.title}>Wiki type</h3>
          <div className={s.borderBottom}></div>
        </>
      )}

      <div className={s.imageBox}>
        {typeList?.map((item) => {
          return (
            <div key={item?.title}>
              <div
                className={s.singleImg}
                onClick={() => changeWikiType(item?.title)}
              >
                {item?.title === type && (
                  <CheckIcon
                    style={{ position: "absolute", top: "0", right: "2px" }}
                  />
                )}
                <img src={item?.icon} alt="img" />
              </div>
              <p
                className={s.typeTitle}
                style={{ fontWeight: item?.title === type ? "600" : "500" }}
              >
                {item?.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WikiTypes;
