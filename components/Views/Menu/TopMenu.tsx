import React, { useContext } from 'react'
import menuStyles from './topmenu.module.scss'
import Image from 'next/image'
import testAvatar from '../../../assets/meta.png'
import { FaSearch } from "@react-icons/all-files/fa/FaSearch"
import { UserDataContext } from '../../../store/userData-context'

const TopMenu = () => {
    const userCtx = useContext(UserDataContext)
    console.log(userCtx);
    return (
        <div className={menuStyles.menu}>
            <div className={menuStyles.left}>
                <p>About</p>
                <p className={menuStyles.help}>Help</p>
            </div>
            <div className={menuStyles.center}>
                <div><FaSearch/><input placeholder="Search on FooTweet"/></div>
            </div>
            <div className={menuStyles.right}>
                <div className={menuStyles.userBaner}>
                    <div className={menuStyles.userBanerR}>
                        <div className={menuStyles.userBanerRT}>
                            Hey, {userCtx.data.username}!
                        </div>
                    </div>
                    <div className={menuStyles.userBanerL}>
                        <Image
                            src={testAvatar}
                            alt="photo logo"
                            width="40px"
                            height="40px"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TopMenu;