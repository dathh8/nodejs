const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { dirname } = require('path');
const path = require('path');
const ssoController = require('../controller/login');
const { param } = require("express-validator");
const appDir = dirname(require.main.filename);
const validateToken = require('../../sso/middleware/validateTohken');

const sso_router = express.Router();

    // app.use(express.static(appDir +  "/modules/sso/public"));
    // app.use(express.static(path.join(__dirname, "public")));
    
    sso_router.get('/', function(req, res) {
        res.render(path.join(__dirname, '../public/login'));
    });
    sso_router.get('/check', ssoController.checkTohken);
    sso_router.post('/', ssoController.login);

    
module.exports = sso_router;