import React, {useState} from 'react'
import homeStyles from './styles/home.module.scss'
import Home from './CenterViews/Home'
import DesktopMenu from './Menu/DesktopMenu'
const HomePage = () => {
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
            <div>
                Hasztag
            </div>
        </div>
    </div>
    )
}

export default HomePage;