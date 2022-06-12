import React, {useContext, useEffect, useState} from 'react'
import homeStyles from './styles/home.module.scss'
import Home from './CenterViews/HomeView/Home'
import DesktopMenu from './Menu/DesktopMenu'
import MobileMenu from './Menu/MobileMenu'
import TopMenu from './Menu/TopMenu'
import { UserDataContext } from '../../store/userData-context'

const HomePage = (props:any) => {
    const userCtx = useContext(UserDataContext)
    const [centerView, changeView] = useState('home')
    return (
        <div className={homeStyles.page}>
            <div className={homeStyles.sideMenu}>  
                <DesktopMenu/>
            </div>
            <div className={homeStyles.mobileMenu}>
                <MobileMenu/>
            </div>
            <div className={homeStyles.topMenu}>
                <TopMenu/>
            </div>
            <div className={homeStyles.content}>
                <div className={homeStyles.background}></div>
                <div className={homeStyles.posts}>
                    {centerView === 'home' && <Home actView={centerView}/>}
                </div>
                <div className={homeStyles.hashtag}>
                    Hasztag
                </div>
            </div>
        </div>
    )
}

export default HomePage;