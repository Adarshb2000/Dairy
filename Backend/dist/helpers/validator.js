"use strict";
exports.__esModule = true;
var express_validator_1 = require("express-validator");
var validator = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (errors.array().length) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
exports["default"] = validator;
//# sourceMappingURL=validator.js.map