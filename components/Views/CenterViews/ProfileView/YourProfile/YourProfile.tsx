import React, {useContext, useState} from 'react'
import ProfileDescription from '../ProfileComponent/YourProfileDescription/ProfileDescription';
import Followed from '../ProfileComponent/Followed/Followed';
import UserPosts from '../ProfileComponent/UserPosts/UserPosts';
import EditProfile from '../ProfileComponent/EditProfile/EditProfile';
import profileStyles from './yourprofile.module.scss'
import { FirebaseContext } from '../../../../../store/firebase-context';
import Friends from '../ProfileComponent/Friends/Friends';

const YourProfile = () => {
    const fbCtx = useContext(FirebaseContext)
    const [userData, setUserData]:any = useState({})
    const [sectionType, changeSection] = useState('editprofile')
    console.log('sss', userData);
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
                {sectionType === 'friends' && <Friends followedUsers={userData.following} followers={userData.followers}/>}
                {sectionType === 'followed' && <Followed followedUsers={userData.following} id={fbCtx.currentUser.uid}/>}
            </div>
        </div>
    )
}
export default YourProfile;