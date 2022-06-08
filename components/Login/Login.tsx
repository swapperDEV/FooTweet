import React, {useRef, useState, useContext} from 'react'
import login from './login.module.scss'
import { FirebaseContext } from '../../store/firebase-context'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { Router } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/logo.png'


const LoginComponent = () => {
    const FirebaseCtx = useContext(FirebaseContext)
    const [error, setError] = useState('')
    const [resetPass, setResetPass] = useState(false)
    const { auth } = FirebaseCtx
    const emailRef:any = useRef('')
    const passwordRef:any = useRef('')
    const submitLogin = () => {
        let emailValue = emailRef.current.value
        let passwordValue = passwordRef.current.value
        signInWithEmailAndPassword(auth, emailValue, passwordValue).then((userCredential) => {
            const user = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            setError('Invalid.')
        });
    }
    const redirectToSignup = () => {
        //@ts-ignore
        Router.push('/signup')
    }
    const resetPasswordMode = () => {
        setResetPass(!resetPass)
        setError('')
    }
    const resetPassword = () => {
        let emailValue = emailRef.current.value
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
    return (
    <>
    <div className={login.wrapper}>
        <div className={login.card}>
            <div className={login.form}>
                <h2 className={login.top}>
                    <Image
                        src={logo}
                        alt="photo logo"
                        width="90px"
                        height="90px"
                    />
                </h2>
                <form>
                    <div className={login.formColumn}>
                        <label>Email</label>
                        <input type="email" ref={emailRef} required/>
                    </div>
                    {resetPass ? 
                    <>
                    </>
                    : 
                    <>
                        <div className={login.formColumn}>
                            <label>Password</label>
                            <input type="password" ref={passwordRef} required/>
                        </div>
                        <br/>
                    </>
                    }
                    <button onClick={submitBtn} className={login.submit}>{resetPass ? 'Reset' : 'Login'}</button>
                </form>
            </div>
            <div className={login.loginMess}>
                <p className={login.error}>{error}</p>
                {
                    resetPass ?
                    <p>
                    <p className={login.loginBtn} onClick={() => resetPasswordMode()}>Go back</p></p>
                    :
                    <>
                        <div>Forgot a password?
                            <p className={login.loginBtn} onClick={() => resetPasswordMode()}><a>Reset</a></p>
                        </div>
                        <div>
                            Dont have an account?
                            <p className={login.loginBtn}><Link href='/signup'>Signup</Link></p>
                        </div>
                    </>
                }
            </div>
        </div>
    </div>
    </>
    )
}

export default LoginComponent