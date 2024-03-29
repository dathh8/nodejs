const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { dirname } = require('path');
const path = require('path');
const appDir = dirname(require.main.filename);
const userController = require('../controller/user');
const validateToken = require('../../sso/middleware/validateTohken');
const { param } = require("express-validator");
const user_router = express.Router();
app.use(express.static("./public"));

// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }))

    // app.use(express.static(appDir +  "/modules/user/public"));
    // app.use(express.static(path.join(__dirname, "public")));
    
    user_router.get('/list', validateToken, userController.getList);
    user_router.get("/detail/id/:id", [param("id").exists().isNumeric().toInt()], userController.getById);
    user_router.get('/create', userController.createUser);
    user_router.post("/detail/id/:id", [param("id").exists().isNumeric().toInt()], userController.editUser);
    user_router.post('/create', userController.insertUser);
    user_router.get("/delete/:id", [param("id").exists().isNumeric().toInt()], userController.deleteUser);
    user_router.get('/', function(req, res) {
        res.sendFile(appDir +  "/modules/user/public/index.html");
    });
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

    
module.exports = user_router;