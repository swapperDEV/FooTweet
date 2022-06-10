import React from 'react'
import menuStyles from './desktopmenu.module.scss'
import Image from 'next/image'
import testAvatar from '../../../assets/meta.png'
import logo from '../../../assets/logo.png'
import { FaHome } from "@react-icons/all-files/fa/FaHome"
import { FaBell } from "@react-icons/all-files/fa/FaBell"
import { FaUser } from "@react-icons/all-files/fa/FaUser"
import { FaNewspaper } from "@react-icons/all-files/fa/FaNewspaper";
import { FaMoneyBill } from "@react-icons/all-files/fa/FaMoneyBill";
import { FaTrophy } from "@react-icons/all-files/fa/FaTrophy";

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
                    <li><FaHome/><p>Home</p></li>
                    <li><FaBell/><p>Notifications</p></li>
                    <li><FaUser/><p>Profile</p></li>
                    <li><FaNewspaper/><p>News</p></li>
                    <li><FaMoneyBill/><p>Transfer</p></li>
                    <li><FaTrophy/><p>Leagues</p></li>
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