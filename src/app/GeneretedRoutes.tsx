import React, {useContext} from "react";
import {AuthContext} from "../providers/AuthProvider";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../pages/login/Login";
import {Registration} from "../pages/registration/Registration";
import {Dialogs} from "../pages/dialogs/Dialogs";

export const GeneratedRoutes = () => {
    const authContext = useContext(AuthContext);

    return <Routes>
        {authContext?.user ? (<>
            <Route path='/dialogs' element={<Dialogs/>}/>
            <Route path='/' element={<Navigate to='/dialogs'/>}/>
        </>) : (<>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Registration/>}/>
            <Route path='/' element={<Navigate to='/login'/>}/>
        </>)}
    </Routes>
}