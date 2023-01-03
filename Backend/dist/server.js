"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.start = void 0;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = require("./handlers/auth");
var express_validator_1 = require("express-validator");
var validator_1 = __importDefault(require("./helpers/validator"));
var router_1 = __importDefault(require("./pregnancy/router"));
var router_2 = __importDefault(require("./disease/router"));
var router_3 = __importDefault(require("./animal/router"));
var router_4 = __importDefault(require("./milk/router"));
var jwt_1 = require("./helpers/jwt");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var config_1 = require("./config");
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])({
    origin: function (origin, callback) {
        if (config_1.origins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));
app.use((0, morgan_1["default"])('dev'));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use((0, cookie_parser_1["default"])());
app.get('/abcd', function (req, res) {
    res.cookie('blehh', 'blehh', {
        httpOnly: true
    });
    res.json({ message: 'Hello World!' });
});
app.post('/login', (0, express_validator_1.body)(['username', 'password']).exists(), validator_1["default"], auth_1.login);
app.use(jwt_1.verifyToken);
app.get('/verified-token', function (req, res, next) {
    res.json({ message: 'Hello World!' });
});
app.use('/animal', router_3["default"]);
app.use('/pregnancy/:tag', (0, express_validator_1.param)('tag')
    .exists()
    .matches(/[B|C]-\d+/), validator_1["default"], router_1["default"]);
app.use('/disease/:tag', (0, express_validator_1.param)('tag')
    .exists()
    .matches(/[B|C]-\d+/), validator_1["default"], router_2["default"]);
app.use('/milk/:tag', (0, express_validator_1.param)('tag')
    .exists()
    .matches(/[B|C]-\d+/), validator_1["default"], router_4["default"]);
app.use(function (err, req, res, next) {
    if (err) {
        if (err.code === 'P2025') {
            res.status(404).json({ message: 'Detail not found' });
        }
        else if (err.code === 'P2002') {
            res.status(409).json({ message: 'Already Present' });
        }
        else {
            console.log(err);
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
    }
    else {
        res.status(404).json({ message: 'Invalid Route' });
    }
});
var start = function (host, port) {
    app.listen(port, host, function () {
        console.log("running on http://".concat(host, ":").concat(port));
    });
};
exports.start = start;
//# sourceMappingURL=server.js.map