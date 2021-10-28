/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './card.module.scss';

export default function CardComponent({img, icon, rating, noOfRating, price, discountPrice, type, title, rx, style}) {


     // STEP 1: CHECK VALUE TYPES
    if(style && typeof style !== 'object'){
        console.log('Argument style expects object as value')
        style = null
    }
    if(img && typeof img !== 'string'){
        console.log('Argument image expects string as value')
        img = null
    }
    if(icon && typeof icon !== 'string'){
        console.log('Argument icon expects string as value')
        img = null
    }
    if(rx && typeof rx !== 'number'){
        console.log('Argument rx expects number as value')
        rx = null
    }
    if(title && typeof title !== 'string'){
        console.log('Argument title expects string as value')
        title = null
    }
    if(rating && typeof rating !== 'number'){
        console.log('Argument rating expects number as value')
        rating = null
    }
    if(price && typeof price !== 'number'){
        console.log('Argument price expects number as value')
        price = null
    }
    if(discountPrice && typeof discountPrice !== 'number'){
        console.log('Argument price expects number as value')
        discountPrice = null
    }
    if(noOfRating && typeof noOfRating !== 'number'){
        console.log('Argument No of ratings expects number as value')
        rx = null
    }

    // STEP 2: HANDLE VARIABLES FALLBACK VALUE TO AVOID UI FAILURE
    style = style || {};
    rx = rx || 500;
    img = img || '/cards/banana.png';
    price = price || 16.95;
    discountPrice = discountPrice || 12.95;
    rating = rating || 4.6;
    noOfRating = noOfRating || 71;
    title = title || 'Default Title';
    icon = icon || '/icons/star.svg';
    

    if(type === 'second') return(
        <div className={styles.card} style={style}>
            <h3>{title}</h3>
            <div className={styles.image}>
                <img src={img} alt={img} />
            </div>
            <div className={styles.bottom}>
                <div className={styles.bottom__left}>
                    <strike>{price}</strike> &nbsp; <span>{discountPrice}</span>
                </div>
                <div className={styles.bottom__right}>
                    <img src={icon} alt="icon" /> &nbsp; {rating} &nbsp; ({noOfRating})
                </div>
            </div>
        </div>
    )
    return (
        <div className={styles.card}>
            <h3>{title}</h3>
            <div className={styles.image}>
                <img src={img} alt={img} />
            </div>
            <div className={styles.bottom}>
                <div className={styles.bottom__left}>
                    Rx Score <span>&nbsp; {rx}</span>
                </div>
                <div className={styles.bottom__right}>
                    <img src={icon} alt="icon" /> &nbsp; 4.9 &nbsp; ({noOfRating})
                </div>
            </div>
        </div>
    )
}
