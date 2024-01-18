const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const db = require('./config/database');
const env = require('./config/env');
const router = require('./routers/routers')


Object.keys(router.MAPPING_ROUTERS).forEach(function(key, idx, arr){
    app.use(key, router.MAPPING_ROUTERS[key])
});

app.use(express.static("modules"));

app.get('/', function(req, res) {
    // res.status(404).send('Sorry, cant find that');
	res.send("<h2>This is my first app</h2>");
})

server.listen(env.PORT, env.HOST, () => {
    console.log(`Server running at http://${env.HOST}:${env.PORT}/`);
});
