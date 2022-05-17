import React from "react";
import {ClockLoader} from "react-spinners";
import styles from './Loading.module.css';

export const Loading = () => {
    return (
        <div className={styles.loading}>
            <ClockLoader color='blue' loading size={120}/>
        </div>

    );
}