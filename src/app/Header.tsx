import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import {Link} from "react-router-dom";

export function Header() {
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
                    <Button color="inherit"><Link to='login'>Login</Link></Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
