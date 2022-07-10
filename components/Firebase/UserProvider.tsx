import React from "react";
import { UserDataContext } from "../../store/userData-context";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../hooks/useUser";

interface IUserProps {
  children: JSX.Element;
}
export const UserProvider = ({ children }: IUserProps) => {
  const { userData, userAvatar, getAvatar, clearData } = useUser();

  return (
    <>
      <UserDataContext.Provider
        value={{
          data: userData,
          avatar: userAvatar,
          getAvatar: () => getAvatar(),
          clearData: () => clearData(),
        }}
      >
        {children}
      </UserDataContext.Provider>
    </>
  );
};
