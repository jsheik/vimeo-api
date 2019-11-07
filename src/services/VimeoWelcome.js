var vimeoConfig = require("../config/config")
exports.helloVimeo = (req, callback) => {    
    vimeoConfig.request({
        method: 'GET',
        path: '/tutorial'
    }, (error, body, status_code, headers) => {
        if (error) {
            console.log(error);
        }
        else {
            callback(null, body);
        }
    })
}