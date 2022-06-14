import React from 'react'
import Image from 'next/image';
import testAvatar from '../../assets/meta.png'
const Avatar = () => {
    return (
        <>
        <Image
            src={testAvatar}
            alt="photo logo"
            width="50px"
            height="50px"
        />
        </>
    )
}
export default Avatar;