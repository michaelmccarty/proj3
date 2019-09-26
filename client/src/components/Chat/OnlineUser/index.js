import React from 'react';
import styles from './OnlineUser.module.css';

function OnlineUser ({userName, avatarImg}) {
    return (
        <div className={styles["online-user-wrapper"]}>
            <div className={styles["online-user-img-wrapper"]}>
                <img className={styles["online-user-img"]} src={avatarImg} alt="User Profile" />
            </div>
            <div className={styles["online-user-username"]}>{userName}</div>
        </div>
    )
}

export default OnlineUser;