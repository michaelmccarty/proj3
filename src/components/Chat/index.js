import React from "react";
import ChatMessage from "./ChatMessage";
import OnlineUser from "./OnlineUser";
import styles from "./ChatBox.module.css";
import Moment from 'moment';

class ChatBox extends React.Component {

  state = {
    socket: this.props.socket,  
    chatInput: "",
    usersOnline: [
      {
        userName: "Username123",
        avatarImg: "https://via.placeholder.com/100",
        socketId: ""
      }, 
      {
        userName: "Username1234",
        avatarImg: "https://via.placeholder.com/200",
        socketId: ""
      }, 
      {
        userName: "Username1234",
        avatarImg: "https://via.placeholder.com/200",
        socketId: ""
      }, 
      {
        userName: "Username1234",
        avatarImg: "https://via.placeholder.com/200",
        socketId: ""
      }, 
      {
        userName: "Username1234",
        avatarImg: "https://via.placeholder.com/200",
        socketId: ""
      }, 
      {
        userName: "Username1234",
        avatarImg: "https://via.placeholder.com/200",
        socketId: ""
      }, 
      {
        userName: "Username1234",
        avatarImg: "https://via.placeholder.com/200",
        socketId: ""
      }, 
      {
        userName: "Username1234",
        avatarImg: "https://via.placeholder.com/200",
        socketId: ""
      }, 
      {
        userName: "Username1234",
        avatarImg: "https://via.placeholder.com/200",
        socketId: ""
      }
    ],
    messages: []
  };

  componentDidMount = () => {
    // Get the chat messages from the database as axios
    // For now, dummy messages.
    this.setState({
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
    });
  };

  handleInputChange = event => {
    const { value } = event.target;

    this.setState({
      chatInput: value
    });
  };

  handleSubmitChatMessage = event => {
    event.preventDefault();
    const {socket} = this.state;
    
    const newMessage = {
      userName: "Pass Username here",
      time: Date.now(),
      message: this.state.chatInput
    };

    this.setState({
      messages: [...this.state.messages, newMessage] // Must match the objects in this.state.messages
    });

    socket.emit('chat', newMessage)

    this.setState({
      chatInput: ""
    });
  };

  render() {
    return (
      <div className={styles["chatbox"]}>
        <div className={styles["online-users"]}>
          {this.state.usersOnline.map(({userName, avatarImg}, i) => 
            <OnlineUser 
              key={i}
              userName={userName}
              avatarImg={avatarImg}
            />  
          )}
        </div>
        <div className={styles["chat-wrapper"]}>
          <div className={styles["chat-messages"]}>
            {this.state.messages.map(({ userName, time, message }, i) => (
              <ChatMessage
                key={i}
                userName={userName}
                time={time}
                message={message}
              />
            ))}
          </div>
          <form className={styles["chat-form"]}>
            <input
              onChange={this.handleInputChange}
              name="chatInput"
              value={this.state.chatInput}
              type="text"
              placeholder="Your message here"
            />
            <button onClick={this.handleSubmitChatMessage}>Send</button>
          </form>
        </div>
      </div>
    );
  }

}

export default ChatBox;
