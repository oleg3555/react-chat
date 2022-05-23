import styles from './Dialogs.module.css';
import {DialogsUsers} from "./dialogsUsers/DialogsUsers";
import {Navigate, Route, Routes} from "react-router-dom";
import {Chat} from "./chat/Chat";
import {EmptyChat} from "./chat/EmptyChat";


export const Dialogs = () => {
    return <div className={styles.dialogPage}>
        <DialogsUsers/>
        <Routes>
            <Route path='/:chatId' element={<Chat/>}/>
            <Route path='/empty/*' element={<EmptyChat/>}/>
            <Route path='/*' element={<Navigate to='empty'/>}/>
        </Routes>
    </div>
}