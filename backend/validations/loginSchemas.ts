import { yup } from './yupSettings';

let loginSchemas = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().required()
});

export {
    loginSchemas
}