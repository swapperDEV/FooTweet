import React, {useState} from 'react'
import profileStyles from './userprofile.module.scss'
import {ProfileDescription} from '../ProfileComponent/YourProfileDescription/ProfileDescription'
import {UserPosts} from '../ProfileComponent/UserPosts/UserPosts'
import {Followed} from '../ProfileComponent/Followed/Followed'
export const UserProfile = () => {
    const [userData, setUserData]:Array<any> = useState({})
    const [sectionType, changeSection] = useState('tweets')
    const updateUserData = (data:object) => {
        setUserData(data)
    }
    const updateSection = (section:string) => {
        changeSection(section)
    }
    console.log(userData);
    return (
        <div className={profileStyles.wrapper}>
            <div className={profileStyles.sectionFirst}>
                <ProfileDescription updateUserData={updateUserData} sectionType={sectionType} updateSection={updateSection}/> 
            </div>
            <div className={profileStyles.sectionSecond}>
                {sectionType === 'tweets' && <UserPosts userData={userData} id={userData.uid}/>}
                {sectionType === 'followed' && <Followed followedUsers={userData.following} id={userData.uid} yourUsername={userData.username}/>}
            </div>
        </div>
    )
}
