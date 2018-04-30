import express from "express";
import bodyParser from "body-parser";
    
var app  = express(),
    port = process.env.PORT || 3001;

app.get('/ping', (req, res) => {
    res.send('pong\n');
});

app.listen(port,() => {
    console.log("Listening on port " + port)
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use((err, req, res, next) => {
    if(err.status != 404) {
        console.error(err.stack)
    } 
    res.sendStatus(err.status || 500)
})