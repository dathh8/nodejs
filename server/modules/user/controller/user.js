const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const path = require('path');
// import path, {dirname} from "path";
const db = require(appDir + '/config/database');

class user {

    static getList = async (req, res, next) => {
        try {
            const [row] = await db.query('SELECT * FROM user');
            // res.status(200).render(path.join(__dirname, '../public/list-user'), {
            //     users: row,
            // });
            res.status(200).json({
                users: row,
            });

        } catch(e) {
            next(e);
        }
    };

    static getById = async (req, res, next) => {
        try {
            const [row] = await db.query("SELECT * FROM user where user_id = ? limit 1", [req.params.id]);
            res.status(200).render(path.join(__dirname, '../public/edit-user'), {
                body: row[0] ?? [],
            });
        } catch(e) {
            next(e);
        }
    };

    static createUser = async (req, res, next) => {
        try {
            
            res.status(200).render(path.join(__dirname, '../public/create-user'))

        } catch(e) {
            next(e);
        }
    };

    static editUser = async (req, res, next) => {
        try {
            const [row] = await db.query("SELECT * FROM user where user_id = ? limit 1", [req.params.id]);
            if (Object.keys(row).length === 0) {
                return res.redirect("/");
            }
            const date = new Date().toISOString();
            let body = req.body,
                userName = body.user_name,
                userEmail = body.user_email,
                password = body.password;
            await db.execute(
                "UPDATE `user` SET `user_name`=?, `user_email`=?,`password`=? WHERE `user_id`=?",
                [userName, userEmail, password, req.params.id]
            );
            res.redirect("/user/list");
        } catch(e) {
            next(e);
        }
    };

    static insertUser = async (req, res, next) => {
        try {
            let body = req.body,
                userName = body.user_name,
                userEmail = body.user_email,
                password = body.password;
            await db.execute(
                "INSERT INTO user (user_name, user_email, password) values (?, ?, ?)",
                [userName, userEmail, password]
            );
            res.redirect("/user/list");
        } catch(e) {
            next(e);
        }
    };

    static deleteUser = async (req, res, next) => {
        try {
            if (isNaN(+req.params.id)) {
                return res.redirect("/");
            }
            await db.execute("DELETE FROM user WHERE user_id = ?", [req.params.id]);
            return res.redirect("/user/list");
        } catch(e) {
            next(e);
        }
    };
}

module.exports = user;