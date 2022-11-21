"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchemas = void 0;
const yupSettings_1 = require("./yupSettings");
let loginSchemas = yupSettings_1.yup.object().shape({
    name: yupSettings_1.yup.string().required(),
    password: yupSettings_1.yup.string().required()
});
exports.loginSchemas = loginSchemas;
