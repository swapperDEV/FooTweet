import React, {useState} from 'react'
const UserProfile = () => {
    const [userData, setUserData] = useState({})
    const updateUserData = (data:object) => {
        setUserData(data)
    }
    return (
        <>
            another user
        </>
    )
}
export default UserProfile;