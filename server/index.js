const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const db = require('./config/database');
const env = require('./config/env');
const router = require('./routers/routers')
const bodyParser = require('body-parser');
const validateToken = require('./modules/sso/middleware/validateTohken');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
const cookieParser = require('cookie-parser')
const cors = require('cors')
app.use(cookieParser())
app.use(cors())
Object.keys(router.MAPPING_ROUTERS).forEach(function(key, idx, arr){
    app.use(key, router.MAPPING_ROUTERS[key])
});


app.use(express.static("modules"));
app.set('view engine', 'ejs');
app.get('/', validateToken, function(req, res) {
    res.send("<h1>My Node App</h1>")
})

server.listen(env.PORT, env.HOST, () => {
    console.log(`Server running at http://${env.HOST}:${env.PORT}/`);
});
