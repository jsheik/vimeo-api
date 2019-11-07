var vimeoConfig = require("../config/config")
exports.uploadVideo = (req, callback) => {
    let file_name = "/home/vimeo"
    vimeoConfig.upload(
        file_name,
        {
            'name': 'Untitled',
            'description': 'The description goes here.'
        },
        (uri) => {
            console.log('Your video URI is: ' + uri);
            vimeoConfig.request(uri + '?fields=transcode.status', (error, body, status_code, headers) => {
                if (body.transcode.status === 'complete') {
                    console.log('Your video finished transcoding.')
                } else if (body.transcode.status === 'in_progress') {
                    console.log('Your video is still transcoding.')
                } else {
                    console.log('Your video encountered an error during transcoding.')
                }
            })
            vimeoConfig.request(uri + '?fields=link', (error, body, statusCode, headers) => {
                if (error) {
                    console.log('There was an error making the request.')
                    console.log('Server reported: ' + error)
                    callback(error, null);
                }
                else {
                    callback(null, body.link);
                }
            })
        },
        (bytes_uploaded, bytes_total) => {
            var percentage = (bytes_uploaded / bytes_total * 100).toFixed(2)
            console.log(bytes_uploaded, bytes_total, percentage + '%')
        },
        (error) => {
            console.log('Failed because: ' + error)
            callback(error, null);
        }
    )
}

exports.getAllVideos = (req, callback) => {
    vimeoConfig.request({
        method: 'GET',
        path: '/users/104738154/videos'
    }, (error, body, status_code, headers) => {
        if (error) {
            console.log(error);
            callback(error, null);
        }
        else {
            callback(null, body);
        }
    })
}
