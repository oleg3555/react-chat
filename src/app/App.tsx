import React, {useContext} from 'react';
import './App.css';
import {Header} from "./Header";
import styles from './App.module.css';
import {FetchContext} from "../providers/FetchProvider";
import {LinearProgress} from "@mui/material";
import {Toast} from "../components/toast/Toast";
import {GeneratedRoutes} from "./GeneretedRoutes";

function App() {
    const {isFetching} = useContext(FetchContext);
    return (
        <div className={styles.App}>
            {isFetching && <LinearProgress/>}
            <Toast/>
            <Header/>
            <main className={isFetching ? styles.disabled : undefined}>
                <GeneratedRoutes/>
            </main>
            <footer>
                <span className={styles.copyright}>Developed by Oleg Yanusik</span>
            </footer>
        </div>
    );
}

export default App;
