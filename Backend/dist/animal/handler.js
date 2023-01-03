"use strict";
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
exports.deleteAnimal = exports.editAnimal = exports.createAnimal = exports.getAnimal = exports.getAllAnimals = void 0;
var db_1 = __importDefault(require("../db"));
// Comments doesn't work
var getAllAnimals = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var animals;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db_1["default"].animal.findMany()];
            case 1:
                animals = _a.sent();
                res.json({
                    data: animals
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getAllAnimals = getAllAnimals;
var getAnimal = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var animal, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1["default"].animal.findUniqueOrThrow({
                        where: {
                            tag: req.params.tag
                        },
                        include: {
                            comments: {
                                select: {
                                    comment: true
                                }
                            },
                            diseases: {
                                orderBy: {
                                    updatedAt: 'desc'
                                },
                                include: {
                                    vaccination: {
                                        orderBy: {
                                            date: 'asc'
                                        }
                                    }
                                }
                            },
                            pregnancies: {
                                orderBy: {
                                    updatedAt: 'desc'
                                },
                                include: {
                                    copulation: true,
                                    delivery: true,
                                    examination: true,
                                    lactation: true
                                }
                            },
                            milks: {
                                orderBy: {
                                    date: 'desc'
                                }
                            }
                        }
                    })];
            case 1:
                animal = _a.sent();
                res.json({ data: animal });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                next(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAnimal = getAnimal;
var createAnimal = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, comments, rest, animal_1, e_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, comments = _a.comments, rest = __rest(_a, ["comments"]);
                return [4 /*yield*/, db_1["default"].animal.create({
                        data: rest
                    })];
            case 1:
                animal_1 = _b.sent();
                if (!comments) return [3 /*break*/, 3];
                return [4 /*yield*/, db_1["default"].comment.createMany({
                        data: comments.map(function (comment) {
                            return { tag: animal_1.tag, comment: comment };
                        })
                    })];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3: return [2 /*return*/, res.status(201).json({
                    data: animal_1
                })];
            case 4:
                e_2 = _b.sent();
                next(e_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createAnimal = createAnimal;
var editAnimal = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, comments, rest, animal, e_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, comments = _a.comments, rest = __rest(_a, ["comments"]);
                if (!comments) return [3 /*break*/, 2];
                return [4 /*yield*/, db_1["default"].comment.updateMany({
                        where: {
                            id: {
                                "in": comments.map(function (e) { return e.id; })
                            }
                        },
                        data: {
                            comment: {
                                set: comments.map(function (e) { return e.comment; })
                            }
                        }
                    })];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2: return [4 /*yield*/, db_1["default"].animal.update({
                    where: {
                        tag: req.params.tag
                    },
                    data: rest,
                    include: {
                        comments: {
                            select: {
                                comment: true
                            }
                        },
                        diseases: {
                            orderBy: {
                                updatedAt: 'desc'
                            },
                            include: {
                                vaccination: {
                                    orderBy: {
                                        date: 'asc'
                                    }
                                }
                            }
                        },
                        pregnancies: {
                            orderBy: {
                                updatedAt: 'desc'
                            },
                            include: {
                                copulation: true,
                                delivery: true,
                                examination: true,
                                lactation: true
                            }
                        },
                        milks: {
                            orderBy: {
                                date: 'desc'
                            }
                        }
                    }
                })];
            case 3:
                animal = _b.sent();
                res.status(201).json({
                    data: animal
                });
                return [3 /*break*/, 5];
            case 4:
                e_3 = _b.sent();
                next(e_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.editAnimal = editAnimal;
var deleteAnimal = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var animal, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, db_1["default"].animal["delete"]({
                        where: {
                            tag: req.params.tag
                        },
                        include: {
                            comments: {
                                select: {
                                    comment: true
                                }
                            },
                            diseases: {
                                orderBy: {
                                    updatedAt: 'desc'
                                },
                                include: {
                                    vaccination: {
                                        orderBy: {
                                            date: 'asc'
                                        }
                                    }
                                }
                            },
                            pregnancies: {
                                orderBy: {
                                    updatedAt: 'desc'
                                },
                                include: {
                                    copulation: true,
                                    delivery: true,
                                    examination: true,
                                    lactation: true
                                }
                            },
                            milks: {
                                orderBy: {
                                    date: 'desc'
                                }
                            }
                        }
                    })];
            case 1:
                animal = _a.sent();
                res.status(208).json({
                    data: animal
                });
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                next(e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteAnimal = deleteAnimal;
//# sourceMappingURL=handler.js.map