import React from 'react'
import WikiTray from '../wikiTray.component';
import Dropdown from 'react-dropdown';
import styles from './health.module.scss';

export default function HealthTrayComponent({title}) {
    const options = [
    'systems', 'two', 'three'
    ];
    const systems = [
        'Circulatory',
        'Cardiovascular',
        'Digestive',
        'Excretory',
        'Endocrine',
        'Integumentry',
        'Exocrine',
        'Immune',
        'Lymphatic',
        'Muscular'
    ]
    const defaultOption = options[0];

    const onChange = () => {

    }
    

    return (
        <WikiTray title={title}>
            <div className={styles.nutrition}>
                <Dropdown options={options} onChange={onChange} value={defaultOption} placeholder="Select an option" controlClassName={styles.dropdown} />
                <div>
                    <ul>
                        {
                            systems && systems.map((system, i) => (
                                <li key={system + i}>{system}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </WikiTray>
    )
}
