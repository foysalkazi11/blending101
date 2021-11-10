import React from 'react';
import { useAuth } from '../auth/auth.component';
import HeaderComponent from '../components/header/Header.component';
import SidebarComponent from '../components/sidebar/Sidebar.component';
import SidetrayleftComponent from '../components/sidetray/sidetrayLeft/SidetrayLeft.component';
import SidetrayrightComponent from '../components/sidetray/sidetrayRight/SidetrayRight.component';
import styles from './container.module.scss';

export default function AContainer(props : any) {

    const {user} = useAuth()
    

    return (
        <div className={styles.containerA}>
            <div className={styles.sidebarA}>
                <SidebarComponent />
            </div>
            <div className={styles.mainA}>
                <HeaderComponent logo="true" />
                <SidetrayleftComponent />
                <SidetrayrightComponent />
            </div>
        </div>
    )
}
