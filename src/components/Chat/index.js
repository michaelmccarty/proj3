import React from "react";
import ChatMessage from "./ChatMessage";
import OnlineUser from "./OnlineUser";
import styles from "./ChatBox.module.css";
import Moment from 'moment'; //eslint-disable-line

class ChatBox extends React.Component {

  state = {
    // socket: this.props.socket,  
    chatInput: "",
    // onlineUsers: this.props.onlineUsers,
    // messages: this.props.messages
  };

  componentDidMount = () => {
    // Get the chat messages from the database as axios
    // For now, dummy messages.
    // this.setState({
    //   messages: this.state.messages
    // });
  };

  handleInputChange = event => {
    const { value } = event.target;

    if (value.length > 50) return; 

    this.setState({
      chatInput: value
    });
  };

  handleSubmitChatMessage = event => {
    event.preventDefault();

    const {socket} = this.props;
    const newMessage = {
      userName: this.props.socket.id,
      time: Date.now(),
      message: this.state.chatInput
    };

    socket.emit('chat', newMessage)

    this.setState({
      chatInput: ""
    });
  };

  render() {
    return (
      <div className={styles["chatbox"]}>
        <div className={styles["online-users"]}>
          {this.props.onlineUsers.map(({userName}, i) => 
            <OnlineUser 
              key={i}
              userName={userName}
              avatarImg={"https://via.placeholder.com/200"}
            />  
          )}
        </div>
        <div className={styles["chat-wrapper"]}>
          <div className={styles["chat-messages"]} id="chat-box">
            {this.props.messages.map(({ userName, time, message }, i) => (
              <ChatMessage
                key={i}
                userName={userName}
                time={time}
                message={message}
              />
            ))}
          </div>
          <form className={styles["chat-form"]}>
            <input className={styles["chat-input"]}
              onChange={this.handleInputChange}
              name="chatInput"
              value={this.state.chatInput}
              type="text"
              placeholder="Your message here"
            />
            <button className={styles["chat-submit"]} onClick={this.handleSubmitChatMessage}>Send</button>
          </form>
        </div>
      </div>
    );
  }

}

export default ChatBox;
