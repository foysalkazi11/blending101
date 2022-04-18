import React from "react";
import styles from './inputGoal.module.scss';

const InputGoal = ({inputValue,setInputValue}) => {
  return <input type="text" className={styles.mainInput} value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}}/>;
};

export default InputGoal;
