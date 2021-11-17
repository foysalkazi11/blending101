/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './header.module.scss';
import SocialComponent from './social/Social.component';
import LocalMallIcon from '@mui/icons-material/LocalMall';

interface headerInterface {
	logo: Boolean;
	headerTitle: string
}

export default function HeaderComponent({ logo }: headerInterface) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.header__inner}>
					<div className={styles.left + ' ' + styles.logo}>
						{logo && <img src="/logo.png" alt="logo" />}
					</div>
					<div className={styles.center + ' ' + styles.info}>
						<h3>Home</h3>
					</div>
					<div className={styles.right + ' ' + styles.logo}>
						<div>
							<SocialComponent />
						</div>
						<div>
							<LocalMallIcon className={styles.cart__icon} />
						</div>
						<div className={styles.profile}>
							<img src="/user-profile.png" alt="prfile.png" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
