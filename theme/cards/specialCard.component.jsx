import React from 'react';
import styles from './card.module.css';

export default function SpecialcardComponent({img, title, style, imageHeight, color, type, rx}) {

    // STEP 1: CHECK VALUE TYPES
    if(style && typeof style !== 'object'){
        console.log('Argument style expects object as value')
        style = null
    }
    if(img && typeof img !== 'string'){
        console.log('Argument image expects string as value')
        img = null
    }
    if(rx && typeof rx !== 'number'){
        console.log('Argument rx expects number as value')
        rx = null
    }
    if(title && typeof title !== 'string'){
        console.log('Argument title expects string as value')
        style = null
    }

    // STEP 2: HANDLE VARIABLES FALLBACK VALUE TO AVOID UI FAILURE
    rx = rx || 500
    img = img || '/cards/grains.png'
    style = style || {};
    style = {...style, backgroundImage: `url("${img}")`};
    if(imageHeight) style = {...style, height: imageHeight};

    let textStyle = {};
    if(color) textStyle = {...textStyle, color: color}

    // CASE 1: IF TYPE IS SECONDARY SERVE SECONDARY CARD
    if(type === 'secondary') return(
        <div className={styles.cardTwo}>
            <div className={styles.cardTwo__top} style={style}>
            </div>
            <div className={styles.cardTwo__bottom}>
                <h5 style={textStyle}>{title}</h5>
            </div>
        </div>
    )

    // CASE 2: SERVE DEFAULT CARD
    return (
        <div className={styles.cardTwo}>
            <div className={styles.cardTwo__top} style={style}>
                <div className={styles.cardTwo__float + ' ' + styles.cardTwo__float__left}>
                    Rx Score <span> &nbsp; {rx}</span>
                </div>
                <div className={styles.cardTwo__float + ' ' + styles.cardTwo__float__right}>
                    Ingredient
                </div>
            </div>
            <div className={styles.cardTwo__bottom}>
                <h5 style={textStyle}>{title}</h5>
            </div>
        </div>
    )
}
