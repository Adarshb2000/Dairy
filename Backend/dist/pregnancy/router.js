"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var validator_1 = __importDefault(require("../helpers/validator"));
var handlers_1 = require("./handlers");
var config_1 = require("../config");
var router = (0, express_1.Router)({ mergeParams: true });
router.get('/', handlers_1.getPregnancies);
router.post('/', (0, express_validator_1.body)('stage').exists().isIn(config_1.pregnancyStages), validator_1["default"], handlers_1.createPregnancy);
router.patch('/abort/:id', handlers_1.abortPregnancy);
router.patch('/unabort/:id', handlers_1.unAbortPregnancy);
router
    .route('/:id')
    .all((0, express_validator_1.param)('id').exists(), validator_1["default"])
    .get(handlers_1.getPregnancy)["delete"](handlers_1.deletePregnancy)
    .put((0, express_validator_1.body)('stage').exists().isIn(config_1.pregnancyStages), handlers_1.updatePregnancy);
router
    .route('/:id')
    .all((0, express_validator_1.body)('stage').exists().isIn(config_1.pregnancyStages), validator_1["default"])
    .patch(handlers_1.editStage);
exports["default"] = router;
//# sourceMappingURL=router.js.map