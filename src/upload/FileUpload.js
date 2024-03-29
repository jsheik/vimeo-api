var multer = require("multer")

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './')
    },
    filename: function (req, file, callback) {
        callback(null, "vimeo");
    }
});
var upload = multer({ storage: storage }).single('file');

module.exports = upload;

