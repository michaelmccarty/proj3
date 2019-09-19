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
  constructor(props) {
    super(props);
    this.state = { socket: null };
  }

  state = {};

  

  componentDidMount = () => {
    this.setState({ socket: this.props.socket });
    console.log(this.props);
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
