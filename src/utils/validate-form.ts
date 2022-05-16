import {emailRegular} from "./refulars";

type FieldsType = {
    email: string,
    password: string,
    repeatPassword?: string,
    username?: string,
}

const toEmptyValuesObject = <D>(obj: D): D => {
    return JSON.parse(`{${Object.keys(obj).map(item => `"${item}":""`).join(',')}}`);
}

const isPasswordValid = (value: string): boolean => {
    return (!(value.length < 8 || value.length > 24));
}

const validateField = (name: string, fields: FieldsType): string => {
    const value: string | undefined = fields[name as keyof FieldsType]?.trim();
    if (typeof value === 'undefined') {
        return '';
    }
    switch (name) {
        case 'email': {
            return !emailRegular.test(value) ? 'Invalid email address' : '';
        }
        case 'username': {
            return (value.length < 4 || value.length > 18) ? 'Username should contain 4-18 symbols' : '';
        }
        case 'password': {
            return isPasswordValid(value) ? '' : 'Password should contain 8-24 symbols';
        }
        case 'repeatPassword': {
            if (isPasswordValid(value)) {
                return (value !== fields.password) ? 'Passwords are not equal' : '';
            } else {
                return 'Password should contain 8-24 symbols';
            }
        }
        default: {
            return '';
        }
    }
}

export const validateFormFields = (fields: FieldsType) => {
    const errors = toEmptyValuesObject<FieldsType>(fields);
    Object.keys(fields).forEach((item) => {
        errors[item as keyof FieldsType] = validateField(item, fields);
    })
    if (Object.values(errors).join('')) {
        return errors;
    } else {
        return undefined;
    }
}
