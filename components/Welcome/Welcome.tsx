import React from 'react'
import welcomeStyle from './welcome.module.scss'
import Image from 'next/image'
import logo from '../../assets/logo.png'
import Router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight} from '@fortawesome/free-solid-svg-icons'

const Welcome = () => {
    const signupRedirect = () => {
        Router.push('/signup')
    }
    const loginRedirect = () => {
        Router.push('/login')
    }
    return (
        <div className={welcomeStyle.wrapper}>
            <div className={welcomeStyle.wrapperTwo}>
                <div className={welcomeStyle.leftSide}>
                </div>
                <div className={welcomeStyle.rightSide}>
                    <div className={welcomeStyle.logo}>
                        <Image
                        src={logo}
                        alt="photo logo"
                        width="150px"
                        height="150px"
                        />
                    </div>
                    <div className={welcomeStyle.text}>
                        The best news from<br/> football world  <FontAwesomeIcon icon={faNewspaper} />
                    </div>
                    <div className={welcomeStyle.enter}>
                        Join to us.
                    </div>
                    <div className={welcomeStyle.buttonWrapper}>
                        <button onClick={() => signupRedirect()} className={welcomeStyle.button}>Signup <FontAwesomeIcon icon={faAngleRight} /></button>
                    </div>

                    <div className={welcomeStyle.loginWrapper}>
                        Have account? <br/>
                        <button onClick={() => loginRedirect()} className={welcomeStyle.buttonMini}>Login <FontAwesomeIcon icon={faAngleRight} /></button>
                    </div>
                </div>
            </div>
            <p className={welcomeStyle.copy}><span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> Wiktor Maciążek</p>
        </div>
    )
}

//na login i signup ikonka przekierowuje do welcome oraz animacja ikonki na welcome i ikonki na welcome 

export default Welcome;