import { useRouter } from "next/router";
import React from "react";
import wrapper from "./wrapperr.module.scss";
type WrapperType = {
  children: JSX.Element;
};
export const Wrapper: React.FC<WrapperType> = ({ children }) => {
  const path = useRouter();
  return (
    <div
      className={
        path.pathname === "/login" ? wrapper.background : wrapper.background2
      }
    >
      {children}
    </div>
  );
};
