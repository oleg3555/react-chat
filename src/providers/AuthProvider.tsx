import React, {createContext, useEffect, useState} from "react";
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from "../scripts/firebase-config";
import {getUserById, logIn, UserType} from "../scripts/api-services";
import {Loading} from "../components/loader/Loading";


onAuthStateChanged(auth, (currentUser) => {
    localStorage.setItem('userAuth', JSON.stringify(currentUser));
})

export const AuthContext = createContext<ContextType | null>(null);


export const AuthProvider: React.FC<PropsType> = ({children}) => {
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
            const user = JSON.parse(localStorage.getItem('userAuth') as string);
            if (user) {
                await authMe(user.uid);
            } else {
                setState(prevState => ({...prevState, isAuth: true}));
            }
        })();
    }, [])

    async function logInHandler(email: string, password: string) {
        const userId: string | undefined = await logIn(email, password);
        if (userId) {
            const user = await getUserById(userId);
            if (!user) {
                return false;
            }
            setState(prevState => ({...prevState, context: {...prevState.context, user}}));
        }
        return !!userId;
    }

    async function logOutHandler() {
        try {
            await signOut(auth);
            setState((prevState) => ({...prevState, context: {...prevState.context, user: null}}));
            return true;
        } catch (error: any) {
            console.error(error);
            return false;
        }
    }

    async function authMe(userId: string) {
        const user = await getUserById(userId);
        if (user) {
            setState(prevState => ({...prevState, context: {...prevState.context, user}}))
        }
        setState(prevState => ({...prevState, isAuth: true}))
    }

    if (!state.isAuth) {
        return <Loading/>;
    }

    return <AuthContext.Provider value={state.context}>{children}</AuthContext.Provider>
}

type PropsType = {
    children: React.ReactNode
}

type ContextType = {
    user: UserType | null,
    logOut: () => Promise<boolean>,
    logIn: (email: string, password: string) => Promise<boolean>,
}

type StateType = {
    context: ContextType,
    isAuth: boolean,
}