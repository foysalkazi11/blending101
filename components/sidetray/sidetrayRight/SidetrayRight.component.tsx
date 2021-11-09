/* eslint-disable @next/next/no-img-element */
import React, {useRef, useEffect, useState} from 'react';
import styles from './trayRight.module.scss';

export default function SidetrayrightComponent(props) {
	const [open, setOpen] = useState(false);

	const ref = useRef<any>();

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
		</div>
	);
}
