import React, {useContext, useState} from 'react'
import ProfileDescription from '../ProfileComponent/YourProfileDescription/ProfileDescription';
import Followed from '../ProfileComponent/Followed/Followed';
import UserPosts from '../ProfileComponent/UserPosts/UserPosts';
import EditProfile from '../ProfileComponent/EditProfile/EditProfile';
import profileStyles from './yourprofile.module.scss'
import { FirebaseContext } from '../../../../../store/firebase-context';

const YourProfile = () => {
    const fbCtx = useContext(FirebaseContext)
    const [userData, setUserData]:Array<any> = useState({})
    const [sectionType, changeSection] = useState('tweets')
    const updateUserData = (data:object) => {
        setUserData(data)
    }
    const updateSection = (section:string) => {
        changeSection(section)
    }
    return (
        <div className={profileStyles.wrapper}>
            <div className={profileStyles.sectionFirst}>
                <ProfileDescription updateUserData={updateUserData} sectionType={sectionType} updateSection={updateSection}/>
            </div>
            <div className={profileStyles.sectionSecond}>
                {sectionType === 'tweets' && <UserPosts userData={userData} id={fbCtx.currentUser.uid}/>}
                {sectionType === 'editprofile' && <EditProfile/>}
                {sectionType === 'friends'}
                {sectionType === 'followed' && <Followed followedUsers={userData.following} id={fbCtx.currentUser.uid} yourUsername={userData.username}/>}
            </div>
        </div>
    )
}
export default YourProfile;