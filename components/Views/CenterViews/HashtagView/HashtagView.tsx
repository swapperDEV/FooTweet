import React from 'react'
import viewStyles from '../../styles/view.module.scss'
import Hashtags from '../HomeView/Hashtags/Hashtags'
const HashtagView = () => {
    return (
        <>
            <div className={viewStyles.hashtagAlone}>
                <Hashtags/>
            </div>     
        </>
    )
}
export default HashtagView;