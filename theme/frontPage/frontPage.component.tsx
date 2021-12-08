import React from 'react'
import Hero from './Hero/Hero.component';
import styles from './frontPage.module.scss'

const FrontPage = () => {
    return (
        <div className={styles.mainDiv}>
            <Hero/>
        </div>
    )
}

export default FrontPage
