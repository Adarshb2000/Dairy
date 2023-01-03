"use strict";
exports.__esModule = true;
var express_1 = require("express");
var handler_1 = require("./handler");
var express_validator_1 = require("express-validator");
var router = (0, express_1.Router)({ mergeParams: true });
router.get('/', handler_1.getMilks);
router.post('/', handler_1.createMilk);
router
    .route('/:id')
    .all((0, express_validator_1.param)('id').exists().isString())
    .get(handler_1.getMilk)
    .patch(handler_1.editMilk)["delete"](handler_1.deleteMilk);
exports["default"] = router;
//# sourceMappingURL=router.js.map