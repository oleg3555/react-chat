import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from "./firebase-config";
import {RegistrationFieldsType} from "../pages/registration/Registration";
import {ref, set, get, child, update} from "firebase/database";


export type UserType = {
    username: string,
    id: string,
    email: string,
    imageUrl: string,
}

export async function getUserById(userId: string) {
    try {
        const snapshot = await get(child(ref(db), `users/${userId}`));
        if (snapshot.exists()) {
            return {...snapshot.val(), id: snapshot.key} as UserType;
        }
    } catch (error) {
        console.error(error);
    }
    return undefined;
}

export const createUser = async (data: RegistrationFieldsType) => {
    try {
        const {username, email, password} = data;
        const user = await createUserWithEmailAndPassword(auth, email, password);
        await set(ref(db, `users/${user.user.uid}`), {username, email, imageUrl: ''});
        return user.user;
    } catch (error: any) {
        console.error(error);
        return undefined;
    }
}


export const updateCurrentUser = async (updatedFields: Partial<UserType>) => {
    try {
        await update(ref(db, `users/${auth.currentUser?.uid}`), {...updatedFields});
    } catch (error: any) {
        console.error(error.message);
    }
}

export const logIn = async (email: string, password: string) => {
    try {
        const loggedIn = await signInWithEmailAndPassword(auth, email, password);
        return loggedIn.user.uid;
    } catch (error: any) {
        console.error(error);
        return undefined;
    }
}