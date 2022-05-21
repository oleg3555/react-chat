import React from 'react'
import styles from './Message.module.css';

type messagePropsType = {
    isRight: boolean,
    avatar: string,
    name: string,
    message: string,
    time: string
}

export function Message(props: messagePropsType) {
    return (
        <div className={`${styles.wrapper} ${props.isRight && styles.right}`}>
            <div className={styles.avatar}>
                <img src={props.avatar} alt="avatar" width='45' height='45'/>
            </div>
            <div className={styles.message}>
                <div className={styles.name}>{props.name}</div>
                <div className={styles.data}>
                    <div className={styles.text}>{props.message}</div>
                </div>
                <div className={styles.time}>{props.time}</div>
            </div>
        </div>
    )
}

export default Message
