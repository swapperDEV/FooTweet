import React from 'react'
import signup from './signup.module.scss'
import { useRef, useContext, useState} from 'react'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { FirebaseContext } from '../../store/firebase-context'
import { Router } from 'next/dist/client/router'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/logo.png'

const SignupComponent = () => {
    const FirebaseCtx = useContext(FirebaseContext)
    const { auth, app, currentUser, database} = FirebaseCtx
    const emailRef:any = useRef('')
    const passwordRef:any = useRef('')
    const passwordConfirmRef:any = useRef('')
    const usernameRef:any = useRef('')
    const [error, setError] = useState('')
    
    const submitSignup = (e:any) => {
        e.preventDefault()
        let emailValue = emailRef.current.value
        let usernameValue = usernameRef.current.value
        let passwordValue
        if(passwordRef.current.value === passwordConfirmRef.current.value) {
            passwordValue = passwordRef.current.value
            if(passwordValue.length >= 7) {
            if(usernameValue.length >= 7) {
                createUserWithEmailAndPassword(auth, emailValue, passwordValue).then((userCredential) => {
                    FirebaseCtx.setRegisterData(emailValue, usernameValue)
                    const user = userCredential.user;
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    if(errorCode === 'auth/email-already-in-use') {
                        setError('Email is already in use')
                    }
                });
            } else {
                setError('Username should have 7 characters')
            }
            } else {
                setError('Password should have 7 characters.')
            }
        } else {
            setError("Password didn't match.")
        }
    }
    return (
        <>
        <div className={signup.wrapper}>
            <div className={signup.card}>
                <div className={signup.form}>
                    <h2 className={signup.top}>                
                        <Image
                        src={logo}
                        alt="photo logo"
                        width="90px"
                        height="90px"
                        />
                    </h2>
                    <form>
                        <div className={signup.formColumn}>
                            <label>Username</label>
                            <input type="text" ref={usernameRef} required/>
                        </div>
                        <div className={signup.formColumn}>
                            <label>Email</label>
                            <input type="email" ref={emailRef} required/>
                        </div>
                        <div className={signup.formColumn}>
                            <label>Password</label>
                            <input type="password" ref={passwordRef} required/>
                        </div>
                        <div className={signup.formColumn}>
                            <label>Confirm Password</label>
                            <input type="password" ref={passwordConfirmRef} required/>
                        </div>
                        <div className={signup.logo}>
                            <div className={signup.left}>
                            <button onClick={submitSignup} className={signup.submit}>Submit</button>
                            <div className={signup.loginMess}>
                                <p className={signup.error}>{error}</p>
                                <p>Already have an account?</p>
                                <p className={signup.loginBtn}><Link href='/login'>Login</Link></p>
                            </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
    )
}

export default SignupComponent;
