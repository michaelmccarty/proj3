import React from 'react';

function ChatMessage({userName, time, message}) {
    return (
        <div className="chat-message">
            <div>
                <img src="https://via.placeholder.com/200" className="chat-image" />
            </div>
            <div className="chat-message-content">
                <span>{userName} <span>{time}</span></span>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default ChatMessage;