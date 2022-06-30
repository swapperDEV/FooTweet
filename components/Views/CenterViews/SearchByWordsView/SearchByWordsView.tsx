import React from 'react'
import {SearchByWords} from './SearchByWords'
import viewStyles from '../../styles/view.module.scss'
export const SearchByWordsView = () => {
    return (
        <>
            <div className={viewStyles.posts}>
                <SearchByWords/>
            </div>
        </>
    )
}
