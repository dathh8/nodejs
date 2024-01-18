const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const userController = require('../controller/user');
const { param } = require("express-validator");

const user_router = express.Router();

    app.use(express.static(appDir +  "/modules/user/public"));

    io.on("connection", function(client) {
        console.log("Client connected...");
        client.on("join", function(data) {
            console.log(data);
        });
        client.on("messages", function(data) {
            client.emit("thread", data);
            client.broadcast.emit("thread", data);
        });
    });
    
    user_router.get('/list', userController.getList);
    user_router.get("/detail/id/:id", [param("id").exists().isNumeric().toInt()], userController.getById);
    user_router.get('/', function(req, res) {
        res.sendFile(appDir +  "/modules/user/public/index.html");
    });

    
module.exports = user_router;