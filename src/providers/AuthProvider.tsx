import React, {createContext, useEffect, useState} from "react";
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from "../scripts/firebase-config";
import {useNavigate} from 'react-router-dom'
import {getUserById, logIn, UserType} from "../scripts/api-services";


onAuthStateChanged(auth, (currentUser) => {
    localStorage.setItem('userAuth', JSON.stringify(currentUser));
})

export const AuthContext = createContext<ContextType>({
    user: null,
})


export const AuthProvider: React.FC<PropsType> = ({children}) => {
    const history = useNavigate();
    const [state, setState] = useState<StateType>({
        context: {
            user: null,
            logIn: logInHandler,
            logOut: logOutHandler,
        },
        isAuth: false,
    })

    useEffect(() => {
        (async () => {
            const {uid} = JSON.parse(localStorage.getItem('userAuth') as string);
            if (uid) {
                await authMe(uid);
            } else {
                setState(prevState => ({...prevState, isAuth: true}));
            }
        })();
    }, [])

    async function logInHandler(email: string, password: string) {
        const userId: string | undefined = await logIn(email, password);
        if (userId) {
            await authMe(userId);
            history('/messages');
        }
        return !!userId;
    }

    async function logOutHandler() {
        await signOut(auth);
        setState((prevState) => ({...prevState, context: {...prevState.context, user: null}}));
    }

    async function authMe(userId: string) {
        const user = await getUserById(userId);
        if (user) {
            setState(prevState => ({...prevState, context: {...prevState.context, user}}))
        }
        setState(prevState => ({...prevState, isAuth: true}))
    }

    if(!state.isAuth){
        return null;
    }

    return <AuthContext.Provider value={state.context}>{children}</AuthContext.Provider>
}

type PropsType = {
    children: React.ReactNode
}

type ContextType = {
    user: UserType | null,
    logOut?: () => void,
    logIn?: (email: string, password: string) => Promise<boolean>,
}

type StateType = {
    context: ContextType,
    isAuth: boolean,
}