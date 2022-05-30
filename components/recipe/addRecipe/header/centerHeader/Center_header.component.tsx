import React from 'react';
import styles from './Center_header.module.scss';
import Image from 'next/image';
import VisibilityOutlinedIcon from '../../../../../public/icons/visibility_black_outlined.svg';
import ClearIcon from '../../../../../public/icons/clear_black_36dp.svg';
import { useRouter } from 'next/router';
import { IoIosSave } from 'react-icons/io';
import Tooltip from '../../../../../theme/toolTip/CustomToolTip';

interface CenterHeaderPorps {
  handleSaveRecipe?: () => void;
}

const Center_header = ({ handleSaveRecipe = () => {} }: CenterHeaderPorps) => {
  const router = useRouter();
  return (
    <div className={styles.center__title}>
      <div className={styles.center__title__left}>
        <span>
          <Image
            src={'/icons/recipe-icon.svg'}
            alt={'icon'}
            width={24}
            height={24}
          />
        </span>

        <h3>Recipe</h3>
      </div>
      <div className={styles.center__title__right}>
        <Tooltip content="Save recipe" direction="bottom">
          <div
            className={styles.center__title__right__eye}
            onClick={handleSaveRecipe}
          >
            <IoIosSave />
          </div>
        </Tooltip>

        <Tooltip content="Back home" direction="bottom">
          <div
            className={styles.center__title__right__cross}
            onClick={() => router?.push('/')}
          >
            <ClearIcon />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default Center_header;
