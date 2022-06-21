import React, { useEffect } from 'react'
const Friends = (props:any) => {
    const {followers, followedUsers} = props
    const table:any = []
    followers.forEach((user:any) => {
        followedUsers.includes(user)
        table.push(user)
    })
    console.log(table, 'friends');
    return (
        <>
            
        </>
    )
}
export default Friends;