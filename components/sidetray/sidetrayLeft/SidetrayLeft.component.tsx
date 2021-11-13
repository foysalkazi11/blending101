/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import CollectionComponent from './content/collection.component';
import ThemeComponent from './content/theme.component';
import styles from './trayleft.module.scss';

export default function SidetrayleftComponent(props) {
	const [open, setOpen] = useState(false);
	const [toggle, setToggle] = useState(1);

	const ref = useRef<any>();
	const reff = useRef<any>();

	useEffect(() => {
		const elem = ref.current;
		if (!elem) return;
		if (open) {
			elem.style.left = '0';
		} else {
			elem.style.left = '-293px';
		}
	}, [open]);

	const handleClick = () => {
		setOpen(() => !open);
	};

	const handleToggle = (no: number) => {
		if (no === 1) {
			reff.current.style.left = '0';
		} else {
			reff.current.style.left = '50%';
		}
		setToggle(no);
	};
	return (
		<div className={styles.tray} ref={ref}>
			{open ? (
				<div className={styles.image} onClick={handleClick}>
					<img src="/icons/left__drawer__orange.svg" alt="drawer__orange" />
				</div>
			) : (
				<div
					className={styles.image + ' ' + styles.image__white}
					onClick={handleClick}
				>
					<img src="/icons/left__drawer.svg" alt="drawer" />
				</div>
			)}
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
		
        
        </div>
	);
}
