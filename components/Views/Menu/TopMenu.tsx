import React, { useContext, useRef} from 'react'
import menuStyles from './topmenu.module.scss'
import Image from 'next/image'
import testAvatar from '../../../assets/meta.png'
import { FaSearch } from "@react-icons/all-files/fa/FaSearch"
import { UserDataContext } from '../../../store/userData-context'
import Router from 'next/router'

const TopMenu = () => {
    const userCtx = useContext(UserDataContext)
    const searchRef = useRef<HTMLInputElement>(null)
    const searchByKeyWords = (e:KeyboardEvent) => {  
        if(e.key === 'Enter') {
            if(searchRef.current) {
                if(searchRef.current.value.length >= 1) {
                    Router.push(`/search/${searchRef.current.value}`)
                }
            }
        }
    }
    return (
        <div className={menuStyles.menu}>
            <div className={menuStyles.left}>
                <p>About</p>
                <p className={menuStyles.help}>Help</p>
            </div>
            <div className={menuStyles.center}>
                <div><FaSearch/><input ref={searchRef} onKeyDown={(event:any) => searchByKeyWords(event)} placeholder="Search on FooTweet"/></div>
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