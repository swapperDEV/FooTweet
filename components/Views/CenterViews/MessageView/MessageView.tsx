import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  query,
  where,
  collection,
  getFirestore,
  getDocs,
  doc,
  setDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import viewStyles from "../../styles/view.module.scss";
import messageStyles from "./message.module.scss";
import { getDate } from "../../../../functions/getDate";
import { UserDataContext } from "../../../../store/userData-context";
import { getUserData } from "../../../../functions/getUserData";
import { FaInfo } from "@react-icons/all-files/fa/FaInfo";
import Router from "next/router";
import { Avatar } from "../../../Avatar/Avatar";
import { UserType } from "../../../../types/usertype";

type ConversationOptions = {
  id: string;
  messages: Array<{}>;
};
type TargetUser = UserType;
type MessageType = {
  creator?: string;
  value?: string;
  id?: string;
  new?: number;
};
type Notify = {
  id?: string;
  content?: string;
  from?: string;
};
type NewNotify = {
  id?: string;
  content?: string;
  from?: string;
  new: number;
};

export const MessageView = () => {
  const path = useRouter();
  const messageValue = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLInputElement>(null);
  const [conversation, setConversation] = useState<ConversationOptions | null>(
    null
  );
  const [targetUser, setTargetUser] = useState<TargetUser>({ username: "" });
  const userCtx = useContext(UserDataContext);
  const db = getFirestore();

  const createConversation = async (users: Array<string>) => {
    const newConversation = {
      users: users,
      id: `${users.join()}`,
      messages: [],
    };
    const conversationRef = doc(db, "messages", `${users.join()}`);
    setDoc(conversationRef, newConversation);
    if (userCtx.data.username === users[0]) {
      const target = users[1];
      getUserData(target).then((value) => {
        setTargetUser(value[0]);
      });
    } else {
      const target = users[0];
      getUserData(target).then((value) => {
        setTargetUser(value[0]);
      });
    }
    setConversation(newConversation);

    //add a information about message that user dont read
    users.map((user) => {
      getUserData(user).then((value) => {
        const data = value[0];
        const userRef = doc(db, "users", data.uid);
        const messages = data.messages;
        messages.push({
          id: users.join(),
          new: 0,
        });
        updateDoc(userRef, {
          messages: messages,
        });
      });
    });
  };
  const updateUserViewedMessages = async () => {
    //clearing a information about message that user dont read
    const userRef = doc(db, "users", userCtx.data.uid);
    const messages = userCtx.data.messages;
    if (conversation !== null) {
      messages.map((message: MessageType) => {
        message.id === conversation.id;
        message.new = 0;
      });
      await updateDoc(userRef, {
        messages: messages,
      });
    }
  };
  const messageSearch = async () => {
    const queryUsers = path.query.message;
    if (typeof queryUsers === "string") {
      const users = queryUsers.split("+");
      const messagesRef = collection(db, "messages");
      const q = query(messagesRef, where("users", "array-contains-any", users));
      const messagesSnapshot = await onSnapshot(q, (data) => {
        const table: Array<any> = [];
        data.forEach((doc) => {
          const data = doc.data();
          if (data.users[0] === users[0] && data.users[1] === users[1]) {
            table.push(data);
          } else if (data.users[0] === users[1] && data.users[1] === users[0]) {
            table.push(data);
          }
        });
        if (table.length > 0) {
          setConversation(table[0]);
          if (userCtx.data.username === table[0].users[0]) {
            const target = table[0].users[1];
            getUserData(target).then((value) => {
              setTargetUser(value[0]);
            });
          } else {
            const target = table[0].users[0];
            getUserData(target).then((value) => {
              setTargetUser(value[0]);
            });
          }
          updateUserViewedMessages();
        } else {
          createConversation(users);
        }
      });
    }
  };
  const pushMessage = async () => {
    if (messageValue && conversation && targetUser) {
      const value = messageValue.current!.value;
      if (value.length > 0) {
        const messages = conversation.messages;
        messages.push({
          creator: userCtx.data.username,
          value: value,
          time: getDate(),
        });
        const conversationToPush = conversation;
        conversationToPush.messages = messages;
        await setDoc(doc(db, "messages", conversation.id), conversationToPush);
        messageValue.current!.value = "";
        const newMessages = targetUser.messages;
        if (targetUser.messages) {
          targetUser.messages.map((notify, index) => {
            let number = notify.new;
            if (typeof number === "number") {
              number = number + 1;
              if (notify.id === conversation.id) {
                const message = {
                  id: conversation.id,
                  new: number,
                };
                if (newMessages) {
                  newMessages[index] = message;
                }
              }
            }
          });
        }
        if (targetUser.uid) {
          const userRef = doc(db, "users", targetUser.uid);
          await updateDoc(userRef, {
            messages: newMessages,
          });
        }
      }
    }
  };
  const handlePushMessage = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      pushMessage();
    }
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const redirectToProfile = () => {
    Router.push(`/profile/${targetUser.username}`);
  };
  useEffect(() => {
    let canYouSee = path.query.message;
    if (userCtx.data.username) {
      if (typeof canYouSee === "string") {
        canYouSee = canYouSee.split("+");
        console.log(canYouSee, userCtx.data.username);
        if (canYouSee.includes(userCtx.data.username)) {
          messageSearch();
        } else {
          Router.push("/messages");
        }
      }
    }
  }, [userCtx]);
  useEffect(scrollToBottom, [conversation]);
  return (
    <>
      <div className={viewStyles.messageContainer}>
        <div className={messageStyles.wrapper}>
          <div className={messageStyles.info}>
            {targetUser.uid && <Avatar userID={targetUser.uid} />}
            <p>{targetUser.username}</p>
            <div onClick={() => redirectToProfile()}>
              <FaInfo />
            </div>
          </div>
          <div className={messageStyles.messages}>
            {conversation && (
              <>
                {conversation.messages && (
                  <>
                    {conversation.messages.length > 0 ? (
                      <ul>
                        {conversation!.messages.map(
                          (message: MessageType, index) => {
                            let you;
                            if (message.creator) {
                              you = userCtx.data.username === message.creator;
                            }
                            return (
                              <li
                                className={
                                  you ? messageStyles.right : messageStyles.left
                                }
                                key={index}
                              >
                                <div>
                                  {you ? (
                                    ""
                                  ) : (
                                    <Avatar userID={targetUser.uid} />
                                  )}
                                  <div className={messageStyles.messageValue}>
                                    {message.value}
                                  </div>
                                </div>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    ) : (
                      <p>Send a first message</p>
                    )}
                  </>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={messageStyles.push}>
            <div>
              <input
                onKeyDown={handlePushMessage}
                placeholder="write"
                ref={messageValue}
              />
              <button onClick={() => pushMessage()}>push</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
