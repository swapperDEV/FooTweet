import React, { useState, useContext, useRef } from "react";
import mobileStyles from "./mobilemenu.module.scss";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaBell } from "@react-icons/all-files/fa/FaBell";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { FaFacebookMessenger } from "@react-icons/all-files/fa/FaFacebookMessenger";
import { FaAlignLeft } from "@react-icons/all-files/fa/FaAlignLeft";
import { FaHashtag } from "@react-icons/all-files/fa/FaHashtag";
import { Spin as Hamburger } from "hamburger-react";
import logo from "../../../assets/logo.png";
import Image from "next/image";
import Router from "next/router";
import { useRouter } from "next/router";
import { UserDataContext } from "../../../store/userData-context";

export const MobileMenu = () => {
  const [navDisplay, changeNavDisplay] = useState(false);
  const userCtx = useContext(UserDataContext);
  const searchRef = useRef<HTMLInputElement>(null);
  const [notifyList, setNotifyList] = useState(userCtx.data.notifications);
  let path = useRouter();

  let hashtag = false;
  if (path.pathname === "/hashtag/[hashtag]" || path.pathname === "/hashtag") {
    hashtag = true;
  }
  let search = false;
  if (path.pathname === "/search/[search]" || path.pathname === "/search") {
    search = true;
  }
  let profile = false;
  if (path.pathname === "/profile/[profile]" || path.pathname === "/profile") {
    profile = true;
  }
  let messages = false;
  if (
    path.pathname === "/messages/[message]" ||
    path.pathname === "/messages"
  ) {
    messages = true;
  }
  const navToggle = () => {
    changeNavDisplay(!navDisplay);
  };
  const Navigate = (path: String) => {
    changeNavDisplay(!navDisplay);
    setTimeout(() => {
      Router.push(`/${path}`);
    }, 1000);
  };
  const searchByKeyWords = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (searchRef.current) {
        if (searchRef.current.value.length >= 1) {
          changeNavDisplay(!navDisplay);
          setTimeout(() => {
            Router.push(`/search/${searchRef.current!.value}`);
          }, 1000);
        }
      }
    }
  };
  const logoutAccount = () => {
    Router.push(`/logout`);
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
    <>
      <div className={mobileStyles.wrapper}>
        <div className={mobileStyles.info}>
          <Image src={logo} width="54" height="54" />
          <p>
            Foo<a>Tweet</a>
          </p>
        </div>
        <div className={mobileStyles.hamburger}>
          <section className="hamburgers">
            <Hamburger
              distance="lg"
              size={30}
              toggled={navDisplay}
              toggle={navToggle}
            />
          </section>
        </div>
      </div>
      <div
        className={
          navDisplay
            ? `${mobileStyles.navbar} ${mobileStyles.navbarUnHide}`
            : mobileStyles.navbar
        }
      >
        <div
          className={mobileStyles.userBaner}
          onClick={() => redirectToProfile()}
        >
          <div className={mobileStyles.userBanerR}>
            <div className={mobileStyles.userBanerRT}>
              Hey, <a>{userCtx.data.username}</a>!
            </div>
          </div>
          <div className={mobileStyles.userBanerL}>
            <img src={userCtx.avatar} width="24" height="24" />
          </div>
        </div>
        <div>
          <ul>
            <li
              onClick={() => Navigate("home")}
              className={path.pathname === "/home" ? mobileStyles.active : ""}
            >
              <FaHome />
              <p>Home</p>
            </li>
            <li
              onClick={() => Navigate("hashtag")}
              className={hashtag ? mobileStyles.active : ""}
            >
              <FaHashtag />
              <p>Hashtags</p>
            </li>
            <li
              onClick={() => Navigate("search")}
              className={search ? mobileStyles.active : ""}
            >
              <FaSearch />
              <p>Search</p>
            </li>
            <li
              onClick={() => Navigate("notifications")}
              className={
                path.pathname === "/notifications" ? mobileStyles.active : ""
              }
            >
              <FaBell />
              <p>
                Notifications (
                {notifyList !== undefined ? notifyList.length : 0})
              </p>
            </li>
            <li
              onClick={() => Navigate("profile")}
              className={profile ? mobileStyles.active : ""}
            >
              <FaUser />
              <p>Profile</p>
            </li>
            <li
              onClick={() => Navigate("messages")}
              className={messages ? mobileStyles.actView : ""}
            >
              <FaFacebookMessenger />
              <p>Messages</p>
            </li>
            <li>
              <FaAlignLeft />
              <p onClick={() => logoutAccount()}>Logout</p>
            </li>
          </ul>
          <div className={mobileStyles.buttons}>
            <button onClick={() => redirectToAbout()}>About</button>
            <button onClick={() => redirectToHelp()}>Help</button>
          </div>
        </div>
        <div className={mobileStyles.center}>
          <div>
            <FaSearch />
            <input
              ref={searchRef}
              onKeyDown={searchByKeyWords}
              placeholder="Search on FooTweet"
              maxLength={20}
            />
          </div>
        </div>
      </div>
    </>
  );
};
