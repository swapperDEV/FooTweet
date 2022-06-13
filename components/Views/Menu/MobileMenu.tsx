import React from 'react'
import mobileStyles from './mobilemenu.module.scss'
import { FaHome } from "@react-icons/all-files/fa/FaHome"
import { FaBell } from "@react-icons/all-files/fa/FaBell"
import { FaUser } from "@react-icons/all-files/fa/FaUser"
import { FaNewspaper } from "@react-icons/all-files/fa/FaNewspaper";
import { FaMoneyBill } from "@react-icons/all-files/fa/FaMoneyBill";
import { FaTrophy } from "@react-icons/all-files/fa/FaTrophy";

const MobileMenu = () => {
    return (
        <div className={mobileStyles.wrapper}>
             <ul>
                    <li className={mobileStyles.active}><FaHome/></li>
                    <li ><FaBell/></li>
                    <li ><FaUser/></li>
                    <li ><FaNewspaper/></li>
                    <li ><FaMoneyBill/></li>
                    <li ><FaTrophy/></li>
                </ul>
        </div>
    )
}

export default MobileMenu