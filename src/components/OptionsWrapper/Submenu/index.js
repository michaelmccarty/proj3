import React from "react";
import styles from "./Submenu.module.css";

class Submenu extends React.Component {
  handleClose = event => {
    event.preventDefault();
    console.log("Handle close");
    this.props.closeMenu();
  };

  render() {
    return (
      <div className={styles["submenu-wrapper"]}>
        <div className={styles["submenu-header"]}>
          <span>{this.props.menuDisplayName}</span>
          <button className={styles["exit-button"]} onClick={this.handleClose}>X</button>
        </div>
        <div>
          Content
        </div>
      </div>
    );
  }
}

export default Submenu;
