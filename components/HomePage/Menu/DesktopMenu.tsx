import React, {useState} from 'react'
import menuStyles from './desktopmenu.module.scss'
import Image from 'next/image'
import logo from '../../../assets/logo.png'
import { FaHome } from "@react-icons/all-files/fa/FaHome"
import { FaBell } from "@react-icons/all-files/fa/FaBell"
import { FaUser } from "@react-icons/all-files/fa/FaUser"
import { FaNewspaper } from "@react-icons/all-files/fa/FaNewspaper";
import { FaMoneyBill } from "@react-icons/all-files/fa/FaMoneyBill";
import { FaTrophy } from "@react-icons/all-files/fa/FaTrophy";

const DesktopMenu = () => {
    const [actView, changeView] = useState('home')
    return (
        <div className={menuStyles.container}>
            <div className={menuStyles.logo}>
                <Image
                    src={logo}
                    alt="photo logo"
                    width="70px"
                    height="70px"
                />
            </div>
            <div className={menuStyles.list}>
                <ul>
                    <li className={actView === 'home' ? menuStyles.actView : ''}><FaHome/><p>Home</p></li>
                    <li className={actView === 'x' ? menuStyles.actView : ''}><FaBell/><p>Notifications</p></li>
                    <li className={actView === 'x' ? menuStyles.actView : ''}><FaUser/><p>Profile</p></li>
                    <li className={actView === 'x' ? menuStyles.actView : ''}><FaNewspaper/><p>News</p></li>
                    <li className={actView === 'x' ? menuStyles.actView : ''}><FaMoneyBill/><p>Transfer</p></li>
                    <li className={actView === 'x' ? menuStyles.actView : ''}><FaTrophy/><p>Leagues</p></li>
                </ul>
            </div>
            <div className={menuStyles.twtButtonWrapper}>
            <button className={menuStyles.twtButton}>Tweet</button>
            </div>
        </div>
    )
}

export default DesktopMenu;