var express = require('express');
var app = express();

var home = require('./routes/index.js');
var user = require('./routes/user.js');
var blog = require('./routes/blog.js');

app.use('/', home);
app.use('/user', user);
app.use('/blog', blog);

// catch 404 and forward to error handler
app.use(function(req, res) {
    res.end('404')
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(8080);