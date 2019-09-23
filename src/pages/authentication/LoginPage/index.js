import React from 'react';
import styles from './LoginForm.module.css';
import { Link } from 'react-router-dom';
import API from '../../../utils/API';

class LoginForm extends React.Component {
    state = {
        email: '',
        password: ''
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.email); // Do whatever with authentication here using the component's state.
        // Run this always after the .then from checking the login
        const { email, password } = this.state;
        const body = { email, password };
        API.login(body);
        this.setState({
            password: ''
        });
    };

    render() {
        return (
            <div className={styles['login-page']}>
                <div className={styles['login-form-container']}>
                    <form className={styles['login-form']}>
                        <div className={styles['login-form-inputs']}>
                            <input
                                className={styles['inputs']}
                                name="email"
                                onChange={this.handleInputChange}
                                value={this.state.email}
                                placeholder="Email"
                            />
                            <input
                                className={styles['inputs']}
                                name="password"
                                onChange={this.handleInputChange}
                                value={this.state.password}
                                type="password"
                                placeholder="Password"
                            />
                        </div>
                        <button
                            className={styles['start-button']}
                            onClick={this.handleSubmit}
                        >
                            Start
                        </button>
                        <div>
                            <span className={styles['dont-have-account']}>
                                Don't have an account?{' '}
                                <Link to="/register">Register!</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginForm;
