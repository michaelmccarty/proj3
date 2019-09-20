import React from 'react';
import styles from './Submenu.module.css'

class Submenu extends React.Component {
    handleClose = event => {
      event.preventDefault();
      console.log("Handle close");
      this.props.closeMenu();
    }
  
    render() {
      return (
        <div class={styles["submenu-wrapper"]}>
          <button onClick={this.handleClose}>X</button>
          I'm div. {this.props.id}
        </div>
      )
    }
  }

  export default Submenu; 