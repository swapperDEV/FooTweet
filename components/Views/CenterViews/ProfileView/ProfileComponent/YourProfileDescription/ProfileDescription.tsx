import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../../../../../store/userData-context';
import {getUserData} from '../../../../../../functions/getUserData'
import Avatar from '../../../../../Avatar/Avatar';
import pdescriptionStyles from './profiledescription.module.scss'
import { FaLocationArrow } from "@react-icons/all-files/fa/FaLocationArrow";
import { FaEye } from "@react-icons/all-files/fa/FaEye";
import { FaRetweet } from "@react-icons/all-files/fa/FaRetweet";
import { FaUserFriends } from "@react-icons/all-files/fa/FaUserFriends";
import { FaEquals } from "@react-icons/all-files/fa/FaEquals";
import { FirebaseContext } from '../../../../../../store/firebase-context';

type ProfileProps = {
    updateUserData: Function,
    updateSection: Function,
    sectionType: string,
}
const ProfileDescription = ({updateUserData, updateSection, sectionType}: ProfileProps) => {
    const path = useRouter() 
    const UserCtx = useContext(UserDataContext) 
    const fbCtx = useContext(FirebaseContext)
    const [userData, setUserData] = useState({name: '', username: '', bio: '', location: ''})
    const searchData = async (searchingUser:String) => {
        await getUserData(searchingUser).then(value => { 
            setUserData(value[0])
            updateUserData(value[0])
    })}  
    useEffect(() => {
        if(UserCtx.data.username) {
            let searchingUser
            if(path.pathname === "/profile/[profile]") {
                searchingUser = path.query.profile 
            } else if(path.pathname === "/profile") {
                searchingUser = UserCtx.data.username
            }
            searchData(searchingUser)
        }
    },[UserCtx])
    return (
        <div className={pdescriptionStyles.wrapper}>
            <div className={pdescriptionStyles.info}>
                <Avatar userID={fbCtx.currentUser.uid}/>
                <p className={pdescriptionStyles.name}>{userData.name}</p>
                <p className={pdescriptionStyles.username}>@{userData.username}</p>
                <p className={pdescriptionStyles.bio}>{userData.bio}</p>
                <p className={pdescriptionStyles.location}><FaLocationArrow/>{userData.location}</p>
                <div className={pdescriptionStyles.stats}>
                    <div>
                        <p className={pdescriptionStyles.statName}>Tweets</p>
                        <p>0</p>
                    </div>
                    <div className={pdescriptionStyles.centerS}>
                        <p className={pdescriptionStyles.statName}>Followers</p>
                        <p>0</p>
                    </div>
                    <div>
                        <p className={pdescriptionStyles.statName}>Following</p>
                        <p>0</p>
                    </div>
                </div>
            </div>
            <div className={pdescriptionStyles.menu}>
                <div onClick={() => updateSection('tweets')} className={sectionType === 'tweets' ? pdescriptionStyles.activeSection : ''}><FaEye/><p>Tweets</p></div>
                <div onClick={() => updateSection('followed')} className={sectionType === 'followed' ? pdescriptionStyles.activeSection : ''}><FaRetweet/><p>Followed</p></div>
                <div onClick={() => updateSection('friends')} className={sectionType === 'friends' ? pdescriptionStyles.activeSection : ''}><FaUserFriends/><p>Friends</p></div>
                <div onClick={() => updateSection('editprofile')} className={sectionType === 'editprofile' ? pdescriptionStyles.activeSection : ''}><FaEquals/><p>Edit profile</p></div>
            </div>
        </div>
    )
}
export default ProfileDescription;