import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../providers/AuthProvider";

export const Header = () => {
    const authContext = useContext(AuthContext);
    const history = useNavigate();
    const logOutHandler = async () => {
        const isLoggedOut = await authContext?.logOut();
        if (isLoggedOut) {
            history('/login');
        }
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ml: 2}}>
                        Chat App
                    </Typography>
                    <Grid item sx={{flexGrow: 1, ml: 4}} alignItems='center'>
                        <Button color='inherit'>Messages</Button>
                    </Grid>
                    {authContext?.user ? (<Button color="inherit" onClick={logOutHandler}>Log out</Button>)
                        : (<Link to='/login'><Button color="inherit">Login</Button></Link>)}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
