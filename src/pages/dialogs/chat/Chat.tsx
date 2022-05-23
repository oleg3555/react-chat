import styles from "../Dialogs.module.css";
import Message from "../message/Message";
import {SendMessageForm} from "../form/SendMessageForm";
import {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {get, onChildAdded, push, ref, set} from "firebase/database";
import {db} from "../../../scripts/firebase-config";
import {Navigate, useParams} from "react-router-dom";
import {getUserById} from "../../../scripts/api-services";
import {getCollocutorId, getTime} from "../../../utils/helpers";
import {AuthContext} from "../../../providers/AuthProvider";

type MessageType = {
    time: string
    imageUrl: string,
    username: string,
    sender: string,
    id: string,
    value: string,
}


export const Chat = () => {
    const [messages, setMessages] = useState<Array<MessageType>>([]);
    const [helperText, setHelperText] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const scrollRef = useRef<null | HTMLDivElement>(null);
    const unsubscribe = useRef<any>(null);
    const authContext = useContext(AuthContext);
    const {chatId} = useParams();

    const unsubscribeListener = () => {
        unsubscribe.current();
        unsubscribe.current = null;
    }
    useLayoutEffect(()=>{
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    },[messages]);

    useEffect(() => {
        setHelperText('');
        setMessages([]);
        if (unsubscribe.current) {
            unsubscribeListener();
        }
        (async () => {
            const user = authContext?.user;
            const collocutor = await getUserById(getCollocutorId(user?.id, chatId));
            if (!collocutor || !user) {
                setError(true);
                return;
            }
            const reference = ref(db, `chats/${chatId}`);
            const data = await get(reference);
            if (!data.val()) {
                setHelperText('Send some message :)');
            }
            unsubscribe.current = onChildAdded(reference, (data) => {
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
            if (unsubscribe.current) {
                unsubscribe.current();
            }
        }
    }, [authContext?.user, chatId]);


    const sendMessage = async (value: string) => {
        if (helperText) {
            setHelperText('');
        }
        await set(push(ref(db, `chats/${chatId}`)), {
            value,
            sender: authContext?.user?.id,
            time: getTime(),
        });
    }

    if (error) {
        return <Navigate to='/dialogs/empty'/>
    }

    return (
        <div className={styles.dialogBlock}>
            {helperText && <div className={styles.helperText}><span>{helperText}</span></div>}
            <div className={styles.messages} ref={scrollRef}>
                {messages.map(item => <Message key={item.id} isRight={item.sender === authContext?.user?.id}
                                               avatar={item.imageUrl} name={item.username} message={item.value}
                                               time={item.time}/>)}
            </div>
            <SendMessageForm sendMessage={sendMessage}/>
        </div>)
}