import Router from "next/router";
import React, { useEffect, useState } from "react";
import { getUserData } from "../../../../functions/getUserData";
import { Avatar } from "../../../Avatar/Avatar";
import searchStyles from "./searchwords.module.scss";
interface IFindedUserProps {
  username: string;
}
export const FindedUser = ({ username }: IFindedUserProps) => {
  const [data, setData] = useState({ username: "", uid: "" });
  useEffect(() => {
    getUserData(username).then((value) => {
      setData(value[0]);
    });
  });
  const showProfile = () => {
    Router.push(`/profile/${data.username}`);
  };
  return (
    <div className={searchStyles.user}>
      {data.uid !== "" && <Avatar userID={data.uid} />}
      <p>{data.username}</p>
      <button onClick={() => showProfile()}>Show profile</button>
    </div>
  );
};
