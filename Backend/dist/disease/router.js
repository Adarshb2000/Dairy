"use strict";
exports.__esModule = true;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var handler_1 = require("./handler");
var router = (0, express_1.Router)({ mergeParams: true });
router.get('/', handler_1.getDiseases); // Get All diseases
router.post('/', handler_1.createDiseases); // Create disease
router
    .route('/:id')
    .all((0, express_validator_1.param)('id').exists().isString())
    .put(handler_1.addVaccine) // Add vaccine to disease
["delete"](handler_1.deleteDisease); // Delete entire Disease!
router
    .route('/vaccine/:id')
    .all((0, express_validator_1.param)('id').exists().isString())
    .patch(handler_1.editVaccine) // Edit vaccine
["delete"](handler_1.deleteVaccine); // delete vaccine
exports["default"] = router;
//# sourceMappingURL=router.js.map