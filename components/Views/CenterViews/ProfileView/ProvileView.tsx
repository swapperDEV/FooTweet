import React, { useContext, useState } from 'react'
import UserProfile from './UserProfile/UserProfile'
import YourProfile from './YourProfile/YourProfile'
import { UserDataContext } from '../../../../store/userData-context'
import { useRouter } from 'next/router'

const ProfileView = () => {
    const path = useRouter()
    const UserCtx = useContext(UserDataContext)
    let anotherUser = false
    if(path.pathname === '/profile/[profile]' && path.query.profile !== UserCtx.data.username) {
        anotherUser = true
    }
    return (
        <>
            {path.query.profile === UserCtx.data.username && <YourProfile/>}
            {path.pathname === "/profile" && <YourProfile/>}
            {anotherUser && <UserProfile/>}
        </>
    )
}
export default ProfileView