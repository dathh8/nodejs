const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const env = require(appDir + '/config/env');

const ValidateToken = asyncHandler(async(req, res, next) => {
    let token,
        authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        if(!token || token === null || token === 'null') {
            res.status(200).json({auth : false});
        }
        try {
            const decodedToken = await jwt.verify(
                token,
                env.JWT_ACCESS_TOKEN_SECRET
            );
            if (!decodedToken) {
                res.status(401);
                throw new Error("User is not authorized!");
            }
            req.user = decodedToken;
            next();
        } catch(e) {
            res.status(200).json({auth : false});
        
        }
    }
    if (!token) {
        res.status(200).json({auth : false});
    }
});

module.exports = ValidateToken;