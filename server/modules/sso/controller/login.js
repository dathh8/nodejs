const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const path = require('path');
const jwt = require("jsonwebtoken");
// import path, {dirname} from "path";
const db = require(appDir + '/config/database');
const env = require(appDir + '/config/env');

class login {
    static login = async (req, res) => {
        let body = req.body,
            userName = body.user_name,
            password = body.password;
        const [user] = await db.query("Select user_name, user_id, user_email, password from user where user_name = ? limit 1", userName);
        if (user.length === 0 || user[0].password === undefined || user[0].password !== password) {
            const msg = '';
            return res.status(200).json(
                {
                    result: false,
                    msg: msg
                }
            );
            // return res.redirect('/login');
        }
        return res.status(200).json({
            result: true,
            tohken: jwt.sign({ email: user[0].user_email, _id: user[0].user_id}, env.JWT_ACCESS_TOKEN_SECRET, {expiresIn: '2h'}),
            tohken_expires_time: 'asd'
        });
        // let tohkenJWT = jwt.sign({ email: user[0].user_email, _id: user[0].user_id});
        // res.status(200).render(path.join(__dirname, '../public/middlewareValidate'), {
        //     tohken: jwt.sign({ email: user[0].user_email, _id: user[0]._id})
        // });
    };

    static checkTohken = async(req, res) => {
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
            res.status(200).json({auth : true});
        } catch(e) {
            res.status(200).json({auth : false});
        
        }
    }
    if (!token) {
        res.status(200).json({auth : false});
    }
    };
}

module.exports = login;