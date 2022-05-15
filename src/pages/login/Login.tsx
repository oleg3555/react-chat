import React, {ChangeEvent, FormEvent, useContext, useState} from 'react'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {validateFormFields} from "../../utils/validate-form";
import {FormLabel} from "@mui/material";
import {Link} from "react-router-dom";
import {AuthContext} from "../../providers/AuthProvider";


export type LoginFieldsType = {
    email: string,
    password: string,
}

export const Login = () => {
    const authContext = useContext(AuthContext);
    const [fields, setFields] = useState<LoginFieldsType>({
        email: '',
        password: '',
    })
    const [formErrors, setFormErrors] = useState<LoginFieldsType>({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string>('');

    const onInputChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
        setFormErrors(prevState => ({...prevState, [name]: ''}));
        setFields(prevState => ({...prevState, [name]: value}));
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors = validateFormFields(fields);
        if (errors) {
            setFormErrors(errors as LoginFieldsType);
        } else {
            // @ts-ignore
            const loggedIn = await authContext.logIn(fields.email, fields.password);
            if (!loggedIn) {
                setError('Email or password is incorrect');
            }
        }
    }

    return <Grid container justifyContent='center'>
        <Grid item justifyContent='center'>
            <FormControl>
                <form onSubmit={onSubmit}>
                    <FormGroup sx={{width: '32ch'}}>
                        <TextField label="Email" margin="normal" name='email' onChange={onInputChange}
                                   value={fields.email}
                                   error={!!formErrors.email} helperText={formErrors.email}/>
                        <TextField type="password" label="Password" name='password' value={fields.password}
                                   onChange={onInputChange} error={!!formErrors.password}
                                   helperText={formErrors.password}
                                   margin="normal"
                        />
                        <Button type='submit' variant='contained' color='primary'>
                            Login
                        </Button>
                        {error && <div>{error}</div>}
                    </FormGroup>
                </form>
                <FormLabel sx={{m: 2}}>
                    <Grid container justifyContent='center' alignItems='center'>
                        To register <Button><Link to='/register'>click here</Link></Button>
                    </Grid>
                </FormLabel>
            </FormControl>
        </Grid>
    </Grid>
}