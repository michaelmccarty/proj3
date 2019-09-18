import React from 'react';
import ChatMessage from './ChatMessage';
import './style.css';

class ChatBox extends React.Component {
    state = {
        chatInput: "",
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

    handleInputChange = event => {
        const {value} = event.target;

        this.setState({
            chatInput: value
        });
    }

    handleSubmitChatMessage = event => {
        event.preventDefault();

        const newMessage = {
            userName: "Pass Username here",
            time: Date.now(),
            message: this.state.chatInput
        };

        this.setState({
            messages: [...this.state.messages, newMessage] // Must match the objects in this.state.messages
        });
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
                        <input onChange={this.handleInputChange} name="chatInput" value={this.state.chatInput} type="text" placeholder="Your message here"/>
                        <button onClick={this.handleSubmitChatMessage}>Send</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ChatBox;