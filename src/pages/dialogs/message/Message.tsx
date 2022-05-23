import React from 'react'
import styles from './Message.module.css';
import blank_avatar from '../../../assests/blank_avatar.jpg';
import {Avatar} from "@mui/material";

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
                <Avatar src={props.avatar || blank_avatar} alt='avatar' sx={{width: 50, height: 50}}/>
            </div>
            <div className={styles.message}>
                <div className={styles.wrap}>
                    <div className={styles.name}>{props.name}</div>
                        <div className={styles.text}>{props.message}</div>
                    <div className={styles.time}>{props.time}</div>
                </div>
            </div>
        </div>
    )
}

export default Message
