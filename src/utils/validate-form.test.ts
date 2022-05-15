import {RegistrationFieldsType} from "../pages/registration/Registration";
import {validateFormFields} from "./validate-form";

test('Should return undefined',()=>{
    const data:RegistrationFieldsType={
        email:'olegyanusik@gmail.com',
        username:'oleg3550',
        password:'12345678',
        repeatPassword:'12345678',
    }
    const actual=validateFormFields(data);

    expect(actual).toBeUndefined();
})

test('Should return validation errors',()=>{
    const data:RegistrationFieldsType={
        email:'olegyanusikmail.com',
        username:'oleg3550',
        password:'12345678',
        repeatPassword:'12345678',
    }
    const actual=validateFormFields(data);

    expect(actual).toEqual({
        email:'Invalid email address',
        username:'',
        password:'',
        repeatPassword:'',
    });
})