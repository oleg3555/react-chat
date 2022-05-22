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
import {Avatar} from "@mui/material";
import blank_avatar from '../assests/blank_avatar.jpg'

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
        <Box>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' component='div' sx={{ml: 2}}>
                        Chat App
                    </Typography>
                    <Grid item sx={{flexGrow: 1, ml: 4}} alignItems='center'>
                        {authContext?.user && <>
                            <Link to='/dialogs'><Button color='inherit'>Dialogs</Button></Link>
                            <Link to='/settings'><Button color='inherit'>Settings</Button></Link>
                        </>}
                    </Grid>
                    {authContext?.user ? (<>
                            <Box component='div' display='flex' alignItems='center'>
                                <span>{authContext.user.username}</span>
                                <Avatar src={authContext.user.imageUrl || blank_avatar} alt='avatar'
                                        sx={{margin: '0 2rem 0 0.5rem'}}/>
                            </Box>
                            <Button color='inherit' onClick={logOutHandler}>Log out</Button>
                        </>)
                        : (<Link to='/login'><Button color='inherit'>Login</Button></Link>)}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
