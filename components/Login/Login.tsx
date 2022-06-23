import React, {useRef, useState, useContext} from 'react'
import loginStyle from './login.module.scss'
import { FirebaseContext } from '../../store/firebase-context'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import Router from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/logo.png'
import Wrapper from '../Wrapper/Wrapper'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const options:Object = {
    position: "top-right",
    theme: 'dark',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

const LoginComponent = () => {
    const FirebaseCtx = useContext(FirebaseContext)
    const [error, setError] = useState('')
    const [resetPass, setResetPass] = useState(false)
    const { auth } = FirebaseCtx
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const submitLogin = () => {
        let emailValue = emailRef.current!.value
        let passwordValue = passwordRef.current!.value
        signInWithEmailAndPassword(auth, emailValue, passwordValue).then((userCredential) => {
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            toast.error('Invalid!', options);
        });
    }
    const resetPasswordMode = () => {
        setResetPass(!resetPass)
        setError('')
    }
    const resetPassword = () => {
        let emailValue = emailRef.current!.value
        sendPasswordResetEmail(auth, emailValue)
            .then(() => {
                setError('Check inbox for instructions about reseting')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }
    const submitBtn = (e:any) => {
        e.preventDefault()
        if(resetPass) {
            resetPassword()
        } else {
            submitLogin()
        }
    }
    const redirectWelcome = () => {
        Router.push('/welcome')
    }
    return (
        <>
        <Wrapper>
        <div className={loginStyle.wrapper}>
            <div className={loginStyle.leftSide}>
                <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
                <div className={loginStyle.top}>
                    <div className={loginStyle.img}>
                        <Image
                        src={logo}
                        alt="photo logo"
                        onClick={() => redirectWelcome()}
                        width="80px"
                        height="80px"
                        /> 
                    </div>   
                    <p className={loginStyle.join}>Welcome back!</p>
                    <p>Login to your acc<a>.</a> </p>  
                    <a className={loginStyle.login}>You dont have account?<b className={loginStyle.loginBtn}><Link href='/signup'>Signup</Link></b></a>    
                </div>
                <div className={loginStyle.bottom}>
                <form>
                    <div>
                        <div className={loginStyle.formColumn}>
                            <label>Email</label>
                            <input type="email" ref={emailRef} required/>
                        </div>
                    </div>
                    <div>
                    {resetPass ? 
                    <>
                    </>
                    : 
                    <>
                        <div className={loginStyle.formColumn}>
                            <label>Password</label>
                            <input type="password" ref={passwordRef} required/>
                        </div>
                        <br/>
                    </>
                    }
                    </div>
                    <div className={loginStyle.bottomInfo}>
                        <button onClick={submitBtn} className={loginStyle.button}>{resetPass ? 'Reset' : 'Login'}</button>
                    {
                        resetPass ?
                        <p className={loginStyle.loginBtn} onClick={() => resetPasswordMode()}><a className={loginStyle.backButton}>Go back</a></p>
                        :
                        <>
                        <div>Forgot your password?
                            <p className={loginStyle.loginBtn} onClick={() => resetPasswordMode()}><a> Reset</a></p>
                        </div>
                        </>
                    }
                    </div>
                </form>
                </div>
            </div>
            <div className={loginStyle.rightSide}>
                <div className={loginStyle.copy}>
                    <p><span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> Wiktor Maciążek</p>
                </div>
            </div>
        </div>
    </Wrapper>    
    </>
    )
}
export default LoginComponent
