import React from "react";
import "./style.css";

class Chat extends React.Component {
  constructor(props) {
    //what does the below line do?
    super(props);
  }

  state = {};

  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js";
    script.async = true;

    const script2 = document.createElement("script");

    script2.src = "socket-client.js";
    script2.async = true;

    document.body.appendChild(script);
    document.body.appendChild(script2);
  }

  render() {
    return (
      <div id="chat">
        <div id="socket-chat">
          <div id="chat-window">
            <div id="output"></div>
            <div id="feedback"></div>
          </div>
          <input type="text" placeholder="Handle" id="handle" />
          <input type="text" placeholder="Message" id="message" />
          <button id="send">Send</button>
        </div>
        <div id="player"></div>
      </div>
    );
  }
}

export default Chat;
