import React, {createContext, useState} from "react";
import {TOAST_VALUES} from "../utils/constants";


export const ToastContext = createContext<ContextType>({
    text: '',
    type: TOAST_VALUES.info,
    openToast: (text: string, type: ToastType) => {},
    closeToast: () => {},
});


export const ToastProvider: React.FC<PropsType> = ({children}) => {
    const [state, setState] = useState<StateType>({
        context: {
            text: '',
            type: TOAST_VALUES.info,
            openToast: openToastHandler,
            closeToast: closeToastHandler,
        }
    })

    function openToastHandler(text: string, type: ToastType) {
        setState(prevState => ({...prevState, context: {...prevState.context, text, type}}));
    }

    function closeToastHandler() {
        setState(prevState => ({...prevState, context: {...prevState.context, text: ''}}));
    }

    return <ToastContext.Provider value={state.context}>{children}</ToastContext.Provider>
}

type ToastType = keyof typeof TOAST_VALUES;

type ContextType = {
    text: string,
    type: ToastType,
    openToast: (text: string, type: ToastType) => void,
    closeToast: () => void,
}

type PropsType = {
    children: React.ReactNode,
}
type StateType = {
    context: ContextType,
}