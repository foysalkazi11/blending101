import React from 'react';
import HeaderComponent from '../components/header/Header.component';
import SidebarComponent from '../components/sidebar/Sidebar.component';
import SidetrayleftComponent from '../components/sidetray/sidetrayLeft/SidetrayLeft.component';
import SidetrayrightComponent from '../components/sidetray/sidetrayRight/SidetrayRight.component';
import styles from './container.module.scss';

export default function AContainer(props : any) {
    

    return (
        <div className={styles.containerA}>
            <div className={styles.sidebarA}>
                <SidebarComponent />
            </div>
            <div className={styles.mainA}>
                <HeaderComponent logo={undefined} />
                <SidetrayleftComponent />
                <SidetrayrightComponent />
            </div>
        </div>
    )
}
