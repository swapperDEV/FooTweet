import React, {useEffect, useState} from 'react'
import menuStyles from './desktopmenu.module.scss'
import Image from 'next/image'
import logo from '../../../assets/logo.png'
import { FaHome } from "@react-icons/all-files/fa/FaHome"
import { FaBell } from "@react-icons/all-files/fa/FaBell"
import { FaUser } from "@react-icons/all-files/fa/FaUser"
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { FaMoneyBill } from "@react-icons/all-files/fa/FaMoneyBill";
import { FaTrophy } from "@react-icons/all-files/fa/FaTrophy";
import { FaHashtag } from "@react-icons/all-files/fa/FaHashtag";
import { useRouter } from 'next/router'
import Router from 'next/router'

const DesktopMenu = () => {
    let path = useRouter()
    let hashtag = false
    if(path.pathname === '/hashtag/[hashtag]' || path.pathname === '/hashtag') {
        hashtag = true
    }
    let search = false
    if(path.pathname === '/search/[search]' || path.pathname === '/search') {
        search = true
    }
    let profile = false
    if(path.pathname === '/profile/[profile]' || path.pathname === '/profile') {
        profile = true
    }
    const Navigate = (path:String) => {
        Router.push(`/${path}`)
    }
    const logoutAccount = () => {
        Router.push(`/logout`)
    }
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
                    <li onClick={() => Navigate('home')} className={path.pathname === '/home' ? menuStyles.actView : ''}><FaHome/><p>Home</p></li>
                    <li onClick={() => Navigate('hashtag')} className={hashtag ? menuStyles.actView : ''}><FaHashtag/><p>Hashtags</p></li>
                    <li onClick={() => Navigate('search')} className={search ? menuStyles.actView : ''}><FaSearch/><p>Search</p></li>
                    <li className={path.pathname === 'x' ? menuStyles.actView : ''}><FaBell/><p>Notifications</p></li>
                    <li onClick={() => Navigate('profile')} className={profile ? menuStyles.actView : ''}><FaUser/><p>Profile</p></li>
                    <li className={path.pathname === 'x' ? menuStyles.actView : ''}><FaMoneyBill/><p>Transfer</p></li>
                    <li className={path.pathname === 'x' ? menuStyles.actView : ''}><FaTrophy/><p>Leagues</p></li>
                </ul>
            </div>
            <div className={menuStyles.twtButtonWrapper}>
            <button className={menuStyles.twtButton} onClick={() => logoutAccount()}>Logout</button>
            </div>
        </div>
    )
}

export default DesktopMenu;