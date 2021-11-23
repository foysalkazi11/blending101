import React, { useEffect, useState } from 'react';
import styles from './scale.module.scss';

interface scaleCompInterface {
    value: string,
    setValue: Function
}
export function ScaleComponent({value, setValue}: scaleCompInterface) {

    const YLine = ({value}) => {
        let longline = false;
        const style = {left: `calc(${value}%)`, height: `20px`}
        const number = value % 10;
        if(number === 0){
            console.log('long line')
            style.height = '40px';
            longline = value
        }
       return(
        <div className={styles.yLine} style={style}>
            {
                longline && <div className={styles.longline}>{longline}</div>
            }
        </div>
       )
    }
    
    const val = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98]

    return (
        <div className={styles.main}>
            <div className={styles.scale}>
            <input type="range" step={1} value={value} onChange={e => setValue(e.target.value)}  />
            <div className={styles.line}>
                {
                    val.map((no, i) => (
                        <YLine key={'linex' + i} value={no} />
                    ))
                }
                
            </div>
        </div>
        </div>
    )
}
