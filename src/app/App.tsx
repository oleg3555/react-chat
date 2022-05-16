import React, {useContext} from 'react';
import './App.css';
import {Login} from "../pages/login/Login";
import {Header} from "./Header";
import {Routes, Route} from "react-router-dom";
import {Registration} from "../pages/registration/Registration";
import styles from './App.module.css';
import {FetchContext} from "../providers/FetchProvider";
import {LinearProgress} from "@mui/material";
import {Toast} from "../components/toast/Toast";

function App() {
    const {isFetching} = useContext(FetchContext);
    return (
        <div className={styles.App}>
            {isFetching && <LinearProgress/>}
            <Toast/>
            <Header/>
            <main className={isFetching ? styles.disabled : undefined}>
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Registration/>}/>
                </Routes>
            </main>
            <footer>
                <span className={styles.copyright}>Developed by Oleg Yanusik</span>
            </footer>
        </div>
    );
}

export default App;
