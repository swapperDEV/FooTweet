import React, {useContext, useEffect, useState} from 'react'
import homeStyles from './styles/home.module.scss'
import Home from './CenterViews/HomeView/Home'
import DesktopMenu from './Menu/DesktopMenu'
import MobileMenu from './Menu/MobileMenu'
import TopMenu from './Menu/TopMenu'
import Hashtags from './CenterViews/HomeView/Hashtags/Hashtags'
import { UserDataContext } from '../../store/userData-context'
import { useRouter } from 'next/router'

const HomePage = (props:any) => {
    const path = useRouter()
    const userCtx = useContext(UserDataContext)
    console.log(path.pathname);
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
                <div className={homeStyles.cover}>

                </div>
                <div className={homeStyles.background}></div>
                {path.pathname === '/home' &&    
                <>
                <div className={homeStyles.posts}>
                    <Home/>
                </div>
                <div className={homeStyles.hashtag}>
                    <Hashtags/>
                </div>
                </>             
                }
            </div>
        </div>
    )
}

export default HomePage;