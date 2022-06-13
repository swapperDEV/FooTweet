import React from 'react'
import hashtagsStyles from './hashtagssearch.module.scss'
import Posts from '../HomeView/Posts/Posts';
import { useRouter } from 'next/router';
const HashtagsSearch = () => {
    const path = useRouter()
    return (
        <>
        <div className={hashtagsStyles.wrapper}>
            <div className={hashtagsStyles.content}>
                <Posts requirements={path.query.hashtag}/>
            </div>
        </div>
        </>
    )
}
export default HashtagsSearch;