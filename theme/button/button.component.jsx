import React, { useState } from 'react';
import styles from './button.module.css';

export default function ButtonComponent({type, style, value, fullWidth, width}) {  
    // STEP 1: INITIALIZE PROPS TO AVOID UI FALL
    type = type || 'text';
    style = style || {};
    if(fullWidth) style = {...style, width: '100%'};
    if(width) style={...style, width: width}
    value = value || text;


    // CASE PRIMARY: IF TYPE IS PRIMARY RETURN PRIMARY BUTTON
    if(type === 'primary') return(
        <button className={styles.button + ' ' + styles.primary}
        style={style}
        >
            {value}
        </button>
    )

    // CASE TRANSPARENT: RETURN TRANSPARENT BUTTON
    if(type === 'transparent') return(
        <button className={styles.button + ' ' + styles.transparent}
        style={style}
        >
            {value}
        </button>
    )

    // CASE DEFAULT: RETURN WHITE BUTTON
    return (
        <button className={styles.button}
        style={style}
        >
            {value}
        </button>
    )
}
