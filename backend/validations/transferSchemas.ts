import { yup } from './yupSettings';

let transferSchemas = yup.object().shape({
    creditedAccountId: yup.number().required(),
    value: yup.number().required()
});

export {
    transferSchemas
}