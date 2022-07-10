import React from "react";
import { Wrapper } from "../Wrapper/Wrapper";
import helpStyle from "./help.module.scss";
import Image from "next/image";
import Router from "next/router";
import Logo from "../../assets/logo.png";
export const Help = () => {
  const redirectBack = () => {
    Router.push("/");
  };
  return (
    <>
      <Wrapper>
        <div className={helpStyle.wrapper}>
          <div className={helpStyle.leftSide}>
            <Image src={Logo} width="150" height="150" />
            <p className={helpStyle.bigText}>
              Need help<a>.</a>
            </p>
            <p className={helpStyle.smallText}>
              You found something like <a>bug?</a>
            </p>
            <p>
              Our portal is open-source so you can <a>report issue</a> on{" "}
              <a
                href={"https://github.com/swapperDEV/FooTweet/issues"}
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </a>
            </p>
            <div>
              <button onClick={() => redirectBack()}>Back to portal</button>
            </div>
          </div>
          <div className={helpStyle.rightSide}>
            <div className={helpStyle.copy}>
              <p>
                <span dangerouslySetInnerHTML={{ __html: "&copy;" }} /> Wiktor
                Maciążek
              </p>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};
