import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import API from './utils/API';

function ProtectedRoute({ component: Component, render, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                API.isLoggedIn() ? (
                    typeof render === 'function' ? (
                        render(props)
                    ) : (
                        <Component {...props} />
                    )
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
}

export default ProtectedRoute;
