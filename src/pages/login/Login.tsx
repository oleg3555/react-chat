import React, {ChangeEvent, FormEvent, useContext, useState} from 'react'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {validateFormFields} from "../../utils/validate-form";
import {FormLabel} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../providers/AuthProvider";
import {FetchContext} from "../../providers/FetchProvider";
import {ToastContext} from "../../providers/ToastProvider";


export type LoginFieldsType = {
    email: string,
    password: string,
}

const initState: LoginFieldsType = {
    email: '',
    password: '',
}

export const Login = () => {
    const history = useNavigate();
    const authContext = useContext(AuthContext);
    const {setFetch} = useContext(FetchContext);
    const {openToast} = useContext(ToastContext);
    const [fields, setFields] = useState<LoginFieldsType>({...initState})
    const [formErrors, setFormErrors] = useState<LoginFieldsType>({...initState});

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
            setFetch(true);
            const isLoggedIn = await authContext?.logIn(fields.email, fields.password);
            if (!isLoggedIn) {
                openToast('Email or password is incorrect', 'error');
            } else {
                history('/dialogs');
            }
            setFetch(false);
        }
    }

    return <Grid container justifyContent='center' alignItems='center' flex={1}>
        <Grid item justifyContent='center'>
            <FormControl>
                <FormLabel>
                    <h2>Log In</h2>
                </FormLabel>
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
                    </FormGroup>
                </form>
                <FormLabel sx={{m: 2}}>
                    <Grid container justifyContent='center' alignItems='center'>
                        To register <Link to='/register'><Button>click here</Button></Link>
                    </Grid>
                </FormLabel>
            </FormControl>
        </Grid>
    </Grid>
}