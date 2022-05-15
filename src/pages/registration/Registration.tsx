import React, {ChangeEvent, FormEvent, useState} from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {validateFormFields} from "../../utils/validate-form";
import {createUser} from "../../scripts/api-services";

export type RegistrationFieldsType = {
    email: string,
    password: string,
    username: string,
    repeatPassword: string,
}

const initState: RegistrationFieldsType = {
    email: '',
    username: '',
    password: '',
    repeatPassword: ''
}

export const Registration = () => {
    const [fields, setFields] = useState<RegistrationFieldsType>({...initState});
    const [errors, setErrors] = useState<RegistrationFieldsType>({...initState});


    const onInputChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
        setFields(prevState => ({...prevState, [name]: value}));
        setErrors(prevState => ({...prevState, [name]: ''}));
    }


    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors = validateFormFields(fields);
        if (errors) {
            setErrors(errors as RegistrationFieldsType);
        } else {
            const newUser = await createUser(fields);
            if (newUser) {
                localStorage.setItem('userID', newUser.uid);
            } else {
                alert('Try again later')
            }
        }
    }


    return <Grid container justifyContent='center'>
        <Grid item justifyContent='center'>
            <FormControl>
                <form onSubmit={onSubmit}>
                    <FormGroup sx={{width: '32ch'}}>
                        <TextField label='Email' margin='normal' name='email' onChange={onInputChange}
                                   value={fields.email}
                                   error={!!errors.email} helperText={errors.email}/>
                        <TextField label='Username' name='username' margin='normal' value={fields.username}
                                   onChange={onInputChange}
                                   error={!!errors.username} helperText={errors.email}
                        />
                        <TextField type='password' label='Password' name='password' value={fields.password}
                                   onChange={onInputChange} error={!!errors.password} size={'medium'}
                                   helperText={errors.password}
                                   margin='normal'
                        />
                        <TextField type='password' label='Repeat password' name='repeatPassword'
                                   value={fields.repeatPassword}
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