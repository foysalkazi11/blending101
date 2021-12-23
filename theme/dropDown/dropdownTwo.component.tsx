import { ArrowDownward, ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import React, { useRef, useState } from 'react';
import styles from './dpd.module.scss';

interface Arri {
	title: string,
	val: string
}

interface dropdownInterface {
	value?: Arri;
	setValue?: Function;
	height?: Number;
	list: Array<Arri>
}

export default function DropdownTwoComponent({
	value,
	setValue,
	height,
	list
}: dropdownInterface) {
	const ref = useRef<any>();
	const [active, setActive] = useState(false);
	const style = height ? { height: `${height}px` } : { height: '40px' };

    const handleToggle = (item) => {
        setActive(() => !active)
        const style = ref.current.style.overflow;
        if(style === 'visible'){
            ref.current.style.overflow = 'hidden';
        }else{
            ref.current.style.overflow = 'visible';
        }
		setValue(item)
    }

	return (
		<div className={styles.dpd}>
			<div className={styles.dropdown} ref={ref} style={style}>
				<div className={styles.dropdown__top} style={style} onClick={handleToggle}>
					{value.title}
					<div>
						{
                            !active ? <ArrowDropDown className={styles.dropdown__top__icon} /> : <ArrowDropUp className={styles.dropdown__top__icon} />
                        }
					</div>
				</div>
				<div className={styles.dropdown__bottom}>
					<div className={styles.menu}>
						{
							list && list.map((item, i) => (
								<div key={'item' + i} className={styles.dropdown__bottom__list} onClick={() => handleToggle(item)}>
									{item.title}
								</div>
							))
						}
					</div>
				</div>
			</div>
		</div>
	);
}
