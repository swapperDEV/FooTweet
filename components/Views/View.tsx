import React from 'react'
import viewStyles from './styles/view.module.scss'
import {DesktopMenu} from './Menu/DesktopMenu'
import {MobileMenu} from './Menu/MobileMenu'
import {TopMenu} from './Menu/TopMenu'
import { useRouter } from 'next/router'
import {HomeView} from './CenterViews/HomeView/HomeView'
import {HashtagsView} from './CenterViews/HashtagsView/HashtagsView'
import {HashtagView} from './CenterViews/HashtagView/HashtagView'
import {SearchView} from './CenterViews/SearchView/SearchView'
import {SearchByWordsView} from './CenterViews/SearchByWordsView/SearchByWordsView'
import {PostView} from './CenterViews/PostView/PostView'
import {ProfileView} from './CenterViews/ProfileView/ProvileView'
import {NotificationsView} from './CenterViews/NotificationsView/NotificationsView'
import {MessagesView} from './CenterViews/MessagesView/MessagesView'
import {MessageView} from './CenterViews/MessageView/MessageView'

const View = () => {
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
                    {path.pathname === '/post/[postId]' && <PostView/>}
                    {path.pathname === '/hashtag' && <HashtagView/>}
                    {path.pathname === '/hashtag/[hashtag]' && <HashtagsView/>}
                    {path.pathname === '/search' && <SearchView/>}
                    {path.pathname === '/search/[search]' && <SearchByWordsView/>}
                    {path.pathname === '/profile/[profile]' && <ProfileView/>}
                    {path.pathname === '/profile' && <ProfileView/>}
                    {path.pathname === '/notifications' && <NotificationsView/>}
                    {path.pathname === '/messages' && <MessagesView/>}
                    {path.pathname === '/messages/[message]' && <MessageView/>}
            </div>
        </div>
    )
}

export default View;