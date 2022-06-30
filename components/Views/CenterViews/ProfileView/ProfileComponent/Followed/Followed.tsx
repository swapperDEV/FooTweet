import React, {useContext, useEffect, useState} from 'react'
import followedStyles from './followed.module.scss'
import {Suggestions} from '../Suggestions/Suggestions'
import {FollowedUser} from './FollowedUser'
import {unfollowUser} from '../../../../../../functions/unfollowUser'
import { UserDataContext } from '../../../../../../store/userData-context'
type followedProps = {
    followedUsers: Array<string>
    id: any,
    yourUsername: string,
}
export const Followed = ({followedUsers, id, yourUsername}:followedProps) => {
    const userCtx = useContext(UserDataContext)
    const [followedUsersTable, changeFollowedUser] = useState(followedUsers)
    const unFollowUser = async (username:any, uid:any) => {
        unfollowUser(username, uid, followedUsersTable, id, yourUsername).then(value => { 
            changeFollowedUser(value)            
        })
    }
    return (
        <>
        <div className={followedStyles.wrapper}>
        <div className={followedStyles.following}>
            {
                <> { followedUsersTable.length !== 0 ?
                    <>
                    <p className={followedStyles.info}>{userCtx.data.username === yourUsername ?` The users you follow` : `The users followed by ${yourUsername}`}</p>
                    {followedUsersTable.map((user) => {
                    return (
                        <FollowedUser check1={userCtx.data.username} check2={yourUsername} user={user} key={user} unFollowUser={unFollowUser}/>
                    )
                    })} </>
                    : <p>Users dont follow anyone</p>}
                </>
            }
            </div>
            {
            userCtx.data.username === yourUsername && 
            <div className={followedStyles.wrapperRight}>
            <Suggestions followedUsers={followedUsersTable} id={id} yourUsername={yourUsername}/>
            </div>
            }
        </div>
        </>
    )
}
