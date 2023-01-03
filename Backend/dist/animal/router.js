"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var handler_1 = require("./handler");
var validator_1 = __importDefault(require("../helpers/validator"));
var router = (0, express_1.Router)();
router.get('/', handler_1.getAllAnimals);
router.post('/', (0, express_validator_1.body)(['tag'])
    .exists()
    .bail()
    .matches(/[B|C]-\d+$/), (0, express_validator_1.body)(['seller', 'purchaseDate', 'vehicleNumber']).optional(), (0, express_validator_1.body)('comments').optional().isArray(), validator_1["default"], handler_1.createAnimal);
// Vehicle Number if exists check
router
    .route('/:tag')
    .all((0, express_validator_1.param)('tag')
    .exists()
    .matches(/[B|C]-\d+$/), validator_1["default"])
    .get(handler_1.getAnimal)
    .patch(handler_1.editAnimal)["delete"](handler_1.deleteAnimal);
exports["default"] = router;
//# sourceMappingURL=router.js.map