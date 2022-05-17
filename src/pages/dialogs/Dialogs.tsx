import {getDatabase, onValue, ref, set} from "firebase/database";
import {Button} from "@mui/material";
import {useEffect, useState} from "react";

export const Dialogs = () => {
    const db = getDatabase();
    const [messages, setMessages] = useState();
    useEffect(() => {
        const distanceRef = ref(db, 'users/');
        onValue(distanceRef, (snapshot) => {
            const data = snapshot.val();
            setMessages(data);
        });
    }, [db]);
    const userId = '12324'

    async function writeUserData() {
        await set(ref(db, 'users/' + userId), {
            value: 'qwer1234',
            username: 'Oleg',
        });
    }

    return <div>
        <Button onClick={writeUserData}>Add</Button>
        {JSON.stringify(messages)}
        Dialogs
    </div>
}