var express = require('express');
var app = express();
var routers = require('./routers/routers');

app.get('/', (req, res)=>{
   res.send("Hello Vimeo!");
});
app.use('/vimeo', routers);

app.listen(8080);