import { useRouter } from 'next/router'
import React from 'react'
import wrapper from './wrapperr.module.scss'
const Wrapper = (props:any) => {
    const path = useRouter();
    return (
        <div className={path.pathname === '/login' ? wrapper.background : wrapper.background2}>
            {props.children}
        </div>
    )
}
export default Wrapper;