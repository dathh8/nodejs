const userRoute = require('../modules/user/router/user');
const loginRoute = require('../modules/sso/router/sso');

module.exports = {
    MAPPING_ROUTERS : {
        '/user' : userRoute,
        '/login' : loginRoute
    }
    
}