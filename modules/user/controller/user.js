const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const db = require(appDir + '/config/database');

class user {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static getList = async (req, res, next) => {
        try {
            const [row] = await db.query('SELECT * FROM admin_user limit 1 offset 1');
            res.status(200).json(row);

        } catch(e) {
            next(e);
        }
    };

    static getById = async (req, res, next) => {
        try {
            const [row] = await db.query("SELECT * FROM admin_user where user_id = ?", [req.params.id]);
            res.status(200).json(row);

        } catch(e) {
            next(e);
        }
    };


}

module.exports = user;