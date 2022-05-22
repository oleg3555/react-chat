import styles from "../Dialogs.module.css";
import Message from "../message/Message";
import {SendMessageForm} from "../form/SendMessageForm";
import {useContext, useEffect, useRef, useState} from "react";
import {onChildAdded, push, ref, set} from "firebase/database";
import {db} from "../../../scripts/firebase-config";
import {useParams} from "react-router-dom";
import {getUserById} from "../../../scripts/api-services";
import {getCollocutorId} from "../../../utils/helpers";
import {AuthContext} from "../../../providers/AuthProvider";

type MessageType = {
    imageUrl: string,
    username: string,
    sender: string,
    id: string,
    value: string,
}


export const Chat = () => {
    const [messages, setMessages] = useState<Array<MessageType>>([]);
    const unsubscribe = useRef<any>(null);
    const authContext = useContext(AuthContext)
    const {chatId} = useParams();

    const unsubscribeListener = () => {
        unsubscribe.current();
        unsubscribe.current = null;
    }

    useEffect(() => {
        if (unsubscribe.current) {
            unsubscribeListener();
        }
        setMessages([]);
    }, [chatId]);

    useEffect(() => {
        setMessages([]);
        if (unsubscribe.current) {
            unsubscribeListener();
        }
        (async () => {
            const user = authContext?.user;
            const collocutor = await getUserById(getCollocutorId(user?.id, chatId));
            if (!collocutor || !user) {
                return;
            }
            unsubscribe.current = onChildAdded(ref(db, `chats/${chatId}`), (data) => {
                const item = data.val();
                const message: MessageType = {
                    ...item,
                    id: data.key,
                    imageUrl: item.sender === user.id ? user.imageUrl : collocutor.imageUrl,
                    username: item.sender === user.id ? user.username : collocutor.username,
                }
                setMessages(prev => ([...prev, message]));
            });
        })();
        return () => {
            unsubscribe.current();
        }
    }, [authContext?.user, chatId]);


    const sendMessage = async (value: string) => {
        await set(push(ref(db, `chats/${chatId}`)), {
            value,
            sender: authContext?.user?.id,
        });
    }

    return (
        <div className={styles.dialogBlock}>
            <div className={styles.messages}>
                {messages.map(item => <Message key={item.id} isRight={item.sender === authContext?.user?.id}
                                               avatar={item.imageUrl} name={item.username} message={item.value}
                                               time='21:59'/>)}
            </div>
            <SendMessageForm sendMessage={sendMessage}/>
        </div>)
}