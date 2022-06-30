import React, { Ref, useRef } from 'react'
import viewStyles from '../../styles/view.module.scss'
import searchStyle from './searchview.module.scss'
import Router from 'next/router'
import Image from 'next/image';
import offer from '../../../../assets/offer.svg'
export const SearchView = () => {
    const searchRef = useRef<HTMLInputElement>(null)
    const searchByKeyWords = (e: React.KeyboardEvent<HTMLInputElement>) => {  
        if(e.key === 'Enter') {
            if(searchRef.current) {
                if(searchRef.current.value.length >= 1) {
                    Router.push(`/search/${searchRef.current.value}`)
                }
            }
        }
    }
    return (
        <div className={viewStyles.searchContainer}>
            <div className={searchStyle.container}>
                <p>Search on Footweet by Keywords</p>
                <input ref={searchRef} onKeyDown={searchByKeyWords} placeholder="type word"/>
                <Image
                    src={offer}
                    alt="photo logo"
                    width="200px"
                    height="200px"
                />
            </div>
        </div>
    )
}
