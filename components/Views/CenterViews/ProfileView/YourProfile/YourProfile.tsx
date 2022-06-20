import React, {useState} from 'react'
import ProfileDescription from '../ProfileComponent/ProfileDescription/ProfileDescription';
import Suggestions from '../ProfileComponent/Suggestions/Suggestions';
import UserPosts from '../ProfileComponent/UserPosts/UserPosts';
import EditProfile from '../ProfileComponent/EditProfile/EditProfile';
import profileStyles from './yourprofile.module.scss'

const YourProfile = () => {
    const [userData, setUserData]:any = useState({})
    const [sectionType, changeSection] = useState('editprofile')
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
                {sectionType === 'tweets' && <UserPosts userData={userData}/>}
                {sectionType === 'editprofile' && <EditProfile/>}
            </div>
        </div>
    )
}
export default YourProfile;