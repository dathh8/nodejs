const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const path = require('path');
const db = require(appDir + '/config/database');
var express = require('express');
var session = require('express-session');
var app = express();

class checkLogin {
    static sum = function name(params) {
        
    };
}

module.exports = checkLogin;