import React from 'react'
import {Home} from './Home'
import Hashtags from '../../../Hashtags/Hashtags'
import viewStyles from '../../styles/view.module.scss'
export const HomeView = () => {
    return (
        <>
        <div className={viewStyles.cover}>
        </div>
        <div className={viewStyles.posts}>
            <Home/>
        </div>
        <div className={viewStyles.hashtag}>
            <Hashtags/>
        </div>     
        </>
    )
}
