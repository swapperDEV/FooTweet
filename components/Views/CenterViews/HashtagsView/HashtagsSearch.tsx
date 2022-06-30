import React from 'react'
import hashtagsStyles from './hashtagssearch.module.scss'
import Posts from '../../../Posts/PostsMapper';
import { useRouter } from 'next/router';
export const HashtagsSearch = () => {
    const path = useRouter()
    return (
        <>
        <div className={hashtagsStyles.wrapper}>
            <div className={hashtagsStyles.content}>
                <Posts requirements={path.query.hashtag} requirementsType="hashtag"/>
            </div>
        </div>
        </>
    )
}
