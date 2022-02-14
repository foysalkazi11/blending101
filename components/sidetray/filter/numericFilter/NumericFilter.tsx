import React, { useState } from "react";
import styles from "./NumericFilter.module.scss";
import { BiPlus, BiMinus } from "react-icons/bi";

type NumericFilterProps = {
  childIngredient?: string;
};

const NumericFilter = ({ childIngredient }: NumericFilterProps) => {
  const [activeTab, setActiveTab] = useState<string | number>(1);
  const [inputValue, setInputValue] = useState(0);
  const handleActiveTab = (num: number) => {
    setActiveTab(num);
  };

  return (
    <div className={styles.numericFilterContainer}>
      <div className={styles.tabContainer}>
        <div
          className={`${styles.firstChild} ${
            activeTab === 1 ? styles.active : ""
          }`}
          onClick={() => handleActiveTab(1)}
        >
          Less than
        </div>
        <div
          className={`${styles.middleChild} ${
            activeTab === 2 ? styles.active : ""
          }`}
          onClick={() => handleActiveTab(2)}
        >
          Between
        </div>
        <div
          className={`${styles.lastChild} ${
            activeTab === 3 ? styles.active : ""
          }`}
          onClick={() => handleActiveTab(3)}
        >
          Greater than
        </div>
      </div>
      {activeTab === 2 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className={styles.counterContainer}>
            <div
              className={styles.counterButton}
              onClick={() =>
                setInputValue((pre) => Number(pre) >= 1 && Number(pre) - 1)
              }
            >
              <BiMinus />
            </div>
            <input
              className={styles.counterContainerInput}
              min={0}
              type="number"
              value={inputValue}
              //@ts-ignore
              onChange={(e) => setInputValue(e?.target?.value)}
              style={{ width: "35px" }}
            />
            <div
              className={styles.counterButton}
              onClick={() => setInputValue((pre) => Number(pre) + 1)}
            >
              <BiPlus />
            </div>
          </div>
          <div className={styles.counterContainer}>
            <div
              className={styles.counterButton}
              onClick={() =>
                setInputValue((pre) => Number(pre) >= 1 && Number(pre) - 1)
              }
            >
              <BiMinus />
            </div>
            <input
              className={styles.counterContainerInput}
              min={0}
              type="number"
              value={inputValue}
              //@ts-ignore
              onChange={(e) => setInputValue(e?.target?.value)}
              style={{ width: "35px" }}
            />
            <div
              className={styles.counterButton}
              onClick={() => setInputValue((pre) => Number(pre) + 1)}
            >
              <BiPlus />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.counterContainer}>
          <div
            className={styles.counterButton}
            onClick={() =>
              setInputValue((pre) => Number(pre) >= 1 && Number(pre) - 1)
            }
          >
            <BiMinus />
          </div>
          <input
            className={styles.counterContainerInput}
            min={0}
            type="number"
            value={inputValue}
            //@ts-ignore
            onChange={(e) => setInputValue(e?.target?.value)}
          />
          <div
            className={styles.counterButton}
            onClick={() => setInputValue((pre) => Number(pre) + 1)}
          >
            <BiPlus />
          </div>
        </div>
      )}
    </div>
  );
};

export default NumericFilter;
