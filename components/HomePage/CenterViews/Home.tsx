import React from 'react'
import homeStyles from './home.module.scss'
import Image from 'next/image'
import testAvatar from '../../../assets/meta.png'

const Home = (props:any) => {
    const {actView} = props
    return (
        <div className={homeStyles.wrapper}>
            <p className={homeStyles.actView}>{actView}</p>
            <div className={homeStyles.createPost}>
                <div className={homeStyles.createPostLeft}>
                    <Image
                        src={testAvatar}
                        alt="photo logo"
                        width="80px"
                        height="80px"
                    />
                </div>
                <div className={homeStyles.createPostRight}>
                    <input/>
                    <p>Public</p>
                    <input type="file"/>
                </div>
            </div>
        </div>
    )
}

export default Home;