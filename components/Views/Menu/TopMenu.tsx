import React, { useContext, useRef } from "react";
import menuStyles from "./topmenu.module.scss";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { UserDataContext } from "../../../store/userData-context";
import Router from "next/router";
import { FirebaseContext } from "../../../store/firebase-context";

export const TopMenu = () => {
  const fbCtx = useContext(FirebaseContext);
  const userCtx = useContext(UserDataContext);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchByKeyWords = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (searchRef.current) {
        if (searchRef.current.value.length >= 1) {
          Router.push(`/search/${searchRef.current.value}`);
        }
      }
    }
  };
  const redirectToProfile = () => {
    Router.push(`/profile`);
  };
  const redirectToHelp = () => {
    Router.push(`/help`);
  };
  const redirectToAbout = () => {
    Router.push(`/about`);
  };
  return (
    <div className={menuStyles.menu}>
      <div className={menuStyles.left}>
        <p onClick={() => redirectToAbout()}>About</p>
        <p className={menuStyles.help} onClick={() => redirectToHelp()}>
          Help
        </p>
      </div>
      <div className={menuStyles.center}>
        <div>
          <FaSearch />
          <input
            ref={searchRef}
            onKeyDown={searchByKeyWords}
            placeholder="Search on FooTweet"
          />
        </div>
      </div>
      <div className={menuStyles.right}>
        <div
          className={menuStyles.userBaner}
          onClick={() => redirectToProfile()}
        >
          <div className={menuStyles.userBanerR}>
            <div className={menuStyles.userBanerRT}>
              Hey, {userCtx.data.username}!
            </div>
          </div>
          <div className={menuStyles.userBanerL}>
            <img src={userCtx.avatar} />
          </div>
        </div>
      </div>
    </div>
  );
};
