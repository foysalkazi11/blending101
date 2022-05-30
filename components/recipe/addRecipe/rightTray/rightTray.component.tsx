/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import RightHeader from '../header/right_header/right_header.component';
import styles from './rightTray.module.scss';
import UpdatedRecursiveAccordian from '../../../customRecursiveAccordian/updatedRecursiveAccordian.component';
import RightTrayComponents from '../../../rightTray/rightTray.component';

interface RightTrayProps {
  calculateIngOz?: number | null;
  nutritionData?: object;
}

const RightTray = ({
  nutritionData = {},
  calculateIngOz = 0,
}: RightTrayProps) => {
  const [nutritionState, setNutritionState] = useState(null);
  const [singleElement, setSingleElement] = useState(false);
  return (
    <RightTrayComponents
      counter={1}
      nutritionTrayData={nutritionData}
      singleElement={singleElement}
      setSingleElement={setSingleElement}
      nutritionState={nutritionState}
      setNutritionState={setNutritionState}
      measurement={
        nutritionState &&
        nutritionState?.portions?.filter((itm) => itm.default)[0].measurement
      }
      nutrientName={nutritionState?.ingredientName}
      isComeFormRecipePage={true}
      calculatedIngOz={calculateIngOz}
    />
  );
};

export default RightTray;
