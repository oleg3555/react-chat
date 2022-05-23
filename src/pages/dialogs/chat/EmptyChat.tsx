import styles from "../Dialogs.module.css";

export const EmptyChat = () => {
    return <div className={styles.dialogBlock}>
        <div className={styles.helperText}>
            <h3>Choose user to start dialog</h3>
        </div>
    </div>
}