import React from 'react';
import DragAndDrop from '../../theme/dragAndDrop/DragAndDrop.component'
import styles from '../../styles/component.module.scss';

const index = () => {
    return (
        <div className={styles.component__container}>
            <div className={styles.compoent__box}>
				<h3>DRAG AND DROPS</h3>
            <DragAndDrop />
            </div>

        </div>
    )
}

export default index
