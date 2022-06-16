import React from 'react'
import viewStyles from '../../styles/view.module.scss'
import Hashtags from '../../../Hashtags/Hashtags'
import { Fade } from 'react-awesome-reveal'
const HashtagView = () => {
    return (
        <Fade>
            <div className={viewStyles.hashtagAlone}>
                <Hashtags/>
            </div>     
        </Fade>
    )
}
export default HashtagView;