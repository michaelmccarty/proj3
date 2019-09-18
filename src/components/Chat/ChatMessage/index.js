import React from 'react';
import styles from './ChatMessage.module.css';
import moment from 'moment';

function ChatMessage({userName, time, message}) {
    return (
        <div className={styles["chat-message-container"]}>
            <div className={styles["chat-avatar-wrapper"]}>
                <img src="https://via.placeholder.com/200" alt="Chat Avatar" className={styles["chat-avatar"]} />
            </div>
            <div className="chat-message-content ml-2">
                <div className="chat-message-info mb-2">
                    <span>{userName} <span>{moment(time).from(Date.now())}</span></span>
                </div>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default ChatMessage;