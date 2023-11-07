var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/userRouter');
var adminRouter = require('./routes/adminRouter'); 
const session = require('express-session');
const expressLayout = require('express-ejs-layouts');
var app = express();
const {default: mongoose} = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/beautiful-flowers')
    .then(() => console.log("connect success"))
    .catch(error => console.log("error:", error))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(expressLayout);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'abc123',
  resave: false,
  saveUninitialized: true
}));
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/admin', adminRouter);

app.get('/product', (req, res) => {
  res.render('product', { /* Truyền dữ liệu mà bạn muốn hiển thị trên trang này */ });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;