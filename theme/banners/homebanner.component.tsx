import React from 'react';
import styles from './homebanner.module.scss';

export default function HomebannerComponent(props) {
	return (
		<div className={styles.banner}>
			<div className={styles.banner__inner}>
				<div className={styles.banner__child} style={{backgroundImage: `url("/background/fruits.png")`}}>

                </div>
                <div className={styles.banner__child} style={{backgroundImage: `url("/background/juices.png")`}}>

                </div>
                <div className={styles.banner__child}>

                </div>
                <div className={styles.banner__child} style={{backgroundImage: `url("/background/detail.png")`}}>

                </div>
                <div className={styles.banner__child}>

                </div>
                <div className={styles.banner__child} style={{backgroundImage: `url("/background/babyjuice.png")`}}>

                </div>
                <div className={styles.banner__child} style={{backgroundImage: `url("/background/shakes.png")`}}>
                    
                </div>
			</div>
		</div>
	);
}
