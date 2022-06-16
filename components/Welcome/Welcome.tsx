import React from 'react'
import welcomeStyle from './welcome.module.scss'
import Image from 'next/image'
import logo from '../../assets/logo.png'
import Router from 'next/router'
import Wrapper from '../Wrapper/Wrapper'
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaInstagram} from "@react-icons/all-files/fa/FaInstagram";
import { Fade } from 'react-awesome-reveal'

const Welcome = () => {
    const signupRedirect = () => {
        Router.push('/signup')
    }
    const loginRedirect = () => {
        Router.push('/login')
    }
    return (
    <Wrapper>
        <div className={welcomeStyle.wrapper}>
            <div className={welcomeStyle.leftSide}>
                <div className={welcomeStyle.top}>
                    <div className={welcomeStyle.img}>
                        <Image
                        src={logo}
                        alt="photo logo"
                        width="80px"
                        height="80px"
                        /> 
                    </div>   
                    <p>The best news from<br/> football <a>world</a> </p>      
                </div>
                <div className={welcomeStyle.social}>
                    <div className={welcomeStyle.icon}>
                        <FaFacebook/>
                    </div>
                    <div className={welcomeStyle.icon}>
                        <FaInstagram/>
                    </div>
                </div>
                <div className={welcomeStyle.bottom}>
                    <div className={welcomeStyle.enter}>
                        Join to us.
                    </div>
                    <div className={welcomeStyle.buttonWrapper}>
                        <button onClick={() => signupRedirect()} className={welcomeStyle.button}>Signup </button>
                    </div>

                    <div className={welcomeStyle.loginWrapper}>
                        Have account? <br/>
                        <button onClick={() => loginRedirect()} className={welcomeStyle.buttonMini}>Login </button>
                    </div>
                </div>
            </div>
            <div className={welcomeStyle.rightSide}>
                <div className={welcomeStyle.copy}>
                    <p><span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> Wiktor Maciążek</p>
                </div>
            </div>
        </div>
    </Wrapper>
    )
}

export default Welcome;