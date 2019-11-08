var vimeoConfig = require("../config/config")
var request = require('request');
const axios = require('axios');
var CircularJSON = require('circular-json');

exports.uploadVideo = (req, callback) => {
    let file_name = "/Users/10decoders/Documents/Vimeo/vimeo"
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

    getResult(function (result) {
        // var index =result.findIndex(x => x ==="371108944");
        // result.splice(index,'371108944')
        // index=result.findIndex(x => x ==="371129267");
        // result.splice(index,'371129267')

       getApsoluteURL(result, function (data) {
            callback(null,data);
        })

    })



}

function getResult(callback) {

    vimeoConfig.request({
        method: 'GET',
        path: '/users/104738154/videos'
    }, (error, body, status_code, headers) => {
        if (error) {
            console.log(error);
            callback(error);
        }
        else {

            let array = [];
            body.data.forEach(function (item) {
                array.push(new Promise((resolve, reject) => {
                    var videoId = item["uri"].split("/");
                    resolve(videoId[2]);
                    
                }));
            });
            Promise.all(array).then((data) => {
                callback(data);
            }).catch((error) => {
                callback(error);
            })

        }
    })

}

function getApsoluteURL(data, callback) {

    let array = [];
    data.forEach(function (item) {
        array.push(new Promise((resolve, reject) => {
            var path = 'https://player.vimeo.com/video/' + item + '/config';
      axios.get(path)
                .then(response => {
                    console.log("ssss "+response.status);
                    if(response.status==200){
                        if(response.data.request.files!=undefined){
                            resolve(response.data.request.files.progressive[0].url);
                        }else{
                            resolve();
                        }
                    
                    }else{
                        resolve();
                    }
                })
                .catch(error => {
                    resolve();
                    //console.log(error);
                });

        }))
    })

    Promise.all(array).then((data) => {
       
        callback(data);
    }).catch((error) => {
        console.log(error)
        callback(error);
    })
}
