import React from 'react';
import ChatMessage from './ChatMessage';
import './style.css';

class ChatBox extends React.Component {
    state = {
        usersOnline: [
            {
                userName: "Username123",
                avatarImg: "https://via.placeholder.com/100",
                socketId: ""
            }
        ],
        messages: [
            {
                userName: "Username123",
                time: Date.now(),
                message: "Here's my message to the chat box."
            },
            {
                userName: "Username1234",
                time: Date.now(),
                message: "Here's my message to the chat box."
            },
            {
                userName: "Username1234",
                time: Date.now(),
                message: "Here's my message to the chat box."
            },
            {
                userName: "Username1234",
                time: Date.now(),
                message: "Here's my message to the chat box."
            },
            {
                userName: "Username1234",
                time: Date.now(),
                message: "Here's my message to the chat box."
            }
            
        ]
    }

    render() {
        return (
            <div className="chatbox h-100 flx flx-row">
                <div className="online-users">
                    Online users here
                </div>
                <div className="chat-wrapper flx-grow-1">
                    <div className="chat-messages">
                        {this.state.messages.map(({userName, time, message}, i) =>     
                            <ChatMessage key={i} userName={userName} time={time} message={message}/>
                        )}
                    </div>
                    <form className="chat-form">
                        <input type="text" placeholder="Your message here"/>
                        <button>Send</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ChatBox;