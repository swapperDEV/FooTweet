import React, {useState} from 'react'
import ProfileDescription from '../ProfileComponent/ProfileDescription/ProfileDescription';
import Suggestions from '../ProfileComponent/Suggestions/Suggestions';
import UserPosts from '../ProfileComponent/UserPosts/UserPosts';
import profileStyles from './yourprofile.module.scss'
const YourProfile = () => {
    const [userData, setUserData]:any = useState({})
    const updateUserData = (data:object) => {
        setUserData(data)
    }
    return (
        <div className={profileStyles.wrapper}>
            <div className={profileStyles.firstCover}></div>
            <div className={profileStyles.sectionFirst}>
                <ProfileDescription updateUserData={updateUserData}/>
            </div>
            <div className={profileStyles.sectionSecond}>
                <UserPosts userData={userData}/>
            </div>
        </div>
    )
}
export default YourProfile;