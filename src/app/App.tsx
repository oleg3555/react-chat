import React from 'react';
import './App.css';
import {Login} from "../pages/login/Login";
import {Header} from "./Header";
import {Routes, Route} from "react-router-dom";
import {Registration} from "../pages/registration/Registration";

function App() {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Registration/>}/>
            </Routes>
        </div>
    );
}

export default App;
