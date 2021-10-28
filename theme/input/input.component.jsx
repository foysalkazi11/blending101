import React, { useState } from 'react';
import styles from './input.module.scss';

export default function InputComponent({type, style, value, setValue, placeholder, textarea, fullWidth, width}) {  

    const [text, setText] = useState('');
    // STEP 1: INITIALIZE PROPS TO AVOID UI FALL
    type = type || 'text';
    style = style || {};
    if(fullWidth) style = {...style, width: '100%'};
    if(width) style={...style, width: width}
    value = value || text;
    placeholder = placeholder || 'Add your text here';

    // STEP 2: CHANGE VALUES AND RETURN IT
    const onChange = (e) => {
        const val = e.target.value;
        if(setValue){
            setValue(val)
        }else{
            setText(val)
        }
    }

    // CASE 1: IF TEXTAREA RETURN TEXTAREA COMPONENT
    if(textarea) return (
        <textarea 
            className={styles.textarea}
        />
    )

    // CASE: DEFAULT RETURN INPUT COMPONENT
    return (
        <input 
        className={styles.input}
        type={type} 
        style={style} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        />
    )
}
