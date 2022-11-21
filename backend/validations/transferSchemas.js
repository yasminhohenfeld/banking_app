"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferSchemas = void 0;
const yupSettings_1 = require("./yupSettings");
let transferSchemas = yupSettings_1.yup.object().shape({
    creditedAccountId: yupSettings_1.yup.number().required(),
    value: yupSettings_1.yup.number().required()
});
exports.transferSchemas = transferSchemas;
