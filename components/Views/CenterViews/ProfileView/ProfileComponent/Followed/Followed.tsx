import React from 'react'
import followedStyles from './followed.module.scss'
import Suggestions from '../Suggestions/Suggestions'
type followedProps = {
    followedUsers: Array<String>,
    id: String
}
const Followed = ({followedUsers, id}:followedProps) => {
    console.log(followedUsers);
    return (
        <div className={followedStyles.wrapper}>
            <div>
                {followedUsers.map((user, index) => {
                return (
                    <div key={index}>
                        {user}
                    </div>
                )
                })}
            </div>
            <Suggestions followedUsers={followedUsers} id={id}/>
        </div>
    )
}
export default Followed