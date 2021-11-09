import React from 'react';
import styles from '../header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebookF, faInstagram, faPinterestP, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons'

export default function SocialComponent(props) {
    

    return (
        <div className={styles.social}>
            <div className={styles.social__child}>
                <FontAwesomeIcon icon={faFacebookF} />
            </div>
            <div className={styles.social__child}>
            <FontAwesomeIcon icon={faInstagram} />
            </div>
            <div className={styles.social__child}>
            <FontAwesomeIcon icon={faPinterestP} />
            </div>
            <div className={styles.social__child}>
            <FontAwesomeIcon icon={faYoutube} />
            </div>
            <div className={styles.social__child}>
            <FontAwesomeIcon icon={faTwitter} />
            </div>
        </div>
    )
}
