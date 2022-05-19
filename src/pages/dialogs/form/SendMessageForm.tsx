import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import styles from './SendMessageForm.module.css';

type propsType = {
    sendMessage: (text: string) => void,
}

export const SendMessageForm: React.FC<propsType> = ({sendMessage}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const sendMessageHandler = () => {
        const value = inputValue.trim();
        if (value) {
            sendMessage(value);
            setInputValue('');
        } else {
            setError(true);
        }
    }

    const onChangeInputValue = ({currentTarget: {value}}: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(false);
        }
        setInputValue(value);
    }

    const onInputKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessageHandler();
        }
    }

    return <div className={styles.messageForm}>
        <TextField margin='normal' label='Type message' fullWidth value={inputValue}
                   onKeyPress={onInputKeyPressed} error={error}
                   onChange={onChangeInputValue}/>
        <IconButton color='primary' size='large' onClick={sendMessageHandler}>
            <SendIcon/>
        </IconButton>
    </div>
}