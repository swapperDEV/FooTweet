import React, {useContext, useEffect, useState} from 'react'
import viewStyles from './styles/view.module.scss'
import Home from './CenterViews/HomeView/Home'
import DesktopMenu from './Menu/DesktopMenu'
import MobileMenu from './Menu/MobileMenu'
import TopMenu from './Menu/TopMenu'
import Hashtags from './CenterViews/HomeView/Hashtags/Hashtags'
import { UserDataContext } from '../../store/userData-context'
import { useRouter } from 'next/router'
import HomeView from './CenterViews/HomeView/HomeView'
import HashtagsView from './CenterViews/HashtagsView/HashtagsView'
import HashtagView from './CenterViews/HashtagView/HashtagView'

const View = (props:any) => {
    const path = useRouter()
    return (
        <div className={viewStyles.page}>
            <div className={viewStyles.sideMenu}>  
                <DesktopMenu/>
            </div>
            <div className={viewStyles.mobileMenu}>
                <MobileMenu/>
            </div>
            <div className={viewStyles.topMenu}>
                <TopMenu/>
            </div>
            <div className={viewStyles.content}>
                <div className={viewStyles.background}></div>
                    {path.pathname === '/home' && <HomeView/>}
                    {path.pathname === '/hashtag' && <HashtagView/>}
                    {path.pathname === '/hashtag/[hashtag]' && <HashtagsView/>}
            </div>
        </div>
    )
}

export default View;