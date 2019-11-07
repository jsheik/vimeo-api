var vimeoService = require('../services/VimeoWelcome')    

exports.helloVimeo = (req, res)=> {
    vimeoService.helloVimeo(req,(error, response) => {       
        if (error) {
            res.status(500);
            res.json(error);
        } else {
            res.status(201);
            res.json(response);
        }
    });
}
