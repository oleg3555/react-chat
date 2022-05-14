import React, {ChangeEvent, FormEvent, useState} from 'react'
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {emailRegular} from "../../utils/refulars";


type fieldsType = {
    email: string,
    password: string,
}

export const Login = () => {
    const [fields, setFields] = useState<fieldsType>({
        email: '',
        password: '',
    })
    const [formErrors, setFormErrors] = useState<fieldsType>({
        email: '',
        password: '',
    });
    const onInputChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
        setFormErrors(prevState => ({...prevState, [name]: ''}));
        setFields(prevState => ({...prevState, [name]: value}));
    }

    const isFormValid = () => {
        const errors: fieldsType = {email: '', password: ''};
        if (!fields.email) {
            errors.email = 'Required';
        } else if (!emailRegular.test(fields.email)) {
            errors.email = 'Invalid email address';
        }
        if (!fields.password) {
            errors.password = 'Required'
        } else if (fields.password.length < 4) {
            errors.password = 'Password is too short';
        }
        if (errors.email || errors.password) {
            setFormErrors(errors);
            return false;
        } else {
            return true;
        }
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isFormValid()) {
            console.log('dadad')
        }
    }

    return <Grid container justifyContent='center'>
        <Grid item justifyContent='center'>
            <FormControl>
                <form onSubmit={onSubmit}>
                    <FormGroup>
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
            </FormControl>
        </Grid>
    </Grid>
}