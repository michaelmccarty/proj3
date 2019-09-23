import React from "react";
import styles from "./OptionsWrapper.module.css";

function Option(props) {
  const { optionName } = props;

  return (
    // <li onClick={}>
    <li className="cursor-pointer m-2 p-2">{optionName}</li>
  );
}

class OptionsWrapper extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = { socket: null };
  // }

  state = {
      socket: this.props.socket
  };

  

  componentDidMount = () => {
    this.setState({ socket: this.props.socket });
    console.log(this.props);
    console.log(this.state);
  };

  render() {
    return (
      <div className={styles["option"]}>
        <ul>
          <Option optionName="Pokemon" />
          <Option optionName="Pokedex" />
          <Option optionName="Settings" />
          <Option optionName="Logout" />
        </ul>
      </div>
    );
  }
}

export default OptionsWrapper;
