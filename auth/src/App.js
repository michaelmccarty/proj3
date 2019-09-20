import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link, Redirect, withRouter } from 'react-router-dom';

const ChatAuthCentralState = {
  isAuthenticated: false,
  authenticate(callback) {
    this.isAuthenticated = true;
    setTimeout(callback, 200);
  },
  signout(callback) {
    this.isAuthenticated = false;
    setTimeout(callback, 200);
  }
};

const Public = () => <h3>Public Content</h3>;
const Protected = () => <h3>Protected Content</h3>;

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false
    };
  }
  
  login = () => {
    ChatAuthCentralState.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }));
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      this.props.history.push(from.pathname);
    }

    return (
      <div>
        <p>Please, you need to be authenticated to play our game or chat.</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    ChatAuthCentralState.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
);

const AuthButton = withRouter(({ history }) => (
  ChatAuthCentralState.isAuthenticated ? (
    <p>
      Welcome to the Alpha Team Project 3 <button onClick={() => {
        ChatAuthCentralState.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
));

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Alphateam Project 3</h1>
        </header>
        <BrowserRouter>
          <div>
            <AuthButton/>
            <ul>
              <li><Link to="/public">Public Content</Link></li>
              <li><Link to="/protected">Users with Profiles Only</Link></li>
            </ul>
            <Route path="/public" component={Public}/>
            <Route path="/login" component={withRouter(Login)}/>
            <ProtectedRoute path='/protected' component={Protected} />
          </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
