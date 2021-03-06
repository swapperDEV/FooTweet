import React, { useContext, useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { UserDataContext } from "../../../../store/userData-context";
import viewStyles from "../../styles/view.module.scss";
import messagesStyles from "./messages.module.scss";
import { Conversation } from "./Conversation";

type MessageType = {
  conversation: {
    id: string;
  };
  id: string;
  users: Array<string>;
};
export const MessagesView = () => {
  const userCtx = useContext(UserDataContext);
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const db = getFirestore();
  const searchConversations = async () => {
    const userMessRef = collection(db, "messages");
    const q = query(
      userMessRef,
      where("users", "array-contains-any", [userCtx.data.username])
    );
    const messagesSnapshot = await onSnapshot(q, (data) => {
      const table: Array<MessageType> = [];
      data.forEach((doc) => {
        table.push(doc.data() as MessageType);
      });
      setMessages(table);
    });
  };
  useEffect(() => {
    if (userCtx.data.username) {
      searchConversations();
    }
  }, [userCtx]);
  return (
    <>
      <div className={viewStyles.messagesContainer}>
        <div className={messagesStyles.wrapper}>
          {userCtx.data.username && (
            <>
              {messages.length > 0 ? (
                <>
                  <p className={messagesStyles.title}>Your conversations</p>
                  <ul>
                    {messages.map((conversation) => {
                      return (
                        <Conversation
                          conversation={conversation}
                          key={conversation.id}
                        />
                      );
                    })}
                  </ul>
                </>
              ) : (
                <div>
                  <p className={messagesStyles.title}>
                    You dont have conversation
                  </p>
                  <p>
                    To create new, visit another user profile and send him
                    message.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
