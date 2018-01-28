import { validate } from 'email-validator';

export default (type, ...values) => {
    return typeValidation[type](...values);
};

const typeValidation = {
    email: value => {
        return validate(value);
    },
    text: values => {},
};
