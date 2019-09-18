import React from 'react';
import './style.css';

function Option(props) {
    const {optionName} = props;

    return (
        // <li onClick={}>
        <li className="cursor-pointer m-2 p-2">
            {optionName}
        </li>
    );
}

class OptionsWrapper extends React.Component {
    state = {
        
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <div className="options">
                <ul>
                    <Option optionName="Pokemon"/>
                    <Option optionName="Pokedex"/>
                    <Option optionName="Settings"/>
                    <Option optionName="Logout"/>
                </ul>
            </div>
        );
    }
}

export default OptionsWrapper;