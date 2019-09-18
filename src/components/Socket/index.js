import React from "react";

class Socket extends React.Component {
  state = {};

  componentDidMount() {
    const socketIOCDN = document.createElement("script");

    socketIOCDN.src =
      "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js";
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
