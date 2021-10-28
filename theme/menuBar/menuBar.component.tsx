import React, { useEffect, useRef, useState } from 'react';
import styles from './menubar.module.scss';

interface menuBarInterface {
    childs: Array<[]>,
    value: any,
    setValue: Function
}


export default function MenubarComponent({childs, setValue, value}) {

    childs = childs || ['All', 'Wholefood', 'Smoothie', 'Refreshing', 'Teas & Tonics', ]


    const lineRef = useRef<any>();
    useEffect(() => {
        moveLine(0, childs[0])
    }, [])
    
    const handleClick  = (no: number) => {
        moveLine(no, childs[no])
    }

    const moveLine = (no: any, VALUE: string) => {
        const id = 'menubar__child'+ no;
        const elem = document.getElementById(id)

        setValue && setValue(VALUE)

        if(!elem) return
        const elemWidth = elem.offsetWidth + 'px';
        const fromLeft = elem.offsetLeft + 'px';
        
        if(!lineRef.current) return;
        const ref = lineRef.current
        ref.style.width = elemWidth;
        ref.style.left = fromLeft
    }

    return (
        <div className={styles.menu}>
            <div className={styles.menu__inner}>
            {
                childs && childs.map((child: any, i: number) => (
                    <div 
                    className={styles.menu__child} 
                    key={'menubar' + child + i}
                    onClick={() => handleClick(i)}
                    id={'menubar__child'+i}
                    >
                        {child}
                    </div>
                ))
            }
            <div className={styles.line} id="line__rep3" ref={lineRef}>

            </div>
            </div>
        </div>
    )
}
