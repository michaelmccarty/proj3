import React from 'react';

function TestPokemon(props) {
    if (props.ready) {
        return (
            <div>
                <img src={props.src} alt={props.name} />
                <p>name: {props.name}</p>
                <p>level: {props.level}</p>
                <p>hp: {props.hp}</p>
                <p>attack: {props.attack}</p>
                <p>defense: {props.defense}</p>
                <p>special: {props.special}</p>
                <p>speed: {props.speed}</p>
            </div>
        );
    } else return <></>;
}

export default TestPokemon;