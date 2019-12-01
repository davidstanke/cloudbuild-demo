const path = require('path');
const express=require('express');
const createError = require('http-errors');
const bodyParser = require('body-parser');

const port=8080;

var app=express();
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

// register routes
app.get('/', async (req, res) => {
    res.render('index', { 
      title: "Hello from Google Cloud",
      greeting: "Hello from Google Cloud",
      banner: "/img/logo_cloud_icon.png",
      bannerUrl: "https://cloud.google.com"
    });
  });

app.all('/greet', async (req, res) => {
    let user=req.body.name;
    res.render('default', { 
        title: "Hello, " + user,
        greeting: "Hello, " + user + "! We think you're super.",
        banner: "/img/logo_cloud_icon.png",
        bannerUrl: "https://cloud.google.com"
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next();
});

// start the server
var server=app.listen(port, function() {});
console.log('Server is running and listening on port ' + port)

module.exports = server;