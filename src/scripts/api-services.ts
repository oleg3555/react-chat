import {setDoc, doc, getDoc} from 'firebase/firestore/lite';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {auth, db} from "./firebase-config";
import {RegistrationFieldsType} from "../pages/registration/Registration";


export type UserType = {
    username: string,
    id: string,
    email: string
}

export async function getUserById(userId: string) {
    try {
        const snapshot = await getDoc(doc(db, 'users', userId));

        return {...snapshot.data(), id: snapshot.id} as UserType;
    } catch (error) {
        console.error(error);

        return undefined;
    }
}

export const createUser = async (data: RegistrationFieldsType) => {
    try {
        const {email, password, username} = data
        const user = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', user.user.uid), {username, email});
        return user.user;
    } catch (error: any) {
        console.error(error);
        return undefined;
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