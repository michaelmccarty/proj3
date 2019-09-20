import React from "react";
import styles from "./OptionsWrapper.module.css";

function Option(props) {
  const { optionName, handleOpenMenu } = props;

  return (
    // <li onClick={}>
    <li className="cursor-pointer m-2 p-2" onClick={handleOpenMenu} data-menu={optionName}>{optionName}</li>
  );
}

class OptionsWrapper extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { socket: null };
  }

  state = {
      socket: this.props.socket,
      menuIsOpen: false
  };

  handleOpenMenu = event => {
    if (this.state.menuIsOpen) return;
    console.log(event.target.getAttribute('data-menu'));
  }

  componentDidMount = () => {
    this.setState({ socket: this.props.socket });
    console.log(this.props);
    console.log(this.state);
  };

  render() {
    return (
      <div className={styles["option"]}>
        <ul>
          <Option handleOpenMenu={this.handleOpenMenu} optionName="Pokemon" />
          <Option handleOpenMenu={this.handleOpenMenu} optionName="Pokedex" />
          <Option handleOpenMenu={this.handleOpenMenu} optionName="Settings" />
          <Option handleOpenMenu={this.handleOpenMenu} optionName="Logout" />
        </ul>
      </div>
    );
  }
}

export default OptionsWrapper;
