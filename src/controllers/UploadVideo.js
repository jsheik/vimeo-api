var uploadVideoService = require('../services/UploadVideo')
var upload = require('../upload/FileUpload')

exports.uploadVideo = (req, res) => {
    upload(req, res, function (error) {
        if (error) {
            res.status(500);
            res.json(error);
        }
        else {
            uploadVideoService.uploadVideo(req, (error, response) => {
                if (error) {
                    res.status(500);
                    res.json(error);
                } else {
                    res.status(201);
                    res.json(response);
                }
            });
        }
    });

}

exports.getAllVideos = (req, res) => {
    uploadVideoService.getAllVideos(req, (error, response) => {
        if (error) {
            res.status(500);
            res.json(error);
        } else {
            res.status(201);
            res.json(response);
        }
    });

}
