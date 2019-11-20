const path = require('path');
const express=require('express');

const indexRouter = require('./routes/index');
const port=8080; // TODO: allow override via env var

var app=express();
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'pug');

// register routes
app.use('/', indexRouter);

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

module.exports = server;