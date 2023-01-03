"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyToken = exports.createToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createToken = function (data) {
    var token = jsonwebtoken_1["default"].sign(data, process.env.JWT_SECRET, {
        expiresIn: '2h'
    });
    return token;
};
exports.createToken = createToken;
var verifyToken = function (req, res, next) {
    try {
        var data = jsonwebtoken_1["default"].verify(req.cookies.token, process.env.JWT_SECRET);
        req['data'] = data;
        next();
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1["default"].JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid token' });
        }
        else if (e instanceof jsonwebtoken_1["default"].TokenExpiredError) {
            res.sendStatus(408);
        }
        else {
            res.sendStatus(500);
        }
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map