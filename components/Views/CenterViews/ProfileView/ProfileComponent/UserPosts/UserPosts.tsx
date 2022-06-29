import React, { useEffect, useState } from 'react'
import postStyles from './userposts.module.scss'
import {getUserTweets} from '../../../../../../functions/getUserTweets'
import {getUserRetweets} from '../../../../../../functions/getUserRetweets'
import { FaRetweet } from "@react-icons/all-files/fa/FaRetweet";
import Post from '../../../../../Posts/Post'
import Avatar from '../../../../../Avatar/Avatar'
type UserPostProps = {
    userData: any
    id: any
}
const UserPosts = ({userData, id}: UserPostProps) => {
    const [postList, changePostList]:any = useState([]) 
    const [retweetList, changeRetweets]:any = useState([])
    const [actSection, changeSection] = useState('Tweets')
    const handleChangeSection = (when:string) => {
        changeSection(when)
    }
    const getTweets = async () => {
        await getUserTweets(userData.username).then(value => { 
            changePostList(value)
        })
        
    }
    const getRetweets = async () => {
        await getUserRetweets(userData.username).then(value => { 
            changeRetweets(value)
        })
    }
    useEffect(() => {
        if(userData.username) {
            if(actSection === 'Tweets') {
                getTweets()
            } else if(actSection === 'Retweets') {
                getRetweets()
            }
        }
    },[actSection, userData.username])
    return (
        <div className={postStyles.wrapper}>
            <div className={postStyles.postsWrapper}>
            <div className={postStyles.tweetsMenu}>
                <div className={actSection === 'Tweets' ? postStyles.active : postStyles.disactive}>
                    <p onClick={() => handleChangeSection('Tweets')}>Tweets</p>
                </div>
                <div className={actSection === 'Retweets' ? postStyles.active : postStyles.disactive}> 
                    <p onClick={() => handleChangeSection('Retweets')}>Retweets</p>
                </div>
            </div>
            <div>
                {actSection === 'Tweets' && 
                <div>
                    {postList.length > 0 ? postList.map((post:any) => {
                        return (
                            <Post data={{data: post}} type={'short'} key={post.metaData.postId} avatar={true}/>
                        )
                    }) : <p className={postStyles.error}>User dont have posts</p>}                 
                </div>}
                {actSection === 'Retweets' && 
                <div>
                    {retweetList.length !== 0 ? retweetList.map((post:any) => {
                        return (
                            <div className={postStyles.retweet} key={post.metaData.postId}>
                                <div className={postStyles.retweetL}>
                                    <Avatar userID={id}/>
                                </div>
                                <div className={postStyles.retweetR}>
                                    <div className={postStyles.retweetInfo}><FaRetweet/>{userData.name} RETWEETED</div>
                                    <Post data={{data: post}} type={'short'} avatar={false}/>
                                </div>
                            </div>
                        )
                    }) : <p className={postStyles.error}>User dont have retweets</p>}                 
                </div>}
            </div>
            </div>
        </div>
    )
}
export default UserPosts;