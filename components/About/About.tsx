import React from 'react'
import Wrapper from '../Wrapper/Wrapper';
import aboutStyle from './about.module.scss'
const About = () => {
    return (
        <>
        <Wrapper>
            <div className={aboutStyle.wrapper}>
                <div className={aboutStyle.leftSide}>
        
                </div>
                <div className={aboutStyle.rightSide}>
                    <div className={aboutStyle.copy}>
                        <p><span dangerouslySetInnerHTML={{ "__html": "&copy;" }} /> Wiktor Maciążek</p>
                    </div>
                </div>
            </div>
        </Wrapper>    
        </>
    )
}
export default About;