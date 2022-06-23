import React, { MouseEvent } from 'react'
import signupStyle from './signup.module.scss'
import { useRef, useContext, useState} from 'react'
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { FirebaseContext } from '../../store/firebase-context'
import { useEffect } from 'react'
import Router from 'next/dist/client/router'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../assets/logo.png'
import Wrapper from '../Wrapper/Wrapper'
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore'
import { Fade } from 'react-awesome-reveal'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupComponent = () => {
    const FirebaseCtx = useContext(FirebaseContext)
    const { auth, app, currentUser, database} = FirebaseCtx
    const emailRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmRef = useRef<HTMLInputElement>(null)
    const usernameRef= useRef<HTMLInputElement>(null)
    const [allUsers, setAllUsers]:Array<any> = useState([])
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

    const submitSignup = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        let emailValue = emailRef.current!.value
        let usernameValue = usernameRef.current!.value
        let nameValue = nameRef.current!.value
        let passwordValue
        if(passwordRef.current!.value === passwordConfirmRef.current!.value) {
            passwordValue = passwordRef.current!.value
            if(passwordValue.length >= 7) {
                if(usernameValue.length >= 7) {
                    if(nameValue.length >= 5) {
                        if(allUsers.usersList.includes(usernameValue)) {
                            toast.error('This username is taken!', options);
                        } else {
                            createUserWithEmailAndPassword(auth, emailValue, passwordValue).then((userCredential) => {
                                FirebaseCtx.setRegisterData(emailValue, usernameValue, nameValue)
                                const list = allUsers.usersList 
                                list.push(usernameValue)
                                const db = getFirestore()
                                setDoc(doc(db, "app", `allusers`), {
                                    usersList: list
                                });
                                const user = userCredential.user;
                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                if(errorCode === 'auth/email-already-in-use') {
                                    toast.error('Email is already in use!', options);
                                }
                            });
                        }
                    } else {
                        toast.error('Type name & surname!', options);
                    }
                } else {
                    toast.error('Username should have 7 characters!', options);
                }
            } else {
                toast.error('Password should have 7 characters!', options);
            }
        } else {
            toast.error('Password doesnt match!', options);
        }
    }
    const redirectWelcome = () => {
        Router.push('/welcome')
    }
    useEffect(() => {
        const db = getFirestore();
            getDoc(doc(db, "app/allusers")).then((snapshot) => {
            if (snapshot.exists()) {
                setAllUsers(snapshot.data())
            }
        })
    },[])
    return (
        <>
        <Wrapper>
        <div className={signupStyle.wrapper}>
            <div className={signupStyle.leftSide}>
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
                <div className={signupStyle.top}>
                    <div className={signupStyle.img}>
                        <Image
                        src={logo}
                        onClick={() => redirectWelcome()}
                        alt="photo logo"
                        width="80px"
                        height="80px"
                        /> 
                    </div>   
                    <p className={signupStyle.join}>Join to us.</p>
                    <p>Create a account<a>.</a> </p>  
                    <a className={signupStyle.login}>Already have account?<b className={signupStyle.loginBtn}><Link href='/login'>Login</Link></b></a>    
                </div>
                <div className={signupStyle.bottom}>
                <form>
                    <div>
                        <div className={signupStyle.formColumn}>
                            <label>Username</label>
                            <input type="text" ref={usernameRef} required/>
                        </div>
                        <div className={signupStyle.formColumn}>
                            <label>Name & Surname</label>
                            <input type="text" ref={nameRef} required/>
                        </div>
                    </div>
                    <div>
                        <div className={signupStyle.formColumn}>
                            <label>Email</label>
                            <input type="email" ref={emailRef} required/>
                        </div>
                    </div>
                    <div>
                        <div className={signupStyle.formColumn}>
                            <label>Password</label>
                            <input type="password" ref={passwordRef} required/>
                        </div>
                        <div className={signupStyle.formColumn}>
                            <label>Confirm Password</label>
                            <input type="password" ref={passwordConfirmRef} required/>
                        </div>
                    </div>
                    <div className={signupStyle.button}>
                        <button onClick={submitSignup} className={signupStyle.submit}>Submit</button>
                    </div>
                </form>
                </div>
            </div>
            <div className={signupStyle.rightSide}>
                <div className={signupStyle.copy}>
                    <p><span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> Wiktor Maciążek</p>
                </div>
            </div>
        </div>
    </Wrapper>    
    </>
    )
}
export default SignupComponent;
