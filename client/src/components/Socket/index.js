import React from "react";

class Socket extends React.Component {
  // constructor (props) {
  //   this.state.socket = props.socket || "hello world"
  // }
  
  state = {
    socket: this.socket
  }

  componentDidMount() {
    const socketIOCDN = document.createElement("script");

    socketIOCDN.src = "socket-io-client.js";
    socketIOCDN.async = true;

    const socketClient = document.createElement("script");

    socketClient.src = "socket-client.js";
    socketClient.async = true;

    document.body.appendChild(socketIOCDN);
    document.body.appendChild(socketClient);
  }
  render() {
    return <></>;
  }
}

export default Socket;
