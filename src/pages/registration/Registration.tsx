import React, {ChangeEvent, FormEvent, useContext, useState} from "react";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {validateFormFields} from "../../utils/validate-form";
import {createUser} from "../../scripts/api-services";
import {FormLabel} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {FetchContext} from "../../providers/FetchProvider";
import {ToastContext} from "../../providers/ToastProvider";
import {TOAST_VALUES} from "../../utils/constants";

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
    const history = useNavigate();
    const {setFetch} = useContext(FetchContext);
    const {openToast} = useContext(ToastContext);
    const [fields, setFields] = useState<RegistrationFieldsType>({...initState});
    const [errors, setErrors] = useState<RegistrationFieldsType>({...initState});


    const onInputChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
        setFields({...fields, [name]: value});
        setErrors({...errors, [name]: ''});
    }


    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors = validateFormFields(fields);
        if (errors) {
            setErrors(errors as RegistrationFieldsType);
        } else {
            setFetch(true);
            const newUser = await createUser(fields);
            if (newUser) {
                openToast('Registration was successful finished', TOAST_VALUES.success);
                history('/login');
            } else {
                openToast('Registration failed, please try again later', TOAST_VALUES.error);
            }
            setFetch(false);
        }
    }


    return <Grid container justifyContent='center'>
        <Grid item justifyContent='center'>
            <FormControl>
                <FormLabel>
                    <h2>Registration</h2>
                </FormLabel>
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
                <FormLabel sx={{m: 2}}>
                    <Grid container justifyContent='center' alignItems='center'>
                        Back to <Link to='/login'><Button>Login</Button></Link>
                    </Grid>
                </FormLabel>
            </FormControl>
        </Grid>
    </Grid>

}