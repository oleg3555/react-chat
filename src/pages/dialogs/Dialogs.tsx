import {getDatabase, onValue, ref, set, push} from "firebase/database";
import {useEffect, useState} from "react";
import styles from './Dialogs.module.css';
import Message from "./message/Message";
import {SendMessageForm} from "./form/SendMessageForm";

const imgUrl = 'https://sun9-73.userapi.com/impf/c852036/v852036917/7aea3/sY5TQmD4Af4.jpg?size=1280x960&quality=96&sign=b81435282a1e1e332d82be9914ec84c6&type=album';

export const Dialogs = () => {
    const db = getDatabase();
    const [messages, setMessages] = useState<Array<any>>([]);
    useEffect(() => {
        const distanceRef = ref(db, 'users/123245');
        onValue(distanceRef, (snapshot) => {
            const arr: Array<any> = [];
            snapshot.forEach(el => {
                arr.push(el.val());
            })
            setMessages(arr);
        });
    }, [db]);
    const userId = '123245'


    async function writeUserData() {
        await set(push(ref(db, 'users/' + userId)), {
            value: 'qwer1234',
            username: 'Oleg',
        });
    }

    return <div className={styles.dialogPage}>
        <div className={styles.dialogBlock}>
            <div className={styles.messages}>
                <Message avatar={imgUrl} name='Oleg' message='Hey how is you doing' time='22.00' isRight={true}/>
                <Message avatar={imgUrl} name='Oleg' message='Hey how is you doing' time='22.00' isRight={false}/>
                <Message avatar={imgUrl} name='Oleg'
                         message='Hey whats s fine is the are bey whats fine is the are bey whats fine is the are bey whats fine is the are bey whats fine is the are bey whats fine is the are bey whats fine is the are bey whats fine is the are bey whats fine is the are bey whats fine is the are bey whats fine is the are bthe are bey whats fine is the are bey whats fine is the are bey whats fine is the are bfine is the are best'
                         time='22.00' isRight={true}/>
                <Message avatar={imgUrl} name='Oleg' message='it ok' time='22.00' isRight={false}/>
            </div>
            <SendMessageForm sendMessage={(value: string) => console.log(value)}/>
        </div>
        {/*<Button onClick={writeUserData}>Add</Button>*/}
        {/*{JSON.stringify(messages)}*/}
        {/*Dialogs*/}
    </div>
}