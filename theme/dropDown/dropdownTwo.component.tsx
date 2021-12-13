import { ArrowDownward, ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import styles from './dpd.module.scss';

interface dropdownInterface {
	value?: String;
	setValue?: Function;
	height?: Number;
}

export default function DropdownTwoComponent({
	value,
	setValue,
	height,
}: dropdownInterface) {
	const ref = useRef<any>();
	const [active, setActive] = useState(false);
	const style = height ? { height: `${height}px` } : { height: '40px' };

    const handleToggle = () => {
        setActive(() => !active)
        const style = ref.current.style.overflow;
        if(style === 'visible'){
            ref.current.style.overflow = 'hidden';
        }else{
            ref.current.style.overflow = 'visible';
        }
    }

	return (
		<div className={styles.dpd}>
			<div className={styles.dropdown} ref={ref} style={style}>
				<div className={styles.dropdown__top} style={style} onClick={handleToggle}>
					All
					<div>
						{
                            !active ? <ArrowDropDown className={styles.dropdown__top__icon} /> : <ArrowDropUp className={styles.dropdown__top__icon} />
                        }
					</div>
				</div>
				<div className={styles.dropdown__bottom}>
					<div className={styles.menu}>
						<div className={styles.dropdown__bottom__list} onClick={handleToggle}>Fruity</div>
						<div className={styles.dropdown__bottom__list} onClick={handleToggle}>Creamy</div>
						<div className={styles.dropdown__bottom__list} onClick={handleToggle}>Nutty</div>
						<div className={styles.dropdown__bottom__list} onClick={handleToggle}>Flavoured</div>
					</div>
				</div>
			</div>
		</div>
	);
}
