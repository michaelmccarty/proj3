import React from "react";
import styles from "./Submenu.module.css";

function Pokemon(props) {
    switch (props.id) { // id gets converted to a number when passing it down
      case 1:
        return (
          <div className={styles["pokemon-wrapper"]}>
            <img
              className={styles["pokemon-image"]}
              src="https://via.placeholder.com/50"
            />
            <span className={styles["pokemon-name"]}>Pokemon Name Pokemon</span>
          </div>
        );
      case 2: 
        return (
          <div>These will be the Pokemon from the Pokedex</div>
        )
      case 3: 
        return (
          <div>These are the settings (icebox)</div>
        )
      case 4:
        return (
          <div className={styles["logout-submenu"]}>
            Are you sure?
            <button>Yes</button>
            <button>Keep Playing</button>  
          </div>
        )
      default: 
        return (
          <div>Not found</div>
        );
    } 
}

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
          <button className={styles["exit-button"]} onClick={this.handleClose}>
            X
          </button>
        </div>
        <div className={styles["content-container"]}>
          <Pokemon id={this.props.id}/>
        </div>
      </div>
    );
  }
}

export default Submenu;
