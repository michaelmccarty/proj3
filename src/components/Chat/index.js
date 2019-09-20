import React from "react";
import ChatMessage from "./ChatMessage";
import OnlineUser from "./OnlineUser";
import styles from "./ChatBox.module.css";
import Moment from 'moment';

class ChatBox extends React.Component {

  state = {
    socket: this.props.socket,  
    chatInput: "",
    onlineUsers: this.props.onlineUsers,
    messages: this.props.messages
  };

  componentDidMount = () => {
    // Get the chat messages from the database as axios
    // For now, dummy messages.
    this.setState({
      messages: this.state.messages
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
      userName: this.state.socket.id,
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
          {this.state.onlineUsers.map((userName, i) => 
            <OnlineUser 
              key={i}
              userName={userName}
              avatarImg={"https://via.placeholder.com/200"}
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
