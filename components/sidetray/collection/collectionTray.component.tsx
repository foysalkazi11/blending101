/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import LeftTrayWrapper from '../leftTray.wrapper';
import CollectionComponent from './content/collection.component';
import ThemeComponent from './content/theme.component';
import styles from './trayleft.module.scss';

export default function CollectionTray(props) {
	const [toggle, setToggle] = useState(1);

	const reff = useRef<any>();

	const handleToggle = (no: number) => {
		if (no === 1) {
			reff.current.style.left = '0';
		} else {
			reff.current.style.left = '50%';
		}
		setToggle(no);
	};
	return (
		<LeftTrayWrapper id="collection123">
			<div className={styles.main}>
				<div className={styles.main__top}>
					<div className={styles.main__top__menu}>
						<div className={styles.active} ref={reff}></div>
						<div
							className={
								toggle === 2
									? styles.main__top__menu__child
									: styles.main__top__menu__child + ' ' + styles.active__menu
							}
							onClick={() => handleToggle(1)}
						>
							<span></span> Collection
						</div>
						<div
							className={
								toggle === 1
									? styles.main__top__menu__child
									: styles.main__top__menu__child + ' ' + styles.active__menu
							}
							onClick={() => handleToggle(2)}
						>
							<span></span> Themes
						</div>
					</div>
				</div>
				{toggle === 2 && (
					<div>
						<ThemeComponent />
					</div>
				)}
                {toggle === 1 && (
					<div>
						<CollectionComponent />
					</div>
				)}
			</div>
		</LeftTrayWrapper>
	);
}
