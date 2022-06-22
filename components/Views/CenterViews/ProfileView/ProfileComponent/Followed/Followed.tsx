import React, {useContext, useEffect, useState} from 'react'
import followedStyles from './followed.module.scss'
import Suggestions from '../Suggestions/Suggestions'
import FollowedUser from './FollowedUser'
import { getFirestore, doc, getDoc, updateDoc} from 'firebase/firestore'
import { FirebaseContext } from '../../../../../../store/firebase-context'
type followedProps = {
    followedUsers: Array<string>
    id: any,
    yourUsername: string,
}
const Followed = ({followedUsers, id, yourUsername}:followedProps) => {
    const [followedUsersTable, changeFollowedUser] = useState(followedUsers)
    const unFollowUser = async (username:any, uid:any) => {
        const users = followedUsersTable
        let index = users.indexOf(username)
        users.splice(index, 1)
        const db = getFirestore()
        const userRef = doc(db, "users", id);
        const followingUserRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            following: users
        })
        let snap = await getDoc(userRef)
        if(snap.exists()) {
            const data = snap.data()
            const {followers} = data
            let index = followers.indexOf(yourUsername)
            followers.splice(index, 1)
            await updateDoc(followingUserRef, {
                followers: followers
            })
        }
        changeFollowedUser(users)
    }
    return (
        <div className={followedStyles.wrapper}>
            <div className={followedStyles.following}>
                <p className={followedStyles.info}>The users you follow</p>
                {followedUsersTable.map((user) => {
                return (
                    <FollowedUser user={user} key={user} unFollowUser={unFollowUser}/>
                )
                })}
            </div>
            <Suggestions followedUsers={followedUsersTable} id={id}/>
        </div>
    )
}
export default Followed