"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemas = void 0;
const yupSettings_1 = require("./yupSettings");
let userSchemas = yupSettings_1.yup.object().shape({
    name: yupSettings_1.yup.string().required().min(3),
    password: yupSettings_1.yup.string().required().min(8)
});
exports.userSchemas = userSchemas;
