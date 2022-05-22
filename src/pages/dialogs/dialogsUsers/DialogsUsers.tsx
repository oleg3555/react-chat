import {useEffect, useState} from "react";
import {onChildAdded, onChildChanged, ref} from "firebase/database";
import {UserType} from "../../../scripts/api-services";
import {auth, db} from "../../../scripts/firebase-config";
import styles from './DialogsUsers.module.css';
import {Avatar, Box} from "@mui/material";
import blank_avatar from '../../../assests/blank_avatar.jpg';
import {NavLink} from "react-router-dom";
import {getChatId} from "../../../utils/helpers";


export const DialogsUsers = () => {
    const [users, setUsers] = useState<Array<UserType>>([]);
    useEffect(() => {
        const unsubscribeOnAdd = onChildAdded(ref(db, 'users'), (data) => {
            if (data.key !== auth.currentUser?.uid) {
                setUsers(prevState => [...prevState, {...data.val(), id: data.key}]);
            }
        });

        const unsubscribeOnChange = onChildChanged(ref(db, 'users'), (data) => {
            if (data.key !== auth.currentUser?.uid) {
                setUsers(prevState => {
                    return prevState.map(item => item.id === data.key ? {...data.val(), id: item.id} : item);
                })
            }
        })

        return () => {
            unsubscribeOnAdd();
            unsubscribeOnChange();
        }
    }, []);

    return (<div className={styles.users}>
        {users.map(item => <NavLink key={item.id} to={`/dialogs/chat/${getChatId(item.id, auth.currentUser?.uid)}`}
                                 className={({isActive}) => isActive ? styles.active : ''}>
            <Box component='div'
                 display='flex' alignItems='center'
                 gap={1}
                 margin='0.5rem 0'>
                <Avatar src={item.imageUrl || blank_avatar} alt='ava' sx={{width: 50, height: 50}}/>
                <span>{item.username}</span>
            </Box></NavLink>)}
    </div>);
}