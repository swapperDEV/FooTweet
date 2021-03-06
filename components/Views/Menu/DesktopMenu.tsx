import React, { useContext, useEffect, useState } from "react";
import menuStyles from "./desktopmenu.module.scss";
import Image from "next/image";
import logo from "../../../assets/logo.png";
import { FaHome } from "@react-icons/all-files/fa/FaHome";
import { FaBell } from "@react-icons/all-files/fa/FaBell";
import { FaUser } from "@react-icons/all-files/fa/FaUser";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { FaFacebookMessenger } from "@react-icons/all-files/fa/FaFacebookMessenger";
import { FaHashtag } from "@react-icons/all-files/fa/FaHashtag";
import { useRouter } from "next/router";
import Router from "next/router";
import { UserDataContext } from "../../../store/userData-context";
import { MessageType } from "../../../types/menu/desktop";

export const DesktopMenu = () => {
  const userCtx = useContext(UserDataContext);
  const [newMessages, changeNewMessages] = useState(0);
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
  const Navigate = (path: String) => {
    Router.push(`/${path}`);
  };
  const logoutAccount = () => {
    Router.push(`/logout`);
  };
  useEffect(() => {
    setNotifyList(userCtx.data.notifications);
    if (userCtx.data.messages) {
      userCtx.data.messages.map((message: MessageType) => {
        let number = newMessages;
        number = number + message.new;
        changeNewMessages(number);
      });
    }
  }, [userCtx]);
  return (
    <div className={menuStyles.container}>
      <div className={menuStyles.logo}>
        <Image src={logo} alt="photo logo" width="70px" height="70px" />
      </div>
      <div className={menuStyles.list}>
        <ul>
          <li
            onClick={() => Navigate("home")}
            className={path.pathname === "/home" ? menuStyles.actView : ""}
          >
            <FaHome />
            <p>Home</p>
          </li>
          <li
            onClick={() => Navigate("hashtag")}
            className={hashtag ? menuStyles.actView : ""}
          >
            <FaHashtag />
            <p>Hashtags</p>
          </li>
          <li
            onClick={() => Navigate("search")}
            className={search ? menuStyles.actView : ""}
          >
            <FaSearch />
            <p>Search</p>
          </li>
          <li
            onClick={() => Navigate("notifications")}
            className={
              path.pathname === "/notifications" ? menuStyles.actView : ""
            }
          >
            <FaBell />
            <p>
              Notifications ({notifyList !== undefined ? notifyList.length : 0})
            </p>
          </li>
          <li
            onClick={() => Navigate("profile")}
            className={profile ? menuStyles.actView : ""}
          >
            <FaUser />
            <p>Profile</p>
          </li>
          <li
            onClick={() => Navigate("messages")}
            className={messages ? menuStyles.actView : ""}
          >
            <FaFacebookMessenger />
            <p>Messages ({newMessages})</p>
          </li>
        </ul>
      </div>
      <div className={menuStyles.twtButtonWrapper}>
        <button
          className={menuStyles.twtButton}
          onClick={() => logoutAccount()}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
