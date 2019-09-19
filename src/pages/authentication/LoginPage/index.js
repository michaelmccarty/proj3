import React from 'react';
import styles from './LoginForm.module.css';

class LoginForm extends React.Component {
  state = {
    emailInput: ""
  };

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div id="authenticate-form-container">
        <form>
          <input name="emailInput" onChange={this.handleInputChange} value={this.state.emailInput}/>
        </form>
      </div>
    );
  }
}

export default LoginForm;