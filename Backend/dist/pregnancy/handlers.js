"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deletePregnancy = exports.editStage = exports.updatePregnancy = exports.unAbortPregnancy = exports.abortPregnancy = exports.createPregnancy = exports.getPregnancy = exports.getPregnancies = void 0;
var db_1 = __importDefault(require("../db"));
var getPregnancies = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pregnancies, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1["default"].pregnancy.findMany({
                        where: {
                            tag: {
                                equals: req.params.tag
                            }
                        },
                        orderBy: {
                            createdAt: 'desc'
                        },
                        include: {
                            copulation: true,
                            examination: true,
                            lactation: true,
                            delivery: true
                        }
                    })];
            case 1:
                pregnancies = _a.sent();
                res.json({
                    data: pregnancies
                });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                next(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPregnancies = getPregnancies;
var getPregnancy = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pregnancy, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1["default"].pregnancy.findUnique({
                        where: {
                            id: req.params.id
                        }
                    })];
            case 1:
                pregnancy = _a.sent();
                res.json({
                    data: pregnancy
                });
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                next(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPregnancy = getPregnancy;
var createPregnancy = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, stage, rest, data, pregnancy, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, stage = _a.stage, rest = __rest(_a, ["stage"]);
                data = {};
                data[stage.toLowerCase()] = { create: rest };
                return [4 /*yield*/, db_1["default"].pregnancy.create({
                        data: __assign(__assign({ stage: stage, completed: stage === 'DELIVERY' }, data), { animal: {
                                connect: {
                                    tag: req.params.tag
                                }
                            } }),
                        include: {
                            copulation: true,
                            examination: true,
                            lactation: true,
                            delivery: true
                        }
                    })];
            case 1:
                pregnancy = _b.sent();
                res.json({ data: pregnancy });
                return [3 /*break*/, 3];
            case 2:
                e_3 = _b.sent();
                next(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createPregnancy = createPregnancy;
var abortPregnancy = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pregnancy, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1["default"].pregnancy.update({
                        where: {
                            id: req.params.id
                        },
                        data: {
                            completed: true,
                            aborted: true
                        },
                        include: {
                            copulation: true,
                            examination: true,
                            lactation: true,
                            delivery: true
                        }
                    })];
            case 1:
                pregnancy = _a.sent();
                res.json({ data: pregnancy });
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                next(e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.abortPregnancy = abortPregnancy;
var unAbortPregnancy = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pregnancy, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1["default"].pregnancy.update({
                        where: {
                            id: req.params.id
                        },
                        data: {
                            completed: false,
                            aborted: false
                        },
                        include: {
                            copulation: true,
                            examination: true,
                            lactation: true,
                            delivery: true
                        }
                    })];
            case 1:
                pregnancy = _a.sent();
                res.json({ data: pregnancy });
                return [3 /*break*/, 3];
            case 2:
                e_5 = _a.sent();
                next(e_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.unAbortPregnancy = unAbortPregnancy;
var updatePregnancy = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, stage, rest, data, pregnancy, e_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, stage = _a.stage, rest = __rest(_a, ["stage"]);
                data = {};
                data[stage.toLowerCase()] = {
                    create: rest
                };
                data['completed'] =
                    (stage === 'EXAMINATION' && rest.isPregnant === false) ||
                        stage === 'DELIVERY';
                return [4 /*yield*/, db_1["default"].pregnancy.update({
                        where: {
                            id: req.params.id
                        },
                        data: __assign(__assign({}, data), { stage: stage }),
                        include: {
                            copulation: true,
                            examination: true,
                            lactation: true,
                            delivery: true
                        }
                    })];
            case 1:
                pregnancy = _b.sent();
                res.status(201).json(pregnancy);
                return [3 /*break*/, 3];
            case 2:
                e_6 = _b.sent();
                next(e_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updatePregnancy = updatePregnancy;
var editStage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, stage, rest, data, pregnancy, e_7;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, stage = _a.stage, rest = __rest(_a, ["stage"]);
                data = {};
                data[stage.toLowerCase()] = { update: rest };
                if (req.params.stage === 'EXAMINATION' &&
                    req.body.isPregnant !== undefined) {
                    data['completed'] = !rest.isPregnant;
                }
                return [4 /*yield*/, db_1["default"].pregnancy.update({
                        where: {
                            id: req.params.id
                        },
                        data: data,
                        include: {
                            copulation: true,
                            examination: true,
                            lactation: true,
                            delivery: true
                        }
                    })];
            case 1:
                pregnancy = _b.sent();
                res.status(201).json({ data: pregnancy });
                return [3 /*break*/, 3];
            case 2:
                e_7 = _b.sent();
                next(e_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.editStage = editStage;
var deletePregnancy = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pregnancy, e_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1["default"].pregnancy["delete"]({
                        where: {
                            id: req.params.id
                        },
                        include: {
                            copulation: true,
                            examination: true,
                            lactation: true,
                            delivery: true
                        }
                    })];
            case 1:
                pregnancy = _a.sent();
                res.status(202).json({ data: pregnancy });
                return [3 /*break*/, 3];
            case 2:
                e_8 = _a.sent();
                next(e_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deletePregnancy = deletePregnancy;
//# sourceMappingURL=handlers.js.map