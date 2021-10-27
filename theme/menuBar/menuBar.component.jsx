import React, { useEffect, useRef, useState } from 'react';
import styles from './menubar.module.css';

export default function MenubarComponent({childs, setValue}) {

    childs = childs || ['All', 'Wholefood', 'Smoothie', 'Refreshing', 'Teas & Tonics', 'Soup', 'Frozen Treat']


    const lineRef = useRef();
    useEffect(() => {
        moveLine(0)
    }, [])
    
    const handleClick  = (no) => {
        moveLine(no)
    }

    const moveLine = (no, VALUE) => {
        const id = 'menubar__child'+ no;
        const elem = document.getElementById(id)

        setValue && setValue(VALUE)

        if(!elem) return
        const elemWidth = elem.offsetWidth + 'px';
        const fromLeft = elem.offsetLeft + 'px';
        
        if(!lineRef.current) return
        lineRef.current.style.width = elemWidth;
        lineRef.current.style.left = fromLeft
    }

    return (
        <div className={styles.menu}>
            <div className={styles.menu__inner}>
            {
                childs && childs.map((child, i) => (
                    <div 
                    className={styles.menu__child} 
                    key={'menubar' + child + i}
                    onClick={() => handleClick(i, child)}
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
