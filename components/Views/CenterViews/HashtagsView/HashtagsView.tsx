import React from 'react'
import Hashtags from '../../../Hashtags/Hashtags';
import {HashtagsSearch} from './HashtagsSearch';
import viewStyles from '../../styles/view.module.scss'
export const HashtagsView = () => {
    return (
        <>
            <div className={viewStyles.cover}>
            </div>
            <div className={viewStyles.posts}>
                <HashtagsSearch/>
            </div>
            <div className={viewStyles.hashtag}>
                <Hashtags/>
            </div>     
        </>
    )
}
