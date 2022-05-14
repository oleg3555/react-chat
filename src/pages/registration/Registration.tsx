import React, {ChangeEvent, FormEvent, useState} from "react";
import {emailRegular} from "../../utils/refulars";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

type fieldsType = {
    email: string,
    username: string,
    password: string,
    repeatPassword: string,
}

const initState: fieldsType = {
    email: '',
    username: '',
    password: '',
    repeatPassword: ''
}

export const Registration = () => {
    const [fields, setFields] = useState<fieldsType>({...initState});
    const [errors, setErrors] = useState<fieldsType>({...initState});


    const onInputChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
        setFields(prevState => ({...prevState, [name]: value}));
        setErrors(prevState => ({...prevState, [name]: ''}));
    }

    const isFormValid = () => {
        const errors: fieldsType = {...initState};
        if (!emailRegular.test(fields.email)) {
            errors.email = 'Invalid email address';
        }
        if (fields.password.length < 8 || fields.password.length > 24) {
            errors.password = 'Password should contain 8-24 symbols';
        }
        if (fields.password !== fields.repeatPassword) {
            errors.repeatPassword = 'Passwords are not equal';
        }
        if (fields.username.length < 4) {
            errors.username = 'Username is too short';
        } else if (fields.username.length > 18) {
            errors.username = 'Username is too long';
        }

        if (Object.values(errors).join('')) {
            setErrors(errors);
            return false;
        } else {
            return true;
        }
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isFormValid()) {
            console.log(fields);
        }
    }


    return <Grid container justifyContent='center'>
        <Grid item justifyContent='center'>
            <FormControl>
                <form onSubmit={onSubmit}>
                    <FormGroup>
                        <TextField label='Email' margin='normal' name='email' onChange={onInputChange}
                                   value={fields.email}
                                   error={!!errors.email} helperText={errors.email}/>
                        <TextField label='Username' name='username' margin='normal' value={fields.username}
                                   onChange={onInputChange}
                                   error={!!errors.username} helperText={errors.email}
                        />
                        <TextField type='password' label='Password' name='password' value={fields.password}
                                   onChange={onInputChange} error={!!errors.password}
                                   helperText={errors.password}
                                   margin='normal'
                        />
                        <TextField type='password' label='Password' name='repeatPassword' value={fields.repeatPassword}
                                   onChange={onInputChange} error={!!errors.repeatPassword}
                                   helperText={errors.repeatPassword}
                                   margin='normal'
                        />

                        <Button type='submit' variant='contained' color='primary'>
                            Register
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>

}