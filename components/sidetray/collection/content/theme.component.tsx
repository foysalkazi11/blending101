import React from 'react';
import styles from './content.module.scss';

export default function ThemeComponent(props) {
	const data = [
		{ title: 'Valentine', img: '/cards/valentine.png' },
		{ title: 'Children', img: '/cards/children.png' },
		{ title: 'Diabetes', img: '/cards/diabetes.png' },
        { title: 'Weight Loss', img: '/cards/food.png' },
        { title: 'Children', img: '/cards/children.png' },
		{ title: 'Diabetes', img: '/cards/diabetes.png' },
	];

	return (
		<div className={styles.theme}>
			{data &&
				data.map((item, i) => (
					<div
						className={styles.theme__child}
						key={'theme__child' + i}
					>
                        <div className={styles.theme__cover} >
                            <div  className={styles.theme__cover__abs} style={{ backgroundImage: `url(${item.img})` }}>

                            </div>
                        </div>
						<p>{item.title}</p>
					</div>
				))}
		</div>
	);
}
