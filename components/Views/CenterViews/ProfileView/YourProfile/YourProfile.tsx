import React from 'react'
import ProfileDescription from '../ProfileComponent/ProfileDescription/ProfileDescription';
import Suggestions from '../ProfileComponent/Suggestions/Suggestions';
import UserPosts from '../ProfileComponent/UserPosts/UserPosts';
import profileStyles from './yourprofile.module.scss'
const YourProfile = () => {
    return (
        <div className={profileStyles.wrapper}>
            <div className={profileStyles.sectionFirst}>
                <ProfileDescription/>
            </div>
            <div className={profileStyles.sectionSecond}>
                <UserPosts/>
            </div>
            <div className={profileStyles.sectionThird}>
                <Suggestions/>
            </div>
        </div>
    )
}
export default YourProfile;