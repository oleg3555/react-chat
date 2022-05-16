import React, {createContext, useState} from "react";


export const FetchContext = createContext<ContextType>({
    isFetching: false,
    setFetch: (value: boolean) => {},
});


export const FetchProvider: React.FC<PropsType> = ({children}) => {
    const [state, setState] = useState<StateType>({
        context: {
            isFetching: false,
            setFetch: setFetchHandler,
        }
    })

    function setFetchHandler(value: boolean) {
        setState(prevState => ({...prevState, context: {...prevState.context, isFetching: value}}));
    }

    return <FetchContext.Provider value={state.context}>{children}</FetchContext.Provider>
}


type ContextType = {
    isFetching: boolean,
    setFetch: (value: boolean) => void,
}

type PropsType = {
    children: React.ReactNode,
}
type StateType = {
    context: ContextType,
}