import React from 'react';
import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import API from '../../../utils/API';
import { Sprite, AlternatingSprite } from '../../../Sprite';
import Texture from '../../../Texture';
import actors from '../../../actors/actors.json';
import SpriteBox from './SpriteBox';

class RegisterPage extends React.Component {
    constructor (props) {
        super(props);
        this.myCanvasRef = React.createRef();
    }

    state = {
        username: '',
        email: '',
        password: '',
        character: ''
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { username, email, password } = this.state;
        console.log(username, email, password);
        const body = {
            username: username,
            email: email,
            password: password
        };
        console.log(body);
        API.register(body)
            .then(() => {
                this.props.history.push('/game');
            })
            .catch(function(err) {
                console.log(err);
            });
    };

    handleActorSelect = (actorName) => {
        this.setState({
            character: actorName
        });
    }

    render() {
        return (
            <div className={styles['register-page']}>
                <div className={styles['register-form-container']}>
                    <form className={styles['register-form']}>
                        <div className={styles['register-form-inputs']}>
                            <input
                                className={styles['inputs']}
                                name="username"
                                onChange={this.handleInputChange}
                                value={this.state.username}
                                placeholder="Username"
                            />
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
                            <label>Character Select</label>
                            <div className={styles["figures-container"]}>
                                {Object.entries(actors).map(([key, value], i) => (
                                    <SpriteBox 
                                        key={key}
                                        actorName={key}
                                        handleActorSelect={this.handleActorSelect}
                                        selected={this.state.character || 'player_default'}
                                    />
                                ))}
                            </div>
                        </div>
                        <button
                            className={styles['register-button']}
                            onClick={this.handleSubmit}
                        >
                            Register
                        </button>
                        <div>
                            <span className={styles['already-have-account']}>
                                Already have an account?{' '}
                                <Link to="/">Login!</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default RegisterPage;
