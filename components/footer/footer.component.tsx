/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './footer.module.scss';

export default function FooterComponent(props) {

    return (
        <div className={styles.footer}>
            <div className={styles.footer__child}>
                <ul>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>About Us</li>
                </ul>
            </div>
            <div className={styles.footer__child}>
                <img src="/logo.png" alt="logo" />
            </div>
            <div className={styles.footer__child}>
                <ul>
                    <li>Terms and Conditions</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
        </div>
    )
}
