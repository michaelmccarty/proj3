import React from 'react';

function TestButton(props) {
    if (props.ready) {
        return (
            <button
                id="button"
                onClick={e => {
                    e.preventDefault();
                    props.onClick();
                }}
            >
                {props.text}
            </button>
        );
    } else return <></>;
}

export default TestButton;