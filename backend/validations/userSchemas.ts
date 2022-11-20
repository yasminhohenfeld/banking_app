import { yup } from './yupSettings';

let userSchemas = yup.object().shape({
    name: yup.string().required().min(3),
    password: yup.string().required().min(8)
});

export {
    userSchemas
}