"use strict";
exports.__esModule = true;
exports.login = void 0;
var jwt_1 = require("../helpers/jwt");
var login = function (req, res) {
    if (req.body.username.trim().toLowerCase() !== process.env.websiteusername ||
        req.body.password !== process.env.websitepassword) {
        res.status(401).json({ message: 'Invalid username or password' });
        return;
    }
    var token = (0, jwt_1.createToken)({ blehh: 'blehh' });
    res
        .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    })
        .status(200)
        .json({ message: 'ok' });
};
exports.login = login;
//# sourceMappingURL=auth.js.map