import React, { Ref, useRef } from 'react'
import viewStyles from '../../styles/view.module.scss'
import searchStyle from './searchview.module.scss'
import Router from 'next/router'
import { Fade } from 'react-awesome-reveal'
const SearchView = () => {
    const searchRef = useRef<HTMLInputElement>(null)
    const searchByKeyWords = (e:KeyboardEvent) => {  
        if(e.key === 'Enter') {
            if(searchRef.current) {
                if(searchRef.current.value.length >= 1) {
                    Router.push(`/search/${searchRef.current.value}`)
                }
            }
        }
    }
    return (
        <Fade>
            <div className={viewStyles.searchContainer}>
                <div className={searchStyle.container}>
                    <p>Search on Footweet by Keywords</p>
                    <input ref={searchRef} onKeyDown={(event:any) => searchByKeyWords(event)} placeholder="type word"/>
                </div>
            </div>
        </Fade>
    )
}
export default SearchView;