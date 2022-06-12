import React from 'react'
import hashtagsStyles from './hashtag.module.scss'
import { FaStream } from "@react-icons/all-files/fa/FaStream";

const Hashtags = () => {
    return (
        <div className={hashtagsStyles.wrapper}>
            <div className={hashtagsStyles.search}>
                <input placeholder="# Search post"/>
                <FaStream/>
            </div>
            <div className={hashtagsStyles.popular}>
                <div>
                    <p>#fcb</p>
                    <b>45 tweets</b>
                </div>
                <div>
                    <p>#ucl</p>
                    <b>5 tweets</b>
                </div>
                <div>
                    <p>#worldcup</p>
                    <b>2 tweets</b>
                </div>
                <p className={hashtagsStyles.more}>SEE MORE</p>
            </div>
        </div>
    )
}
export default Hashtags;