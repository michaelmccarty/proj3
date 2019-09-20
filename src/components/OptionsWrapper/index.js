import React from "react";
import styles from "./OptionsWrapper.module.css";

function Option(props) {
  const { menuDisplayName, menuId, handleMenuChange } = props;

  return (
    // <li onClick={}>
    <li
      className={styles["option"]}
      onClick={handleMenuChange}
      data-menu={menuId}
    >
      {menuDisplayName}
    </li>
  );
}

function MainMenu(props) {
  switch (props.menu) {
    case "1":
      return (
        <div>I'm the Pokemon menu</div>
      );
    case "2":
      return (
        <div>I'm the Pokdex menu</div>
      );
    case "3":
      return (
        <div>I'm the Settings menu</div>
      );
    case "4":
      return (
        <div>I'm the Logout button</div>
      );
    default:
      return (
        <ul className={styles["options-list"]}>
          <Option handleMenuChange={props.handleMenuChange} menuDisplayName="Pokemon" menuId="1" />
          <Option handleMenuChange={props.handleMenuChange} menuDisplayName="Pokedex" menuId="2" />
          <Option handleMenuChange={props.handleMenuChange} menuDisplayName="Settings" menuId="3" />
          <Option handleMenuChange={props.handleMenuChange} menuDisplayName="Logout" menuId="4" />
        </ul>
      );
  }
}

function Submenu(props) {
  switch (props.menu) {
    case "Pokemon":
      return <div>I'm a sub menu! </div>;
      break;
    default:
      return;
  }
}

class OptionsWrapper extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { socket: null };
  }

  state = {
    socket: this.props.socket,
    menu: 0 // Main Menu by default
  };
  
  componentDidMount = () => {
    this.setState({ socket: this.props.socket });
    console.log(this.props);
    console.log(this.state);
  };

  handleMenuChange = event => {
    const newMenu = event.target.getAttribute("data-menu");

    this.setState({ menu: newMenu }, () => {
      console.log(this.state.menu);
    });
  };

  render() {
    return (
      <div className={styles["option-wrapper"]}>
        <MainMenu menu={this.state.menu} handleMenuChange={this.handleMenuChange} />
      </div>
    );
  }
}

export default OptionsWrapper;
