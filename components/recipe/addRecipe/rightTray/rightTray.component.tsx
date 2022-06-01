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
  return (
    <RightTrayComponents
      counter={1}
      nutritionTrayData={nutritionData}
      nutritionState={nutritionState}
      setNutritionState={setNutritionState}
      isComeFormRecipePage={true}
      calculatedIngOz={calculateIngOz}
      nutritionDataLoading={false}
    />
  );
};

export default RightTray;
