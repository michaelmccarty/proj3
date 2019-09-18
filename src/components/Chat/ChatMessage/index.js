import React from 'react';
import './style.css';

function ChatMessage({userName, time, message}) {
    return (
        <div className="chat-message-container m-2">
            <div className="chat-avatar-wrapper">
                <img src="https://via.placeholder.com/200" className="chat-avatar" />
            </div>
            <div className="chat-message-content ml-2">
                <div className="mb-2">
                    <span>{userName} <span>{time}</span></span>
                </div>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default ChatMessage;