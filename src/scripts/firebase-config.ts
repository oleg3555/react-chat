import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDPuJrEuiB9rjanTqFCDf8gH7m0uMjGvms",
    authDomain: "chat-8c4f6.firebaseapp.com",
    projectId: "chat-8c4f6",
    storageBucket: "chat-8c4f6.appspot.com",
    messagingSenderId: "253314679320",
    appId: "1:253314679320:web:a9c8927679f84355a0f96d"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();

