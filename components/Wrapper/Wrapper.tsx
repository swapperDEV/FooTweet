import React from 'react'
import wrapper from './wrapperr.module.scss'
const Wrapper = (props:any) => {
    return (
        <div className={wrapper.background}>
            {props.children}
        </div>
    )
}
export default Wrapper;