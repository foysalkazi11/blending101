import React from 'react';
import styles from './content.module.scss';

export default function CollectionComponent(props) {
	const data = [
		{ title: 'Desert Smoothies', img: '/cards/valentine.png' },
		{ title: 'Desert Smoothies', img: '/cards/children.png' },
		{ title: 'Desert Smoothies', img: '/cards/diabetes.png' },
		{ title: 'Desert Smoothies', img: '/cards/food.png' },
	];

	return (
		<div className={styles.collection}>
			<div className={styles.collection__add}></div>
			<div className={styles.collection__collections}>
				{data &&
					data.map((item, i) => (
						<div
							className={styles.collection__child}
							key={'collections__child' + i}
						>
							<div
								className={styles.collection__child__img}
							>
                                <div className={styles.collection__child__img__abs} style={{ backgroundImage: `url(${item.img})` }}></div>
                            </div>
							<div className={styles.collection__child__name}>
                                <p>{item.title}</p>
                            </div>
						</div>
					))}
			</div>
		</div>
	);
}
