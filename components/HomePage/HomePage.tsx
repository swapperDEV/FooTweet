import React, {useContext, useEffect, useState} from 'react'
import homeStyles from './styles/home.module.scss'
import Home from './CenterViews/HomeView/Home'
import DesktopMenu from './Menu/DesktopMenu'
import { UserDataContext } from '../../store/userData-context'

const HomePage = (props:any) => {
    const userCtx = useContext(UserDataContext)
    const [centerView, changeView] = useState('home')
    return (
    <div className={homeStyles.pageWrapper}>
        <div className={homeStyles.page}>
            <div className={homeStyles.menu}>  
                <DesktopMenu/>
            </div>
            <div className={homeStyles.posts}>
                {centerView === 'home' && <Home actView={centerView}/>}
            </div>
            <div className={homeStyles.hashtag}>
                Hasztag
                {userCtx.data.email}
            </div>
        </div>
    </div>
    )
}

export default HomePage;