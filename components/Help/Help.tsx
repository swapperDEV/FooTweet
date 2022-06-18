import React from 'react'
import Wrapper from '../Wrapper/Wrapper';
import helpStyle from './help.module.scss'
const Help = () => {
    return (
        <>
        <Wrapper>
            <div className={helpStyle.wrapper}>
                <div className={helpStyle.leftSide}>
        
                </div>
                <div className={helpStyle.rightSide}>
                    <div className={helpStyle.copy}>
                        <p><span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> Wiktor Maciążek</p>
                    </div>
                </div>
            </div>
        </Wrapper>    
        </>
    )
}
export default Help;