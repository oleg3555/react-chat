import styles from './Dialogs.module.css';
import {DialogsUsers} from "./dialogsUsers/DialogsUsers";
import {Route, Routes} from "react-router-dom";
import {Chat} from "./chat/Chat";


export const Dialogs = () => {
    return <div className={styles.dialogPage}>
        <DialogsUsers/>
        <Routes>
            <Route path='chat/:chatId' element={<Chat/>}/>
        </Routes>
    </div>
}