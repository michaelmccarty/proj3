import React from 'react';
import './style.css';

function OnlineUser ({userName, avatarImg}) {
    return (
        <div className="online-user-wrapper m-2">
            <div className="online-user-img-wrapper">
                <img className="online-user-img" src={avatarImg} alt="User Profile" />
            </div>
            <div className="online-user-username ml-2">{userName}</div>
        </div>
    )
}

export default OnlineUser;