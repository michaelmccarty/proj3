import React from 'react';
import {Link} from 'react-router-dom';

class RegisterPage extends React.Component {
  state = {
    username: "",
    email: "",
    password: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const {username, email, password} = event.target;

    console.log(username, email, password);
  }

  render() {
    return (
      <div id="authenticate-form-container">
        <form>
          <input
            name="username"
            onChange={this.handleInputChange}
            value={this.state.username}
          />
          <input
            name="email"
            onChange={this.handleInputChange}
            value={this.state.email}
          />
          <input
            name="password"
            onChange={this.handleInputChange}
            value={this.state.password}
            type="password"
          />
          <button onClick={this.handleSubmit}>Register</button>
          <div>
            <span>
              Already have an account? <Link to="/">Login!</Link>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterPage;