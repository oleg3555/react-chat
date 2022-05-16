import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useContext} from "react";
import {ToastContext} from "../../providers/ToastProvider";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Toast() {
    const {closeToast, text, type} = useContext(ToastContext)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        closeToast();
    };

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <Snackbar open={!!text} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={type} sx={{width: '100%'}}>
                    <span>{text}</span>
                </Alert>
            </Snackbar>
        </Stack>
    );
}