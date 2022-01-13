/* eslint-disable @next/next/no-img-element */
import React, {useRef, useEffect, useState} from 'react';
import GroceryComponent from './grocery/Grocery.component';
import styles from './trayRight.module.scss';

export default function SidetrayrightComponent(props) {
	const [open, setOpen] = useState(false);
	const [toggle, setToggle] = useState(1);

	const ref = useRef<any>();
	const reff = useRef<any>();

	useEffect(() => {
		const elem = ref.current;
		if (!elem) return;
		if (open) {
			elem.style.right = '0';
		} else {
			elem.style.right = '-293px';
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
					<img src="/icons/cart__sidebar__orange.png" alt="drawer__orange" />
				</div>
			) : (
				<div
					className={styles.image + ' ' + styles.image__white}
					onClick={handleClick}
				>
					<img src="/icons/cart__sidebar.svg" alt="drawer" />
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
						    <img src="/icons/cart__tray.svg" alt="" /> Grocery
						</div>
						<div
							className={
								toggle === 1
									? styles.main__top__menu__child
									: styles.main__top__menu__child + ' ' + styles.active__menu
							}
							onClick={() => handleToggle(2)}
						>
							<span></span> Shopping
						</div>
					</div>
				</div>

                <div className={styles.grocery}>
                            <GroceryComponent />
                </div>
            </div>


		</div>
	);
}
