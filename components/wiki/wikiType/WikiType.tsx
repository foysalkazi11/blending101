import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import CheckIcon from "../../../theme/checkIcon/CheckIcon";
import s from "./WikiType.module.scss";

const typeList = [
  { icon: "/icons/Ingredients.svg", title: "Ingredient" },
  { icon: "/icons/Nurtition.svg", title: "Nutrient" },
  { icon: "/icons/Heart_rate.svg", title: "Health" },
];

interface Props {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
}

const WikiType = ({ type = "", setType = () => {} }: Props) => {
  const router = useRouter();
  const changeWikiType = (title: string) => {
    if (title === type) {
      //router?.push(`/wiki`);
    } else {
      setType(title);
      //router?.push(`/wiki/${title}`);
    }
  };

  return (
    <div className={s.wikiTypeContainer}>
      <h3 className={s.title}>Type</h3>
      <div className={s.borderBottom}></div>
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

export default WikiType;
