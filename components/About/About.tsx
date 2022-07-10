import React from "react";
import { Wrapper } from "../Wrapper/Wrapper";
import aboutStyle from "./about.module.scss";
import Image from "next/image";
import Router from "next/router";
import Logo from "../../assets/logo.png";
export const About = () => {
  const redirectBack = () => {
    Router.push("/");
  };
  return (
    <>
      <Wrapper>
        <div className={aboutStyle.wrapper}>
          <div className={aboutStyle.leftSide}>
            <Image src={Logo} width="150" height="150" />
            <p className={aboutStyle.bigText}>
              About <a>us</a>
            </p>
            <p className={aboutStyle.smallText}>
              We try to put all soccer fans to <br />
              one <a>social media</a> portal.
            </p>
            <div>
              <div>
                <p>+100</p>
                <a>users</a>
              </div>
              <div className={aboutStyle.statsCenter}>
                <p>+50</p>
                <a>posts</a>
              </div>
              <div>
                <p>1 month</p>
                <a>activity</a>
              </div>
            </div>
            <div>
              <button onClick={redirectBack}>Back to portal</button>
            </div>
          </div>
          <div className={aboutStyle.rightSide}>
            <div className={aboutStyle.copy}>
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
