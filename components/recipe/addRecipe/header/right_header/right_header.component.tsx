import React from 'react';
import Image from 'next/image';
import styles from './right_header.module.scss';

const RightHeader = () => {
  return (
    <div className={styles.recipeHeadingTopSec}>
      <Image
        src={'/icons/chart-bar-light-green.svg'}
        alt="Picture will load soon"
        width={22}
        height={22}
      />

      <h3>Rx Facts</h3>
    </div>
  );
};

export default RightHeader;
