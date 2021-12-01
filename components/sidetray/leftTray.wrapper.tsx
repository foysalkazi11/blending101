/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import styles from './tray.module.scss';


export default function LeftTrayWrapper(props) {
    const [open, setOpen] = useState(false);

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
            {props.children}
        </div>
    )
}
