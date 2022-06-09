import React from 'react'
import menuStyles from './desktopmenu.module.scss'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome} from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import testAvatar from '../../../assets/meta.png'
import logo from '../../../assets/logo.png'

const DesktopMenu = () => {
    return (
        <div className={menuStyles.container}>
            <div className={menuStyles.logo}>
                <Image
                    src={logo}
                    alt="photo logo"
                    width="90px"
                    height="90px"
                />
            </div>
            <div className={menuStyles.list}>
                <ul>
                    <li><FontAwesomeIcon icon={faHome} /><p>Home</p></li>
                    <li><FontAwesomeIcon icon={faBell} /><p>Notifications</p></li>
                    <li><FontAwesomeIcon icon={faUser} /><p>Profile</p></li>
                    <li><FontAwesomeIcon icon={faNewspaper} /><p>News</p></li>
                    <li><FontAwesomeIcon icon={faMoneyBill} /><p>Transfer</p></li>
                    <li><FontAwesomeIcon icon={faUserGroup} /><p>Leagues</p></li>
                    <li><button className={menuStyles.twtButton}>Tweet</button></li>
                </ul>
            </div>
            <div className={menuStyles.cover}></div>
            <div className={menuStyles.userBaner}>
                <div className={menuStyles.userBanerL}>
                    <Image
                        src={testAvatar}
                        alt="photo logo"
                        width="40px"
                        height="40px"
                    />
                </div>
                <div className={menuStyles.userBanerR}>
                    <div className={menuStyles.userBanerRT}>
                        wiktortest
                    </div>
                    <div className={menuStyles.userBanerRB}>
                        @asdasdsda
                    </div>
                </div>
                <div className={menuStyles.userBanerOptions}>
                    ...
                </div>
            </div>
        </div>
    )
}

export default DesktopMenu;