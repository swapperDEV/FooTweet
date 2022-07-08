import React from "react";
import { Rings } from "react-loader-spinner";

export const Loader = () => {
  const loaderStyle = {
    width: "90%",
    height: "90%",
  };
  return (
    <div style={loaderStyle}>
      <Rings color="grey" ariaLabel="loading" />
    </div>
  );
};
