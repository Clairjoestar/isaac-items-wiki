var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.cjs');
var usersRouter = require('./routes/users.cjs');
var mailRouter = require('./routes/nodemailer.cjs');

var app = express();
const session = require('express-session')
const FileStore = require('session-file-store')(session)
let fileStoreOptions = {path:'../sessions'};

app.use(session({
  secret: '12345', // 必选配置
  resave: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
  saveUninitialized: false, //必选，建议false，只要保存登录状态的用户，减少无效数据。
  cookie: { secure: false, maxAge: 60000, httpOnly: false }, // 可选，配置cookie的选项，具体可以参考文章的配置内容。
  name: 'session-id', // 可选，设置个session的名字
  store: new FileStore(fileStoreOptions) // 可选，使用fileStore来保存session，如未指定就会默认使用memoryStore
}))

const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/nodemailer', mailRouter);


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
});

require("./mongodb-conn");



module.exports = app;
